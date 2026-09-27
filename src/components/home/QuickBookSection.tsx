"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

const GOALS = [
  { id: "hormones", label: "Hormone Health", icon: "ri-heart-pulse-line" },
  { id: "longevity", label: "Longevity", icon: "ri-timer-line" },
  { id: "weight", label: "Weight Optimization", icon: "ri-run-line" },
  { id: "performance", label: "Performance", icon: "ri-flashlight-line" },
  { id: "sleep", label: "Sleep & Recovery", icon: "ri-moon-line" },
  { id: "general", label: "General Wellness", icon: "ri-leaf-line" },
];

type Step = 1 | 2 | "done";

export function QuickBookSection() {
  const [step, setStep] = useState<Step>(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "" });

  function toggleGoal(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStep("done");
  }

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <section className="relative overflow-hidden bg-charcoal py-24 text-white md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(184,135,90,0.18) 0%, rgba(184,135,90,0) 70%)" }}
      />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-16 px-4 md:grid-cols-2 md:px-8 lg:gap-24">

        {/* Left - education by goal */}
        <Reveal className="md:sticky md:top-32">
          <div className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">
            <span className="h-px w-8 bg-copper/60" />
            Book an Education Call
          </div>
          <h2 className="font-display text-5xl font-semibold uppercase leading-[0.95] md:text-6xl">
            Start with what
            <br />
            you want to{" "}
            <em className="not-italic text-sage-light">understand.</em>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-white/60">
            Choose the topics on your mind. We&apos;ll use your first call to explain how our education and resources can help.
          </p>
          <ul className="mt-8 flex flex-col gap-2.5">
            {[
              "Plain-language education",
              "Research context without personal medical advice",
              "Clear boundaries for questions that belong with a licensed provider",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                <i className="ri-check-line mt-0.5 shrink-0 text-copper" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-widest text-white/25">
            First call is free &middot; No obligation
          </p>
        </Reveal>

        {/* Right - quiz card */}
        <Reveal>
          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
            {/* Progress bar */}
            <div className="h-1 bg-white/10">
              <div
                className="h-full bg-copper transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="p-7 md:p-8">
              {step === 1 && (
                <div>
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-white/30">
                    Step 1 of 2
                  </p>
                  <h3 className="mb-6 font-display text-xl font-semibold">
                    What would you like to learn about?
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {GOALS.map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => toggleGoal(g.id)}
                        className={`flex flex-col items-start gap-2 rounded-md border p-4 text-left text-sm transition ${
                          selected.includes(g.id)
                            ? "border-copper bg-copper/10 text-white"
                            : "border-white/10 text-white/60 hover:border-white/25 hover:text-white/80"
                        }`}
                      >
                        <i
                          className={`${g.icon} text-lg ${
                            selected.includes(g.id) ? "text-copper" : "text-white/40"
                          }`}
                        />
                        {g.label}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    disabled={selected.length === 0}
                    onClick={() => setStep(2)}
                    className="mt-7 flex h-11 w-full items-center justify-center rounded-md bg-copper text-[12px] font-semibold uppercase tracking-[0.15em] text-charcoal transition hover:bg-copper-light disabled:opacity-40"
                  >
                    Continue <i className="ri-arrow-right-line ml-1.5 text-xs" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit}>
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-white/30">
                    Step 2 of 2
                  </p>
                  <h3 className="mb-2 font-display text-xl font-semibold">
                    Where do we reach you?
                  </h3>
                  <p className="mb-6 text-sm text-white/50">
                    Our education team will review your topics and reach out to arrange the call.
                  </p>
                  <div className="flex flex-col gap-3">
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="h-12 rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-copper"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="h-12 rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-copper"
                    />
                  </div>
                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex h-11 items-center justify-center rounded-md border border-white/10 px-5 text-[12px] font-semibold uppercase tracking-[0.15em] text-white/50 transition hover:border-white/25 hover:text-white/70"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex h-11 flex-1 items-center justify-center rounded-md bg-copper text-[12px] font-semibold uppercase tracking-[0.15em] text-charcoal transition hover:bg-copper-light"
                    >
                      Send My Questions <i className="ri-send-plane-line ml-1.5 text-xs" />
                    </button>
                  </div>
                </form>
              )}

              {step === "done" && (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-copper/15">
                    <i className="ri-checkbox-circle-line text-3xl text-copper" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">We&apos;ve got your questions.</h3>
                  <p className="mt-2 max-w-xs text-sm text-white/60">
                    Our education team will reach out to help arrange your free first call.
                  </p>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-white/25">
                    Check your inbox
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-6 py-3">
              <span className="font-mono text-[10px] text-white/25">Your data is never sold</span>
              <span className="font-mono text-[10px] text-white/25">First call is free</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
