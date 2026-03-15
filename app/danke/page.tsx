import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck as CheckCircle, ArrowRight, Users } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Vielen Dank",
    description: "Ihre Nachricht ist bei uns angekommen. Wir melden uns in Kürze bei Ihnen.",
    path: "/danke",
  });
}

export default function DankePage() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-brand-cream px-4 pt-36 pb-20" aria-label="Bestätigung">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-blue shadow-lg">
            <CheckCircle size={48} className="text-white" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Vielen Dank für Ihre Nachricht!
        </h1>

        <p className="mb-3 text-lg leading-relaxed text-stone-600">
          Wir melden uns in Kürze bei Ihnen.
        </p>

        <p className="mb-10 text-base leading-relaxed text-stone-500">
          Wir haben Ihre Anfrage erhalten und werden uns innerhalb von 1–3 Werktagen bei Ihnen
          melden. Bitte prüfen Sie auch Ihren Spam-Ordner, falls Sie nichts von uns hören.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-blue/90 hover:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            Zurück zur Startseite
            <ArrowRight size={15} />
          </Link>

          <Link
            href="/partner"
            className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-white px-7 py-3 text-sm font-semibold text-brand-blue transition-all duration-200 hover:bg-brand-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            <Users size={15} />
            Partner entdecken
          </Link>
        </div>

        <div className="mt-12 rounded-2xl border border-brand-blue/10 bg-white p-6 shadow-sm">
          <p className="text-sm text-stone-500 leading-relaxed">
            Haben Sie in der Zwischenzeit Fragen? Rufen Sie uns gerne an:{" "}
            <a
              href="tel:+491733878209"
              className="font-semibold text-brand-blue hover:underline underline-offset-2"
            >
              +49 173 3878209
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
