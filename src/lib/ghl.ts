import "server-only";

const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
const GHL_BASE = "https://services.leadconnectorhq.com";

export function isGhlConfigured() {
  return Boolean(GHL_API_KEY && GHL_LOCATION_ID);
}

async function ghlFetch(path: string, options: RequestInit = {}) {
  if (!GHL_API_KEY) return null;
  const res = await fetch(`${GHL_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${GHL_API_KEY}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
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
  if (!query || query.length < 2 || !GHL_LOCATION_ID) return [];
  const params = new URLSearchParams({ locationId: GHL_LOCATION_ID, query, limit: "10" });
  const data = await ghlFetch(`/contacts/?${params}`);
  return data?.contacts ?? [];
}

export async function getGhlContact(contactId: string): Promise<GhlContact | null> {
  const data = await ghlFetch(`/contacts/${contactId}`);
  return data?.contact ?? null;
}

export interface GhlContactInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  tags?: string[];
}

/** Create a new contact. Returns the new contact ID or null on failure. */
export async function createGhlContact(input: GhlContactInput): Promise<string | null> {
  if (!GHL_LOCATION_ID) return null;
  const data = await ghlFetch("/contacts/", {
    method: "POST",
    body: JSON.stringify({ ...input, locationId: GHL_LOCATION_ID }),
  });
  return data?.contact?.id ?? null;
}

/** Update an existing contact's tags (additive). Returns true on success. */
export async function updateGhlContactTags(contactId: string, tags: string[]): Promise<boolean> {
  const data = await ghlFetch(`/contacts/${contactId}`, {
    method: "PUT",
    body: JSON.stringify({ tags }),
  });
  return data !== null;
}

export interface GhlOpportunityInput {
  contactId: string;
  name: string;
  monetaryValue?: number;
  status?: "open" | "won" | "lost" | "abandoned";
}

/** Create an opportunity. Requires GHL_PIPELINE_ID + GHL_STAGE_ID env vars. */
export async function createGhlOpportunity(input: GhlOpportunityInput): Promise<string | null> {
  const pipelineId = process.env.GHL_PIPELINE_ID;
  const stageId = process.env.GHL_STAGE_ID;
  if (!pipelineId || !stageId || !GHL_LOCATION_ID) return null;
  const data = await ghlFetch("/opportunities/", {
    method: "POST",
    body: JSON.stringify({
      pipelineId,
      locationId: GHL_LOCATION_ID,
      name: input.name,
      pipelineStageId: stageId,
      status: input.status ?? "won",
      contactId: input.contactId,
      monetaryValue: input.monetaryValue ?? 0,
    }),
  });
  return data?.opportunity?.id ?? null;
}
