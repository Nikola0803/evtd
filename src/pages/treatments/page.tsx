import { useMemo, useState } from 'react';
import PageHero from '@/components/feature/PageHero';
import Container from '@/components/base/Container';
import Button from '@/components/base/Button';
import Reveal from '@/components/base/Reveal';
import ProgramCard from '@/components/feature/ProgramCard';
import { programs } from '@/mocks/programs';
import { goals } from '@/mocks/goals';
import { states, formatOptions } from '@/mocks/states';
import { CTA_LABEL, CTA_MICROCOPY } from '@/constants/site';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function Treatments() {
  usePageMeta({
    title: 'Treatments | EVOLV Today Physician-Guided Telehealth',
    description:
      'Browse clinician-guided telehealth treatments by goal, format and starting price. Prescribed online only when a licensed clinician determines treatment is appropriate.',
    canonicalPath: '/treatments',
  });

  const [goalFilter, setGoalFilter] = useState('all');
  const [formatFilter, setFormatFilter] = useState('all');
  const [sort, setSort] = useState('relevance');
  const [stateCode, setStateCode] = useState('TX');
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = programs.filter((program) => {
      const matchGoal = goalFilter === 'all' || program.goalId === goalFilter;
      const matchFormat = formatFilter === 'all' || program.formatGroup === formatFilter;
      const matchQuery =
        !q ||
        program.name.toLowerCase().includes(q) ||
        program.purpose.toLowerCase().includes(q) ||
        program.goalLabel.toLowerCase().includes(q);
      return matchGoal && matchFormat && matchQuery;
    });

    if (sort === 'price-asc') {
      return [...list].sort((a, b) => (a.priceFrom ?? 99999) - (b.priceFrom ?? 99999));
    }
    if (sort === 'price-desc') {
      return [...list].sort((a, b) => (b.priceFrom ?? -1) - (a.priceFrom ?? -1));
    }
    return list;
  }, [goalFilter, formatFilter, sort, query]);

  const selectedState = states.find((item) => item.code === stateCode);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Treatments' }]}
        eyebrow="Treatment discovery"
        title="Treatments built around how you want to feel."
        description="Browse clinician-guided programs by goal, format and starting price. Every program begins with an independent clinical evaluation, and treatment is prescribed only when medically appropriate."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button to="/assessment" variant="primary" size="lg" iconAfter="ri-arrow-right-line">
            {CTA_LABEL}
          </Button>
          <p className="font-label text-[0.76rem] uppercase tracking-[0.1em] text-foreground-600">
            {CTA_MICROCOPY}
          </p>
        </div>
      </PageHero>

      <section className="bg-background-50 pb-20 pt-10 md:pb-28">
        <Container>
          <div className="rounded-2xl border border-background-200 bg-background-100 p-5 md:p-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
              <div>
                <label htmlFor="treatment-search" className="font-label text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-foreground-600">
                  Search programs
                </label>
                <div className="mt-2 flex items-center gap-2 rounded-md border border-foreground-950/12 bg-background-50 px-3 py-2.5 focus-within:border-primary-400">
                  <i className="ri-search-line text-base leading-none text-foreground-500" aria-hidden="true"></i>
                  <input
                    id="treatment-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by name, goal or purpose"
                    className="w-full bg-transparent text-sm text-foreground-950 outline-none placeholder:text-foreground-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="treatment-format" className="font-label text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-foreground-600">
                  Administration format
                </label>
                <select
                  id="treatment-format"
                  value={formatFilter}
                  onChange={(event) => setFormatFilter(event.target.value)}
                  className="mt-2 w-full appearance-none rounded-md border border-foreground-950/12 bg-background-50 px-3 py-2.5 text-sm text-foreground-950 outline-none focus:border-primary-400"
                >
                  <option value="all">All formats</option>
                  {formatOptions.map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="treatment-sort" className="font-label text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-foreground-600">
                  Sort by
                </label>
                <select
                  id="treatment-sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="mt-2 w-full appearance-none rounded-md border border-foreground-950/12 bg-background-50 px-3 py-2.5 text-sm text-foreground-950 outline-none focus:border-primary-400"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Starting price: low to high</option>
                  <option value="price-desc">Starting price: high to low</option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-background-200 pt-5">
              <button
                type="button"
                onClick={() => setGoalFilter('all')}
                aria-pressed={goalFilter === 'all'}
                className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 font-label text-[0.75rem] font-medium transition-colors duration-200 cursor-pointer ${
                  goalFilter === 'all'
                    ? 'border-primary-500 bg-primary-500 text-background-50'
                    : 'border-foreground-950/12 text-foreground-800 hover:border-primary-400'
                }`}
              >
                All goals
              </button>
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => setGoalFilter(goal.id)}
                  aria-pressed={goalFilter === goal.id}
                  className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 font-label text-[0.75rem] font-medium transition-colors duration-200 cursor-pointer ${
                    goalFilter === goal.id
                      ? 'border-primary-500 bg-primary-500 text-background-50'
                      : 'border-foreground-950/12 text-foreground-800 hover:border-primary-400'
                  }`}
                >
                  {goal.title}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-sm text-foreground-700">
              <span className="font-semibold text-foreground-950">{results.length}</span>{' '}
              {results.length === 1 ? 'program' : 'programs'} shown
            </p>
            <div className="sm:text-right">
              <label htmlFor="treatment-state" className="mr-2 font-label text-[0.72rem] uppercase tracking-[0.1em] text-foreground-600">
                Your state
              </label>
              <select
                id="treatment-state"
                value={stateCode}
                onChange={(event) => setStateCode(event.target.value)}
                className="appearance-none rounded-md border border-foreground-950/12 bg-background-50 px-3 py-2 text-sm text-foreground-950 outline-none focus:border-primary-400"
              >
                {states.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedState?.status === 'limited' ? (
            <p className="mt-3 rounded-md bg-secondary-100 px-4 py-3 text-[0.82rem] text-secondary-900">
              Availability in {selectedState.name} may be limited for some programs. Your clinician and
              pharmacy options are confirmed during the assessment.
            </p>
          ) : (
            <p className="mt-3 text-[0.82rem] text-foreground-600">
              Programs shown are generally available in {selectedState?.name}. Final availability is confirmed
              by a licensed clinician and licensed pharmacy before any prescription.
            </p>
          )}

          {results.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((program, index) => (
                <Reveal key={program.id} delay={index * 60}>
                  <ProgramCard program={program} className="h-full" />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-background-300 bg-background-100 p-10 text-center">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-background-200 text-foreground-700">
                <i className="ri-search-line text-lg leading-none" aria-hidden="true"></i>
              </span>
              <h2 className="mt-4 font-heading text-lg text-foreground-950">No programs match those filters</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-foreground-600">
                Try clearing a filter or searching a different goal. You can also start the assessment and let a
                clinician guide your options.
              </p>
              <button
                type="button"
                onClick={() => {
                  setGoalFilter('all');
                  setFormatFilter('all');
                  setQuery('');
                }}
                className="mt-5 inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-foreground-950/15 px-4 py-2.5 font-label text-sm font-medium text-foreground-900 transition-colors duration-200 hover:border-primary-500 cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          )}

          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex items-start gap-3 rounded-2xl border border-background-200 bg-background-100 p-5">
              <i className="ri-lock-2-line mt-0.5 text-lg leading-none text-primary-600" aria-hidden="true"></i>
              <p className="text-[0.84rem] leading-relaxed text-foreground-700">
                <span className="font-semibold text-foreground-950">Prescription programs.</span> Every program
                listed requires a prescription. A licensed clinician decides whether treatment is appropriate —
                eligibility is never guaranteed.
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-background-200 bg-background-100 p-5">
              <i className="ri-information-line mt-0.5 text-lg leading-none text-primary-600" aria-hidden="true"></i>
              <p className="text-[0.84rem] leading-relaxed text-foreground-700">
                <span className="font-semibold text-foreground-950">Nonprescription items.</span> If any
                nonprescription supplies are offered, they are labeled separately and never presented as
                prescription treatment.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}