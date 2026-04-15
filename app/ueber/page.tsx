import type { Metadata } from "next";
import Link from "next/link";
import { Shield, CircleCheck as CheckCircle, Users, Heart, Star, Award, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { NAP } from "@/lib/constants";
import SectionHeading from "@/components/SectionHeading";
import CTABlock from "@/components/CTABlock";
import FounderSection from "@/components/FounderSection";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Über uns",
    description:
      "Erfahren Sie mehr über Meine Anzeige Online — Hamburgs Partnernetzwerk, das auf echten Beziehungen, persönlichem Kennenlernen und gegenseitigem Vertrauen aufgebaut ist.",
    path: "/ueber",
  });
}

const values = [
  {
    icon: Shield,
    title: "Vertrauen",
    description:
      "Jedes Mitglied empfehlen bestehende Partner persönlich. Wer aufgenommen wird, hat einen strukturierten Prozess durchlaufen. Vertrauen trägt alles.",
  },
  {
    icon: Heart,
    title: "Menschlichkeit",
    description:
      "Wir setzen auf persönliche Beziehungen statt anonyme Profile. Echte Menschen mit echten Unternehmen — das ist unser Netzwerk.",
  },
  {
    icon: Users,
    title: "Gemeinschaft",
    description:
      "Partner unterstützen und empfehlen sich gegenseitig. Das schafft eine Gemeinschaft, die zusammenwächst und gemeinsam stärker wird.",
  },
  {
    icon: Star,
    title: "Qualität",
    description:
      "Qualität geht vor Quantität. Lieber ein kleineres Netzwerk mit ausgewählten Partnern als ein großes mit beliebigen Einträgen.",
  },
];

const rules = [
  {
    icon: Shield,
    text: "Nur per Empfehlung — keine anonymen Bewerbungen",
  },
  {
    icon: Users,
    text: "Persönliches Kennenlernen vor der Aufnahme",
  },
  {
    icon: CheckCircle,
    text: "Website-Audit vor Aufnahme",
  },
  {
    icon: Star,
    text: "Probezeit für alle neuen Partner",
  },
  {
    icon: Heart,
    text: "Gegenseitige Unterstützung und Empfehlungen",
  },
];

