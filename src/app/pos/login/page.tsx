import { PosLoginForm } from "./PosLoginForm";

export default function PosLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-charcoal px-6">
      <div className="w-full max-w-[272px]">
        {/* Brand */}
        <div className="mb-10 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-copper">evolv</p>
          <h1 className="mt-3 text-2xl font-semibold text-ivory/90">Point of Sale</h1>
        </div>

        <PosLoginForm />

        <p className="mt-10 text-center text-[10px] uppercase tracking-[0.3em] text-ivory/20">
          Staff access only
        </p>
      </div>
    </div>
  );
}
