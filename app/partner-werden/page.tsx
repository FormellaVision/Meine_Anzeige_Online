import type { Metadata } from "next";
import Link from "next/link";
import {
  CircleCheck as CheckCircle,
  ArrowRight,
  Coffee,
  Shield,
} from "lucide-react";
import { buildMetadata, buildFAQSchema } from "@/lib/seo";
import SectionHeading from "@/components/SectionHeading";
import CTABlock from "@/components/CTABlock";
import { getCategories, getAreas } from "@/lib/content";
import ApplicationForm from "@/components/ApplicationForm";
import ProcessTimeline from "@/components/ProcessTimeline";
import type { TimelineStep } from "@/components/ProcessTimeline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Partner werden",
    description:
      "Werden Sie Teil von Hamburgs exklusivem Partnernetzwerk. Nur per Empfehlung, persönliches Kennenlernen und echter Mehrwert für Ihr Unternehmen.",
    path: "/partner-werden",
  });
}

const processSteps: TimelineStep[] = [
  {
    id: "empfehlung",
    step: 1,
    iconName: "Handshake",
    label: "Schritt 1",
    title: "Empfehlung erhalten",
    description:
      "Ein bestehender MAO-Partner kennt Sie und bürgt für Ihre Arbeit. Keine persönliche Empfehlung, keine Aufnahme — das ist unser Qualitätsversprechen.",
    detail:
      "Noch kein Kontakt im Netzwerk? Kommen Sie zu einer unserer Veranstaltungen und lernen Sie Partner kennen.",
  },
  {
    id: "formular",
    step: 2,
    iconName: "FileText",
    label: "Schritt 2",
    title: "Kurzformular ausfüllen",
    description:
      "Füllen Sie unser kompaktes Bewerbungsformular aus. Wer sind Sie, was tun Sie, warum passt MAO? Dauert maximal 5 Minuten.",
    detail:
      "Geben Sie den Namen des empfehlenden Partners an — dieses Feld ist Pflicht.",
  },
  {
    id: "kennenlernen",
    step: 3,
    iconName: "Coffee",
    label: "Schritt 3",
    title: "Persönliches Gespräch",
    description:
      "Wir treffen uns auf einen Kaffee oder per Videocall. Kein Pitch, kein Druck. Wir lernen Sie als Mensch und Unternehmer kennen.",
    detail:
      "In der Regel 30–45 Minuten. Sie stellen Fragen, wir auch.",
  },
  {
    id: "audit",
    step: 4,
    iconName: "ClipboardCheck",
    label: "Schritt 4",
    title: "Website-Audit",
    description:
      "Unsere Webdesign-Experten prüfen Ihren Online-Auftritt: Ladezeit, mobile Darstellung, klare Botschaft, professionelles Erscheinungsbild.",
    detail:
      "Hat Ihre Website Nachbesserungsbedarf? Wir zeigen Ihnen konkret, wo — und unsere Partner-Webdesigner helfen gerne.",
  },
  {
    id: "probezeit",
    step: 5,
    iconName: "Star",
    label: "Schritt 5",
    title: "3 Monate Probezeit",
    description:
      "Drei Monate, um das Netzwerk kennenzulernen. Sie empfehlen andere, andere empfehlen Sie, und Sie nehmen an Events teil.",
    detail:
      "Ihr Profil ist vom ersten Tag an live. Sie sind vollwertiges Mitglied.",
  },
  {
    id: "aufnahme",
    step: 6,
    iconName: "PartyPopper",
    label: "Schritt 6",
    title: "Willkommen im Netzwerk",
    description:
      "Probezeit bestanden — Sie sind offiziell MAO-Partner. Ihr Profil trägt das Gütesiegel und das Netzwerk steht hinter Ihnen.",
    detail:
      "Sie erhalten Zugang zu Partnervorteilen, exklusiven Events und dem internen Empfehlungskanal.",
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Qualität durch Empfehlung",
    description:
      "Jedes Mitglied wird persönlich empfohlen. Das schafft Vertrauen — untereinander und gegenüber Kunden.",
  },
  {
    icon: CheckCircle,
    title: "Sichtbarkeit in Hamburg",
    description:
      "Ihr Profil erscheint im MAO-Verzeichnis. Hamburger, die bewusst lokale Partner wählen, finden Sie dort.",
  },
  {
    icon: ArrowRight,
    title: "Echte Empfehlungen",
    description:
      "Partner empfehlen sich aktiv untereinander. Keine anonymen Bewertungen — nur ehrliche, persönliche Weiterempfehlungen.",
  },
];

