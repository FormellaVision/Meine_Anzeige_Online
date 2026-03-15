import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { NAP } from "@/lib/constants";
import GeneralContactForm from "@/components/GeneralContactForm";
import NapBlock from "@/components/NapBlock";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Kontakt",
    description:
      "Nehmen Sie Kontakt mit Meine Anzeige Online auf. Wir freuen uns über Ihre Anfrage, Ihr Feedback oder Ihre Bewerbung als Partner.",
    path: "/kontakt",
  });
}

export default function KontaktPage() {
  return (
    <>
      <section className="bg-brand-cream pt-28 pb-16 px-4" aria-label="Seiteneinführung">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            Wir sind für Sie da
          </p>
          <h1 className="mb-5 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Kontakt aufnehmen
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600">
            Fragen, Ideen oder Interesse an einer Mitgliedschaft? Schreiben Sie uns — wir
            antworten persönlich.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 px-4" aria-label="Kontaktformular und Kontaktdaten">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3">
              <h2 className="mb-6 text-2xl font-bold text-stone-900">Schreiben Sie uns</h2>
              <GeneralContactForm />
            </div>

            <div className="lg:col-span-2">
              <h2 className="mb-6 text-2xl font-bold text-stone-900">So erreichen Sie uns</h2>

              <div className="rounded-2xl border border-stone-100 bg-brand-cream p-6">
                <NapBlock className="text-base font-medium [&_a]:font-semibold [&_a]:text-stone-900 [&_span]:text-stone-900" />
              </div>

              <div className="mt-8 rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-base font-bold text-stone-900">
                  Rechtliches &amp; Impressum
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/impressum"
                    className="flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-brand-blue"
                  >
                    <ExternalLink size={13} className="text-brand-blue" />
                    Impressum
                  </Link>
                  <Link
                    href="/datenschutz"
                    className="flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-brand-blue"
                  >
                    <ExternalLink size={13} className="text-brand-blue" />
                    Datenschutzerklärung
                  </Link>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-brand-blue p-6 text-white">
                <h3 className="mb-2 text-base font-bold">Partner werden?</h3>
                <p className="mb-4 text-sm text-brand-blue-light leading-relaxed">
                  Wenn Sie Interesse an einer Mitgliedschaft haben, füllen Sie direkt unser
                  Bewerbungsformular aus.
                </p>
                <Link
                  href="/partner-werden"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-cream"
                >
                  Zur Bewerbung
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
