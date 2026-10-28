import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalArticleBySlug, getJournalArticles } from "@/lib/journal-data";

const SITE_URL = "https://evlvtoday.com";

export function generateStaticParams() {
  return getJournalArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getJournalArticleBySlug(slug);
  if (!article) return {};
  const url = `${SITE_URL}/blog/${article.slug}`;
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: { type: "article", url, title: article.title, description: article.excerpt, publishedTime: article.publishedDate, images: [{ url: `${SITE_URL}${article.image}`, width: 1200, height: 1200, alt: article.title }] },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images: [`${SITE_URL}${article.image}`] },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getJournalArticleBySlug(slug);
  if (!article) notFound();
  const more = getJournalArticles().filter((item) => item.slug !== slug).slice(0, 3);
  const url = `${SITE_URL}/blog/${article.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt,
    image: [`${SITE_URL}${article.image}`], datePublished: article.publishedDate, dateModified: article.publishedDate,
    author: { "@type": "Organization", name: "EVLV" }, publisher: { "@type": "Organization", name: "EVLV", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo/evlv-logo-light.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };

  return (
    <main className="bg-[#FAF2E4] text-[#1B1D19]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article>
        <header className="px-4 pb-12 pt-10 md:px-8 md:pb-16 md:pt-16">
          <div className="mx-auto max-w-[980px] text-center">
            <nav className="mb-8 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#1B1D19]/45">
              <Link href="/" className="hover:text-[#1B1D19]">Home</Link><i className="ri-arrow-right-s-line" /><Link href="/blog" className="hover:text-[#1B1D19]">Blog</Link>
            </nav>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B45C42]">{article.label}</p>
            <h1 className="mx-auto mt-4 max-w-[900px] font-display text-4xl font-semibold leading-[1.02] tracking-[-.04em] md:text-6xl">{article.title}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#62675F] md:text-lg">{article.excerpt}</p>
            <div className="mt-5 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.12em] text-[#1B1D19]/40">
              <time dateTime={article.publishedDate}>{new Date(article.publishedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time><span>·</span><span>{article.readTime}</span>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1180px] px-4 md:px-8">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-[#E3D4C0] md:aspect-[16/10]">
            <Image src={article.image} alt={article.title} fill priority sizes="(max-width: 768px) 100vw, 1180px" className="object-cover object-center" />
          </div>
        </div>

        <div className="mx-auto max-w-[760px] px-4 py-14 md:px-8 md:py-20">
          <div className="space-y-7 text-base leading-[1.85] text-[#3F433E] md:text-lg">
            {article.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
          {article.cta && <Link href={article.cta.href} className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#D77E5F] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">{article.cta.label}<i className="ri-arrow-right-line" /></Link>}
          <div className="mt-12 rounded-2xl border border-[#D77E5F]/25 bg-[#F6E3DA] p-6 text-sm leading-relaxed text-[#6F4639]">
            <strong className="mb-1 block text-[#8D4A38]">Education only</strong>
            This article is general education, not medical advice. EVLV does not interpret labs, diagnose, prescribe, recommend doses, or create individualized treatment plans. Speak with a licensed physician about personal medical decisions.
          </div>
        </div>
      </article>

      <section className="bg-[#F0E8D5] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-9 flex items-end justify-between gap-5"><h2 className="font-display text-3xl font-semibold md:text-4xl">Keep reading.</h2><Link href="/blog" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8D4A38]">View all articles →</Link></div>
          <div className="grid gap-7 md:grid-cols-3">
            {more.map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`} className="group">
                <div className="relative aspect-square overflow-hidden rounded-[1.25rem]"><Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" /></div>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B45C42]">{item.label}</p>
                <h3 className="mt-2 font-display text-xl font-semibold leading-snug">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
