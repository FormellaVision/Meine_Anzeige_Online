import type { MetadataRoute } from "next";
import { getAllPartners, getAllEvents, getCategories, getAreas } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const partners = getAllPartners();
  const events = getAllEvents();
  const categories = getCategories();
  const areas = getAreas();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/partner`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/partner-werden`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/veranstaltungen`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ueber`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/impressum`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const partnerRoutes: MetadataRoute.Sitemap = partners.map((partner) => ({
    url: `${SITE_URL}/partner/${partner.slug}`,
    lastModified: new Date(partner.createdAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/kategorie/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const areaRoutes: MetadataRoute.Sitemap = areas.map((area) => ({
    url: `${SITE_URL}/bezirk/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${SITE_URL}/veranstaltungen/${event.slug}`,
    lastModified: new Date(event.dateStart),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...partnerRoutes,
    ...categoryRoutes,
    ...areaRoutes,
    ...eventRoutes,
  ];
}
