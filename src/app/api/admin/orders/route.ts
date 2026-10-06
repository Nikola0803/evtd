import { NextResponse } from "next/server";
import { getSessionStaff } from "@/lib/pos-auth";
import { isWooCommerceConfigured, listWooOrders } from "@/lib/woocommerce";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const staff = await getSessionStaff();
  if (!staff || staff.role === "setter") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const status = searchParams.get("status") ?? "any";
  const search = searchParams.get("search") ?? "";

  if (!isWooCommerceConfigured()) {
    return NextResponse.json({ orders: [], total: 0, totalPages: 0, source: "none" });
  }

  const result = await listWooOrders({ page, per_page: 25, status, search });
  return NextResponse.json({ ...result, source: "woocommerce" });
}
