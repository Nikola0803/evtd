import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/lib/products";
import { getLiveProducts, mergeProducts } from "@/lib/product-feed";
import { ProductClient } from "./ProductClient";

const DOSAGE_PATTERN = /\s\d+(?:\.\d+)?\s?(?:mg|mcg|iu|g)(?:\/\d+(?:\.\d+)?\s?(?:mg|mcg|iu|g))?$/i;

function publicName(name: string) {
  return name.replace(DOSAGE_PATTERN, "").trim();
}

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

async function resolveProduct(slug: string) {
  const live = await getLiveProducts();
  return mergeProducts(getProducts(), live).find((product) => product.slug === slug) ?? getProductBySlug(slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await resolveProduct(slug);
  if (!product) return {};
  const title = publicName(product.name);

  return {
    title: `${title} educational overview`,
    description: `A plain-language educational overview of ${title}, designed to help you prepare questions for a qualified professional.`,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      type: "website",
      title: `${title} educational overview`,
      description: `Clear educational context about ${title}.`,
      images: [{ url: "/images/brand/molecular-sculpture.png", width: 800, height: 800, alt: `Abstract wellness artwork for ${title}` }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await resolveProduct(slug);
  if (!product) notFound();
  const title = publicName(product.name);

  return (
    <>
      <div className="mx-auto max-w-[1400px] px-4 pb-4 pt-8 md:px-8 md:pt-10">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-charcoal/50">
          <Link href="/" className="transition hover:text-charcoal">Home</Link>
          <i className="ri-arrow-right-s-line" />
          <Link href="/shop" className="transition hover:text-charcoal">Education library</Link>
          <i className="ri-arrow-right-s-line" />
          <span className="font-medium text-charcoal">{title}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-8 md:py-16">
        <ProductClient product={product} />
      </div>
    </>
  );
}