export default function UeberPage() {
  return (
    <>
      <section className="bg-brand-cream pt-28 pb-16 px-4" aria-label="Seiteneinführung">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            Unser Netzwerk
          </p>
          <h1 className="mb-5 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Über Meine Anzeige Online
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600">
            Echte Beziehungen. Gegenseitiges Vertrauen. Hamburger Unternehmen, die sich wirklich
            kennen und füreinander einstehen.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 px-4" aria-label="Unsere Vision">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Unsere Vision"
                title="Das vertrauensvollste Netzwerk Hamburgs aufbauen"
                subtitle="Wir glauben, dass die besten Geschäftsbeziehungen aus echten persönlichen Verbindungen entstehen — nicht aus anonymen Online-Profilen."
              />
              <div className="mt-6 space-y-4 text-stone-600 leading-relaxed">
                <p>
                  Zwei Hamburger Unternehmer haben MAO gegründet — weil sie selbst erlebt haben,
                  wie viel ein verlässliches Netzwerk wert ist. Eines, in dem Empfehlungen wirklich
                  etwas bedeuten.
                </p>
                <p>
                  Wir setzen auf Qualität, nicht Quantität. Jeder Partner wird persönlich
                  empfohlen, persönlich kennengelernt und sorgfältig aufgenommen. Das braucht
                  etwas Zeit — und lohnt sich.
                </p>
                <p>
                  Unser Ziel: Hamburger Unternehmen sichtbar machen und verbinden. Durch
                  Empfehlungen, gemeinsame Projekte und echte Zusammenarbeit. Lernen Sie{" "}
                  <Link href="/partner" className="text-brand-blue hover:underline underline-offset-2 font-medium">
                    unsere Partner
                  </Link>{" "}
                  kennen oder besuchen Sie eine unserer{" "}
                  <Link href="/veranstaltungen" className="text-brand-blue hover:underline underline-offset-2 font-medium">
                    Netzwerkveranstaltungen
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-brand-blue p-6 text-white">
                <div className="mb-2 text-3xl font-bold">100%</div>
                <div className="text-sm text-brand-blue-light">Empfehlungsbasiert</div>
              </div>
              <div className="rounded-2xl bg-brand-cream border border-brand-blue/10 p-6">
                <div className="mb-2 text-3xl font-bold text-stone-900">Hamburg</div>
                <div className="text-sm text-stone-500">Unser Zuhause</div>
              </div>
              <div className="rounded-2xl bg-brand-cream border border-brand-blue/10 p-6">
                <div className="mb-2 text-3xl font-bold text-stone-900">{NAP.foundedYear}</div>
                <div className="text-sm text-stone-500">Gegründet</div>
              </div>
              <div className="rounded-2xl bg-brand-gold/40 border border-brand-gold p-6">
                <div className="mb-2 text-3xl font-bold text-stone-900">Echte</div>
                <div className="text-sm text-stone-600">Partnerschaften</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-cream py-20 px-4" aria-label="Unsere Werte">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <SectionHeading
              eyebrow="Was uns ausmacht"
              title="Unsere Werte"
              subtitle="Diese Werte leiten uns bei allem, was wir tun — von der Aufnahme neuer Partner bis zur täglichen Zusammenarbeit."
              centered
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-brand-blue/10 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue text-white">
                    <Icon size={20} />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-stone-900">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-stone-500">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-4" aria-label="Unsere Regeln und Standards">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Unsere Standards"
                title="Unsere Regeln"
                subtitle="Klare Regeln schaffen Verlässlichkeit. Das sind die Grundsätze, nach denen wir arbeiten."
              />
              <ul className="mt-8 space-y-4">
                {rules.map((rule) => {
                  const Icon = rule.icon;
                  return (
                    <li key={rule.text} className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue/10">
                        <Icon size={15} className="text-brand-blue" />
                      </div>
                      <span className="text-stone-700 leading-relaxed">{rule.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-2xl bg-brand-cream p-8 border border-brand-blue/10">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue text-white">
                  <Award size={18} />
                </div>
                <h3 className="text-xl font-bold text-stone-900">Qualitätsstandard</h3>
              </div>
              <div className="space-y-4 text-stone-600 leading-relaxed text-sm">
                <p>
                  Vor der Aufnahme prüfen wir jeden Online-Auftritt in einem kurzen
                  Website-Audit. Wir schauen auf:
                </p>
                <ul className="space-y-2">
                  {[
                    "Ladezeit und technische Performance",
                    "Mobile Darstellung und Bedienbarkeit",
                    "Klare Kommunikation der Leistungen",
                    "Professionelles, vertrauenswürdiges Auftreten",
                    "Vollständige Impressums- und Datenschutzangaben",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle
                        size={14}
                        className="mt-0.5 flex-shrink-0 text-brand-blue"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Kein Urteil über die Arbeit — ein Mindeststandard, den alle gemeinsam
                  hochhalten. Unsere Webdesign-Partner helfen bei Bedarf gerne weiter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FounderSection showTitle={true} />

      <section className="bg-brand-cream py-20 px-4" aria-label="Unser Standort">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Unser Standort"
                title="Hamburg ist unser Zuhause"
              />
              <div className="mt-6 space-y-4 text-stone-600 leading-relaxed">
                <p>
                  MAO ist durch und durch Hamburger. Wir kennen die Stadt, ihre Bezirke und die
                  Menschen, die hier Unternehmen aufbauen.
                </p>
                <p>
                  Ob{" "}
                  <Link href="/bezirk/altona" className="text-brand-blue hover:underline underline-offset-2 font-medium">Altona</Link>
                  {" "}oder{" "}
                  <Link href="/bezirk/wandsbek" className="text-brand-blue hover:underline underline-offset-2 font-medium">Wandsbek</Link>
                  ,{" "}
                  <Link href="/bezirk/harburg" className="text-brand-blue hover:underline underline-offset-2 font-medium">Harburg</Link>
                  {" "}oder{" "}
                  <Link href="/bezirk/eimsbuettel" className="text-brand-blue hover:underline underline-offset-2 font-medium">Eimsbüttel</Link>{" "}
                  — wir vernetzen lokale Unternehmen aus ganz Hamburg. Die besten Empfehlungen
                  kommen von Menschen, die einen wirklich kennen.
                </p>
                <p>
                  Hamburg hat eine starke Gemeinschaft kleiner Unternehmen und Selbstständiger.
                  Diese Gemeinschaft stärken und sichtbar machen — das ist unser Auftrag.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-2xl bg-brand-blue p-10 text-center text-white shadow-lg">
                <MapPin size={48} className="mx-auto mb-4 text-brand-gold" />
                <div className="text-2xl font-bold">Hamburg</div>
                <div className="mt-1 text-brand-blue-light text-sm">und Umgebung</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABlock
        title="Teil unserer Gemeinschaft werden"
        subtitle="Kennen Sie bereits einen MAO-Partner? Lassen Sie sich empfehlen und bewerben Sie sich."
        primaryLabel="Partner werden"
        primaryHref="/partner-werden"
        secondaryLabel="Partner entdecken"
        secondaryHref="/partner"
        variant="blue"
      />
    </>
  );
}
