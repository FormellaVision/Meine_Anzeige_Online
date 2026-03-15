"use client";

import { useState } from "react";
import { Send, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

function isValidRecommendedBy(val: string): boolean {
  const trimmed = val.trim();
  return trimmed.toLowerCase() === "nein" || trimmed.length >= 2;
}

interface ContactFormProps {
  partnerName: string;
  partnerSlug: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
  privacy: boolean;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  privacy: false,
};

export default function ContactForm({ partnerName, partnerSlug }: ContactFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [recommendedBy, setRecommendedBy] = useState("");
  const [recommendedByError, setRecommendedByError] = useState<string | null>(null);

  const inputClass = cn(
    "w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900",
    "placeholder:text-stone-400 transition-colors duration-150",
    "focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20",
    "hover:border-stone-300"
  );

  const labelClass = "block text-sm font-semibold text-stone-700 mb-1.5";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

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
      const response = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          message: form.message,
          recommendedBy,
          "partner-name": partnerName,
          "partner-slug": partnerSlug,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setPreviewMode(data.mode === "preview");
        setSubmitted(true);
        setForm(initialState);
        setRecommendedBy("");
      } else {
        throw new Error(data.error ?? "HTTP " + response.status);
      }
    } catch {
      setError(
        "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut."
      );
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
            Vielen Dank für Ihre Anfrage. {partnerName} wird sich in Kürze bei Ihnen melden.
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
      name="partner-contact"
      method="POST"
      action="/danke"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <input type="hidden" name="form-name" value="partner-contact" />
      <input type="hidden" name="partner-name" value={partnerName} />
      <input type="hidden" name="partner-slug" value={partnerSlug} />
      <div className="hidden" aria-hidden="true">
        <input name="bot-field" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Ihr Name <span className="text-brand-blue">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
            placeholder="Max Mustermann"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            E-Mail-Adresse <span className="text-brand-blue">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            placeholder="max@beispiel.de"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-phone" className={labelClass}>
          Telefonnummer{" "}
          <span className="text-xs font-normal text-stone-400">(optional)</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          autoComplete="tel"
          placeholder="+49 40 1234567"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Ihre Nachricht <span className="text-brand-blue">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder={`Hallo ${partnerName},\n\nich interessiere mich für …`}
          className={cn(inputClass, "resize-y min-h-[120px]")}
        />
      </div>

      <div>
        <label htmlFor="contact-recommended-by" className={labelClass}>
          Weiterempfohlen von <span className="text-brand-blue">*</span>
        </label>
        <input
          id="contact-recommended-by"
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

      <div className="flex items-start gap-3 rounded-xl border border-stone-100 bg-stone-50 p-4">
        <input
          id="contact-privacy"
          type="checkbox"
          name="privacy"
          checked={form.privacy}
          onChange={handleChange}
          required
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-stone-300 accent-brand-blue"
        />
        <label htmlFor="contact-privacy" className="cursor-pointer text-xs leading-relaxed text-stone-600">
          Ich habe die{" "}
          <a
            href="/datenschutz"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-blue hover:underline"
          >
            Datenschutzerklärung
          </a>{" "}
          gelesen und stimme der Verarbeitung meiner Daten zu.{" "}
          <span className="text-brand-blue">*</span>
        </label>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-500" />
          <div>
            <p className="text-sm font-medium text-red-800">{error}</p>
            <p className="mt-1 text-xs text-red-600">
              Alternativ:{" "}
              <a
                href="mailto:info@meineanzeige.online"
                className="font-semibold underline"
              >
                E-Mail schreiben
              </a>
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
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
      </div>
    </form>
  );
}
