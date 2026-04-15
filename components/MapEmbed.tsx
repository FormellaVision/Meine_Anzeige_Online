"use client";

import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

interface MapEmbedProps {
  googleMapsUrl: string;
  name: string;
}

export default function MapEmbed({ googleMapsUrl, name }: MapEmbedProps) {
  const [showMap, setShowMap] = useState(false);
  const [consentError, setConsentError] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mao_consent");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.external_media === true) {
          setShowMap(true);
          setConsentError(false);
        }
      }
    } catch {
    }
  }, []);

  const handleShowMap = () => {
    try {
      const raw = localStorage.getItem("mao_consent");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.external_media === true) {
          setShowMap(true);
          setConsentError(false);
          return;
        }
      }
    } catch {
    }
    setConsentError(true);
  };

  if (showMap) {
    return (
      <div className="rounded-xl border border-stone-200 overflow-hidden">
        <iframe
          src={googleMapsUrl}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10">
          <MapPin size={26} className="text-brand-blue" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-stone-800">{name}</p>
          <p className="text-xs text-stone-500">
            Karte anzeigen nach Cookie-Zustimmung
          </p>
        </div>
        <button
          type="button"
          onClick={handleShowMap}
          className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-blue-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        >
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
