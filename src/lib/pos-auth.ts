import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.POS_JWT_SECRET || "pos-dev-secret-change-in-production"
);

export type StaffRole = "setter" | "closer" | "admin";

export interface StaffMember {
  code: string;
  name: string;
  role: StaffRole;
}

/**
 * POS_STAFF format: "code:name:role,code:name:role"
 * e.g. "john123:John Smith:setter,jane456:Jane Doe:closer,admin999:Admin:admin"
 */
export function getStaffList(): StaffMember[] {
  const raw = process.env.POS_STAFF || "";
  if (!raw) return [];
  return raw
    .split(",")
    .map((entry) => {
      const [code, name, role] = entry.trim().split(":");
      if (!code || !name || !role) return null;
      return { code, name, role: role as StaffRole };
    })
    .filter((x): x is StaffMember => x !== null);
}

export function authenticateStaff(code: string): StaffMember | null {
  const list = getStaffList();
  return list.find((s) => s.code === code) ?? null;
}

export async function createStaffToken(staff: StaffMember): Promise<string> {
  return new SignJWT({ code: staff.code, name: staff.name, role: staff.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(SECRET);
}

export async function verifyStaffToken(token: string): Promise<StaffMember | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return {
      code: payload.code as string,
      name: payload.name as string,
      role: payload.role as StaffRole,
    };
  } catch {
    return null;
  }
}

export async function getSessionStaff(): Promise<StaffMember | null> {
  const jar = await cookies();
  const token = jar.get("pos_session")?.value;
  if (!token) return null;
  return verifyStaffToken(token);
}

export function posConfigured(): boolean {
  return Boolean(process.env.POS_STAFF);
}
