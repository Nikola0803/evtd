import { PosLoginForm } from "./PosLoginForm";

export default function PosLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-sage)]">evolv</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Point of Sale</h1>
          <p className="mt-1 text-sm text-[var(--color-sage)]">Staff access only</p>
        </div>
        <PosLoginForm />
      </div>
    </div>
  );
}
