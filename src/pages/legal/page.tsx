import { Link, useParams } from 'react-router-dom';
import PageHero from '@/components/feature/PageHero';
import Container from '@/components/base/Container';
import Button from '@/components/base/Button';
import { legalDocuments } from '@/mocks/legal';
import { usePageMeta } from '@/hooks/usePageMeta';

interface LegalDoc {
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
}

const legalLinks = [
  { label: 'Privacy Policy', slug: 'privacy' },
  { label: 'HIPAA Notice', slug: 'hipaa' },
  { label: 'Terms', slug: 'terms' },
  { label: 'Telehealth Consent', slug: 'telehealth-consent' },
  { label: 'Subscription Policy', slug: 'subscription-policy' },
  { label: 'Accessibility', slug: 'accessibility' },
];

export default function Legal() {
  const { slug } = useParams();
  const docs = legalDocuments as Record<string, LegalDoc>;
  const doc = slug ? docs[slug] : undefined;

  usePageMeta({
    title: doc ? `${doc.title} | EVOLV Today` : 'Legal | EVOLV Today',
    description: doc ? doc.intro.slice(0, 155) : undefined,
    canonicalPath: doc ? `/legal/${slug}` : '/legal/privacy',
  });

  if (!doc) {
    return (
      <Container className="py-32 text-center md:py-40">
        <h1 className="font-heading text-2xl text-foreground-950">Document not found</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-foreground-600">
          We could not find that legal document. Choose one from the list below.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {legalLinks.map((link) => (
            <Button key={link.slug} to={`/legal/${link.slug}`} variant="outline" size="sm">
              {link.label}
            </Button>
          ))}
        </div>
      </Container>
    );
  }

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: doc.title }]}
        title={doc.title}
        description={doc.updated}
      />

      <section className="bg-background-50 py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_16rem] lg:gap-16">
            <div className="max-w-2xl">
              <p className="rounded-md bg-background-100 px-5 py-4 text-[0.86rem] leading-relaxed text-foreground-700">
                {doc.intro}
              </p>

              {doc.sections.map((section) => (
                <div key={section.heading} className="mt-10">
                  <h2 className="font-heading text-xl leading-snug text-foreground-950 md:text-2xl">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-[0.92rem] leading-relaxed text-foreground-700">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}

              <p className="mt-12 border-t border-background-200 pt-6 text-[0.78rem] leading-relaxed text-foreground-600">
                This document is an editable placeholder and does not constitute legal advice. Compounded
                medications are not FDA-approved. A licensed clinician determines whether a prescribed
                treatment is appropriate for each patient.
              </p>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-label text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-foreground-600">
                Legal documents
              </h2>
              <ul className="mt-4 space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.slug}>
                    <Link
                      to={`/legal/${link.slug}`}
                      className={`text-[0.86rem] transition-colors duration-200 hover:text-primary-700 ${
                        link.slug === slug ? 'font-medium text-primary-700' : 'text-foreground-700'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}