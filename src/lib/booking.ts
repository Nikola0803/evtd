export const BOOKING_TIMEZONE = "America/New_York";
export const BOOKING_DURATION_MINUTES = 15;

export type BookingChannel = "phone";

export type BookingRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interests: string[];
  channel: BookingChannel;
  requestedDate: string;
  requestedTime: string;
  timezone: string;
  notes?: string;
  privacyAccepted: boolean;
  marketingOptIn: boolean;
};

export type CrmBookingPayload = {
  schemaVersion: "1.0";
  event: "education_call.requested";
  source: "evlvtoday.com";
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
  };
  booking: {
    kind: "education_intro";
    durationMinutes: 15;
    requestedDate: string;
    requestedTime: string;
    startsAtLocal: string;
    timezone: string;
    channel: BookingChannel;
    status: "requested";
  };
  interests: string[];
  notes: string | null;
  consent: {
    privacyAccepted: true;
    marketingOptIn: boolean;
  };
  attribution: {
    page: "/book";
    submittedAt: string;
    referrer: string | null;
  };
};

export function toCrmBookingPayload(request: BookingRequest, referrer?: string | null): CrmBookingPayload {
  return {
    schemaVersion: "1.0",
    event: "education_call.requested",
    source: "evlvtoday.com",
    contact: {
      firstName: request.firstName.trim(),
      lastName: request.lastName.trim(),
      email: request.email.trim().toLowerCase(),
      phone: request.phone?.trim() || null,
    },
    booking: {
      kind: "education_intro",
      durationMinutes: BOOKING_DURATION_MINUTES,
      requestedDate: request.requestedDate,
      requestedTime: request.requestedTime,
      startsAtLocal: `${request.requestedDate}T${request.requestedTime}:00`,
      timezone: request.timezone,
      channel: request.channel,
      status: "requested",
    },
    interests: request.interests,
    notes: request.notes?.trim() || null,
    consent: {
      privacyAccepted: true,
      marketingOptIn: request.marketingOptIn,
    },
    attribution: {
      page: "/book",
      submittedAt: new Date().toISOString(),
      referrer: referrer || null,
    },
  };
}
