import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getAllPartners, getCategories, getAreas } from "@/lib/content";
import { buildMetadata, buildItemListSchema, buildBreadcrumbSchema } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import PartnerDirectory from "@/components/PartnerDirectory";
import SectionHeading from "@/components/SectionHeading";
import CTABlock from "@/components/CTABlock";
import Breadcrumb from "@/components/Breadcrumb";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Partner entdecken",
    description:
      "Entdecken Sie geprüfte Unternehmen und Selbstständige aus Ihrem Bezirk. Jeder Partner wurde persönlich empfohlen.",
    path: "/partner",
  });
}

export default async function PartnerPage() {
  const allPartners = getAllPartners();
  const categories = getCategories();
  const areas = getAreas();

  const itemListSchema = buildItemListSchema(
    allPartners.map((p) => ({
      name: p.name,
      url: `${SITE_URL}/partner/${p.slug}`,
      description: p.shortDescription,
      image: p.images.logo || undefined,
    })),
    "MAO-Partnerverzeichnis Hamburg — geprüfte lokale Unternehmen"
  );

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Startseite", url: SITE_URL },
    { name: "Partner entdecken", url: `${SITE_URL}/partner` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Breadcrumb items={[{ label: "Partner entdecken" }]} />

      <section className="bg-brand-cream pt-10 pb-16 px-4" aria-label="Seiteneinführung">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            Geprüfte Unternehmen
          </p>
          <h1 className="mb-5 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Partner entdecken
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600">
            {allPartners.length} geprüfte Unternehmen und Selbstständige aus Hamburg und Umgebung.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" aria-label="Partnerverzeichnis">
        <h2 className="sr-only">Partnerverzeichnis Hamburg — alle geprüften Unternehmen</h2>
        <Suspense fallback={
          <div className="rounded-2xl border border-stone-100 bg-white p-4 shadow-sm mb-6 h-16 animate-pulse" />
        }>
          <PartnerDirectory
            partners={allPartners}
            categories={categories}
            areas={areas}
          />
        </Suspense>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8" aria-label="Partner werden">
        <div className="rounded-2xl bg-brand-cream border border-stone-200 px-8 py-10 text-center">
          <SectionHeading
            eyebrow="Netzwerk wachsen lassen"
            title="Sie gehören hierher?"
            subtitle="Alle Partner werden persönlich empfohlen. Wenn Sie Teil unseres Netzwerks werden möchten, freuen wir uns auf Ihre Anfrage."
            centered
          />
          <div className="mt-6">
            <Link
              href="/partner-werden"
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-blue/90"
            >
              Jetzt bewerben
            </Link>
          </div>
        </div>
      </section>

      <CTABlock
        title="Gemeinsam stärker"
        subtitle="Unser Netzwerk wächst durch gegenseitige Empfehlungen. Werden Sie Teil der Gemeinschaft."
        primaryLabel="Partner werden"
        primaryHref="/partner-werden"
        secondaryLabel="Mehr erfahren"
        secondaryHref="/ueber"
        variant="blue"
      />
    </>
  );
}
