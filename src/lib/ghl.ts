import "server-only";

const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
const GHL_BASE = "https://services.leadconnectorhq.com";

export function isGhlConfigured() {
  return Boolean(GHL_API_KEY && GHL_LOCATION_ID);
}

async function ghlGet(path: string) {
  if (!GHL_API_KEY) return null;
  const res = await fetch(`${GHL_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${GHL_API_KEY}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 },
  });
  if (!res.ok) return null;
  return res.json().catch(() => null);
}

export interface GhlContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tags?: string[];
  customFields?: { id: string; value: string }[];
}

export async function searchGhlContacts(query: string): Promise<GhlContact[]> {
  if (!query || query.length < 2) return [];
  const params = new URLSearchParams({
    locationId: GHL_LOCATION_ID,
    query,
    limit: "10",
  });
  const data = await ghlGet(`/contacts/?${params}`);
  return data?.contacts ?? [];
}

export async function getGhlContact(contactId: string): Promise<GhlContact | null> {
  const data = await ghlGet(`/contacts/${contactId}`);
  return data?.contact ?? null;
}
