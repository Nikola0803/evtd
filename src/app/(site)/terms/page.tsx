import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | evolv",
  description: "The terms that govern use of the evolv website and purchase of evolv products.",
};

export default function TermsPage() {
  return (
    <>
      <section className="-mt-[90px] bg-charcoal pb-16 pt-[150px] text-center text-white md:-mt-[100px] md:pb-24 md:pt-[170px]">
        <div className="mx-auto max-w-[800px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Legal</p>
          <h1 className="font-display text-3xl font-semibold uppercase leading-tight md:text-5xl">Terms &amp; Conditions</h1>
          <p className="mt-4 text-sm text-white/50">Effective Date: August 2026</p>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-[800px] px-4 md:px-8">
          <p className="mb-12 text-base leading-relaxed text-soft-gray">
            These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the evolv website and
            related services. By accessing or using this website, you agree to be bound by these Terms. If you do
            not agree, please do not use the website.
          </p>

          <div className="space-y-12">
            <PolicySection num="1" title="About evolv">
              <p>
                evolv (&ldquo;evolv,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates as a
                wellness education platform. We provide plain-language learning resources about peptide science,
                hormone health, longevity, and related wellness topics.
              </p>
            </PolicySection>

            <PolicySection num="2" title="Eligibility & Use of Website">
              <p>
                By using this website, you confirm that you are legally permitted to access and use this site in
                your jurisdiction, you are acting in a professional or research-related capacity, and you will not
                use the website or its content for unlawful or unauthorized purposes. evolv reserves the right to
                restrict access at its discretion.
              </p>
            </PolicySection>

            <PolicySection num="3" title="Educational Information">
              <p>
                Our content is educational and is not medical advice, diagnosis, treatment, or a substitute for
                professional care. We do not prescribe, recommend doses, or create treatment plans. Information may
                change as research develops.
              </p>
            </PolicySection>

            <PolicySection num="4" title="Programs & Availability">
              <p>
                Education programs, calls, memberships, and resources are subject to availability. We may update,
                pause, or discontinue an offering when needed.
              </p>
            </PolicySection>

            <PolicySection num="5" title="Pricing & Payments">
              <p>
                Prices for paid education programs or memberships are shown before purchase and may change with
                notice. Payments are processed through secure third-party providers. evolv does not store full
                payment card details. The first education call is free.
              </p>
            </PolicySection>

            <PolicySection num="6" title="Intellectual Property">
              <p>
                All website content, including text, design, logos, graphics, and documentation, is the intellectual
                property of evolv or its licensors. Content may not be copied, reproduced, distributed, or modified
                without prior written permission.
              </p>
            </PolicySection>

            <PolicySection num="7" title="Limitation of Liability">
              <p>
                To the fullest extent permitted by law, evolv shall not be liable for any direct, indirect,
                incidental, or consequential damages arising from use or inability to use the website or reliance on
                educational information provided on the website. All use is at your own risk.
              </p>
            </PolicySection>

            <PolicySection num="8" title="Third-Party Links">
              <p>
                The website may include links to third-party sites. evolv is not responsible for the content,
                accuracy, or practices of external websites.
              </p>
            </PolicySection>

            <PolicySection num="9" title="Governing Law">
              <p>
                These Terms shall be governed by and construed in accordance with the laws applicable in the
                jurisdiction where evolv operates, without regard to conflict of law principles.
              </p>
            </PolicySection>

            <PolicySection num="10" title="Changes to These Terms">
              <p>
                evolv may update these Terms from time to time. Changes will be posted on this page with an updated
                effective date. Continued use of the website constitutes acceptance of the revised Terms.
              </p>
            </PolicySection>

            <PolicySection num="11" title="SMS and Text Message Program">
              <p>
                If you opt in to our SMS program you agree to receive recurring marketing text messages from evolv at
                the number you provide, including messages sent by autodialer. Consent is not a condition of
                purchase. Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe at
                any time, or HELP for help. Mobile carriers are not liable for delayed or undelivered messages. How
                we collect, record and retain SMS consent, and how we handle phone numbers, is described in our{" "}
                <Link href="/privacy" className="font-semibold text-copper hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </PolicySection>

            <PolicySection num="12" title="Contact Information">
              <p>
                evolv. Questions about these Terms can be sent through our{" "}
                <Link href="/contact" className="font-semibold text-copper hover:underline">
                  Contact page
                </Link>
                .
              </p>
            </PolicySection>
          </div>

          <div className="mt-16 border-t border-stone pt-8">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-charcoal/40">Related Legal Documents</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link href="/privacy" className="text-charcoal/60 transition hover:text-charcoal">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PolicySection({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="flex items-baseline gap-2 font-display text-xl font-semibold text-charcoal">
        <span className="text-copper">{num}.</span> {title}
      </h2>
      <div className="mt-3 text-base leading-relaxed text-soft-gray">{children}</div>
    </div>
  );
}
