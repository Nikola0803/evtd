import { NextResponse } from "next/server";
import { getSessionStaff } from "@/lib/pos-auth";
import { isWooCommerceConfigured, listWooCustomers, createWooCustomer } from "@/lib/woocommerce";
import { isGhlConfigured, createGhlContact } from "@/lib/ghl";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const staff = await getSessionStaff();
  if (!staff || staff.role === "setter") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const search = searchParams.get("search") ?? "";

  if (!isWooCommerceConfigured()) {
    return NextResponse.json({ customers: [], total: 0, totalPages: 0, source: "none" });
  }

  const result = await listWooCustomers({ page, per_page: 25, search });
  return NextResponse.json({ ...result, source: "woocommerce" });
}

/** Bulk import endpoint: POST array of customer records */
export async function POST(req: Request) {
  const staff = await getSessionStaff();
  if (!staff || staff.role === "setter") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const rows: { first_name: string; last_name: string; email: string; phone?: string }[] =
    Array.isArray(body.customers) ? body.customers : [];

  if (!rows.length) {
    return NextResponse.json({ error: "No customers provided" }, { status: 400 });
  }

  const results = await Promise.allSettled(
    rows.map(async (row) => {
      const wcId = isWooCommerceConfigured()
        ? await createWooCustomer({ email: row.email, first_name: row.first_name, last_name: row.last_name })
        : null;
      const ghlId = isGhlConfigured()
        ? await createGhlContact({ firstName: row.first_name, lastName: row.last_name, email: row.email, phone: row.phone, tags: ["imported"] })
        : null;
      return { email: row.email, wc_id: wcId, ghl_id: ghlId };
    })
  );

  const created = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;
  return NextResponse.json({ created, failed, total: rows.length });
}
