import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Clock, User, Mail, ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { getAllEvents, getEventBySlug, getAreaBySlug } from "@/lib/content";
import { buildMetadata, buildEventSchema, buildBreadcrumbSchema } from "@/lib/seo";
import { formatDateDE, formatTimeDE, isExternalUrl } from "@/lib/utils";
import { SITE_URL } from "@/lib/constants";
import ContentRenderer from "@/components/ContentRenderer";
import AddToCalendar from "@/components/AddToCalendar";
import Badge from "@/components/Badge";

interface EventDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const events = getAllEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const event = getEventBySlug(params.slug);
  if (!event) return {};

  return buildMetadata({
    title: event.title,
    description: event.shortDescription,
    path: `/veranstaltungen/${event.slug}`,
    ogImage:
      event.images.cover && isExternalUrl(event.images.cover)
        ? event.images.cover
        : undefined,
  });
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const event = getEventBySlug(params.slug);
  if (!event) notFound();

  const area = getAreaBySlug(event.areaSlug);

  const hasCover = event.images.cover && event.images.cover.trim() !== "";
  const isPast = new Date(event.dateEnd) < new Date();

  const eventUrl = `${SITE_URL}/veranstaltungen/${event.slug}`;

  const eventSchema = buildEventSchema(event);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Startseite", url: SITE_URL },
    { name: "Veranstaltungen", url: `${SITE_URL}/veranstaltungen` },
    { name: event.title, url: eventUrl },
  ]);

  const startDateFormatted = formatDateDE(event.dateStart);
  const startTimeFormatted = formatTimeDE(event.dateStart);
  const endTimeFormatted = formatTimeDE(event.dateEnd);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb
        items={[
          { label: "Veranstaltungen", href: "/veranstaltungen" },
          { label: event.title },
        ]}
      />

      <section className="bg-brand-cream py-12" aria-label="Veranstaltungsübersicht">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {event.featured && <Badge variant="featured" label="Featured" />}
            {area && <Badge variant="area" label={area.name} />}
            {isPast && (
              <span className="inline-flex items-center rounded-full border border-stone-300 bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-500">
                Vergangen
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl max-w-3xl">
            {event.title}
          </h1>

          {event.shortDescription && (
            <p className="mt-4 text-base leading-relaxed text-stone-600 max-w-2xl">
              {event.shortDescription}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-700">
            <span className="inline-flex items-center gap-2">
              <Calendar size={15} className="text-brand-blue" />
              <time dateTime={event.dateStart}>{startDateFormatted}</time>
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock size={15} className="text-brand-blue" />
              {startTimeFormatted} – {endTimeFormatted} Uhr
            </span>
            {event.locationName && (
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-brand-blue" />
                {event.locationName}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-label="Veranstaltungsinhalt">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {hasCover && (
              <div className="relative w-full overflow-hidden rounded-2xl border border-stone-100 bg-stone-100 aspect-[16/9]">
                {isExternalUrl(event.images.cover) ? (
                  <img
                    src={event.images.cover}
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={event.images.cover}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                )}
              </div>
            )}

            {event.content && event.content.length > 0 && (
              <ContentRenderer content={event.content} />
            )}

            {!isPast && (
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-stone-100">
                <AddToCalendar
                  title={event.title}
                  dateStart={event.dateStart}
                  dateEnd={event.dateEnd}
                  location={
                    [event.locationName, event.address].filter(Boolean).join(", ")
                  }
                  description={event.shortDescription}
                />

                {event.cta && event.cta.url && event.cta.label && (
                  <a
                    href={event.cta.url}
                    target={isExternalUrl(event.cta.url) ? "_blank" : undefined}
                    rel={isExternalUrl(event.cta.url) ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                  >
                    {event.cta.label}
                    <ArrowRight size={14} />
                  </a>
                )}
              </div>
            )}
          </div>

          <aside className="space-y-6" role="complementary" aria-label="Veranstaltungsdetails">
            <div className="rounded-xl border border-stone-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">
                Veranstaltungsdetails
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100">
                    <Calendar size={14} className="text-stone-500" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400">Datum</p>
                    <p className="text-sm font-medium text-stone-800">
                      <time dateTime={event.dateStart}>{startDateFormatted}</time>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100">
                    <Clock size={14} className="text-stone-500" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400">Uhrzeit</p>
                    <p className="text-sm font-medium text-stone-800">
                      {startTimeFormatted} – {endTimeFormatted} Uhr
                    </p>
                  </div>
                </div>

                {event.locationName && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100">
                      <MapPin size={14} className="text-stone-500" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-400">Ort</p>
                      <p className="text-sm font-medium text-stone-800">
                        {event.locationName}
                      </p>
                      {event.address && (
                        <p className="text-xs text-stone-500 mt-0.5">{event.address}</p>
                      )}
                    </div>
                  </div>
                )}

                {event.organizer && event.organizer.name && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100">
                      <User size={14} className="text-stone-500" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-400">Veranstalter</p>
                      <p className="text-sm font-medium text-stone-800">
                        {event.organizer.name}
                      </p>
                    </div>
                  </div>
                )}

                {event.organizer && event.organizer.contactEmail && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100">
                      <Mail size={14} className="text-stone-500" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-400">Kontakt</p>
                      <a
                        href={`mailto:${event.organizer.contactEmail}`}
                        className="text-sm font-medium text-brand-blue hover:underline break-all"
                      >
                        {event.organizer.contactEmail}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!isPast && event.cta && event.cta.url && event.cta.label && (
              <a
                href={event.cta.url}
                target={isExternalUrl(event.cta.url) ? "_blank" : undefined}
                rel={isExternalUrl(event.cta.url) ? "noopener noreferrer" : undefined}
                className="block w-full rounded-xl bg-brand-blue px-5 py-4 text-center text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                {event.cta.label}
              </a>
            )}

            {!isPast && (
              <div className="rounded-xl border border-stone-100 bg-stone-50 p-4 text-center">
                <p className="text-xs text-stone-500 mb-3">Termin nicht vergessen</p>
                <AddToCalendar
                  title={event.title}
                  dateStart={event.dateStart}
                  dateEnd={event.dateEnd}
                  location={
                    [event.locationName, event.address].filter(Boolean).join(", ")
                  }
                  description={event.shortDescription}
                />
              </div>
            )}

            <div className="rounded-xl border border-stone-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">
                Netzwerk entdecken
              </h3>
              <div className="space-y-1">
                <Link
                  href="/veranstaltungen"
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-brand-blue/5 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                >
                  <ArrowRight size={14} className="shrink-0 text-brand-blue" />
                  Alle Veranstaltungen
                </Link>
                <Link
                  href="/partner"
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-brand-blue/5 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                >
                  <ArrowRight size={14} className="shrink-0 text-brand-blue" />
                  Partner entdecken
                </Link>
                {area && (
                  <Link
                    href={`/bezirk/${event.areaSlug}`}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-brand-blue/5 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  >
                    <MapPin size={14} className="shrink-0 text-brand-blue" />
                    Partner in {area.name}
                  </Link>
                )}
                <Link
                  href="/partner-werden"
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-brand-blue/5 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                >
                  <ArrowRight size={14} className="shrink-0 text-brand-blue" />
                  Partner werden
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
