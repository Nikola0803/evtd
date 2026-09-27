"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="bg-ivory-soft py-20 md:py-28">
      <div className="mx-auto max-w-[800px] px-4 text-center md:px-8">
        <Reveal>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">The evolv Newsletter</p>
          <h2 className="font-display text-3xl font-semibold text-charcoal md:text-4xl">
            Wellness intelligence,{" "}
            <em className="font-accent not-italic text-copper">biweekly.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-soft-gray">
            Evidence-based insights on hormone health, metabolic optimization, longevity, and the science behind
            sustainable wellness. No spam, no fluff.
          </p>
        </Reveal>

        <Reveal>
          {submitted ? (
            <div className="mt-10 inline-flex items-center gap-2.5 rounded-md border border-stone bg-ivory px-6 py-4">
              <i className="ri-checkbox-circle-line text-lg text-copper" />
              <span className="text-sm font-medium text-charcoal">You&apos;re on the list.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full max-w-sm rounded-md border border-stone bg-ivory px-5 text-sm text-charcoal outline-none placeholder:text-soft-gray/60 focus:border-copper sm:w-72"
              />
              <button
                type="submit"
                className="h-12 whitespace-nowrap rounded-md bg-charcoal px-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-ivory transition hover:bg-sage-deep"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="mt-3 text-[11px] text-soft-gray/50">Unsubscribe at any time.</p>
        </Reveal>
      </div>
    </section>
  );
}
