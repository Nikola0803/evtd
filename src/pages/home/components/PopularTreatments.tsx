import { Link } from 'react-router-dom';
import Container from '@/components/base/Container';
import SectionHeading from '@/components/base/SectionHeading';
import Reveal from '@/components/base/Reveal';
import TreatmentTile from '@/components/feature/TreatmentTile';
import { programs } from '@/mocks/programs';
import { goals } from '@/mocks/goals';

interface PopularTreatmentsProps {
  activeGoal: string | null;
  onSelectGoal: (goalId: string) => void;
  onClearGoal: () => void;
}

export default function PopularTreatments({
  activeGoal,
  onSelectGoal,
  onClearGoal,
}: PopularTreatmentsProps) {
  const activeGoalLabel = goals.find((g) => g.id === activeGoal)?.title;
  const visible = activeGoal ? programs.filter((p) => p.goalId === activeGoal) : programs;

  return (
    <section id="programs" className="bg-secondary-50 py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Popular treatments"
            title="Focused treatments. Thoughtful care."
            description="Every program begins with an independent clinical evaluation. Treatment is prescribed only when medically appropriate."
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onClearGoal}
              aria-pressed={!activeGoal}
              className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 font-label text-[0.74rem] font-medium transition-colors duration-200 cursor-pointer ${
                !activeGoal
                  ? 'border-primary-500 bg-primary-500 text-background-50'
                  : 'border-foreground-950/12 text-foreground-800 hover:border-primary-400'
              }`}
            >
              All
            </button>
            {goals.map((goal) => (
              <button
                key={goal.id}
                type="button"
                onClick={() => onSelectGoal(goal.id)}
                aria-pressed={activeGoal === goal.id}
                className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 font-label text-[0.74rem] font-medium transition-colors duration-200 cursor-pointer ${
                  activeGoal === goal.id
                    ? 'border-primary-500 bg-primary-500 text-background-50'
                    : 'border-foreground-950/12 text-foreground-800 hover:border-primary-400'
                }`}
              >
                {goal.title}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-7 text-sm text-foreground-600">
          {activeGoal
            ? `Showing ${visible.length} ${visible.length === 1 ? 'option' : 'options'} for ${activeGoalLabel}.`
            : 'Every program includes a licensed clinician review. Prescription required.'}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((program, index) => (
            <Reveal key={program.id} delay={index * 45}>
              <TreatmentTile program={program} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/treatments"
            className="inline-flex items-center gap-2 whitespace-nowrap font-label text-sm font-semibold text-primary-700 transition-colors duration-200 hover:text-primary-600"
          >
            View all treatment options
            <i className="ri-arrow-right-line text-base leading-none" aria-hidden="true"></i>
          </Link>
        </div>
      </Container>
    </section>
  );
}