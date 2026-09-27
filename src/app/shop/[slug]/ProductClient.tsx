"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import type { CoaEntry } from "@/lib/coa-data";

const DOSAGE_PATTERN = /\s\d+(?:\.\d+)?\s?(?:mg|mcg|iu|g)(?:\/\d+(?:\.\d+)?\s?(?:mg|mcg|iu|g))?$/i;

function publicName(name: string) {
  return name.replace(DOSAGE_PATTERN, "").trim();
}

export function ProductClient({ product }: { product: Product; coa?: CoaEntry }) {
  const title = publicName(product.name);

  return (
    <section className="grid grid-cols-1 gap-10 pb-20 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
      <div className="aspect-square overflow-hidden rounded-3xl bg-ivory-soft">
        <Image
          src="/images/brand/molecular-sculpture.png"
          alt={`Abstract wellness artwork for ${title}`}
          width={900}
          height={900}
          priority
          className="h-full w-full object-cover"
        />
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">Educational overview</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-charcoal md:text-5xl">{title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-charcoal/65">
          Learn the basic context in plain language. Use this page to prepare questions for a qualified professional.
        </p>

        <div className="mt-8 rounded-2xl border border-stone bg-ivory-soft p-6">
          <h2 className="font-display text-2xl font-semibold text-charcoal">Start with your goals</h2>
          <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
            Tell us what you want to work on and how you would like to feel. Your first call is a free 15-minute conversation. There is no pitch and no obligation.
          </p>
          <Link
            href="/book"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-charcoal px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-ivory transition hover:bg-sage-deep"
          >
            Book your first call <i className="ri-arrow-right-line" />
          </Link>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-charcoal/45">
          Information on this page is educational. It is not medical advice or a promise of results.
        </p>
      </div>
    </section>
  );
}
