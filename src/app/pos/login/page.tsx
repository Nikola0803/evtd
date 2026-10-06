import { PosLoginForm } from "./PosLoginForm";

export default function PosLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-black">
      <div className="w-full max-w-xs">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">evolv</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">Point of Sale</h1>
          <p className="mt-1 text-sm text-zinc-500">Staff access only</p>
        </div>
        <PosLoginForm />
      </div>
    </div>
  );
}
