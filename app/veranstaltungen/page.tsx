import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { getAllEvents, getAreas } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import EventCard from "@/components/EventCard";
import SectionHeading from "@/components/SectionHeading";
import CTABlock from "@/components/CTABlock";
import Breadcrumb from "@/components/Breadcrumb";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Veranstaltungen",
    description:
      "Netzwerktreffen, Workshops und Events des MAO-Netzwerks. Lernen Sie Partner kennen und bringen Sie Ihr Business voran.",
    path: "/veranstaltungen",
  });
}

export default async function VeranstaltungenPage() {
  const events = getAllEvents();
  const areas = getAreas();

  const areaMap = new Map(areas.map((a) => [a.slug, a.name]));

  const upcomingEvents = events.filter(
    (e) => new Date(e.dateEnd) >= new Date()
  );
  const pastEvents = events.filter(
    (e) => new Date(e.dateEnd) < new Date()
  );

  const eventCountLabel =
    upcomingEvents.length === 1
      ? "1 kommende Veranstaltung"
      : `${upcomingEvents.length} kommende Veranstaltungen`;

  return (
    <>
      <Breadcrumb items={[{ label: "Veranstaltungen" }]} />

      <section className="bg-brand-cream pt-10 pb-16 px-4" aria-label="Seiteneinführung">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            Netzwerk &amp; Community
          </p>
          <h1 className="mb-5 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Veranstaltungen
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600">
            Netzwerktreffen, Workshops und Events — persönlich, lokal, wertvoll.
            {upcomingEvents.length > 0 && (
              <> {eventCountLabel} sind geplant.</>
            )}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-label="Kommende Veranstaltungen">
        {upcomingEvents.length > 0 ? (
          <>
            <SectionHeading
              eyebrow="Demnächst"
              title="Kommende Veranstaltungen"
              subtitle="Melden Sie sich an und lernen Sie andere Mitglieder des Netzwerks persönlich kennen."
            />
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.slug}
                  event={event}
                  areaName={areaMap.get(event.areaSlug)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-200 bg-stone-50/60 px-6 py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-brand-blue/10 bg-brand-blue/8">
              <CalendarDays size={26} className="text-brand-blue/60" />
            </div>
            <p className="text-lg font-semibold text-stone-800">
              Aktuell keine Veranstaltungen geplant
            </p>
            <p className="mt-2 max-w-sm text-sm text-stone-500">
              Schauen Sie bald wieder vorbei — wir planen regelmäßig neue Netzwerktreffen und
              Workshops.
            </p>
          </div>
        )}
      </section>

      {pastEvents.length > 0 && (
        <section className="border-t border-stone-100 bg-stone-50/60 py-12" aria-label="Vergangene Veranstaltungen">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Rückblick"
              title="Vergangene Veranstaltungen"
            />
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <EventCard
                  key={event.slug}
                  event={event}
                  areaName={areaMap.get(event.areaSlug)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABlock
        title="Veranstaltung vorschlagen?"
        subtitle="Idee für ein Netzwerktreffen oder einen Workshop? Sprechen Sie uns an — wir freuen uns darüber."
        primaryLabel="Kontakt aufnehmen"
        primaryHref="/kontakt"
        secondaryLabel="Partner entdecken"
        secondaryHref="/partner"
        variant="blue"
      />
    </>
  );
}
