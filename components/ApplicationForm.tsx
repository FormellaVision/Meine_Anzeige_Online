"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category, Area } from "@/lib/types";

interface ApplicationFormProps {
  categories: Category[];
  areas: Area[];
}

const OTHER_CATEGORY = "other";
const OTHER_AREA = "other";

function isValidRecommendedBy(val: string): boolean {
  const trimmed = val.trim();
  return trimmed.toLowerCase() === "nein" || trimmed.length >= 2;
}

export default function ApplicationForm({ categories, areas }: ApplicationFormProps) {
  const [pitchLength, setPitchLength] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [referredBy, setReferredBy] = useState("");
  const [referredByError, setReferredByError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [customArea, setCustomArea] = useState("");

  const inputClass = cn(
    "w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900",
    "placeholder:text-stone-400 transition-colors duration-150",
    "focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20",
    "hover:border-stone-300"
  );
  const labelClass = "mb-1.5 block text-sm font-semibold text-stone-700";

  const handleReferredByBlur = () => {
    if (referredBy.trim() && !isValidRecommendedBy(referredBy)) {
      setReferredByError("Bitte Name (min. 2 Zeichen) oder 'Nein' eintragen.");
    } else {
      setReferredByError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidRecommendedBy(referredBy)) {
      setReferredByError("Bitte Name (min. 2 Zeichen) oder 'Nein' eintragen.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const formEl = e.currentTarget;
    const honeypot = (formEl.querySelector('[name="bot-field"]') as HTMLInputElement)?.value;
    if (honeypot) {
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData(formEl);
      const categorySlug = selectedCategory === OTHER_CATEGORY ? customCategory : selectedCategory;
      const areaSlug = selectedArea === OTHER_AREA ? customArea : selectedArea;

      const response = await fetch("/api/forms/partner-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: formData.get("companyName"),
          contactName: formData.get("contactName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          website: formData.get("website"),
          categorySlug,
          areaSlug,
          shortPitch: formData.get("shortPitch"),
          referredBy,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setPreviewMode(data.mode === "preview");
        setSubmitted(true);
      } else {
        throw new Error(data.error ?? "HTTP " + response.status);
      }
    } catch {
      setError(
        "Die Bewerbung konnte nicht gesendet werden. Bitte versuchen Sie es erneut."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-green-100 bg-green-50 px-8 py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 size={32} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-stone-900">Bewerbung eingegangen!</h3>
        {previewMode ? (
          <p className="mt-3 max-w-md text-base text-amber-700 font-medium leading-relaxed">
            Gesendet (Preview-Modus) — wird lokal protokolliert.
          </p>
        ) : (
          <p className="mt-3 max-w-md text-base text-stone-600 leading-relaxed">
            Vielen Dank für Ihre Bewerbung. Wir melden uns innerhalb von 3–5 Werktagen bei Ihnen.
          </p>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/partner"
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
          >
            Partner entdecken
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      name="partner-application"
      method="POST"
      action="/danke"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-stone-100 bg-white p-8 shadow-sm"
    >
      <input type="hidden" name="form-name" value="partner-application" />
      <div className="hidden" aria-hidden="true">
        <input name="bot-field" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <h3 className="text-lg font-bold text-stone-900">Ihr Unternehmen</h3>
        <p className="mt-1 text-sm text-stone-500">
          Erzählen Sie uns von sich und Ihrem Betrieb.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="app-companyName" className={labelClass}>
            Unternehmensname <span className="text-brand-blue">*</span>
          </label>
          <input
            id="app-companyName"
            type="text"
            name="companyName"
            required
            autoComplete="organization"
            placeholder="Muster GmbH"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="app-contactName" className={labelClass}>
            Ansprechperson <span className="text-brand-blue">*</span>
          </label>
          <input
            id="app-contactName"
            type="text"
            name="contactName"
            required
            autoComplete="name"
            placeholder="Max Mustermann"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="app-email" className={labelClass}>
            E-Mail-Adresse <span className="text-brand-blue">*</span>
          </label>
          <input
            id="app-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="max@beispiel.de"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="app-phone" className={labelClass}>
            Telefon <span className="text-brand-blue">*</span>
          </label>
          <input
            id="app-phone"
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            placeholder="+49 40 123456"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="app-website" className={labelClass}>
          Website-Adresse <span className="text-brand-blue">*</span>
        </label>
        <input
          id="app-website"
          type="url"
          name="website"
          required
          autoComplete="url"
          placeholder="https://www.ihr-unternehmen.de"
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="app-categorySlug" className={labelClass}>
            Branche / Kategorie <span className="text-brand-blue">*</span>
          </label>
          <div className="relative">
            <select
              id="app-categorySlug"
              name="categorySlug"
              required
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={cn(inputClass, "appearance-none cursor-pointer pr-9")}
            >
              <option value="" disabled>Bitte wählen …</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>{cat.name}</option>
              ))}
              <option value={OTHER_CATEGORY}>Anderes</option>
            </select>
            <svg className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {selectedCategory === OTHER_CATEGORY && (
            <input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Bitte eintragen …"
              className={cn(inputClass, "mt-3")}
              required={selectedCategory === OTHER_CATEGORY}
            />
          )}
        </div>
        <div>
          <label htmlFor="app-areaSlug" className={labelClass}>
            Firmensitz <span className="text-brand-blue">*</span>
          </label>
          <div className="relative">
            <select
              id="app-areaSlug"
              name="areaSlug"
              required
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className={cn(inputClass, "appearance-none cursor-pointer pr-9")}
            >
              <option value="" disabled>Bitte wählen …</option>
              {areas.map((area) => (
                <option key={area.slug} value={area.slug}>{area.name}</option>
              ))}
              <option value={OTHER_AREA}>Anderes</option>
            </select>
            <svg className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {selectedArea === OTHER_AREA && (
            <input
              type="text"
              value={customArea}
              onChange={(e) => setCustomArea(e.target.value)}
              placeholder="Bitte eintragen …"
              className={cn(inputClass, "mt-3")}
              required={selectedArea === OTHER_AREA}
            />
          )}
        </div>
      </div>

      <div>
        <label htmlFor="app-shortPitch" className={labelClass}>
          Kurze Vorstellung <span className="text-brand-blue">*</span>
        </label>
        <textarea
          id="app-shortPitch"
          name="shortPitch"
          required
          rows={4}
          maxLength={500}
          onChange={(e) => setPitchLength(e.target.value.length)}
          className={cn(inputClass, "resize-none")}
          placeholder="Was machen Sie? Wen bedienen Sie? Was macht Ihr Unternehmen besonders?"
        />
        <p className="mt-1.5 flex justify-between text-xs text-stone-400">
          <span>Maximal 500 Zeichen</span>
          <span className={pitchLength > 480 ? "font-semibold text-amber-600" : ""}>
            {pitchLength} / 500
          </span>
        </p>
      </div>

      <div>
        <label htmlFor="app-referredBy" className={labelClass}>
          Weiterempfohlen von <span className="text-brand-blue">*</span>
        </label>
        <input
          id="app-referredBy"
          type="text"
          name="referredBy"
          value={referredBy}
          onChange={(e) => {
            setReferredBy(e.target.value);
            if (referredByError && isValidRecommendedBy(e.target.value)) {
              setReferredByError(null);
            }
          }}
          onBlur={handleReferredByBlur}
          required
          placeholder="Name eines Partners/Mitglieds oder 'Nein'"
          className={cn(
            inputClass,
            referredByError ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""
          )}
        />
        {referredByError ? (
          <p className="mt-1.5 text-xs text-red-600">{referredByError}</p>
        ) : (
          <p className="mt-1.5 text-xs text-stone-400">
            Wenn du über unser Netzwerk kommst, trage bitte den Namen ein. Wenn nicht: &apos;Nein&apos;.
          </p>
        )}
      </div>

      <div className="rounded-xl bg-brand-cream p-5 space-y-4 border border-brand-blue/10">
        <h4 className="text-sm font-bold text-stone-900">Zustimmungen</h4>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="auditConsent"
            required
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-stone-300 accent-brand-blue"
          />
          <span className="text-sm text-stone-600 leading-relaxed">
            Ich verstehe den Qualitätsstandard und stimme dem Website-Audit zu.{" "}
            <span className="text-brand-blue">*</span>
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="privacy"
            required
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-stone-300 accent-brand-blue"
          />
          <span className="text-sm text-stone-600 leading-relaxed">
            Ich habe die{" "}
            <Link
              href="/datenschutz"
              className="font-semibold text-brand-blue underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Datenschutzerklärung
            </Link>{" "}
            gelesen und stimme zu. <span className="text-brand-blue">*</span>
          </span>
        </label>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-500" />
          <div>
            <p className="text-sm font-medium text-red-800">{error}</p>
            <p className="mt-1 text-xs text-red-600">
              Alternativ:{" "}
              <a href="mailto:info@meineanzeige.online" className="font-semibold underline">
                E-Mail schreiben
              </a>
            </p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
          submitting
            ? "bg-brand-blue/60 cursor-not-allowed"
            : "bg-brand-blue hover:bg-brand-blue/90"
        )}
      >
        {submitting ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Wird gesendet …
          </>
        ) : (
          <>
            <Send size={15} />
            Bewerbung absenden
          </>
        )}
      </button>

      <p className="text-center text-xs text-stone-400">
        Pflichtfelder sind mit <span className="font-semibold text-brand-blue">*</span>{" "}
        gekennzeichnet. Wir melden uns innerhalb von 3–5 Werktagen.
      </p>
    </form>
  );
}
