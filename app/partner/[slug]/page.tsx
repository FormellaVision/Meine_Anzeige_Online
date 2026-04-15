import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, Mail, ExternalLink, MessageCircle, CircleCheck as CheckCircle, MapPin } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import {
  getPartnerBySlug,
  getSimilarPartners,
  getCategoryBySlug,
  getAreaBySlug,
  getAllPartners,
} from "@/lib/content";
import { buildMetadata, buildPartnerSchema, buildBreadcrumbSchema, buildItemListSchema } from "@/lib/seo";
import { cloudinaryUrl } from "@/lib/utils";
import { SITE_URL } from "@/lib/constants";
import MapEmbed from "@/components/MapEmbed";
import OpeningHours from "@/components/OpeningHours";
import CategoryIcon from "@/components/CategoryIcon";
import Badge from "@/components/Badge";
import PartnerCard from "@/components/PartnerCard";
import SectionHeading from "@/components/SectionHeading";
import SpecialOffers from "@/components/SpecialOffers";

interface PartnerDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const partners = getAllPartners();
  return partners.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PartnerDetailPageProps): Promise<Metadata> {
  const partner = getPartnerBySlug(params.slug);
  if (!partner) return {};

  const ogImage = partner.images.logo
    ? cloudinaryUrl(partner.images.logo, { width: 1200, quality: 90, format: "auto" })
    : undefined;

  return buildMetadata({
    title: partner.name,
    description: partner.shortDescription,
    path: `/partner/${partner.slug}`,
    ogImage,
  });
}

