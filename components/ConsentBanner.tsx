"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Lock, Shield } from "lucide-react";
import type { ConsentState } from "@/lib/types";

const CONSENT_KEY = "mao_consent";

const defaultConsent: ConsentState = {
  status: "undecided",
  essential: true,
  external_media: false,
  analytics: false,
};

function loadConsentFromStorage(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (!parsed.status) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveConsentToStorage(state: ConsentState): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  } catch {
  }
}

export function useConsent(): ConsentState {
  const stored = loadConsentFromStorage();
  return stored ?? defaultConsent;
}

interface ToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
  id: string;
}

function Toggle({ checked, onChange, disabled = false, id }: ToggleProps) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={[
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent",
        "transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
        disabled
          ? "cursor-not-allowed opacity-60 bg-gray-300"
          : checked
          ? "bg-brand-blue"
          : "bg-gray-300",
      ].join(" ")}
    >
      <span
        className={[
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          checked ? "translate-x-5" : "translate-x-0",
        ].join(" ")}
      />
    </button>
  );
}

interface SettingsModalProps {
  draft: ConsentState;
  onDraftChange: (state: ConsentState) => void;
  onSave: () => void;
  onClose: () => void;
}

function SettingsModal({ draft, onDraftChange, onSave, onClose }: SettingsModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="consent-settings-title"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2
            id="consent-settings-title"
            className="text-lg font-semibold text-gray-900"
          >
            Cookie-Einstellungen
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            aria-label="Einstellungen schließen"
          >
            <X size={18} />
          </button>
        </div>

        <div className="divide-y divide-gray-100 px-6 py-2">
          <div className="flex items-start gap-4 py-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <label htmlFor="toggle-essential" className="font-medium text-gray-900">
                  Notwendige Cookies
                </label>
                <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                  <Lock size={10} />
                  Immer aktiv
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Diese Cookies sind für den Betrieb der Website unbedingt erforderlich und können nicht deaktiviert werden.
              </p>
            </div>
            <div className="flex-shrink-0 pt-0.5">
              <Toggle
                id="toggle-essential"
                checked={true}
                onChange={() => {}}
                disabled={true}
              />
            </div>
          </div>

          <div className="flex items-start gap-4 py-4">
            <div className="flex-1">
              <label htmlFor="toggle-external-media" className="font-medium text-gray-900">
                Externe Medien
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Ermöglicht das Laden externer Inhalte wie Google Maps oder eingebettete Videos von Drittanbietern.
              </p>
            </div>
            <div className="flex-shrink-0 pt-0.5">
              <Toggle
                id="toggle-external-media"
                checked={draft.external_media}
                onChange={(val) =>
                  onDraftChange({ ...draft, external_media: val })
                }
              />
            </div>
          </div>

          <div className="flex items-start gap-4 py-4">
            <div className="flex-1">
              <label htmlFor="toggle-analytics" className="font-medium text-gray-900">
                Analyse & Statistiken
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Hilft uns zu verstehen, wie Besucher die Website nutzen, damit wir das Angebot verbessern können. Alle Daten werden anonymisiert verarbeitet.
              </p>
            </div>
            <div className="flex-shrink-0 pt-0.5">
              <Toggle
                id="toggle-analytics"
                checked={draft.analytics}
                onChange={(val) =>
                  onDraftChange({ ...draft, analytics: val })
                }
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Shield size={12} />
            <span>DSGVO-konform</span>
          </div>
          <button
            onClick={onSave}
            className="rounded-full bg-brand-blue px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-blue/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            Einstellungen speichern
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentState>({
    ...defaultConsent,
  });

  useEffect(() => {
    const stored = loadConsentFromStorage();
    if (stored && stored.status !== "undecided") {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const handleOpenConsent = () => {
      setSettingsOpen(true);
      setVisible(true);
    };
    window.addEventListener("mao:open-consent", handleOpenConsent);
    return () => window.removeEventListener("mao:open-consent", handleOpenConsent);
  }, []);

  const acceptAll = useCallback(() => {
    const state: ConsentState = {
      status: "accepted_all",
      essential: true,
      external_media: true,
      analytics: true,
    };
    saveConsentToStorage(state);
    setVisible(false);
    setSettingsOpen(false);
  }, []);

  const rejectAll = useCallback(() => {
    const state: ConsentState = {
      status: "rejected_all",
      essential: true,
      external_media: false,
      analytics: false,
    };
    saveConsentToStorage(state);
    setVisible(false);
    setSettingsOpen(false);
  }, []);

  const saveCustom = useCallback(() => {
    const isAll = draft.external_media && draft.analytics;
    const isNone = !draft.external_media && !draft.analytics;
    const state: ConsentState = {
      ...draft,
      essential: true,
      status: isAll ? "accepted_all" : isNone ? "rejected_all" : "custom",
    };
    saveConsentToStorage(state);
    setVisible(false);
    setSettingsOpen(false);
  }, [draft]);

  const openSettings = useCallback(() => {
    const stored = loadConsentFromStorage();
    if (stored && stored.status !== "undecided") {
      setDraft({
        ...stored,
        essential: true,
      });
    } else {
      setDraft({ ...defaultConsent });
    }
    setSettingsOpen(true);
  }, []);

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
  }, []);

  if (!visible) return null;

  return (
    <>
      {settingsOpen && (
        <SettingsModal
          draft={draft}
          onDraftChange={setDraft}
          onSave={saveCustom}
          onClose={closeSettings}
        />
      )}

      {!settingsOpen && (
        <div
          role="region"
          aria-label="Cookie-Einwilligung"
          className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  Wir verwenden Cookies
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  Wir verwenden Cookies, um Ihnen das beste Erlebnis zu bieten. Externe Medien (z.&thinsp;B. Karten) werden nur mit Ihrer Zustimmung geladen.{" "}
                  <a
                    href="/datenschutz"
                    className="underline underline-offset-2 hover:text-brand-blue transition-colors"
                  >
                    Datenschutzerklärung
                  </a>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap sm:flex-shrink-0">
                <button
                  onClick={acceptAll}
                  className="rounded-full bg-brand-blue px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-blue/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 whitespace-nowrap"
                >
                  Alle akzeptieren
                </button>
                <button
                  onClick={rejectAll}
                  className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 whitespace-nowrap"
                >
                  Alle ablehnen
                </button>
                <button
                  onClick={openSettings}
                  className="px-3 py-2 text-sm font-medium text-brand-blue underline-offset-2 transition-colors hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 whitespace-nowrap"
                >
                  Einstellungen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
