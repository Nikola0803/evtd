import Container from '@/components/base/Container';
import SectionHeading from '@/components/base/SectionHeading';
import Reveal from '@/components/base/Reveal';
import GoalCard from '@/components/feature/GoalCard';
import { goals } from '@/mocks/goals';

interface GoalSelectorProps {
  activeGoal: string | null;
  onSelect: (goalId: string) => void;
}

export default function GoalSelector({ activeGoal, onSelect }: GoalSelectorProps) {
  return (
    <section id="goals" className="bg-foreground-950 py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="light"
            eyebrow="Start with your goal"
            title="What matters most to you right now?"
            description="Select a wellness goal and we’ll match you with the right consultation focus and, where appropriate, a personalized care plan."
          />
          <p className="max-w-xs text-sm leading-relaxed text-secondary-300 lg:text-right">
            Every plan begins with a free 15-minute conversation with a licensed clinician.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {goals.map((goal, index) => (
            <Reveal key={goal.id} delay={index * 70}>
              <GoalCard goal={goal} active={activeGoal === goal.id} onSelect={onSelect} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
