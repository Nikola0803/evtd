export interface StaffSession {
  token: string;
  name: string;
  role: string;
}

export function getSession(): StaffSession | null {
  try {
    const raw = localStorage.getItem("pos_session");
    if (!raw) return null;
    return JSON.parse(raw) as StaffSession;
  } catch {
    return null;
  }
}

export function saveSession(session: StaffSession) {
  localStorage.setItem("pos_token", session.token);
  localStorage.setItem("pos_session", JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem("pos_token");
  localStorage.removeItem("pos_session");
}

export function isAdmin(session: StaffSession | null): boolean {
  return session?.role === "admin";
}
