import { NextResponse } from "next/server";
import {
  BOOKING_DURATION_MINUTES,
  BOOKING_TIMEZONE,
  type BookingRequest,
  toCrmBookingPayload,
} from "@/lib/booking";

export const runtime = "nodejs";

const TIME_SLOTS = ["10:00", "11:00", "12:30", "14:00", "15:30", "17:00"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function dateKey(date: Date) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}

function availableDates() {
  const dates: Array<{ date: string; slots: string[] }> = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);

  while (dates.length < 18) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) dates.push({ date: dateKey(cursor), slots: TIME_SLOTS });
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

export async function GET() {
  return NextResponse.json({
    timezone: BOOKING_TIMEZONE,
    durationMinutes: BOOKING_DURATION_MINUTES,
    dates: availableDates(),
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as BookingRequest | null;
  if (!body) return NextResponse.json({ error: "Invalid booking request." }, { status: 400 });

  const validDate = availableDates().find((item) => item.date === body.requestedDate);
  const errors: Record<string, string> = {};
  if (!body.firstName?.trim()) errors.firstName = "First name is required.";
  if (!body.lastName?.trim()) errors.lastName = "Last name is required.";
  if (!EMAIL_PATTERN.test(body.email || "")) errors.email = "Enter a valid email address.";
  if (!body.interests?.length) errors.interests = "Choose at least one topic.";
  if (!validDate) errors.requestedDate = "Choose an available date.";
  if (!validDate?.slots.includes(body.requestedTime)) errors.requestedTime = "Choose an available time.";
  if (body.channel !== "phone") errors.channel = "This booking is for a phone call.";
  if (!body.phone?.trim()) errors.phone = "Add a phone number for the call.";
  if (!body.privacyAccepted) errors.privacyAccepted = "Please accept the privacy notice.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Please review the highlighted fields.", fields: errors }, { status: 422 });
  }

  const payload = toCrmBookingPayload({ ...body, timezone: BOOKING_TIMEZONE }, request.headers.get("referer"));
  const crmUrl = process.env.CRM_API_URL;
  const publicKey = process.env.CRM_BOOKING_FORM_KEY;

  if (crmUrl && publicKey) {
    const crmResponse = await fetch(`${crmUrl}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-public-key": publicKey },
      body: JSON.stringify(payload),
    });

    const crmData = await crmResponse.json().catch(() => ({}));
    if (!crmResponse.ok) {
      return NextResponse.json({ error: "We could not reserve that time. Please try another slot." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, mode: "crm", bookingId: crmData.bookingId ?? crmData.id ?? null, payload });
  }

  const previewId = `EVLV-${Date.now().toString(36).toUpperCase()}`;
  return NextResponse.json({ ok: true, mode: "preview", bookingId: previewId, payload });
}
