import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '@/components/feature/PageHero';
import Container from '@/components/base/Container';
import Button from '@/components/base/Button';
import Reveal from '@/components/base/Reveal';
import { articles } from '@/mocks/learn';
import { CTA_LABEL, CTA_MICROCOPY } from '@/constants/site';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function Learn() {
  usePageMeta({
    title: 'Learning Center | EVOLV Today Telehealth',
    description:
      'Plainly written education about clinician-guided care, pharmacy standards, prescriptions and treatment costs from EVOLV Today.',
    canonicalPath: '/learn',
  });

  const [category, setCategory] = useState('all');

  const categories = useMemo(
    () => Array.from(new Set(articles.map((article) => article.category))),
    []
  );

  const visible = category === 'all' ? articles : articles.filter((a) => a.category === category);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Learn' }]}
        eyebrow="Learning center"
        title="Understand your options."
        description="Plainly written education about clinician-guided care, pharmacy standards and what to expect — reviewed before it is published."
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

      <section className="bg-background-50 py-16 md:py-20">
        <Container>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setCategory('all')}
              aria-pressed={category === 'all'}
              className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 font-label text-[0.75rem] font-medium transition-colors duration-200 cursor-pointer ${
                category === 'all'
                  ? 'border-primary-500 bg-primary-500 text-background-50'
                  : 'border-foreground-950/12 text-foreground-800 hover:border-primary-400'
              }`}
            >
              All topics
            </button>
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 font-label text-[0.75rem] font-medium transition-colors duration-200 cursor-pointer ${
                  category === item
                    ? 'border-primary-500 bg-primary-500 text-background-50'
                    : 'border-foreground-950/12 text-foreground-800 hover:border-primary-400'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((article, index) => (
              <Reveal key={article.id} delay={index * 60}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-background-200 bg-background-100 transition-colors duration-300 hover:border-primary-300">
                  <div className="relative h-48 w-full overflow-hidden bg-background-300">
                    <img
                      src={article.image}
                      alt={article.title}
                      title={`${article.title} — EVOLV Today`}
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-label text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-primary-700">
                      {article.category}
                    </span>
                    <h2 className="mt-3 font-heading text-lg leading-snug text-foreground-950">
                      <Link to={`/learn/${article.slug}`} className="transition-colors duration-200 hover:text-primary-700">
                        {article.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-foreground-700">
                      {article.excerpt}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-background-200 pt-4 text-[0.72rem] text-foreground-500">
                      <span className="inline-flex items-center gap-1.5">
                        <i className="ri-time-line text-sm leading-none" aria-hidden="true"></i>
                        {article.readTime}
                      </span>
                      <span>{article.reviewer}</span>
                      <span>{article.updated}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}