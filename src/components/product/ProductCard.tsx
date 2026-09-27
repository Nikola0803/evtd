"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

const DOSAGE_PATTERN = /\s\d+(?:\.\d+)?\s?(?:mg|mcg|iu|g)(?:\/\d+(?:\.\d+)?\s?(?:mg|mcg|iu|g))?$/i;

function publicName(name: string) {
  return name.replace(DOSAGE_PATTERN, "").trim();
}

export function ProductCard({ product }: { product: Product }) {
  const title = publicName(product.name);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-ivory-soft p-5 transition hover:bg-stone/40">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep">Educational overview</p>

      <Link href={`/shop/${product.slug}`} className="mt-3 font-display text-xl font-semibold tracking-tight text-charcoal transition hover:opacity-60">
        {title}
      </Link>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-soft-gray">
        A plain-language overview to help you understand the topic and prepare questions for a qualified professional.
      </p>

      <Link href={`/shop/${product.slug}`} className="relative mx-auto my-5 block aspect-square w-[72%] overflow-hidden rounded-2xl">
        <Image
          src="/images/brand/molecular-sculpture.png"
          alt={`Abstract wellness artwork for ${title}`}
          width={500}
          height={500}
          sizes="(max-width: 768px) 45vw, 320px"
          className="h-full w-full object-cover"
        />
      </Link>

      <Link
        href={`/shop/${product.slug}`}
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-full border border-charcoal bg-white py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal transition hover:bg-charcoal hover:text-ivory"
      >
        Read overview <i className="ri-arrow-right-line" />
      </Link>
    </article>
  );
}
