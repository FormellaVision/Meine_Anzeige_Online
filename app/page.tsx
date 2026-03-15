import Link from "next/link";
import Image from "next/image";
import { CircleCheck as CheckCircle, Star, Shield, Network, TrendingUp, Users, Award, ArrowRight, Sparkles, Heart, MapPin, Calendar } from "lucide-react";
import { getFeaturedPartners, getUpcomingEvents, getCategories, getAreas } from "@/lib/content";
import { PROCESS_STEPS, NAP, SITE_URL } from "@/lib/constants";
import type { Partner, MAOEvent, Category, Area } from "@/lib/types";
import PartnerCard from "@/components/PartnerCard";
import EventCard from "@/components/EventCard";
import SectionHeading from "@/components/SectionHeading";
import CTABlock from "@/components/CTABlock";
import ProcessSteps from "@/components/ProcessSteps";
import CategoryIcon from "@/components/CategoryIcon";
import PartnerLogoSlider from "@/components/PartnerLogoSlider";
import { buildFAQSchema, buildItemListSchema } from "@/lib/seo";

const homepageFAQs = [
  {
    question: "Was ist Meine Anzeige Online (MAO)?",
    answer:
      "MAO ist Hamburgs Partnernetzwerk für lokale Unternehmen. Aufnahme nur per persönlicher Empfehlung. Kein anonymes Verzeichnis — echte Vernetzung.",
  },
  {
    question: "Wie werde ich MAO-Partner?",
    answer:
      "Sie brauchen eine Empfehlung von einem bestehenden MAO-Partner. Danach folgen ein Website-Audit, ein persönliches Kennenlerngespräch und eine kurze Probezeit.",
  },
  {
    question: "In welchen Bereichen Hamburgs ist MAO aktiv?",
    answer:
      "MAO vernetzt Unternehmen in Hamburg und der Metropolregion — darunter Norderstedt, Ahrensburg, Reinbek und Schenefeld.",
  },
  {
    question: "Kostet die Mitgliedschaft bei MAO etwas?",
    answer:
      "Die Mitgliedschaft ist derzeit kostenlos. Über künftige Konditionen informieren wir rechtzeitig.",
  },
  {
    question: "Welche Branchen sind bei MAO vertreten?",
    answer:
      "Handwerk, Fotografie, Webdesign, Steuerberatung, Rechtsberatung, Physiotherapie, Friseure — und viele weitere lokale Dienstleister aus Hamburg.",
  },
];

