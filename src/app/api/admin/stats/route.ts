import { NextResponse } from "next/server";
import { getSessionStaff } from "@/lib/pos-auth";
import { isWooCommerceConfigured, getWooStats, listWooOrders } from "@/lib/woocommerce";

export const runtime = "nodejs";

export async function GET() {
  const staff = await getSessionStaff();
  if (!staff || staff.role === "setter") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isWooCommerceConfigured()) {
    return NextResponse.json({ configured: false, total_orders: 0, total_revenue: "0", recent_orders: [] });
  }

  const [stats, recentResult] = await Promise.all([
    getWooStats(),
    listWooOrders({ page: 1, per_page: 10 }),
  ]);

  return NextResponse.json({
    configured: true,
    ...stats,
    recent_orders: recentResult.orders,
  });
}
