import { Link, useParams } from 'react-router-dom';
import Container from '@/components/base/Container';
import Button from '@/components/base/Button';
import Reveal from '@/components/base/Reveal';
import { articles } from '@/mocks/learn';
import { articleBodies } from '@/mocks/articleBodies';
import { CTA_LABEL, CTA_MICROCOPY } from '@/constants/site';
import { usePageMeta } from '@/hooks/usePageMeta';

interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

interface ArticleBody {
  intro: string;
  sections: ArticleSection[];
  takeaways: string[];
  references: string[];
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);
  const bodyMap = articleBodies as Record<string, ArticleBody>;
  const body = article ? bodyMap[article.slug] : undefined;

  usePageMeta({
    title: article ? `${article.title} | EVOLV Today Learning Center` : 'Learning Center | EVOLV Today',
    description: article ? article.excerpt : undefined,
    canonicalPath: article ? `/learn/${article.slug}` : '/learn',
  });

  if (!article || !body) {
    return (
      <Container className="py-32 text-center md:py-40">
        <h1 className="font-heading text-2xl text-foreground-950">Article not found</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-foreground-600">
          We could not find that article. Browse the learning center for available topics.
        </p>
        <div className="mt-7 flex justify-center">
          <Button to="/learn" variant="primary" size="md">
            Visit the learning center
          </Button>
        </div>
      </Container>
    );
  }

  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article>
        <section className="bg-background-100">
          <Container className="pb-12 pt-28 md:pb-16 md:pt-36">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-[0.75rem] text-foreground-600">
                <li className="flex items-center gap-2">
                  <Link to="/" className="transition-colors duration-200 hover:text-primary-700">
                    Home
                  </Link>
                  <i className="ri-arrow-right-s-line text-sm leading-none text-foreground-400" aria-hidden="true"></i>
                </li>
                <li className="flex items-center gap-2">
                  <Link to="/learn" className="transition-colors duration-200 hover:text-primary-700">
                    Learn
                  </Link>
                  <i className="ri-arrow-right-s-line text-sm leading-none text-foreground-400" aria-hidden="true"></i>
                </li>
                <li className="text-foreground-800">{article.category}</li>
              </ol>
            </nav>

            <span className="font-label text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary-700">
              {article.category}
            </span>
            <h1 className="mt-4 max-w-3xl font-heading text-[2rem] leading-[1.1] tracking-[-0.015em] text-foreground-950 md:text-[2.8rem]">
              {article.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.78rem] text-foreground-600">
              <span className="inline-flex items-center gap-1.5">
                <i className="ri-time-line text-sm leading-none" aria-hidden="true"></i>
                {article.readTime}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <i className="ri-user-star-line text-sm leading-none" aria-hidden="true"></i>
                {article.reviewer}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <i className="ri-calendar-line text-sm leading-none" aria-hidden="true"></i>
                {article.updated}
              </span>
            </div>

            <div className="relative mt-10 h-64 w-full overflow-hidden rounded-2xl bg-background-300 md:h-[26rem]">
              <img
                src={article.image}
                alt={article.title}
                title={`${article.title} — EVOLV Today`}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </Container>
        </section>

        <section className="bg-background-50 py-14 md:py-20">
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
              <div className="max-w-2xl">
                <p className="font-heading text-[1.15rem] leading-relaxed text-foreground-900">{body.intro}</p>

                {body.sections.map((section) => (
                  <div key={section.heading} className="mt-10">
                    <h2 className="font-heading text-xl leading-snug text-foreground-950 md:text-2xl">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4 text-[0.95rem] leading-relaxed text-foreground-700">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="mt-12 rounded-2xl border border-background-200 bg-background-100 p-6">
                  <h2 className="font-heading text-lg text-foreground-950">Key takeaways</h2>
                  <ul className="mt-4 space-y-3">
                    {body.takeaways.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.9rem] text-foreground-800">
                        <i className="ri-check-line mt-1 text-base leading-none text-primary-600" aria-hidden="true"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10">
                  <h2 className="font-label text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-foreground-600">
                    References
                  </h2>
                  <ul className="mt-4 space-y-2.5 text-[0.85rem] text-foreground-600">
                    {body.references.map((reference) => (
                      <li key={reference} className="flex items-start gap-3">
                        <i className="ri-file-text-line mt-0.5 text-base leading-none text-foreground-500" aria-hidden="true"></i>
                        {reference}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-8 border-t border-background-200 pt-6 text-[0.78rem] leading-relaxed text-foreground-600">
                  This article is educational and is not medical advice. Compounded medications are not
                  FDA-approved. A licensed clinician determines whether a prescribed treatment is appropriate
                  for each patient. {article.reviewer}. {article.updated}.
                </p>
              </div>

              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-2xl border border-background-200 bg-background-100 p-6">
                  <h2 className="font-heading text-lg text-foreground-950">Ready to begin?</h2>
                  <p className="mt-2 text-[0.86rem] leading-relaxed text-foreground-700">
                    Complete your private assessment and a licensed clinician will review it independently.
                  </p>
                  <div className="mt-5">
                    <Button to="/assessment" variant="primary" size="md" fullWidth iconAfter="ri-arrow-right-line">
                      {CTA_LABEL}
                    </Button>
                  </div>
                  <p className="mt-3 text-[0.72rem] leading-relaxed text-foreground-600">{CTA_MICROCOPY}</p>
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </article>

      <section className="bg-background-100 py-14 md:py-20">
        <Container>
          <h2 className="font-heading text-[1.5rem] leading-tight text-foreground-950 md:text-[1.9rem]">
            Continue reading
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.id} delay={index * 60}>
                <Link
                  to={`/learn/${item.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-background-200 bg-background-50 transition-colors duration-300 hover:border-primary-300"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-background-300">
                    <img
                      src={item.image}
                      alt={item.title}
                      title={`${item.title} — EVOLV Today`}
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="font-label text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-primary-700">
                      {item.category}
                    </span>
                    <h3 className="mt-2.5 font-heading text-base leading-snug text-foreground-950">
                      {item.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-label text-[0.76rem] font-medium text-primary-700">
                      Read article
                      <i className="ri-arrow-right-line text-sm leading-none transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true"></i>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}