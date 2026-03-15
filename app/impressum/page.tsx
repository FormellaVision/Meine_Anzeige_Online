import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { NAP } from "@/lib/constants";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Impressum",
    description: "Rechtliche Pflichtangaben gemäß § 5 TMG für Meine Anzeige Online, Hamburg.",
    path: "/impressum",
  });
}

export default function ImpressumPage() {
  const hasAddress = NAP.street && NAP.zip;

  return (
    <>
      <section className="bg-brand-cream pt-28 pb-12 px-4" aria-label="Seiteneinführung">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            Rechtliche Informationen
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Impressum
          </h1>
        </div>
      </section>

      <section className="bg-white py-16 px-4" aria-label="Impressum Inhalt">
        <div className="mx-auto max-w-3xl space-y-10 text-stone-700 leading-relaxed">

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">
              Angaben gemäß § 5 TMG
            </h2>
            <div className="rounded-xl bg-brand-cream p-6 space-y-1">
              <p className="font-semibold text-stone-900">{NAP.legalName}</p>
              {hasAddress ? (
                <>
                  <p>{NAP.street}</p>
                  <p>
                    {NAP.zip} {NAP.city}
                  </p>
                </>
              ) : (
                <p className="text-stone-500 italic">Adresse wird ergänzt</p>
              )}
              <p>{NAP.country === "DE" ? "Deutschland" : NAP.country}</p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">Kontakt</h2>
            <div className="rounded-xl bg-brand-cream p-6 space-y-2">
              <p>
                <span className="font-semibold">Telefon:</span>{" "}
                <a
                  href={`tel:${NAP.phone.replace(/\s/g, "")}`}
                  className="text-brand-blue hover:underline underline-offset-2"
                >
                  {NAP.phone}
                </a>
              </p>
              <p>
                <span className="font-semibold">E-Mail:</span>{" "}
                <a
                  href={`mailto:${NAP.email}`}
                  className="text-brand-blue hover:underline underline-offset-2"
                >
                  {NAP.email}
                </a>
              </p>
              <p>
                <span className="font-semibold">Website:</span>{" "}
                <a
                  href={NAP.website}
                  className="text-brand-blue hover:underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {NAP.website}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">
              Vertretungsberechtigte Personen
            </h2>
            <div className="rounded-xl bg-brand-cream p-6 space-y-1">
              {NAP.founders.map((founder) => (
                <p key={founder.partnerSlug}>
                  <span className="font-semibold">{founder.name}</span>
                  {" — "}
                  {founder.role}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">
              Umsatzsteuer-Identifikationsnummer
            </h2>
            <div className="rounded-xl bg-brand-cream p-6">
              <p className="text-stone-500 italic">Wird ergänzt, sobald vorhanden.</p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <div className="rounded-xl bg-brand-cream p-6 space-y-1">
              {NAP.founders.slice(0, 1).map((founder) => (
                <div key={founder.partnerSlug}>
                  <p className="font-semibold">{founder.name}</p>
                  {hasAddress ? (
                    <>
                      <p>{NAP.street}</p>
                      <p>
                        {NAP.zip} {NAP.city}
                      </p>
                    </>
                  ) : (
                    <p className="text-stone-500 italic">Adresse wird ergänzt</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">Streitschlichtung</h2>
            <p className="text-stone-600 leading-relaxed">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue hover:underline underline-offset-2"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">Haftung für Inhalte</h2>
            <p className="text-stone-600 leading-relaxed">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen
              Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir
              als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
              allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
              jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
              Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte
              umgehend entfernen.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">Haftung für Links</h2>
            <p className="text-stone-600 leading-relaxed">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
              keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
              Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
              Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum
              Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
              Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
              Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">Urheberrecht</h2>
            <p className="text-stone-600 leading-relaxed">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
              Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
              bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
              Gebrauch gestattet.
            </p>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
              Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
              gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam
              werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
