"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BOOKING_TIMEZONE, type BookingRequest } from "@/lib/booking";

type Availability = {
  timezone: string;
  durationMinutes: number;
  dates: Array<{ date: string; slots: string[] }>;
};

type BookingResponse = {
  ok?: boolean;
  mode?: "preview" | "crm";
  bookingId?: string | null;
  error?: string;
  fields?: Record<string, string>;
};

const TOPICS = [
  "Peptide education",
  "Hormone health",
  "Weight & body composition",
  "Energy & longevity",
  "Sleep & recovery",
  "Not sure yet",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parseDate(value: string) {
  return new Date(`${value}T12:00:00`);
}

function formatTime(value: string) {
  const [hour, minute] = value.split(":").map(Number);
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(new Date(2000, 0, 1, hour, minute));
}

function formatLongDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(parseDate(value));
}

function inputClass(hasError = false) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#1B1D19] outline-none transition placeholder:text-[#1B1D19]/35 ${
    hasError ? "border-red-400 focus:border-red-500" : "border-black/10 focus:border-[#D77E5F]"
  }`;
}

export function BookingFlow() {
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [availabilityError, setAvailabilityError] = useState("");
  const [step, setStep] = useState(1);
  const [monthIndex, setMonthIndex] = useState(0);
  const [interests, setInterests] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState<BookingResponse | null>(null);

  useEffect(() => {
    fetch("/api/bookings")
      .then(async (response) => {
        if (!response.ok) throw new Error("Availability is temporarily unavailable.");
        return response.json() as Promise<Availability>;
      })
      .then(setAvailability)
      .catch(() => setAvailabilityError("We could not load the calendar. Please refresh and try again."));
  }, []);

  const months = useMemo(() => {
    if (!availability) return [];
    return Array.from(new Set(availability.dates.map((item) => item.date.slice(0, 7))));
  }, [availability]);

  const activeMonth = months[monthIndex] ?? "";
  const availableByDate = useMemo(
    () => new Map(availability?.dates.map((item) => [item.date, item.slots]) ?? []),
    [availability],
  );

  const calendarDays = useMemo(() => {
    if (!activeMonth) return [];
    const [year, month] = activeMonth.split("-").map(Number);
    const firstDay = new Date(year, month - 1, 1).getDay();
    const dayCount = new Date(year, month, 0).getDate();
    return [
      ...Array.from({ length: firstDay }, () => null),
      ...Array.from({ length: dayCount }, (_, index) => `${activeMonth}-${String(index + 1).padStart(2, "0")}`),
    ];
  }, [activeMonth]);

  const selectedSlots = availableByDate.get(selectedDate) ?? [];

  function toggleInterest(topic: string) {
    setErrors((current) => ({ ...current, interests: "" }));
    setInterests((current) => {
      if (topic === "Not sure yet") return current.includes(topic) ? [] : [topic];
      const withoutUnsure = current.filter((item) => item !== "Not sure yet");
      return withoutUnsure.includes(topic) ? withoutUnsure.filter((item) => item !== topic) : [...withoutUnsure, topic];
    });
  }

  function continueFromTopics() {
    if (!interests.length) {
      setErrors({ interests: "Choose at least one topic, or select “Not sure yet.”" });
      return;
    }
    setErrors({});
    setStep(2);
  }

  function continueFromSchedule() {
    const nextErrors: Record<string, string> = {};
    if (!selectedDate) nextErrors.requestedDate = "Choose an available date.";
    if (!selectedTime) nextErrors.requestedTime = "Choose a time.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setStep(3);
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!phone.trim()) nextErrors.phone = "Add a phone number for the call.";
    if (!privacyAccepted) nextErrors.privacyAccepted = "Please accept the privacy notice.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const request: BookingRequest = {
      firstName,
      lastName,
      email,
      phone,
      interests,
      channel: "phone",
      requestedDate: selectedDate,
      requestedTime: selectedTime,
      timezone: availability?.timezone ?? BOOKING_TIMEZONE,
      notes,
      privacyAccepted,
      marketingOptIn,
    };

    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      const data = (await response.json()) as BookingResponse;
      if (!response.ok) {
        if (data.fields) setErrors(data.fields);
        throw new Error(data.error || "We could not complete your booking.");
      }
      setConfirmation(data);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not complete your booking.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation?.ok) {
    return (
      <section className="bg-[#F6F0E7] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[760px] overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_80px_rgba(34,31,25,.09)]">
          <div className="bg-[#D77E5F] p-8 text-center text-white md:p-12">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-2xl" aria-hidden>✓</span>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">{confirmation.mode === "preview" ? "Preview complete" : "Request received"}</p>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">{confirmation.mode === "preview" ? "The booking flow works." : "You’re on the calendar."}</h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/80">{confirmation.mode === "preview" ? "This request was validated and formatted for the CRM. Connect the booking credentials to send confirmations and reserve live availability." : <>We’ll send the call details to <strong>{email}</strong>. If anything changes, reply to that message and we’ll help.</>}</p>
          </div>
          <div className="grid gap-6 p-7 md:grid-cols-2 md:p-10">
            <SummaryRow icon="ri-calendar-line" label="Date" value={formatLongDate(selectedDate)} />
            <SummaryRow icon="ri-time-line" label="Time" value={`${formatTime(selectedTime)} ET · 15 minutes`} />
            <SummaryRow icon="ri-phone-line" label="Format" value="Phone call" />
            <SummaryRow icon="ri-book-open-line" label="Topics" value={interests.join(", ")} />
          </div>
          <div className="flex flex-col items-center justify-between gap-3 border-t border-black/8 px-7 py-5 text-xs text-[#62675F] sm:flex-row md:px-10">
            <span>Reference: {confirmation.bookingId}</span>
            <Link href="/shop" className="font-semibold uppercase tracking-[0.12em] text-[#B45C42]">Explore while you wait →</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F6F0E7] px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-[1240px] gap-6 lg:grid-cols-[300px_1fr] lg:items-start">
        <aside className="rounded-[1.6rem] bg-[#DDD0BE] p-4 sm:p-6 lg:sticky lg:top-32 lg:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8D4A38]">Book your call</p>
          <div className="mt-4 grid grid-cols-3 gap-2 lg:mt-7 lg:block lg:space-y-2">
            <StepRow number="01" title="Choose your focus" active={step === 1} complete={step > 1} onClick={() => setStep(1)} />
            <StepRow number="02" title="Pick a time" active={step === 2} complete={step > 2} onClick={() => step > 1 && setStep(2)} disabled={step < 2} />
            <StepRow number="03" title="Your details" active={step === 3} complete={false} disabled={step < 3} />
          </div>
          <div className="mt-8 hidden border-t border-black/10 pt-6 lg:block">
            <p className="text-sm font-semibold text-[#1B1D19]">What to expect</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#62675F]">
              <li className="flex gap-2"><span className="text-[#B45C42]">✓</span>A real conversation with our education team</li>
              <li className="flex gap-2"><span className="text-[#B45C42]">✓</span>No preparation required</li>
              <li className="flex gap-2"><span className="text-[#B45C42]">✓</span>No sales pitch or obligation</li>
            </ul>
          </div>
        </aside>

        <div className="overflow-hidden rounded-[1.8rem] bg-white shadow-[0_24px_80px_rgba(34,31,25,.07)]">
          <div className="border-b border-black/8 px-6 py-5 md:px-10">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B45C42]">Step {step} of 3</p>
              <div className="flex gap-1.5" aria-hidden>
                {[1, 2, 3].map((item) => <span key={item} className={`h-1.5 w-10 rounded-full ${item <= step ? "bg-[#D77E5F]" : "bg-black/8"}`} />)}
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="p-6 md:p-10 lg:p-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B45C42]">Start with what’s on your mind</p>
              <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">What would you like to understand?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#62675F]">Choose one or more topics. This helps us prepare useful education for the call.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {TOPICS.map((topic) => {
                  const selected = interests.includes(topic);
                  return (
                    <button key={topic} type="button" aria-pressed={selected} onClick={() => toggleInterest(topic)} className={`flex min-h-[70px] items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${selected ? "border-[#D77E5F] bg-[#F9E7DF] text-[#8D4A38]" : "border-black/10 bg-[#F9F5EE] text-[#1B1D19] hover:border-[#D77E5F]/60"}`}>
                      <span className="font-display text-lg font-semibold">{topic}</span>
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${selected ? "bg-[#D77E5F] text-white" : "border border-black/12 text-transparent"}`}>✓</span>
                    </button>
                  );
                })}
              </div>
              {errors.interests && <p className="mt-3 text-sm text-red-600">{errors.interests}</p>}

              <div className="mt-8 flex items-center gap-3 rounded-2xl bg-[#F9F5EE] px-5 py-4 text-sm text-[#62675F]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3DDD3] text-[#B45C42]"><i className="ri-phone-line" /></span>
                <span><strong className="block text-[#1B1D19]">A simple phone call</strong><span className="mt-0.5 block">We’ll call the number you provide. No video link or app needed.</span></span>
              </div>

              <div className="mt-10 flex justify-end">
                <button type="button" onClick={continueFromTopics} className="inline-flex items-center gap-2 rounded-full bg-[#D77E5F] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#C86B4D]">Choose a time <span aria-hidden>→</span></button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-6 md:p-10 lg:p-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B45C42]">Find a time that works</p>
              <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Choose an open date.</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#62675F]">Times are shown in Eastern Time. Your confirmation email will include the timezone.</p>

              {availabilityError ? (
                <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">{availabilityError}</div>
              ) : !availability ? (
                <div className="mt-8 grid min-h-[340px] place-items-center rounded-2xl bg-[#F9F5EE] text-sm text-[#62675F]">Loading available dates…</div>
              ) : (
                <div className="mt-8 grid gap-8 xl:grid-cols-[1.08fr_.92fr]">
                  <div className="rounded-2xl border border-black/10 p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <button type="button" aria-label="Previous month" disabled={monthIndex === 0} onClick={() => setMonthIndex((value) => value - 1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 disabled:opacity-25"><i className="ri-arrow-left-s-line" /></button>
                      <p className="font-display text-xl font-semibold">{new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(parseDate(`${activeMonth}-01`))}</p>
                      <button type="button" aria-label="Next month" disabled={monthIndex >= months.length - 1} onClick={() => setMonthIndex((value) => value + 1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 disabled:opacity-25"><i className="ri-arrow-right-s-line" /></button>
                    </div>
                    <div className="mt-6 grid grid-cols-7 gap-1 text-center">
                      {WEEKDAYS.map((day) => <span key={day} className="pb-2 text-[10px] font-semibold uppercase tracking-wide text-[#62675F]">{day.slice(0, 1)}</span>)}
                      {calendarDays.map((date, index) => {
                        if (!date) return <span key={`blank-${index}`} />;
                        const open = availableByDate.has(date);
                        const selected = selectedDate === date;
                        return (
                          <button key={date} type="button" disabled={!open} aria-label={open ? formatLongDate(date) : undefined} aria-pressed={selected} onClick={() => { setSelectedDate(date); setSelectedTime(""); setErrors({}); }} className={`aspect-square rounded-full text-sm transition ${selected ? "bg-[#D77E5F] font-semibold text-white" : open ? "bg-[#F3E8DA] text-[#1B1D19] hover:bg-[#E8C2B1]" : "text-black/20"}`}>
                            {Number(date.slice(-2))}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#1B1D19]">{selectedDate ? formatLongDate(selectedDate) : "Select a date to see times"}</p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {selectedSlots.map((time) => (
                        <button key={time} type="button" aria-pressed={selectedTime === time} onClick={() => { setSelectedTime(time); setErrors({}); }} className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${selectedTime === time ? "border-[#314238] bg-[#314238] text-white" : "border-black/10 bg-white hover:border-[#D77E5F]"}`}>
                          {formatTime(time)}
                        </button>
                      ))}
                    </div>
                    {!selectedDate && <div className="mt-4 rounded-xl bg-[#F9F5EE] p-5 text-sm leading-relaxed text-[#62675F]">Open dates are highlighted in the calendar.</div>}
                    {(errors.requestedDate || errors.requestedTime) && <p className="mt-3 text-sm text-red-600">{errors.requestedDate || errors.requestedTime}</p>}
                  </div>
                </div>
              )}

              <div className="mt-10 flex items-center justify-between gap-4">
                <button type="button" onClick={() => setStep(1)} className="text-xs font-semibold uppercase tracking-[0.14em] text-[#62675F]">← Back</button>
                <button type="button" onClick={continueFromSchedule} disabled={!availability} className="inline-flex items-center gap-2 rounded-full bg-[#D77E5F] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#C86B4D] disabled:opacity-40">Add your details <span aria-hidden>→</span></button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={submitBooking} className="p-6 md:p-10 lg:p-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B45C42]">Almost finished</p>
              <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Where should we send the details?</h2>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field label="First name" error={errors.firstName}><input autoComplete="given-name" value={firstName} onChange={(event) => setFirstName(event.target.value)} className={inputClass(Boolean(errors.firstName))} /></Field>
                <Field label="Last name" error={errors.lastName}><input autoComplete="family-name" value={lastName} onChange={(event) => setLastName(event.target.value)} className={inputClass(Boolean(errors.lastName))} /></Field>
                <Field label="Email address" error={errors.email}><input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className={inputClass(Boolean(errors.email))} /></Field>
                <Field label="Phone number" error={errors.phone}><input type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(555) 555-0123" className={inputClass(Boolean(errors.phone))} /></Field>
              </div>

              <div className="mt-5">
                <label className="text-sm font-semibold text-[#1B1D19]" htmlFor="booking-notes">Anything you want us to know? <span className="font-normal text-[#62675F]">(optional)</span></label>
                <textarea id="booking-notes" rows={4} maxLength={600} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Share a question or a little context. Please do not include private medical records." className={`${inputClass()} mt-2 resize-none`} />
              </div>

              <div className="mt-7 rounded-2xl bg-[#F9F5EE] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B45C42]">Your call</p>
                <div className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
                  <span><strong className="block text-[#1B1D19]">{formatLongDate(selectedDate)}</strong><span className="text-[#62675F]">{formatTime(selectedTime)} ET</span></span>
                  <span><strong className="block text-[#1B1D19]">Phone call</strong><span className="text-[#62675F]">15 minutes</span></span>
                  <button type="button" onClick={() => setStep(2)} className="self-center text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#B45C42] sm:text-right">Change time</button>
                </div>
              </div>

              <div className="mt-7 space-y-4">
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#62675F]">
                  <input type="checkbox" checked={privacyAccepted} onChange={(event) => setPrivacyAccepted(event.target.checked)} className="mt-1 h-4 w-4 accent-[#D77E5F]" />
                  <span>I agree to the <Link href="/privacy" className="font-semibold text-[#1B1D19] underline underline-offset-2">privacy notice</Link> and understand this call is educational, not medical care.</span>
                </label>
                {errors.privacyAccepted && <p className="text-sm text-red-600">{errors.privacyAccepted}</p>}
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#62675F]">
                  <input type="checkbox" checked={marketingOptIn} onChange={(event) => setMarketingOptIn(event.target.checked)} className="mt-1 h-4 w-4 accent-[#D77E5F]" />
                  <span>Send me occasional EVLV education and updates. Optional.</span>
                </label>
              </div>

              {submitError && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{submitError}</div>}

              <div className="mt-9 flex flex-col-reverse items-stretch justify-between gap-4 sm:flex-row sm:items-center">
                <button type="button" onClick={() => setStep(2)} className="text-xs font-semibold uppercase tracking-[0.14em] text-[#62675F]">← Back</button>
                <button type="submit" disabled={submitting} className="rounded-full bg-[#D77E5F] px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#C86B4D] disabled:cursor-wait disabled:opacity-60">{submitting ? "Reserving your time…" : "Confirm my free call"}</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function StepRow({ number, title, active, complete, disabled = false, onClick }: { number: string; title: string; active: boolean; complete: boolean; disabled?: boolean; onClick?: () => void }) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} className={`flex w-full flex-col items-center gap-2 rounded-xl px-2 py-3 text-center transition lg:flex-row lg:gap-3 lg:px-3 lg:text-left ${active ? "bg-white" : "disabled:cursor-default disabled:opacity-45"}`}>
      <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-semibold lg:h-8 lg:w-8 lg:text-[10px] ${active || complete ? "bg-[#D77E5F] text-white" : "border border-black/15 text-[#62675F]"}`}>{complete ? "✓" : number}</span>
      <span className={`text-[11px] font-semibold leading-tight lg:text-sm ${active ? "text-[#1B1D19]" : "text-[#62675F]"}`}>{title}</span>
    </button>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-[#1B1D19]">
      {label}
      <span className="mt-2 block">{children}</span>
      {error && <span className="mt-1.5 block text-xs font-normal text-red-600">{error}</span>}
    </label>
  );
}

function SummaryRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3DDD3] text-[#B45C42]"><i className={icon} /></span>
      <span><span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#62675F]">{label}</span><strong className="mt-1 block text-sm text-[#1B1D19]">{value}</strong></span>
    </div>
  );
}
