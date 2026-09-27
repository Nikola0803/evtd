"use client";

export function QuizTrigger({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("evolv:open-quiz"))}
      className="font-semibold text-copper underline decoration-copper/40 underline-offset-2 hover:decoration-copper"
    >
      {children}
    </button>
  );
}
