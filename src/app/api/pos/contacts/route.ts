import { NextResponse } from "next/server";
import { getSessionStaff } from "@/lib/pos-auth";
import { searchGhlContacts } from "@/lib/ghl";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const staff = await getSessionStaff();
  if (!staff) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  if (!q || q.length < 2) return NextResponse.json({ contacts: [] });

  const contacts = await searchGhlContacts(q);
  return NextResponse.json({ contacts });
}
