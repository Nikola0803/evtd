import { Suspense } from "react";
import { OrdersClient } from "./OrdersClient";

export default function OrdersPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Suspense fallback={<div className="flex h-32 items-center justify-center text-sm text-charcoal/30">Loading...</div>}>
        <OrdersClient />
      </Suspense>
    </div>
  );
}
