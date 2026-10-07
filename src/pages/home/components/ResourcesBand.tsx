import { Link } from 'react-router-dom';
import Container from '@/components/base/Container';
import Reveal from '@/components/base/Reveal';
import { articles } from '@/mocks/learn';

export default function ResourcesBand() {
  const featured = articles.slice(0, 3);

  return (
    <section className="bg-foreground-950 py-20 md:py-28">
      <Container>
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center gap-3 font-label text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary-300">
            <span className="h-px w-6 bg-primary-400"></span>
            Resources
            <span className="h-px w-6 bg-primary-400"></span>
          </div>
          <h2 className="mx-auto max-w-2xl font-heading text-[1.75rem] leading-[1.12] tracking-[-0.02em] text-background-50 md:text-[2.4rem]">
            No hype. Just clear education.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-secondary-200">
            Plainly written articles reviewed before they are published — so you can understand your options
            and decide with confidence.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {featured.map((article, index) => (
            <Reveal key={article.id} delay={index * 70}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-background-50 transition-colors duration-300">
                <div className="relative h-44 w-full overflow-hidden bg-background-200">
                  <img
                    src={article.image}
                    alt={article.title}
                    title={`${article.title} — EVOLV Today`}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <span className="font-label text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-primary-700">
                    {article.category}
                  </span>
                  <h3 className="mt-2.5 font-heading text-lg leading-snug text-foreground-950">
                    <Link
                      to={`/learn/${article.slug}`}
                      className="transition-colors duration-200 hover:text-primary-700"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-2.5 flex-1 text-[0.84rem] leading-relaxed text-foreground-700">
                    {article.excerpt}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-background-200 pt-4 text-[0.72rem] text-foreground-500">
                    <span className="inline-flex items-center gap-1.5">
                      <i className="ri-time-line text-sm leading-none" aria-hidden="true"></i>
                      {article.readTime}
                    </span>
                    <span>{article.updated}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary-500 px-6 py-3 font-label text-sm font-semibold text-background-50 transition-colors duration-200 hover:bg-primary-600"
          >
            View all articles
            <i className="ri-arrow-right-line text-base leading-none" aria-hidden="true"></i>
          </Link>
        </div>
      </Container>
    </section>
  );
}