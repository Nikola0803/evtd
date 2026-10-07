import { Link } from 'react-router-dom';
import Container from '@/components/base/Container';
import SectionHeading from '@/components/base/SectionHeading';
import Accordion from '@/components/base/Accordion';
import { faqs, homeFaqIds } from '@/mocks/faqs';
import { faqImage } from '@/mocks/homeContent';

export default function FaqSection() {
  const items = faqs
    .filter((faq) => homeFaqIds.includes(faq.id))
    .map((faq) => ({ id: faq.id, question: faq.question, answer: faq.answer }));

  return (
    <section className="bg-background-50 py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Questions"
              title="Answers before you decide."
              description="If you are unsure about anything, EVOLV Support can help — no account required."
            />
            <div className="mt-9">
              <Accordion items={items} defaultOpenId={items[0]?.id} />
            </div>
            <Link
              to="/faq"
              className="mt-8 inline-flex items-center gap-2 whitespace-nowrap font-label text-sm font-medium text-primary-700 transition-colors duration-200 hover:text-primary-600"
            >
              Read all frequently asked questions
              <i className="ri-arrow-right-line text-base leading-none" aria-hidden="true"></i>
            </Link>
          </div>

          <div className="relative hidden h-full min-h-[28rem] w-full overflow-hidden rounded-2xl bg-background-300 lg:block">
            <img
              src={faqImage}
              alt="An adult relaxing at home while reading about their care options"
              title="EVOLV Today patient questions"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-xl bg-background-50/95 p-5 backdrop-blur-sm">
              <p className="flex items-center gap-2 font-label text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-primary-700">
                <i className="ri-customer-service-2-line text-sm leading-none" aria-hidden="true"></i>
                EVOLV Support
              </p>
              <p className="mt-2 text-[0.84rem] leading-relaxed text-foreground-700">
                Real people, no account required. We can help with accounts, billing and delivery.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}