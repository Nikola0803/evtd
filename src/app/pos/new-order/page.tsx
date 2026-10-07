import { redirect } from "next/navigation";
import { getSessionStaff } from "@/lib/pos-auth";
import { PosOrderClient } from "./PosOrderClient";

export default async function PosNewOrderPage() {
  const staff = await getSessionStaff();
  if (!staff) redirect("/pos/login");
  return <PosOrderClient staff={{ name: staff.name, role: staff.role, code: staff.code }} />;
}
