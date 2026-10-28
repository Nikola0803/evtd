import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { BookingFlow } from "./BookingFlow";

export const metadata: Metadata = {
  title: "Book Your First Call",
  description: "Choose a time for your free 15-minute education call with EVLV.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <section className="bg-[#18231E] px-4 pb-16 pt-14 text-white md:px-8 md:pb-24 md:pt-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F2A58C]">Your first call is free</p>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[.98] tracking-[-.04em] md:text-7xl">
              Choose a time to <span className="italic text-[#F2A58C]">talk.</span>
            </h1>
          </div>
          <div className="grid items-center gap-6 sm:grid-cols-[1fr_220px] lg:grid-cols-[1fr_280px]">
            <div className="max-w-xl">
              <p className="text-base leading-relaxed text-white/68 md:text-lg">A calm, focused 15-minute call about your goals and questions. No lab review, no individualized medical plan, no pitch, and no obligation.</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
              <span className="flex items-center gap-2"><i className="ri-time-line text-[#F2A58C]" />15 minutes</span>
              <span className="flex items-center gap-2"><i className="ri-phone-line text-[#F2A58C]" />Phone call</span>
              <span className="flex items-center gap-2"><i className="ri-map-pin-line text-[#F2A58C]" />Online across the U.S.</span>
            </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-[#F0E4D1]">
              <Image src="/images/brand/inner-booking-call.png" alt="Woman scheduling an EVLV wellness education call" fill priority sizes="(max-width: 640px) 100vw, 280px" className="object-cover object-center" />
            </div>
          </div>
        </div>
      </section>

      <Suspense>
        <BookingFlow />
      </Suspense>
    </>
  );
}