export default async function HomePage() {
  const featuredPartners = getFeaturedPartners();
  const upcomingEvents = getUpcomingEvents(3);
  const categories = getCategories();
  const areas = getAreas();

  const faqSchema = buildFAQSchema(homepageFAQs);
  const partnerListSchema = featuredPartners.length
    ? buildItemListSchema(
        featuredPartners.map((p) => ({
          name: p.name,
          url: `${SITE_URL}/partner/${p.slug}`,
          description: p.shortDescription,
          image: p.images.logo || undefined,
        })),
        "Ausgewählte MAO-Partner in Hamburg"
      )
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {partnerListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerListSchema) }}
        />
      )}
      <section
        className="relative flex min-h-[88vh] items-center justify-center overflow-hidden pt-16"
        aria-label="Hero"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(135deg, #0d1f3c 0%, #166BBF 100%)",
          }}
        />

        <div className="absolute inset-0 z-[1] opacity-[0.08]">
          <svg
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="diag-lines"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="40"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diag-lines)" />
          </svg>
        </div>

        <div className="absolute inset-0 z-[2]">
          <Image
            src="https://res.cloudinary.com/dqkld61zu/image/upload/v1773515164/Foto_Hamburg_2_tfcf0o.webp"
            alt="Hamburg Stadtansicht"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            style={{ opacity: 0.35 }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm border border-white/20">
            <MapPin size={13} className="text-brand-gold shrink-0" />
            <span className="text-xs font-semibold tracking-wide text-white">
              Hamburg &middot; Nur per Empfehlung
            </span>
          </div>

          <h1 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Meine Anzeige Online&nbsp;&mdash;
            <br className="hidden sm:block" />
            Hamburgs Partnernetzwerk
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            Geprüfte Unternehmen. Echte Empfehlungen. Ein Club, der wächst.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/partner-werden"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-brand-blue shadow-lg transition-all duration-200 hover:bg-brand-cream hover:gap-3"
            >
              Partner werden
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/partner"
              className="inline-flex items-center gap-2 rounded-full border border-white/50 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10"
            >
              Partner entdecken
            </Link>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-2 text-white/75">
              <Shield size={15} className="text-brand-gold shrink-0" />
              <span className="text-xs font-medium">Geprüfte Partner</span>
            </div>
            <div className="hidden h-3 w-px bg-white/20 sm:block" />
            <div className="flex items-center gap-2 text-white/75">
              <Heart size={15} className="text-brand-gold shrink-0" />
              <span className="text-xs font-medium">Persönliche Empfehlungen</span>
            </div>
            <div className="hidden h-3 w-px bg-white/20 sm:block" />
            <div className="flex items-center gap-2 text-white/75">
              <MapPin size={15} className="text-brand-gold shrink-0" />
              <span className="text-xs font-medium">Hamburg &amp; Umgebung</span>
            </div>
          </div>
        </div>
      </section>

      <PartnerLogoSlider />

      <section className="bg-white py-20 px-4" aria-label="So funktioniert's">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <SectionHeading
              eyebrow="Der Prozess"
              title="So werden Sie Teil des Netzwerks"
              centered
            />
          </div>
          <ProcessSteps steps={PROCESS_STEPS} />
        </div>
      </section>

      <section className="bg-brand-cream py-20 px-4" aria-label="Vorteile">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <SectionHeading
              eyebrow="Für jeden der Richtige"
              title="Was Sie bei MAO bekommen"
              subtitle="Suchen Sie einen verlässlichen Dienstleister? Oder wollen Sie selbst Partner werden? MAO bietet klare Vorteile für beide Seiten."
              centered
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-brand-blue/15 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/8">
                  <Heart size={20} className="text-brand-blue" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue">Für Kunden</p>
                  <h3 className="text-lg font-bold text-stone-900">Verlässliche Empfehlungen</h3>
                </div>
              </div>
              <ul className="space-y-3.5">
                {[
                  { icon: Shield, text: "Nur geprüfte Unternehmen — kein Wildwuchs" },
                  { icon: Network, text: "Persönlich empfohlen von echten Mitgliedern" },
                  { icon: Star, text: "Qualitätsstandard: Website-Audit vor Aufnahme" },
                  { icon: MapPin, text: "Lokal in Hamburg — kurze Wege, schnelle Reaktion" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/8 mt-0.5">
                      <Icon size={13} className="text-brand-blue" />
                    </div>
                    <span className="text-sm text-stone-600 leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-stone-100">
                <Link
                  href="/partner"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:gap-2.5 transition-all duration-200"
                >
                  Partner entdecken
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-brand-gold/30 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold/15">
                  <Sparkles size={20} className="text-brand-gold" style={{ filter: "brightness(0.75)" }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#b8a03a" }}>Für Mitglieder</p>
                  <h3 className="text-lg font-bold text-stone-900">Wachsendes Netzwerk</h3>
                </div>
              </div>
              <ul className="space-y-3.5">
                {[
                  { icon: Users, text: "Warme Empfehlungen statt kalter Kaltakquise" },
                  { icon: TrendingUp, text: "Sichtbarkeit auf der Plattform für neue Kunden" },
                  { icon: Award, text: "Partnervorteile und Sonderkonditionen im Club" },
                  { icon: Calendar, text: "Exklusive Netzwerk-Events und Treffen" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 mt-0.5">
                      <Icon size={13} className="text-amber-700" />
                    </div>
                    <span className="text-sm text-stone-600 leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-stone-100">
                <Link
                  href="/partner-werden"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 transition-all duration-200"
                  style={{ color: "#b8a03a" }}
                >
                  Jetzt bewerben
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-4" aria-label="Unsere Partner">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Geprüfte Unternehmen" title="Unsere Partner in Hamburg" />
            <Link
              href="/partner"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue transition-all duration-200 hover:gap-2.5 shrink-0"
            >
              Alle Partner entdecken
              <ArrowRight size={14} />
            </Link>
          </div>

          {featuredPartners.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPartners.slice(0, 6).map((partner) => (
                <PartnerCard key={partner.slug} partner={partner} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-stone-200 py-16 text-center">
              <p className="text-stone-400 text-sm">Keine Partner gefunden.</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-brand-cream py-16 px-4" aria-label="Kategorien und Bezirke">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <SectionHeading
              title="Was suchen Sie?"
              subtitle="Entdecken Sie Partner nach Kategorie oder Bezirk"
              centered
            />
          </div>

          <div className="mb-12">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-brand-blue">
              Kategorien
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/kategorie/${category.slug}`}
                  className="group flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 shadow-sm border border-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-blue/8">
                    <CategoryIcon slug={category.slug} size={16} className="text-brand-blue" />
                  </div>
                  <span className="text-sm font-medium text-stone-700 leading-tight group-hover:text-brand-blue transition-colors duration-200 line-clamp-2">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-brand-blue">
              Bezirke
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {areas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/bezirk/${area.slug}`}
                  className="group flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 shadow-sm border border-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                >
                  <MapPin size={14} className="shrink-0 text-brand-blue-light group-hover:text-brand-blue transition-colors duration-200" />
                  <span className="text-sm font-medium text-stone-700 group-hover:text-brand-blue transition-colors duration-200">
                    {area.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20 px-4"
        style={{ backgroundColor: "#0d1f3c" }}
        aria-label="Qualitätsstandard"
      >
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-gold/10">
              <Shield size={26} className="text-brand-gold" />
            </div>
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            Qualität zuerst
          </p>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Qualitätsstandard für Hamburger Partner
          </h2>
          <p className="mb-10 text-base leading-relaxed text-brand-blue-light/80">
            Jeder neue Partner durchläuft unseren Website-Check. Wir prüfen Ladezeit, mobile
            Darstellung, klare Botschaft und professionelles Auftreten. Kein Hindernis &mdash;
            ein Versprechen an alle, die mit unseren Partnern arbeiten.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            {["Website-Audit", "Persönliches Kennenlernen", "Probezeit"].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle size={17} className="shrink-0 text-brand-gold" />
                <span className="text-sm font-medium text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-4" aria-label="Gründer">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <SectionHeading
              eyebrow="Das Herzstück"
              title="Gegründet von zwei Hamburger Unternehmern"
              subtitle="Gegründet von zwei Hamburger Unternehmern, die an echte Partnerschaften glauben."
              centered
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-10">
            <Link
              href="/partner/formella-vision"
              className="group flex w-full max-w-xs flex-col items-center rounded-2xl border border-stone-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              <div className="relative mb-5 h-[120px] w-[120px] overflow-hidden rounded-full ring-4 ring-brand-blue/10">
                <Image
                  src="https://res.cloudinary.com/dqkld61zu/image/upload/v1773517266/Christian_Formella_Profilbild_01_raqdy9.webp"
                  alt="Christian Formella"
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </div>
              <h3 className="mb-1 text-lg font-bold text-stone-900">Christian Formella</h3>
              <span className="mb-3 inline-block rounded-full bg-brand-blue/8 px-3 py-1 text-xs font-semibold text-brand-blue">
                Gründer &amp; Webdesigner
              </span>
              <p className="mb-4 text-center text-sm leading-relaxed text-stone-500 italic">
                &ldquo;Gute Zusammenarbeit entsteht durch echte Beziehungen — nicht durch anonyme Plattformen.&rdquo;
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue transition-all duration-200 group-hover:gap-2">
                Zum Profil
                <ArrowRight size={13} />
              </span>
            </Link>

            <Link
              href="/partner/physiowohltat-norderstedt"
              className="group flex w-full max-w-xs flex-col items-center rounded-2xl border border-stone-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              <div className="relative mb-5 h-[120px] w-[120px] overflow-hidden rounded-full ring-4 ring-brand-blue/10">
                <Image
                  src="https://res.cloudinary.com/dqkld61zu/image/upload/v1773516818/Michael_Wolfsohn_Foto24-Hamburg_q7nvyc.webp"
                  alt="Michael Wolfsohn"
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </div>
              <h3 className="mb-1 text-lg font-bold text-stone-900">Michael Wolfsohn</h3>
              <span className="mb-3 inline-block rounded-full bg-brand-blue/8 px-3 py-1 text-xs font-semibold text-brand-blue">
                Gründer &amp; Partner
              </span>
              <p className="mb-4 text-center text-sm leading-relaxed text-stone-500 italic">
                &ldquo;Ein Netzwerk ist so stark wie das Vertrauen, das seine Mitglieder einander schenken.&rdquo;
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue transition-all duration-200 group-hover:gap-2">
                Zum Profil
                <ArrowRight size={13} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-cream py-20 px-4" aria-label="Veranstaltungen">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Netzwerktreffen" title="Nächste Veranstaltungen in Hamburg" />
            <Link
              href="/veranstaltungen"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue transition-all duration-200 hover:gap-2.5 shrink-0"
            >
              Alle Veranstaltungen
              <ArrowRight size={14} />
            </Link>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-stone-300 py-16 text-center">
              <Calendar size={28} className="mx-auto mb-3 text-stone-300" />
              <p className="text-stone-400 text-sm">Keine bevorstehenden Veranstaltungen.</p>
            </div>
          )}
        </div>
      </section>

      <CTABlock
        title="Bereit für echte Partnerschaften?"
        subtitle="Werden Sie Teil von Hamburgs wachsendem Partnernetzwerk."
        primaryLabel="Partner werden"
        primaryHref="/partner-werden"
        secondaryLabel="Kontakt aufnehmen"
        secondaryHref="/kontakt"
        variant="blue"
      />
    </>
  );
}
