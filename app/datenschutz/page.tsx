import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { NAP } from "@/lib/constants";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Datenschutzerklärung",
    description:
      "Datenschutzerklärung von Meine Anzeige Online gemäß DSGVO. Erfahren Sie, welche Daten wir erheben und wie wir sie verarbeiten.",
    path: "/datenschutz",
  });
}

export default function DatenschutzPage() {
  return (
    <>
      <section className="bg-brand-cream pt-28 pb-12 px-4" aria-label="Seiteneinführung">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            Rechtliche Informationen
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Datenschutzerklärung
          </h1>
          <p className="mt-4 text-stone-600">
            Zuletzt aktualisiert: Januar 2026
          </p>
        </div>
      </section>

      <section className="bg-white py-16 px-4" aria-label="Datenschutzerklärung Inhalt">
        <div className="mx-auto max-w-3xl space-y-12 text-stone-700 leading-relaxed">

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">1. Verantwortlicher</h2>
            <p className="mb-4">
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer
              nationaler Datenschutzgesetze ist:
            </p>
            <div className="rounded-xl bg-brand-cream p-6 space-y-1">
              <p className="font-semibold text-stone-900">{NAP.legalName}</p>
              {NAP.street && NAP.zip ? (
                <>
                  <p>{NAP.street}</p>
                  <p>
                    {NAP.zip} {NAP.city}
                  </p>
                </>
              ) : (
                <p>{NAP.city}</p>
              )}
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
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">
              2. Welche Daten wir erheben
            </h2>
            <p className="mb-4">
              Beim Besuch unserer Website werden automatisch technische Informationen durch Ihren
              Browser übermittelt. Diese beinhalten:
            </p>
            <ul className="space-y-2 pl-4">
              {[
                "IP-Adresse des anfragenden Geräts (anonymisiert)",
                "Datum und Uhrzeit des Zugriffs",
                "Name und URL der abgerufenen Datei",
                "Übertragene Datenmenge",
                "Browsertyp und -version",
                "Betriebssystem des Nutzers",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-stone-600">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-stone-600">
              Diese Daten werden temporär in Server-Logs gespeichert und nicht mit anderen
              personenbezogenen Daten zusammengeführt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
              DSGVO (berechtigtes Interesse an der Sicherheit und Funktionsfähigkeit der Website).
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">3. Kontaktformulare (Resend)</h2>
            <p className="mb-4">
              Unsere Website verwendet Kontakt- und Bewerbungsformulare. Die Daten aus diesen
              Formularen werden an unseren Email-Dienst Resend übermittelt, um Ihnen eine E-Mail-Bestätigung
              zu senden.
            </p>
            <p className="mb-4">
              Folgende Daten können je nach Formular erhoben werden:
            </p>
            <ul className="space-y-2 pl-4">
              {[
                "Name und Ansprechperson",
                "E-Mail-Adresse",
                "Telefonnummer (optional)",
                "Website-Adresse",
                "Unternehmensname",
                "Nachrichteninhalt und weitere Formularfelder",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-stone-600">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-stone-600">
              Die Übermittlung erfolgt verschlüsselt über sichere API-Verbindungen. Resend verarbeitet
              E-Mail-Daten auf Servern innerhalb der EU und der USA gemäß EU-Standardvertragsklauseln.
              Weitere Informationen finden Sie in der{" "}
              <a
                href="https://resend.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue hover:underline underline-offset-2"
              >
                Datenschutzerklärung von Resend
              </a>
              .
            </p>
            <p className="mt-4 text-stone-600">
              Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung)
              sowie Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch Absenden des Formulars).
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">
              4. Cookies und Local Storage
            </h2>
            <p className="mb-4">
              Unsere Website verwendet technisch notwendige Cookies und den Local Storage des
              Browsers, um grundlegende Funktionen bereitstellen zu können.
            </p>
            <div className="rounded-xl bg-brand-cream p-6 space-y-3">
              <div>
                <p className="font-semibold text-stone-900">Einwilligung (Consent-Management)</p>
                <p className="text-sm text-stone-600 mt-1">
                  Wir speichern Ihre Cookie-Präferenzen im Local Storage des Browsers. Diese Daten
                  verlassen Ihr Gerät nicht und werden nicht an Server übertragen. Speicherdauer:
                  12 Monate oder bis zur manuellen Löschung.
                </p>
              </div>
            </div>
            <p className="mt-4 text-stone-600">
              Rechtsgrundlage für technisch notwendige Cookies ist Art. 6 Abs. 1 lit. f DSGVO.
              Für optionale Cookies holen wir Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO
              ein.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">5. Externe Medien</h2>
            <p className="mb-4">
              Unsere Website bindet in einigen Bereichen externe Medien ein (z. B. Kartenanzeigen
              über Google Maps, eingebettete Karten). Diese Inhalte werden nur nach Ihrer
              ausdrücklichen Einwilligung geladen.
            </p>
            <p className="text-stone-600">
              Beim Laden externer Inhalte wird Ihre IP-Adresse an den jeweiligen Anbieter
              übertragen. Wir haben keinen Einfluss auf die Datenverarbeitung durch diese Anbieter.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">6. Ihre Rechte</h2>
            <p className="mb-4">
              Sie haben gemäß DSGVO folgende Rechte gegenüber uns bezüglich der Sie betreffenden
              personenbezogenen Daten:
            </p>
            <ul className="space-y-3">
              {[
                {
                  title: "Recht auf Auskunft",
                  text: "Sie können Auskunft über die von uns verarbeiteten personenbezogenen Daten verlangen (Art. 15 DSGVO).",
                },
                {
                  title: "Recht auf Berichtigung",
                  text: "Sie können die Berichtigung unrichtiger Daten verlangen (Art. 16 DSGVO).",
                },
                {
                  title: "Recht auf Löschung",
                  text: "Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen (Art. 17 DSGVO).",
                },
                {
                  title: "Recht auf Einschränkung der Verarbeitung",
                  text: "Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen (Art. 18 DSGVO).",
                },
                {
                  title: "Recht auf Datenübertragbarkeit",
                  text: "Sie können verlangen, dass wir Ihnen Ihre Daten in einem strukturierten Format übermitteln (Art. 20 DSGVO).",
                },
                {
                  title: "Recht auf Widerspruch",
                  text: "Sie können der Verarbeitung Ihrer Daten widersprechen, wenn diese auf berechtigtem Interesse beruht (Art. 21 DSGVO).",
                },
                {
                  title: "Recht auf Widerruf",
                  text: "Sofern die Verarbeitung auf einer Einwilligung beruht, können Sie diese jederzeit widerrufen.",
                },
                {
                  title: "Beschwerderecht bei Aufsichtsbehörde",
                  text: "Sie haben das Recht, sich bei der zuständigen Datenschutzaufsichtsbehörde zu beschweren.",
                },
              ].map((right) => (
                <li key={right.title} className="rounded-xl bg-brand-cream p-4">
                  <p className="font-semibold text-stone-900">{right.title}</p>
                  <p className="mt-1 text-sm text-stone-600">{right.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-stone-600">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
              <a
                href={`mailto:${NAP.email}`}
                className="text-brand-blue hover:underline underline-offset-2"
              >
                {NAP.email}
              </a>
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">7. Hosting (Netlify)</h2>
            <p className="mb-4">
              Diese Website wird bei Netlify, Inc., 512 2nd Street, Suite 200, San Francisco,
              CA 94107, USA gehostet. Netlify ist als Auftragsverarbeiter für uns tätig und
              verarbeitet technische Verbindungsdaten (z. B. IP-Adresse, Zugriffszeiten) im
              Rahmen des Hostingbetriebs.
            </p>
            <p className="mb-4 text-stone-600">
              Die Datenübertragung in die USA erfolgt auf Grundlage der EU-Standardvertragsklauseln
              gemäß Art. 46 Abs. 2 lit. c DSGVO. Weitere Informationen finden Sie in der{" "}
              <a
                href="https://www.netlify.com/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue hover:underline underline-offset-2"
              >
                Datenschutzerklärung von Netlify
              </a>
              .
            </p>
            <p className="text-stone-600">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem
              zuverlässigen und sicheren Betrieb der Website).
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">8. Änderungen dieser Erklärung</h2>
            <p className="text-stone-600">
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich die
              Rechtslage oder unser Angebot ändert. Die aktuelle Version ist stets unter{" "}
              <a
                href="/datenschutz"
                className="text-brand-blue hover:underline underline-offset-2"
              >
                meineanzeige.online/datenschutz
              </a>{" "}
              abrufbar.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
