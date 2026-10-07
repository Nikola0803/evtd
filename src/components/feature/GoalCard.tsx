import type { Goal } from '@/types/content';

interface GoalCardProps {
  goal: Goal;
  active?: boolean;
  onSelect?: (goalId: string) => void;
}

export default function GoalCard({ goal, active = false, onSelect }: GoalCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(goal.id)}
      aria-pressed={active}
      className={`group relative flex h-[22rem] w-full flex-col justify-end overflow-hidden rounded-2xl border text-left transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
        active ? 'border-primary-500' : 'border-background-200 hover:border-primary-300'
      }`}
    >
      <img
        src={goal.image}
        alt={`${goal.title} — ${goal.tagline}`}
        title={`${goal.title} treatment goals`}
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/85 via-foreground-950/35 to-foreground-950/10"></div>

      <div className="relative z-10 p-5">
        <span
          className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 ${
            active ? 'bg-primary-400 text-foreground-950' : 'bg-background-50/15 text-background-50'
          }`}
        >
          <i className={`${goal.icon} text-base leading-none`} aria-hidden="true"></i>
        </span>
        <h3 className="font-heading text-lg leading-tight text-background-50">{goal.title}</h3>
        <p className="mt-2 text-[0.8rem] leading-relaxed text-background-50/80">{goal.tagline}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 font-label text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-secondary-200">
          {active ? 'Showing options' : 'Explore options'}
          <i
            className={`${active ? 'ri-check-line' : 'ri-arrow-right-line'} text-sm leading-none transition-transform duration-300 group-hover:translate-x-0.5`}
            aria-hidden="true"
          ></i>
        </span>
      </div>
    </button>
  );
}