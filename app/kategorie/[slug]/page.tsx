import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import {
  getCategories,
  getCategoryBySlug,
  getPartnersByCategory,
} from "@/lib/content";
import { buildMetadata, buildBreadcrumbSchema, buildItemListSchema } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import CategoryIcon from "@/components/CategoryIcon";
import PartnerGrid from "@/components/PartnerGrid";
import CTABlock from "@/components/CTABlock";

interface KategoriePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: KategoriePageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};

  return buildMetadata({
    title: category.name,
    description:
      category.description ??
      `Entdecken Sie geprüfte ${category.name}-Partner in Ihrer Region. Alle empfohlen, alle geprüft.`,
    path: `/kategorie/${category.slug}`,
  });
}

export default async function KategorieDetailPage({ params }: KategoriePageProps) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const partners = getPartnersByCategory(params.slug);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Startseite", url: SITE_URL },
    { name: "Partner", url: `${SITE_URL}/partner` },
    { name: category.name, url: `${SITE_URL}/kategorie/${category.slug}` },
  ]);

  const itemListSchema = partners.length
    ? buildItemListSchema(
        partners.map((p) => ({
          name: p.name,
          url: `${SITE_URL}/partner/${p.slug}`,
          description: p.shortDescription,
          image: p.images.logo || undefined,
        })),
        `Geprüfte ${category.name}-Partner in Hamburg`
      )
    : null;

  const partnerCountLabel =
    partners.length === 1 ? "1 Partner" : `${partners.length} Partner`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}

      <Breadcrumb
        items={[
          { label: "Partner", href: "/partner" },
          { label: category.name },
        ]}
      />

      <section className="bg-brand-cream pt-12 pb-16 px-4" aria-label="Kategorie Einführung">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-blue/15 bg-brand-blue/8">
              <CategoryIcon slug={category.slug} size={28} className="text-brand-blue" />
            </div>
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            Kategorie
          </p>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            {category.name}
          </h1>
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center rounded-full border border-brand-blue/20 bg-white px-4 py-1.5 text-sm font-semibold text-brand-blue shadow-sm">
              {partnerCountLabel}
            </span>
          </div>
          {category.description && (
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600">
              {category.description}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-label="Partnerliste">
        <h2 className="sr-only">Geprüfte {category.name}-Partner in Hamburg</h2>
        <PartnerGrid
          partners={partners}
          emptyMessage={`Noch keine Partner in der Kategorie „${category.name}" – kennen Sie jemanden?`}
        />

        {partners.length === 0 && (
          <div className="mt-8 flex justify-center">
            <Link
              href="/partner-werden"
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-blue/90"
            >
              Partner werden
            </Link>
          </div>
        )}
      </section>

      <CTABlock
        title="Ihr Unternehmen in dieser Kategorie?"
        subtitle={`Werden Sie Teil unseres geprüften Netzwerks und werden Sie als ${category.name}-Partner sichtbar.`}
        primaryLabel="Jetzt bewerben"
        primaryHref="/partner-werden"
        secondaryLabel="Alle Partner entdecken"
        secondaryHref="/partner"
        variant="blue"
      />
    </>
  );
}
