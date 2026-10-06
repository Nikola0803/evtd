import { ImportClient } from "./ImportClient";

export default function ImportPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0 border-b border-zinc-800 px-6 py-4">
        <h1 className="text-lg font-semibold text-white">Import</h1>
        <p className="text-sm text-zinc-500">Bulk import customers from CSV or add them one at a time. Creates in WooCommerce + GHL.</p>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col">
        <ImportClient />
      </div>
    </div>
  );
}
