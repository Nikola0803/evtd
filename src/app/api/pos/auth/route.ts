import { NextResponse } from "next/server";
import { authenticateStaff, createStaffToken } from "@/lib/pos-auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { code } = await req.json().catch(() => ({}));
  if (!code) return NextResponse.json({ error: "Staff code required." }, { status: 400 });

  const staff = authenticateStaff(code);
  if (!staff) return NextResponse.json({ error: "Invalid staff code." }, { status: 401 });

  const token = await createStaffToken(staff);

  const res = NextResponse.json({ name: staff.name, role: staff.role });
  res.cookies.set("pos_session", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/pos",
    maxAge: 60 * 60 * 12,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("pos_session", "", { path: "/pos", maxAge: 0 });
  return res;
}
