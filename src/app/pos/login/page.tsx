import { PosLoginForm } from "./PosLoginForm";

export default function PosLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-4">
      {/* Brand mark */}
      <div className="mb-8 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-copper">evolv</p>
        <h1 className="mt-2 text-2xl font-semibold text-charcoal">Point of Sale</h1>
        <p className="mt-1 text-xs text-charcoal/40 uppercase tracking-wider">Staff access only</p>
      </div>

      {/* PIN card */}
      <div className="w-full max-w-xs rounded-2xl border border-stone bg-white p-7 shadow-sm">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-charcoal/40">
          Enter PIN
        </p>
        <PosLoginForm />
      </div>

      <p className="mt-6 text-xs text-charcoal/30">Use your assigned staff code</p>
    </div>
  );
}
