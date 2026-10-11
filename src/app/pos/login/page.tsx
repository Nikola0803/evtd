import { PosLoginForm } from "./PosLoginForm";

export default function PosLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-ivory">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">evolv</p>
          <h1 className="mt-2 text-2xl font-semibold text-charcoal">Point of Sale</h1>
          <p className="mt-1 text-sm text-charcoal/50">Staff access only</p>
        </div>
        <div className="rounded-xl border border-stone bg-white p-8 shadow-sm">
          <PosLoginForm />
        </div>
      </div>
    </div>
  );
}
