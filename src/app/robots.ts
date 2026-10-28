import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/pos/", "/account", "/checkout", "/order-success"],
      },
    ],
    sitemap: "https://evlvtoday.com/sitemap.xml",
  };
}
