import { NextResponse } from "next/server";
import { getSessionStaff, getStaffList } from "@/lib/pos-auth";

export const runtime = "nodejs";

export async function GET() {
  const staff = await getSessionStaff();
  if (!staff || staff.role === "setter") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const list = getStaffList();
  return NextResponse.json({ staff: list });
}
