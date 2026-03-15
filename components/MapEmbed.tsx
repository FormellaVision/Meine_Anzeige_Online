"use client";

import { useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";

interface MapEmbedProps {
  googleMapsUrl: string;
  name: string;
}

export default function MapEmbed({ googleMapsUrl, name }: MapEmbedProps) {
  const [consentError, setConsentError] = useState(false);

  const handleShowMap = () => {
    try {
      const raw = localStorage.getItem("mao_consent");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.external_media === true) {
          window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
          setConsentError(false);
          return;
        }
      }
    } catch {
    }
    setConsentError(true);
  };

  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10">
          <MapPin size={26} className="text-brand-blue" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-stone-800">{name}</p>
          <p className="text-xs text-stone-500">
            Kartenansicht bei Google Maps öffnen
          </p>
        </div>
        <button
          type="button"
          onClick={handleShowMap}
          className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-blue-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        >
          <ExternalLink size={14} />
          Karte anzeigen
        </button>
        {consentError && (
          <p className="max-w-xs text-xs leading-relaxed text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5">
            Bitte akzeptieren Sie externe Medien in den Cookie-Einstellungen, um die Karte anzuzeigen.
          </p>
        )}
      </div>
    </div>
  );
}
