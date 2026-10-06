import { getStaffList } from "@/lib/pos-auth";

export default async function StaffPage() {
  const staff = getStaffList();

  const envValue = staff
    .map((s) => `${s.code}:${s.name}:${s.role}`)
    .join(",");

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="shrink-0 border-b border-zinc-800 px-6 py-4">
        <h1 className="text-lg font-semibold text-white">Staff</h1>
        <p className="text-sm text-zinc-500">Manage staff access codes and roles</p>
      </div>

      <div className="flex-1 p-6 space-y-8">

        {/* Current staff */}
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">Current Staff ({staff.length})</h2>
          <div className="overflow-hidden rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900">
                  <Th>Code</Th><Th>Name</Th><Th>Role</Th><Th>Permissions</Th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s) => (
                  <tr key={s.code} className="border-b border-zinc-900">
                    <Td><code className="font-mono text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">{s.code}</code></Td>
                    <Td><span className="text-white">{s.name}</span></Td>
                    <Td>
                      <span className={`text-[10px] font-semibold uppercase rounded-sm px-2 py-0.5 ${
                        s.role === "admin" ? "bg-purple-950/40 text-purple-400" :
                        s.role === "closer" ? "bg-blue-950/40 text-blue-400" :
                        "bg-zinc-800 text-zinc-400"
                      }`}>
                        {s.role}
                      </span>
                    </Td>
                    <Td>
                      <span className="text-xs text-zinc-500">
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
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">Roles</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { role: "setter", color: "text-zinc-400", desc: "Can log in to POS and create orders. Cannot access admin CRM." },
              { role: "closer", color: "text-blue-400", desc: "Can create orders AND access admin: view orders, customers, reports." },
              { role: "admin", color: "text-purple-400", desc: "Full access: POS + all admin views + staff management." },
            ].map((r) => (
              <div key={r.role} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                <p className={`text-sm font-semibold uppercase tracking-wide ${r.color}`}>{r.role}</p>
                <p className="mt-1.5 text-xs text-zinc-500">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to add staff */}
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">Add or Remove Staff</h2>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 space-y-4">
            <p className="text-sm text-zinc-400">
              Staff are managed via the <code className="text-white bg-zinc-800 px-1.5 py-0.5 rounded text-xs">POS_STAFF</code> environment variable in Vercel.
              Format: <code className="text-white bg-zinc-800 px-1.5 py-0.5 rounded text-xs">code:Name:role,code:Name:role</code>
            </p>

            <div>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Current value</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-300 font-mono break-all">
                  {envValue}
                </code>
              </div>
            </div>

            <div>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Example - add a new setter</p>
              <code className="block rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-300 font-mono">
                {envValue},newcode:Full Name:setter
              </code>
            </div>

            <div className="rounded-md border border-amber-900/40 bg-amber-950/20 px-4 py-3">
              <p className="text-xs text-amber-400">
                Update the <code className="bg-amber-950/40 px-1 rounded">POS_STAFF</code> variable in your{" "}
                <strong>Vercel dashboard</strong> under Settings → Environment Variables, then redeploy (or trigger a new deployment) for changes to take effect.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-600">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-2.5">{children}</td>;
}
