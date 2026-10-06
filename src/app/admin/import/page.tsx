import { ImportClient } from "./ImportClient";

export default function ImportPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0 border-b border-stone bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-charcoal">Import</h1>
        <p className="text-sm text-charcoal/50">Bulk import customers from CSV or add them one at a time. Creates in WooCommerce + GHL.</p>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col bg-ivory-soft">
        <ImportClient />
      </div>
    </div>
  );
}
