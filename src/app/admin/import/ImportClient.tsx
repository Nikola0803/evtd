"use client";

import { useRef, useState } from "react";

interface ParsedRow { first_name: string; last_name: string; email: string; phone: string; valid: boolean }

const CSV_TEMPLATE = "first_name,last_name,email,phone\nJohn,Smith,john@example.com,+1-555-0100\nJane,Doe,jane@example.com,+1-555-0200";

function parseCSV(text: string): ParsedRow[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/[^a-z_]/g, ""));
  return lines.slice(1).map((line) => {
    const cells = line.split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = cells[i] ?? ""; });
    const email = row.email ?? row.email_address ?? "";
    const first = row.first_name ?? row.firstname ?? row.first ?? "";
    const last = row.last_name ?? row.lastname ?? row.last ?? "";
    const phone = row.phone ?? row.phone_number ?? row.mobile ?? "";
    return { first_name: first, last_name: last, email, phone, valid: !!email && !!first };
  });
}

export function ImportClient() {
  const [tab, setTab] = useState<"csv" | "manual">("csv");
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [filename, setFilename] = useState("");
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ created: number; failed: number; total: number } | null>(null);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Manual entry
  const [manual, setManual] = useState({ first_name: "", last_name: "", email: "", phone: "" });

  function handleFile(f: File) {
    setFilename(f.name);
    setResult(null);
    setError("");
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCSV(text);
      setRows(parsed);
    };
    reader.readAsText(f);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  async function doImport(customers: Omit<ParsedRow, "valid">[]) {
    setImporting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customers }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Import failed"); return; }
      setResult(data);
      setRows([]);
      setFilename("");
      setManual({ first_name: "", last_name: "", email: "", phone: "" });
    } catch { setError("Network error"); }
    finally { setImporting(false); }
  }

  function downloadTemplate() {
    const blob = new Blob([CSV_TEMPLATE], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "evolv-import-template.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  const validRows = rows.filter((r) => r.valid);

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">

      {/* Tabs */}
      <div className="flex gap-2">
        {(["csv", "manual"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
              tab === t ? "border-white bg-white text-black" : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-white"
            }`}>
            {t === "csv" ? "CSV / Excel import" : "Add single customer"}
          </button>
        ))}
      </div>

      {result && (
        <div className="rounded-lg border border-green-900/50 bg-green-950/30 px-4 py-3">
          <p className="text-sm font-semibold text-green-400">Import complete</p>
          <p className="mt-0.5 text-xs text-zinc-400">
            {result.created} created, {result.failed} failed of {result.total} records
          </p>
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-2.5 text-sm text-red-400">{error}</div>
      )}

      {/* CSV tab */}
      {tab === "csv" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <button onClick={downloadTemplate}
              className="rounded-md border border-zinc-800 px-3 py-2 text-xs font-medium text-zinc-400 hover:border-zinc-600 hover:text-white transition-colors">
              Download template CSV
            </button>
            <span className="text-xs text-zinc-600">or drag and drop a CSV/Excel file below</span>
          </div>

          {/* Drop zone */}
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
            className="cursor-pointer rounded-lg border-2 border-dashed border-zinc-800 bg-zinc-900/50 px-6 py-10 text-center transition-colors hover:border-zinc-600 hover:bg-zinc-900"
          >
            <i className="ri-upload-cloud-2-line text-3xl text-zinc-700" />
            <p className="mt-2 text-sm text-zinc-500">
              {filename ? filename : "Click or drag a .csv file here"}
            </p>
            <p className="mt-1 text-xs text-zinc-700">Columns: first_name, last_name, email, phone</p>
            <input ref={fileRef} type="file" accept=".csv,.txt" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          </div>

          {/* Preview */}
          {rows.length > 0 && (
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm text-zinc-400">
                  <span className="text-white font-semibold">{validRows.length}</span> valid,{" "}
                  <span className={rows.length - validRows.length > 0 ? "text-red-400" : "text-zinc-600"}>
                    {rows.length - validRows.length} invalid
                  </span>
                  {" "}rows
                </p>
                <button
                  onClick={() => doImport(validRows)}
                  disabled={importing || validRows.length === 0}
                  className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-100 disabled:opacity-30"
                >
                  {importing ? "Importing..." : `Import ${validRows.length} customers`}
                </button>
              </div>
              <div className="overflow-hidden rounded-lg border border-zinc-800 max-h-64 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-zinc-900 border-b border-zinc-800">
                    <tr>
                      {["First", "Last", "Email", "Phone", ""].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={i} className={`border-b border-zinc-900 ${!r.valid ? "opacity-40" : ""}`}>
                        <td className="px-3 py-1.5 text-zinc-300">{r.first_name}</td>
                        <td className="px-3 py-1.5 text-zinc-300">{r.last_name}</td>
                        <td className="px-3 py-1.5 text-zinc-300">{r.email}</td>
                        <td className="px-3 py-1.5 text-zinc-500">{r.phone}</td>
                        <td className="px-3 py-1.5">
                          {r.valid
                            ? <i className="ri-check-line text-green-500" />
                            : <span className="text-red-500 text-[10px]">missing email/name</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Manual tab */}
      {tab === "manual" && (
        <div className="max-w-sm space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input value={manual.first_name} onChange={(e) => setManual((m) => ({ ...m, first_name: e.target.value }))}
              placeholder="First name" className={INPUT} />
            <input value={manual.last_name} onChange={(e) => setManual((m) => ({ ...m, last_name: e.target.value }))}
              placeholder="Last name" className={INPUT} />
          </div>
          <input type="email" value={manual.email} onChange={(e) => setManual((m) => ({ ...m, email: e.target.value }))}
            placeholder="Email *" className={INPUT} />
          <input type="tel" value={manual.phone} onChange={(e) => setManual((m) => ({ ...m, phone: e.target.value }))}
            placeholder="Phone" className={INPUT} />
          <button
            onClick={() => doImport([manual])}
            disabled={importing || !manual.email || !manual.first_name}
            className="w-full rounded-md bg-white py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-100 disabled:opacity-30"
          >
            {importing ? "Adding..." : "Add customer"}
          </button>
          <p className="text-xs text-zinc-600">Creates in WooCommerce + GHL if configured</p>
        </div>
      )}
    </div>
  );
}

const INPUT = "w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none";