const faqs = [
  {
    question: "Kostet die Mitgliedschaft etwas?",
    answer:
      "Die Mitgliedschaft ist derzeit kostenlos. Über künftige Konditionen informieren wir rechtzeitig.",
  },
  {
    question: "Kann ich mich selbst bewerben?",
    answer:
      "Nein. Jeder neue Partner braucht eine Empfehlung von einem bestehenden MAO-Mitglied. Das sichert Qualität von Anfang an.",
  },
  {
    question: "Was ist der Website-Audit?",
    answer:
      "Wir prüfen Ihre Website auf Ladezeit, mobile Darstellung, klare Botschaft und professionelles Auftreten — vor der Aufnahme.",
  },
  {
    question: "Wie lange dauert der Prozess?",
    answer:
      "Von der Bewerbung bis zur Aufnahme dauert es in der Regel 2–4 Wochen, je nach Terminlage.",
  },
  {
    question: "Kann ich Mitglied werden, ohne eine Website zu haben?",
    answer:
      "Eine professionelle Online-Präsenz ist Voraussetzung. Unsere Webdesign-Partner helfen bei Bedarf gerne.",
  },
];

export default async function PartnerWerdenPage() {
  const categories = getCategories();
  const areas = getAreas();

  const faqSchema = buildFAQSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="bg-brand-cream pt-28 pb-16 px-4" aria-label="Seiteneinführung">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            Exklusives Netzwerk
          </p>
          <h1 className="mb-5 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Partner werden bei MAO
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-stone-600">
            Nur per Empfehlung. Persönliches Kennenlernen. Echter Mehrwert.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex items-center gap-2 rounded-full border border-brand-blue/20 bg-white px-5 py-2.5 text-sm font-semibold text-brand-blue shadow-sm">
              <Shield size={15} className="text-brand-blue" />
              Nur per Empfehlung
            </div>
            <div className="flex items-center gap-2 rounded-full border border-brand-blue/20 bg-white px-5 py-2.5 text-sm font-semibold text-brand-blue shadow-sm">
              <Coffee size={15} className="text-brand-blue" />
              Persönliches Treffen
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-4" aria-label="Aufnahmeprozess">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <SectionHeading
              eyebrow="Der Weg zur Mitgliedschaft"
              title="So funktioniert die Aufnahme"
              subtitle="Ein klar strukturierter Prozess, der Qualität und persönliche Verbindung in den Mittelpunkt stellt. Hover über eine Karte für mehr Details."
              centered
            />
          </div>
          <ProcessTimeline steps={processSteps} />
          <div className="mt-10 rounded-2xl border border-brand-blue/15 bg-brand-blue/5 px-6 py-5 text-sm text-stone-600 leading-relaxed">
            <strong className="font-semibold text-stone-800">Noch kein Kontakt im Netzwerk?</strong>{" "}
            Kommen Sie zu einer unserer{" "}
            <Link
              href="/veranstaltungen"
              className="font-medium text-brand-blue hover:underline underline-offset-2"
            >
              Netzwerkveranstaltungen
            </Link>{" "}
            und lernen Sie Partner persönlich kennen. Oder schauen Sie in unser{" "}
            <Link
              href="/partner"
              className="font-medium text-brand-blue hover:underline underline-offset-2"
            >
              Partnerverzeichnis
            </Link>{" "}
            an.
          </div>
        </div>
      </section>

      <section className="bg-brand-cream py-20 px-4" aria-label="Ihre Vorteile">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <SectionHeading
              eyebrow="Ihre Vorteile"
              title="Was Sie als MAO-Partner erwartet"
              subtitle="Mitgliedschaft heißt mehr als ein Profil. Sie gehören zu einer echten Gemeinschaft."
              centered
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-brand-blue/10 bg-white p-7 shadow-sm"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue text-white">
                    <Icon size={20} />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-stone-900">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-stone-500">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-4" id="bewerben" aria-label="Bewerbungsformular">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <SectionHeading
              eyebrow="Jetzt starten"
              title="Jetzt bewerben"
              subtitle="Füllen Sie das Formular aus — wir melden uns innerhalb weniger Tage bei Ihnen."
              centered
            />
          </div>
          <ApplicationForm categories={categories} areas={areas} />
        </div>
      </section>

      <section className="bg-brand-cream py-20 px-4" aria-label="Häufige Fragen">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <SectionHeading
              eyebrow="Häufige Fragen"
              title="Fragen zur Mitgliedschaft"
              centered
            />
          </div>
          <Accordion type="single" collapsible className="rounded-2xl bg-white shadow-sm">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-stone-100 px-6 last:border-0"
              >
                <AccordionTrigger className="text-left font-semibold text-stone-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-stone-500 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CTABlock
        title="Noch Fragen? Wir helfen gern."
        subtitle="Sprechen Sie uns direkt an — wir nehmen uns Zeit für ein persönliches Gespräch."
        primaryLabel="Kontakt aufnehmen"
        primaryHref="/kontakt"
        secondaryLabel="Partner entdecken"
        secondaryHref="/partner"
        variant="blue"
      />
    </>
  );
}
