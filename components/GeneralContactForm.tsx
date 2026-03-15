"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

function isValidRecommendedBy(val: string): boolean {
  const trimmed = val.trim();
  return trimmed.toLowerCase() === "nein" || trimmed.length >= 2;
}

export default function GeneralContactForm() {
  const [charCount, setCharCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [recommendedBy, setRecommendedBy] = useState("");
  const [recommendedByError, setRecommendedByError] = useState<string | null>(null);

  const inputClass =
    "w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20";

  const handleRecommendedByBlur = () => {
    if (recommendedBy.trim() && !isValidRecommendedBy(recommendedBy)) {
      setRecommendedByError("Bitte Name (min. 2 Zeichen) oder 'Nein' eintragen.");
    } else {
      setRecommendedByError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidRecommendedBy(recommendedBy)) {
      setRecommendedByError("Bitte Name (min. 2 Zeichen) oder 'Nein' eintragen.");
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
      const response = await fetch("/api/forms/general-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone") || undefined,
          subject: formData.get("subject"),
          message: formData.get("message"),
          recommendedBy,
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
      setError("Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-green-100 bg-green-50 px-8 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 size={28} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-stone-900">Nachricht gesendet!</h3>
        {previewMode ? (
          <p className="mt-2 max-w-sm text-sm text-amber-700 font-medium">
            Gesendet (Preview-Modus) — wird lokal protokolliert.
          </p>
        ) : (
          <p className="mt-2 max-w-sm text-sm text-stone-600">
            Vielen Dank für Ihre Nachricht. Wir melden uns so schnell wie möglich bei Ihnen.
          </p>
        )}
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:underline"
        >
          Neue Nachricht senden
        </button>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      action="/danke"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <input type="hidden" name="form-name" value="contact" />
      <div className="hidden" aria-hidden="true">
        <input name="bot-field" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-semibold text-stone-700"
          >
            Name <span className="text-brand-blue">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Ihr vollständiger Name"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-semibold text-stone-700"
          >
            E-Mail-Adresse <span className="text-brand-blue">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="ihre@email.de"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-phone"
          className="mb-1.5 block text-sm font-semibold text-stone-700"
        >
          Telefon{" "}
          <span className="text-xs font-normal text-stone-400">(optional)</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          name="phone"
          autoComplete="tel"
          className={inputClass}
          placeholder="+49 40 123456"
        />
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="mb-1.5 block text-sm font-semibold text-stone-700"
        >
          Betreff <span className="text-brand-blue">*</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          name="subject"
          required
          className={inputClass}
          placeholder="Worum geht es?"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-semibold text-stone-700"
        >
          Nachricht <span className="text-brand-blue">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          onChange={(e) => setCharCount(e.target.value.length)}
          className={cn(inputClass, "resize-none")}
          placeholder="Ihre Nachricht an uns …"
        />
        <p className="mt-1 text-right text-xs text-stone-400">{charCount} / 2000</p>
      </div>

      <div>
        <label
          htmlFor="gcf-recommendedBy"
          className="mb-1.5 block text-sm font-semibold text-stone-700"
        >
          Weiterempfohlen von <span className="text-brand-blue">*</span>
        </label>
        <input
          id="gcf-recommendedBy"
          type="text"
          name="recommendedBy"
          value={recommendedBy}
          onChange={(e) => {
            setRecommendedBy(e.target.value);
            if (recommendedByError && isValidRecommendedBy(e.target.value)) {
              setRecommendedByError(null);
            }
          }}
          onBlur={handleRecommendedByBlur}
          required
          placeholder="Name eines Partners/Mitglieds oder 'Nein'"
          className={cn(
            inputClass,
            recommendedByError ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""
          )}
        />
        {recommendedByError ? (
          <p className="mt-1.5 text-xs text-red-600">{recommendedByError}</p>
        ) : (
          <p className="mt-1.5 text-xs text-stone-400">
            Wenn du über unser Netzwerk kommst, trage bitte den Namen ein. Wenn nicht: &apos;Nein&apos;.
          </p>
        )}
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="privacy"
            required
            className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer rounded border-stone-300 accent-brand-blue"
          />
          <span className="text-sm text-stone-600 leading-relaxed">
            Ich habe die{" "}
            <Link
              href="/datenschutz"
              className="text-brand-blue underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Datenschutzerklärung
            </Link>{" "}
            gelesen und stimme der Verarbeitung meiner Daten zu.{" "}
            <span className="text-brand-blue">*</span>
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
          "w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-colors",
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
            <Send size={14} />
            Nachricht senden
          </>
        )}
      </button>

      <p className="text-center text-xs text-stone-400">
        Pflichtfelder sind mit <span className="text-brand-blue font-semibold">*</span>{" "}
        gekennzeichnet.
      </p>
    </form>
  );
}
