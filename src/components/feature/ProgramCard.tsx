import { Link } from 'react-router-dom';
import type { Program } from '@/types/content';

interface ProgramCardProps {
  program: Program;
  className?: string;
}

export default function ProgramCard({ program, className = '' }: ProgramCardProps) {
  return (
    <article
      data-product-shop
      className={`group flex flex-col overflow-hidden rounded-2xl border border-background-200 bg-background-100 transition-colors duration-300 hover:border-primary-300 ${className}`}
    >
      <div className="relative h-52 w-full overflow-hidden bg-background-300">
        <img
          src={program.image}
          alt={`${program.name} — ${program.purpose}`}
          title={`${program.name} prescription treatment`}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background-50/95 px-3 py-1 font-label text-[0.64rem] font-semibold uppercase tracking-[0.1em] text-foreground-800">
          <i className="ri-lock-2-line text-xs leading-none" aria-hidden="true"></i>
          Prescription
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <span className="font-label text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary-700">
          {program.goalLabel}
        </span>
        <h3 className="mt-2 font-heading text-xl leading-snug tracking-[-0.01em] text-foreground-950">
          {program.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground-700">{program.purpose}</p>

        <dl className="mt-5 space-y-2.5 border-t border-background-200 pt-5 text-[0.8rem]">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-foreground-600">Administration</dt>
            <dd className="font-medium text-foreground-900">{program.format}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-foreground-600">Clinician review</dt>
            <dd className="font-medium text-foreground-900">Included</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-foreground-600">Requirement</dt>
            <dd className="font-medium text-foreground-900">Prescription required</dd>
          </div>
        </dl>

        <p className="mt-5 font-heading text-lg text-foreground-950">{program.priceLabel}</p>

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <Link
            to={`/assessment?program=${program.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary-500 px-4 py-2.5 font-label text-sm font-semibold text-background-50 transition-colors duration-200 hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          >
            See if I qualify
          </Link>
          <Link
            to={`/treatments/${program.slug}`}
            className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-foreground-950/15 px-4 py-2.5 font-label text-sm font-semibold text-foreground-900 transition-colors duration-200 hover:border-primary-500 hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          >
            Learn more
            <i className="ri-arrow-right-line text-sm leading-none" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </article>
  );
}