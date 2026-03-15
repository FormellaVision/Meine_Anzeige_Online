import { getAllPartners } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";
import { cloudinaryUrl } from "@/lib/utils";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET(): Promise<Response> {
  const partners = getAllPartners();

  const entries = partners
    .filter((p) => p.images.logo && p.images.logo.trim() !== "")
    .map((p) => {
      const imageUrl = cloudinaryUrl(p.images.logo, {
        width: 800,
        quality: 90,
        format: "auto",
      });
      const pageUrl = `${SITE_URL}/partner/${p.slug}`;
      return `
  <url>
    <loc>${pageUrl}</loc>
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${escapeXml(p.name)}</image:title>
      <image:caption>${escapeXml(p.shortDescription ?? p.name)}</image:caption>
    </image:image>
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>${entries}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
