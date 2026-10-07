import { redirect } from "next/navigation";
import { getSessionStaff } from "@/lib/pos-auth";

export default async function PosRoot() {
  const staff = await getSessionStaff();
  if (!staff) redirect("/pos/login");
  redirect("/pos/new-order");
}
