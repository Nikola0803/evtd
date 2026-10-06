import { Suspense } from "react";
import { CustomersClient } from "./CustomersClient";

export default function CustomersPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0 border-b border-zinc-800 px-6 py-4">
        <h1 className="text-lg font-semibold text-white">Customers</h1>
        <p className="text-sm text-zinc-500">WooCommerce customers - pipeline stage auto-detected from order history</p>
      </div>
      <div className="flex-1 overflow-hidden">
        <Suspense fallback={<div className="flex h-32 items-center justify-center text-sm text-zinc-600">Loading...</div>}>
          <CustomersClient />
        </Suspense>
      </div>
    </div>
  );
}
