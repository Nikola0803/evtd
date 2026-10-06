import { getStaffList } from "@/lib/pos-auth";

export default async function StaffPage() {
  const staff = getStaffList();

  const envValue = staff
    .map((s) => `${s.code}:${s.name}:${s.role}`)
    .join(",");

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="shrink-0 border-b border-stone bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-charcoal">Staff</h1>
        <p className="text-sm text-charcoal/50">Manage staff access codes and roles</p>
      </div>

      <div className="flex-1 p-6 space-y-8">

        {/* Current staff */}
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-charcoal/40">Current Staff ({staff.length})</h2>
          <div className="overflow-hidden rounded-xl border border-stone bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone bg-ivory">
                  <Th>Code</Th><Th>Name</Th><Th>Role</Th><Th>Permissions</Th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s) => (
                  <tr key={s.code} className="border-b border-stone/50 last:border-0">
                    <Td><code className="font-mono text-charcoal bg-ivory border border-stone px-1.5 py-0.5 rounded text-xs">{s.code}</code></Td>
                    <Td><span className="font-medium text-charcoal">{s.name}</span></Td>
                    <Td>
                      <span className={`inline-block text-[10px] font-semibold uppercase rounded border px-2 py-0.5 ${
                        s.role === "admin" ? "border-purple-200 bg-purple-50 text-purple-700" :
                        s.role === "closer" ? "border-blue-200 bg-blue-50 text-blue-700" :
                        "border-stone bg-ivory text-charcoal/50"
                      }`}>
                        {s.role}
                      </span>
                    </Td>
                    <Td>
                      <span className="text-xs text-charcoal/50">
                        {s.role === "admin" ? "POS + Admin CRM + Staff mgmt" :
                         s.role === "closer" ? "POS + Admin CRM view" :
                         "POS only"}
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Roles explanation */}
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-charcoal/40">Roles</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { role: "setter", color: "text-charcoal/60", border: "border-stone", desc: "Can log in to POS and create orders. Cannot access admin CRM." },
              { role: "closer", color: "text-blue-700", border: "border-blue-200", desc: "Can create orders AND access admin: view orders, customers, reports." },
              { role: "admin", color: "text-purple-700", border: "border-purple-200", desc: "Full access: POS + all admin views + staff management." },
            ].map((r) => (
              <div key={r.role} className={`rounded-xl border ${r.border} bg-white p-4`}>
                <p className={`text-sm font-semibold uppercase tracking-wide ${r.color}`}>{r.role}</p>
                <p className="mt-1.5 text-xs text-charcoal/50">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to add staff */}
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-charcoal/40">Add or Remove Staff</h2>
          <div className="rounded-xl border border-stone bg-white p-5 space-y-4">
            <p className="text-sm text-charcoal/70">
              Staff are managed via the{" "}
              <code className="text-charcoal bg-ivory border border-stone px-1.5 py-0.5 rounded text-xs">POS_STAFF</code>{" "}
              environment variable in Vercel.
              Format: <code className="text-charcoal bg-ivory border border-stone px-1.5 py-0.5 rounded text-xs">code:Name:role,code:Name:role</code>
            </p>

            <div>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-charcoal/40">Current value</p>
              <code className="block rounded-lg border border-stone bg-ivory px-3 py-2.5 text-xs text-charcoal/60 font-mono break-all">
                {envValue}
              </code>
            </div>

            <div>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-charcoal/40">Example - add a new setter</p>
              <code className="block rounded-lg border border-stone bg-ivory px-3 py-2.5 text-xs text-charcoal/60 font-mono">
                {envValue},newcode:Full Name:setter
              </code>
            </div>

            <div className="rounded-lg border border-copper/20 bg-copper/5 px-4 py-3">
              <p className="text-xs text-copper/80">
                Update the <code className="bg-copper/10 px-1 rounded text-copper">POS_STAFF</code> variable in your{" "}
                <strong>Vercel dashboard</strong> under Settings - Environment Variables, then redeploy for changes to take effect.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-charcoal/40">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3">{children}</td>;
}
