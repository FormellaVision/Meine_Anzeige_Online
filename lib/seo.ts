import type { Metadata } from "next";
import { SITE_URL, NAP } from "./constants";
import type { Partner, MAOEvent } from "./types";

export function buildMetadata(params: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const url = `${SITE_URL}${params.path}`;
  const ogImage = params.ogImage ?? "/og-default.jpg";
  return {
    title: `${params.title} | Meine Anzeige Online`,
    description: params.description,
    alternates: { canonical: url },
    openGraph: {
      title: params.title,
      description: params.description,
      url,
      siteName: "Meine Anzeige Online",
      images: [{ url: `${SITE_URL}${ogImage}`, width: 1200, height: 630, alt: params.title }],
      type: "website",
      locale: "de_DE",
    },
    twitter: {
      card: "summary_large_image",
      title: params.title,
      description: params.description,
      images: [`${SITE_URL}${ogImage}`],
    },
  };
}

function buildSameAs(): string[] {
  const urls: string[] = [NAP.website];
  if (NAP.social.facebook) urls.push(NAP.social.facebook);
  if (NAP.social.instagram) urls.push(NAP.social.instagram);
  if (NAP.social.linkedin) urls.push(NAP.social.linkedin);
  return urls.filter(Boolean);
}

function buildAddress(overrides?: { street?: string; zip?: string; city?: string }) {
  return {
    "@type": "PostalAddress",
    ...(overrides?.street
      ? { streetAddress: overrides.street }
      : NAP.street
      ? { streetAddress: NAP.street }
      : {}),
    ...(overrides?.zip
      ? { postalCode: overrides.zip }
      : NAP.zip
      ? { postalCode: NAP.zip }
      : {}),
    addressLocality: overrides?.city ?? NAP.city,
    addressRegion: NAP.state,
    addressCountry: NAP.country,
  };
}

export function buildOrganizationSchema() {
  const sameAs = buildSameAs();
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: NAP.name,
    legalName: NAP.legalName,
    url: NAP.website,
    email: NAP.email,
    telephone: NAP.phone,
    description: NAP.description,
    foundingDate: String(NAP.foundedYear),
    address: buildAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: NAP.geo.latitude,
      longitude: NAP.geo.longitude,
    },
    areaServed: NAP.areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    ...(sameAs.length > 1 ? { sameAs } : {}),
    founders: NAP.founders.map((f) => ({
      "@type": "Person",
      name: f.name,
      jobTitle: f.role,
      url: `${SITE_URL}/partner/${f.partnerSlug}`,
    })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: NAP.phone,
      email: NAP.email,
      contactType: "customer support",
      availableLanguage: "German",
      areaServed: "DE",
    },
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: NAP.name,
    url: NAP.website,
    description: NAP.description,
    inLanguage: "de-DE",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/partner?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildLocalBusinessSchema(extra?: Record<string, unknown>) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: NAP.name,
    url: NAP.website,
    email: NAP.email,
    telephone: NAP.phone,
    description: NAP.description,
    priceRange: NAP.priceRange,
    address: buildAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: NAP.geo.latitude,
      longitude: NAP.geo.longitude,
    },
    areaServed: NAP.areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    ...extra,
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildPartnerSchema(partner: Partner, pageUrl: string) {
  const sameAs: string[] = [];
  if (partner.contact.website) sameAs.push(partner.contact.website);
  if (partner.social?.facebook) sameAs.push(partner.social.facebook);
  if (partner.social?.instagram) sameAs.push(partner.social.instagram);
  if (partner.social?.linkedin) sameAs.push(partner.social.linkedin);
  if (partner.social?.xing) sameAs.push(partner.social.xing);

  const hasAddress = partner.address.street || partner.address.zip || partner.address.city;

  const openingHoursSpec = buildOpeningHoursSpec(partner.openingHours);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": pageUrl,
    name: partner.name,
    url: partner.contact.website || pageUrl,
    description: partner.shortDescription || undefined,
    ...(partner.contact.phone ? { telephone: partner.contact.phone } : {}),
    ...(partner.contact.email ? { email: partner.contact.email } : {}),
    ...(hasAddress
      ? {
          address: {
            "@type": "PostalAddress",
            ...(partner.address.street ? { streetAddress: partner.address.street } : {}),
            ...(partner.address.zip ? { postalCode: partner.address.zip } : {}),
            addressLocality: partner.address.city || NAP.city,
            addressRegion: NAP.state,
            addressCountry: NAP.country,
          },
        }
      : {}),
    ...(partner.images.logo ? { image: partner.images.logo } : {}),
    ...(sameAs.length ? { sameAs: sameAs.filter(Boolean) } : {}),
    ...(openingHoursSpec.length ? { openingHoursSpecification: openingHoursSpec } : {}),
    memberOf: {
      "@type": "Organization",
      name: NAP.name,
      url: NAP.website,
    },
  };
}

function buildOpeningHoursSpec(hours: Partner["openingHours"]) {
  const dayMap: Record<string, string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };

  const specs: Array<{
    "@type": string;
    dayOfWeek: string;
    opens: string;
    closes: string;
  }> = [];

  for (const [day, value] of Object.entries(hours)) {
    if (!value || value.trim() === "") continue;
    const lower = value.toLowerCase();
    if (lower === "geschlossen" || lower === "closed") continue;
    const match = value.match(/(\d{1,2}(?::\d{2})?)\s*[-–]\s*(\d{1,2}(?::\d{2})?)/);
    if (!match) continue;
    const opens = match[1].includes(":") ? match[1] : `${match[1]}:00`;
    const closes = match[2].includes(":") ? match[2] : `${match[2]}:00`;
    specs.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayMap[day] ?? day,
      opens,
      closes,
    });
  }

  return specs;
}

export function buildEventSchema(event: MAOEvent) {
  const isPast = new Date(event.dateEnd) < new Date();
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.shortDescription,
    startDate: event.dateStart,
    endDate: event.dateEnd,
    eventStatus: isPast
      ? "https://schema.org/EventPast"
      : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.locationName,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.address,
        addressLocality: NAP.city,
        addressRegion: NAP.state,
        addressCountry: NAP.country,
      },
    },
    url: `${SITE_URL}/veranstaltungen/${event.slug}`,
    image: event.images.cover || undefined,
    organizer: {
      "@type": "Organization",
      name: event.organizer.name,
      email: event.organizer.contactEmail,
      url: NAP.website,
    },
    ...(event.cta?.url
      ? {
          offers: {
            "@type": "Offer",
            url: event.cta.url,
            price: "0",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function buildItemListSchema(
  items: Array<{ name: string; url: string; description?: string; image?: string }>,
  listName: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
      ...(item.image ? { image: item.image } : {}),
    })),
  };
}

export function buildFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
