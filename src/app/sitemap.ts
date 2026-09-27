import type { MetadataRoute } from "next";
import { getJournalArticles } from "@/lib/journal-data";

const BASE_URL = "https://evlvtoday.com";

const STATIC_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "daily" as const },
  { path: "/shop", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/journal", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/peptides", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/hormone-health", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/membership", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.4, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/book", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const journalEntries: MetadataRoute.Sitemap = getJournalArticles().map((a) => ({
    url: `${BASE_URL}/journal/${a.slug}`,
    lastModified: new Date(a.publishedDate),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...journalEntries];
}
