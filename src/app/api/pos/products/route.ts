import { NextResponse } from "next/server";
import { getSessionStaff } from "@/lib/pos-auth";
import { isWooCommerceConfigured, searchWooProducts } from "@/lib/woocommerce";
import { getProducts } from "@/lib/products";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const staff = await getSessionStaff();
  if (!staff) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";

  if (isWooCommerceConfigured()) {
    const products = await searchWooProducts(q);
    return NextResponse.json({ source: "woocommerce", products });
  }

  // Fallback: local catalog
  const all = getProducts();
  const lower = q.toLowerCase();
  const filtered = q
    ? all.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.sku.toLowerCase().includes(lower) ||
          p.slug.toLowerCase().includes(lower)
      )
    : all;

  const products = filtered.slice(0, 20).map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    sku: p.sku,
    price: String(p.price),
    stock_status: p.inStock ? "instock" : "outofstock",
    short_description: p.shortDescription,
    categories: [{ id: 0, name: p.categoryLabel }],
  }));

  return NextResponse.json({ source: "local", products });
}
