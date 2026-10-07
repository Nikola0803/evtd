import { Link } from 'react-router-dom';
import type { Program } from '@/types/content';

interface TreatmentTileProps {
  program: Program;
}

const goalIcons: Record<string, string> = {
  'sleep-recovery': 'ri-moon-clear-line',
  'energy-longevity': 'ri-flashlight-line',
  'body-composition': 'ri-body-scan-line',
  'skin-hair': 'ri-sparkling-2-line',
  'sexual-wellness': 'ri-heart-2-line',
};

export default function TreatmentTile({ program }: TreatmentTileProps) {
  return (
    <article
      data-product-shop
      className="group flex h-full flex-col rounded-2xl border border-background-200 bg-background-50 p-3.5 transition-colors duration-300 hover:border-primary-300"
    >
      <div className="flex items-center gap-2 font-label text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-foreground-700">
        <span className="flex h-Xor w-6 items-center justify-center rounded-full bg-secondary-100 text-primary-700">
          <i
            className={`${goalIcons[program.goalId] ?? 'ri-leaf-line'} text-xs leading-none`}
            aria-hidden="true"
          ></i>
        </span>
        {program.goalLabel}
      </div>

      <Link
        to={`/treatments/${program.slug}`}
        className="relative mt-3 block h-36 w-full overflow-hidden rounded-xl bg-secondary-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        aria-label={`Learn more about ${program.name}`}
      >
        <img
          src={program.image}
          alt={`${program.name} — ${program.purpose}`}
          title={`${program.name} prescription treatment`}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {program.priceFrom ? (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-primary-500 px-2.5 py-1 font-label text-[0.7rem] font-bold text-background-50">
            ${program.priceFrom}
          </span>
        ) : (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-foreground-950/85 px-2.5 py-1 font-label text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-background-50">
            Personalized
          </span>
        )}
      </Link>

      <h3 className="mt-3 font-heading text-[1rem] leading-snug tracking-[-0.005em] text-foreground-950">
        <Link to={`/treatments/${program.slug}`} className="transition-colors duration-200 hover:text-primary-700">
          {program.name}
        </Link>
      </h3>
      <p className="mt-1 line-clamp-2 text-[0.76rem] leading-snug text-foreground-600">{program.purpose}</p>

      <div className="mt-auto pt-3.5">
        <Link
          to={`/assessment?program=${program.slug}`}
          className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-foreground-950/12 px-3 py-2 font-label text-[0.76rem] font-semibold text-foreground-950 transition-colors duration-200 hover:border-primary-500 hover:bg-primary-500 hover:text-background-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        >
          See if I qualify
        </Link>
      </div>
    </article>
  );
}
