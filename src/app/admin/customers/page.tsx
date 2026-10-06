import { Suspense } from "react";
import { CustomersClient } from "./CustomersClient";

export default function CustomersPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Suspense fallback={<div className="flex h-32 items-center justify-center text-sm text-charcoal/30">Loading...</div>}>
        <CustomersClient />
      </Suspense>
    </div>
  );
}