export default async function PartnerDetailPage({ params }: PartnerDetailPageProps) {
  const partner = getPartnerBySlug(params.slug);
  if (!partner) notFound();

  const category = Array.isArray(partner.categorySlug)
    ? getCategoryBySlug(partner.categorySlug[0])
    : getCategoryBySlug(partner.categorySlug);
  const area = getAreaBySlug(partner.areaSlug);
  const similarPartners = getSimilarPartners(partner, 3);

  const hasLogo = partner.images.logo && partner.images.logo.trim() !== "";
  const hasParagraphs = partner.longDescription && partner.longDescription.trim() !== "";
  const paragraphs = hasParagraphs
    ? partner.longDescription.split("\n\n").filter((p) => p.trim() !== "")
    : [];

  const hasOpeningHours = Object.values(partner.openingHours).some(
    (v) => v && v.trim() !== ""
  );
  const hasAddress =
    partner.address.street || partner.address.zip || partner.address.city;

  const pageUrl = `${SITE_URL}/partner/${partner.slug}`;
  const partnerSchema = buildPartnerSchema(partner, pageUrl);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Startseite", url: SITE_URL },
    { name: "Partner", url: `${SITE_URL}/partner` },
    { name: partner.name, url: pageUrl },
  ]);

  const similarPartnersSchema = similarPartners.length
    ? buildItemListSchema(
        similarPartners.map((p) => ({
          name: p.name,
          url: `${SITE_URL}/partner/${p.slug}`,
          description: p.shortDescription,
          image: p.images.logo || undefined,
        })),
        `Ähnliche Partner wie ${partner.name}`
      )
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {similarPartnersSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(similarPartnersSchema) }}
        />
      )}

      <Breadcrumb
        items={[
          { label: "Partner", href: "/partner" },
          { label: partner.name },
        ]}
      />

      <section className="bg-brand-cream py-12" aria-label="Partnerübersicht">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div className="shrink-0">
              {hasLogo ? (
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm sm:h-28 sm:w-28">
                  <Image
                    src={cloudinaryUrl(partner.images.logo, { width: 224, quality: 90, format: "auto" })}
                    alt={`${partner.name} Logo`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 96px, 112px"
                    priority
                  />
                </div>
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-brand-blue/15 bg-brand-blue/8 sm:h-28 sm:w-28">
                  <CategoryIcon
                    slug={Array.isArray(partner.categorySlug) ? partner.categorySlug[0] : partner.categorySlug}
                    size={40}
                    className="text-brand-blue"
                  />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {Array.isArray(partner.categorySlug)
                  ? partner.categorySlug.map((slug) => {
                      const cat = getCategoryBySlug(slug);
                      return cat ? (
                        <Link
                          key={slug}
                          href={`/kategorie/${slug}`}
                          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-full"
                          aria-label={`Alle Partner in der Kategorie ${cat.name}`}
                        >
                          <Badge variant="category" label={cat.name} />
                        </Link>
                      ) : null;
                    })
                  : category && (
                      <Link
                        href={`/kategorie/${partner.categorySlug}`}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-full"
                        aria-label={`Alle Partner in der Kategorie ${category.name}`}
                      >
                        <Badge variant="category" label={category.name} />
                      </Link>
                    )}
                {area && (
                  <Link
                    href={`/bezirk/${partner.areaSlug}`}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-full"
                    aria-label={`Alle Partner in ${area.name}`}
                  >
                    <Badge variant="area" label={area.name} />
                  </Link>
                )}
                {partner.featured && (
                  <Badge variant="featured" label="Featured" />
                )}
                {partner.role === "founder" && (
                  <Badge variant="gruender" label="Gründer" />
                )}
                <Badge variant="geprueft" label="Geprüft" />
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                {partner.name}
              </h1>

              {partner.shortDescription && (
                <p className="mt-3 text-base leading-relaxed text-stone-600 max-w-2xl">
                  {partner.shortDescription}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {partner.contact.website && partner.contact.website.trim() !== "" && (
              <a
                href={partner.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                <ExternalLink size={15} />
                Website besuchen
              </a>
            )}

            {partner.contact.whatsapp && partner.contact.whatsapp.trim() !== "" && (
              <a
                href={partner.contact.whatsapp.startsWith("http") ? partner.contact.whatsapp : `https://wa.me/${partner.contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
            )}

            {partner.contact.phone && partner.contact.phone.trim() !== "" && (
              <a
                href={`tel:${partner.contact.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition-all duration-200 hover:border-brand-blue hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                <Phone size={15} />
                Anrufen
              </a>
            )}

            {partner.contact.email && partner.contact.email.trim() !== "" && (
              <a
                href={`mailto:${partner.contact.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition-all duration-200 hover:border-brand-blue hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                <Mail size={15} />
                E-Mail
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-label="Partnerdetails">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {paragraphs.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-stone-900 mb-4">Über {partner.name}</h2>
                <div className="space-y-4">
                  {paragraphs.map((paragraph, i) => (
                    <p key={i} className="text-base leading-relaxed text-stone-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {partner.services && partner.services.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-stone-900 mb-4">Leistungen von {partner.name}</h2>
                <div className="flex flex-wrap gap-2">
                  {partner.services.map((service, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-full border border-brand-blue/20 px-3.5 py-1.5 text-sm font-medium text-brand-blue"
                      style={{ backgroundColor: "rgba(22, 107, 191, 0.06)" }}
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {partner.highlights && partner.highlights.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-stone-900 mb-4">Highlights &amp; Stärken</h2>
                <ul className="space-y-2.5">
                  {partner.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle
                        size={18}
                        className="shrink-0 mt-0.5 text-brand-blue"
                      />
                      <span className="text-sm leading-relaxed text-stone-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {partner.specialOffers && (
              <SpecialOffers
                offers={partner.specialOffers}
                partnerEmail={partner.contact.email}
                partnerWhatsapp={partner.contact.whatsapp}
              />
            )}

            {partner.recommendedBy && (
              <div className="rounded-xl border border-brand-gold/40 bg-brand-gold/10 p-5">
                <h3 className="text-base font-bold text-stone-900 mb-2">Empfohlen von</h3>
                <p className="text-sm font-medium text-stone-800">
                  {partner.recommendedBy.slug ? (
                    <Link
                      href={`/partner/${partner.recommendedBy.slug}`}
                      className="text-brand-blue hover:underline"
                    >
                      {partner.recommendedBy.name}
                    </Link>
                  ) : (
                    partner.recommendedBy.name
                  )}
                </p>
                {partner.recommendedBy.note && (
                  <p className="mt-1.5 text-sm italic text-stone-600">
                    „{partner.recommendedBy.note}"
                  </p>
                )}
              </div>
            )}
          </div>

          <aside className="space-y-6" role="complementary" aria-label="Kontaktinformationen">
            <div className="rounded-xl border border-stone-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">
                Kontakt
              </h3>
              <div className="space-y-3">
                {partner.contact.contactName && partner.contact.contactName.trim() !== "" && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100">
                      <Mail size={14} className="text-stone-500" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-400">Ansprechpartner</p>
                      <p className="text-sm font-medium text-stone-800">
                        {partner.contact.contactName}
                      </p>
                    </div>
                  </div>
                )}

                {partner.contact.phone && partner.contact.phone.trim() !== "" && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100">
                      <Phone size={14} className="text-stone-500" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-400">Telefon</p>
                      <a
                        href={`tel:${partner.contact.phone.replace(/\s/g, "")}`}
                        className="text-sm font-medium text-brand-blue hover:underline"
                      >
                        {partner.contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {partner.contact.email && partner.contact.email.trim() !== "" && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100">
                      <Mail size={14} className="text-stone-500" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-400">E-Mail</p>
                      <a
                        href={`mailto:${partner.contact.email}`}
                        className="text-sm font-medium text-brand-blue hover:underline break-all"
                      >
                        {partner.contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {partner.contact.website && partner.contact.website.trim() !== "" && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100">
                      <ExternalLink size={14} className="text-stone-500" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-400">Website</p>
                      <a
                        href={partner.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-brand-blue hover:underline break-all"
                      >
                        {partner.contact.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {hasOpeningHours && (
              <div className="rounded-xl border border-stone-100 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">
                  Öffnungszeiten
                </h3>
                <OpeningHours hours={partner.openingHours} />
              </div>
            )}

            {hasAddress && (
              <div className="rounded-xl border border-stone-100 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">
                  Adresse
                </h3>
                <div className="flex items-start gap-2 mb-4">
                  <MapPin size={16} className="shrink-0 mt-0.5 text-stone-400" />
                  <address className="not-italic text-sm text-stone-700 leading-relaxed">
                    {partner.address.street && (
                      <span className="block">{partner.address.street}</span>
                    )}
                    {(partner.address.zip || partner.address.city) && (
                      <span className="block">
                        {[partner.address.zip, partner.address.city]
                          .filter(Boolean)
                          .join(" ")}
                      </span>
                    )}
                  </address>
                </div>
                {partner.address.googleMapsUrl && partner.address.googleMapsUrl.trim() !== "" && (
                  <MapEmbed
                    googleMapsUrl={partner.address.googleMapsUrl}
                    name={partner.name}
                  />
                )}
              </div>
            )}
            {(category || area) && (
              <div className="rounded-xl border border-stone-100 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">
                  Weitere Partner
                </h3>
                <div className="space-y-1">
                  {category && (
                    <Link
                      href={`/kategorie/${Array.isArray(partner.categorySlug) ? partner.categorySlug[0] : partner.categorySlug}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-brand-blue/5 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                    >
                      <CategoryIcon slug={Array.isArray(partner.categorySlug) ? partner.categorySlug[0] : partner.categorySlug} size={14} className="shrink-0 text-brand-blue" />
                      Alle {category.name}-Partner
                    </Link>
                  )}
                  {area && (
                    <Link
                      href={`/bezirk/${partner.areaSlug}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-brand-blue/5 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                    >
                      <MapPin size={14} className="shrink-0 text-brand-blue" />
                      Alle Partner in {area.name}
                    </Link>
                  )}
                  <Link
                    href="/partner"
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-brand-blue/5 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  >
                    <CheckCircle size={14} className="shrink-0 text-brand-blue" />
                    Alle Partner entdecken
                  </Link>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {similarPartners.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-label="Ähnliche Partner">
          <SectionHeading
            eyebrow="Ähnliche Partner"
            title="Das könnte Sie auch interessieren"
            subtitle="Weitere geprüfte Partner aus Ihrem Netzwerk."
          />
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {similarPartners.map((p) => {
              const pCategory = getCategoryBySlug(Array.isArray(p.categorySlug) ? p.categorySlug[0] : p.categorySlug);
              const pArea = getAreaBySlug(p.areaSlug);
              return (
                <PartnerCard
                  key={p.slug}
                  partner={p}
                  categoryName={pCategory?.name}
                  areaName={pArea?.name}
                />
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
