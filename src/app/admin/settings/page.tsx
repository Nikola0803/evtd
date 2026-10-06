import { Suspense } from "react";
import { SettingsClient } from "./SettingsClient";

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0 border-b border-stone bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-charcoal">Settings</h1>
        <p className="text-sm text-charcoal/50">Connection health and environment configuration</p>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col bg-ivory-soft">
        <Suspense fallback={<div className="flex h-32 items-center justify-center text-sm text-charcoal/30">Loading...</div>}>
          <SettingsClient />
        </Suspense>
      </div>
    </div>
  );
}
