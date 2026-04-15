import type { Metadata } from "next";
import { buildMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import { SITE_URL, NAP } from "@/lib/constants";
import Link from "next/link";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Allgemeine Geschäftsbedingungen",
    description:
      "Allgemeine Geschäftsbedingungen (AGB) von Meine Anzeige Online für die Nutzung der Plattform und die Mitgliedschaft im Partnernetzwerk.",
    path: "/agb",
  });
}

export default function AGBPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Startseite", url: SITE_URL },
    { name: "AGB", url: `${SITE_URL}/agb` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="bg-brand-cream pt-28 pb-12 px-4" aria-label="Seiteneinführung">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            Rechtliche Informationen
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Allgemeine Geschäftsbedingungen
          </h1>
          <p className="mt-4 text-stone-600">
            Stand: April 2025
          </p>
        </div>
      </section>

      <section className="bg-white py-16 px-4" aria-label="AGB Inhalt">
        <div className="mx-auto max-w-3xl space-y-12 text-stone-700 leading-relaxed">

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">§ 1 Geltungsbereich und Anbieter</h2>
            <p className="mb-4">
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der Online-Plattform
              „Meine Anzeige Online" (MAO), erreichbar unter{" "}
              <a href="https://meineanzeige.online" className="text-brand-blue hover:underline">
                meineanzeige.online
              </a>
              , sowie für die Mitgliedschaft im MAO-Partnernetzwerk.
            </p>
            <p className="mb-4">
              Anbieter und Vertragspartner ist:
            </p>
            <div className="rounded-xl bg-brand-cream p-5 space-y-1 text-sm">
              <p className="font-semibold">{NAP.legalName}</p>
              <p>Betrieben durch: Michael Wolfsohn (Physiowohltat)</p>
              <p>{NAP.street}</p>
              <p>{NAP.zip} {NAP.city}</p>
              <p>E-Mail: <a href={`mailto:${NAP.email}`} className="text-brand-blue hover:underline">{NAP.email}</a></p>
              <p>Telefon: {NAP.phone}</p>
            </div>
            <p className="mt-4">
              Die Nutzung der Plattform richtet sich an Unternehmer im Sinne des § 14 BGB sowie
              an Privatpersonen, die lokale Unternehmen und Dienstleister in Hamburg und Umgebung
              suchen. Mit der Nutzung der Plattform oder der Bewerbung als Partner akzeptieren
              Sie diese AGB.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">§ 2 Leistungsbeschreibung</h2>
            <p className="mb-4">
              Meine Anzeige Online betreibt ein kuratiertes lokales Partnernetzwerk in Hamburg
              und Umgebung. Die Plattform bietet folgende Leistungen:
            </p>
            <ul className="space-y-2 pl-4">
              {[
                "Öffentlich zugängliches Verzeichnis geprüfter lokaler Unternehmen und Selbstständiger",
                "Suchfunktion und Filterung nach Kategorie und Bezirk",
                "Profilseiten für Partnerbetriebe mit Kontaktmöglichkeit",
                "Informationen zu Netzwerkveranstaltungen in Hamburg",
                "Bewerbungsformular für Interessenten am Partnernetzwerk",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-stone-600">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Die Plattform ist derzeit kostenlos zugänglich. MAO behält sich vor, künftig
              kostenpflichtige Leistungen einzuführen. Bestehende Partner werden hierüber
              rechtzeitig informiert.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">§ 3 Partneraufnahme und Mitgliedschaft</h2>

            <h3 className="text-base font-semibold text-stone-800 mb-2">3.1 Voraussetzungen</h3>
            <p className="mb-4">
              Die Aufnahme in das MAO-Partnernetzwerk setzt voraus:
            </p>
            <ul className="space-y-2 pl-4 mb-4">
              {[
                "Persönliche Empfehlung durch ein bestehendes MAO-Mitglied",
                "Vollständig ausgefülltes Bewerbungsformular",
                "Positives Ergebnis eines Website-Audits durch MAO",
                "Persönliches Kennenlerngespräch mit MAO",
                "Erfolgreiche Absolvierung einer Probezeit von drei Monaten",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-stone-600">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="text-base font-semibold text-stone-800 mb-2">3.2 Kein Anspruch auf Aufnahme</h3>
            <p className="mb-4">
              Die Einreichung einer Bewerbung begründet keinen Anspruch auf Aufnahme in das
              Partnernetzwerk. MAO behält sich vor, Bewerbungen ohne Angabe von Gründen
              abzulehnen.
            </p>

            <h3 className="text-base font-semibold text-stone-800 mb-2">3.3 Pflichten der Partner</h3>
            <p className="mb-4">
              Mit der Aufnahme als Partner verpflichtet sich das jeweilige Unternehmen:
            </p>
            <ul className="space-y-2 pl-4 mb-4">
              {[
                "Nur korrekte und aktuelle Informationen über das eigene Unternehmen bereitzustellen",
                "Änderungen der Kontaktdaten, Leistungen oder des Standorts unverzüglich mitzuteilen",
                "Die Grundsätze des Netzwerks (Qualität, Vertrauen, gegenseitige Unterstützung) zu wahren",
                "Nur Unternehmen zu empfehlen, für deren Seriosität und Qualität man persönlich einsteht",
                "An mindestens einer MAO-Veranstaltung pro Quartal teilzunehmen (soweit möglich)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-stone-600">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="text-base font-semibold text-stone-800 mb-2">3.4 Kündigung und Ausschluss</h3>
            <p>
              Die Mitgliedschaft kann von beiden Seiten jederzeit ohne Angabe von Gründen mit
              einer Frist von vier Wochen zum Monatsende beendet werden. MAO behält sich das
              Recht vor, Partner bei schwerwiegenden Verstößen gegen diese AGB oder die Grundsätze
              des Netzwerks fristlos auszuschließen. Nach Beendigung der Mitgliedschaft wird das
              Partnerprofil von der Plattform entfernt.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">§ 4 Nutzung der Plattform durch Besucher</h2>
            <p className="mb-4">
              Die öffentliche Nutzung der Plattform — insbesondere das Durchsuchen des
              Partnerverzeichnisses und die Kontaktaufnahme mit Partnerbetrieben — ist ohne
              Registrierung möglich und kostenlos.
            </p>
            <p className="mb-4">
              Nutzer verpflichten sich, die Plattform nicht für folgende Zwecke zu verwenden:
            </p>
            <ul className="space-y-2 pl-4">
              {[
                "Versendung von unerwünschten Nachrichten (Spam) über die Kontaktformulare",
                "Automatisiertes Auslesen von Inhalten (Scraping) ohne ausdrückliche Genehmigung",
                "Verbreitung falscher oder irreführender Informationen über MAO oder Partnerbetriebe",
                "Handlungen, die die Funktionalität der Plattform beeinträchtigen",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-stone-600">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">§ 5 Inhalte und Verantwortlichkeit</h2>

            <h3 className="text-base font-semibold text-stone-800 mb-2">5.1 Partnerprofile</h3>
            <p className="mb-4">
              Die Inhalte der Partnerprofile (Beschreibungen, Leistungen, Kontaktdaten, Bilder)
              werden von den jeweiligen Partnern bereitgestellt. MAO überprüft diese Inhalte im
              Rahmen des Aufnahmeprozesses, übernimmt jedoch keine Garantie für deren vollständige
              Richtigkeit, Aktualität oder Vollständigkeit.
            </p>

            <h3 className="text-base font-semibold text-stone-800 mb-2">5.2 Eigene Inhalte</h3>
            <p className="mb-4">
              Durch die Bereitstellung von Inhalten (Texte, Bilder, Logos) für das Partnerprofil
              räumt der Partner MAO das nicht-exklusive, zeitlich auf die Dauer der Mitgliedschaft
              beschränkte Recht ein, diese Inhalte auf der Plattform zu nutzen und darzustellen.
            </p>

            <h3 className="text-base font-semibold text-stone-800 mb-2">5.3 Urheberrecht</h3>
            <p>
              Alle Inhalte der Plattform, die durch MAO selbst erstellt wurden (Design, Texte,
              Grafiken, Struktur), sind urheberrechtlich geschützt. Eine Vervielfältigung oder
              Verwendung ohne ausdrückliche Genehmigung ist untersagt.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">§ 6 Empfehlungen und Haftung</h2>
            <p className="mb-4">
              MAO vermittelt keine Verträge zwischen Besuchern und Partnerbetrieben und ist
              nicht Partei von Vereinbarungen, die zwischen Nutzern und Partnerbetrieben
              geschlossen werden. MAO übernimmt keine Haftung für:
            </p>
            <ul className="space-y-2 pl-4 mb-4">
              {[
                "Die Qualität, Sicherheit oder Rechtmäßigkeit der Leistungen von Partnerbetrieben",
                "Die Erfüllung von Vereinbarungen zwischen Nutzern und Partnerbetrieben",
                "Schäden, die aus der Kontaktaufnahme mit oder der Beauftragung von Partnerbetrieben entstehen",
                "Die Richtigkeit von Angaben in Partnerprofilen",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-stone-600">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue" />
                  {item}
                </li>
              ))}
            </ul>
            <p>
              Die Aufnahme in das MAO-Netzwerk stellt eine persönliche Empfehlung dar, ersetzt
              jedoch nicht die eigene Prüfung durch den Auftraggeber. Nutzer sind angehalten,
              sich vor Vertragsschluss selbst von der Eignung des jeweiligen Partnerbetriebs
              zu überzeugen.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">§ 7 Haftungsbeschränkung</h2>
            <p className="mb-4">
              MAO haftet nur für Schäden, die auf einer vorsätzlichen oder grob fahrlässigen
              Pflichtverletzung durch MAO, seine gesetzlichen Vertreter oder Erfüllungsgehilfen
              beruhen.
            </p>
            <p className="mb-4">
              Bei einfacher Fahrlässigkeit haftet MAO nur bei Verletzung einer wesentlichen
              Vertragspflicht (Kardinalpflicht), und nur in Höhe des vorhersehbaren, typischen
              Schadens.
            </p>
            <p>
              Die vorstehenden Haftungsbeschränkungen gelten nicht bei Verletzung von Leben,
              Körper oder Gesundheit sowie bei Ansprüchen nach dem Produkthaftungsgesetz.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">§ 8 Verfügbarkeit der Plattform</h2>
            <p>
              MAO ist bemüht, die Plattform dauerhaft verfügbar zu halten, übernimmt jedoch
              keine Garantie für eine ununterbrochene Verfügbarkeit. Wartungsarbeiten,
              technische Störungen oder höhere Gewalt können zu vorübergehenden Einschränkungen
              führen. MAO haftet nicht für Schäden, die aus einer vorübergehenden Nichtverfügbarkeit
              der Plattform entstehen.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">§ 9 Datenschutz</h2>
            <p>
              Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer{" "}
              <Link href="/datenschutz" className="text-brand-blue hover:underline">
                Datenschutzerklärung
              </Link>
              . Diese ist Bestandteil dieser AGB.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">§ 10 Änderungen der AGB</h2>
            <p className="mb-4">
              MAO behält sich vor, diese AGB jederzeit mit Wirkung für die Zukunft zu ändern.
              Änderungen werden auf der Plattform veröffentlicht und bestehenden Partnern per
              E-Mail mitgeteilt. Die geänderten AGB gelten als akzeptiert, wenn der Partner
              nicht innerhalb von vier Wochen nach Bekanntgabe schriftlich widerspricht.
            </p>
            <p>
              Im Falle eines Widerspruchs ist MAO berechtigt, die Mitgliedschaft zum Ende
              des laufenden Monats zu beenden.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-900">§ 11 Schlussbestimmungen</h2>

            <h3 className="text-base font-semibold text-stone-800 mb-2">11.1 Anwendbares Recht</h3>
            <p className="mb-4">
              Es gilt das Recht der Bundesrepublik Deutschland. Bei Verträgen mit Verbrauchern
              gelten zwingend anwendbare Verbraucherschutzvorschriften des Wohnsitzlandes des
              Verbrauchers.
            </p>

            <h3 className="text-base font-semibold text-stone-800 mb-2">11.2 Gerichtsstand</h3>
            <p className="mb-4">
              Für Streitigkeiten mit Unternehmern ist ausschließlicher Gerichtsstand der Sitz
              von MAO. Bei Streitigkeiten mit Verbrauchern gelten die gesetzlichen
              Gerichtsstandsregelungen.
            </p>

            <h3 className="text-base font-semibold text-stone-800 mb-2">11.3 Salvatorische Klausel</h3>
            <p>
              Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die
              Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen
              Bestimmung tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck der
              unwirksamen Regelung möglichst nahekommt.
            </p>
          </div>

          <div className="pt-8 border-t border-stone-200 space-y-2">
            <Link href="/impressum" className="block text-brand-blue hover:underline text-sm">
              → Zum Impressum
            </Link>
            <Link href="/datenschutz" className="block text-brand-blue hover:underline text-sm">
              → Zur Datenschutzerklärung
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
