"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { NAP, NAV_LINKS } from "@/lib/constants";

function FooterCookieButton() {
  const handleClick = () => {
    window.dispatchEvent(new Event("mao:open-consent"));
  };

  return (
    <button
      onClick={handleClick}
      className="text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:underline"
    >
      Cookie-Einstellungen
    </button>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0d1f3c] text-white">
      <div className="mx-auto max-w-[1280px] px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-brand-blue-light">
                MAO
              </span>
              <span className="text-xs font-medium text-gray-400">
                Meine Anzeige Online
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Hamburgs Partnernetzwerk für geprüfte Unternehmen.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={NAP.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-brand-blue-light focus:outline-none focus-visible:underline"
              >
                <ExternalLink size={12} />
                meineanzeige.online
              </a>
            </div>
          </div>

          <nav aria-label="Footer Navigation">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500" aria-hidden="true">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Rechtliche Links">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500" aria-hidden="true">
              Rechtliches
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/impressum"
                  className="text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:underline"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:underline"
                >
                  Datenschutzerklärung
                </Link>
              </li>
              <li>
                <Link
                  href="/agb"
                  className="text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:underline"
                >
                  AGB
                </Link>
              </li>
              <li>
                <FooterCookieButton />
              </li>
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500" aria-hidden="true">
              Kontakt
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${NAP.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-2.5 text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:underline"
                >
                  <Phone size={14} className="mt-0.5 flex-shrink-0 text-brand-blue-light" />
                  <span>{NAP.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${NAP.email}`}
                  className="flex items-start gap-2.5 text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:underline"
                >
                  <Mail size={14} className="mt-0.5 flex-shrink-0 text-brand-blue-light" />
                  <span className="break-all">{NAP.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-sm text-gray-400">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0 text-brand-blue-light" />
                  <span>{NAP.city}, Deutschland</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-gray-500">
            &copy; {NAP.foundedYear} {NAP.legalName}. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-gray-600">
            Gegründet von{" "}
            {NAP.founders.map((f, i) => (
              <span key={f.partnerSlug}>
                {i > 0 && " & "}
                <Link
                  href={`/partner/${f.partnerSlug}`}
                  className="text-gray-500 transition-colors hover:text-gray-300 focus:outline-none focus-visible:underline"
                >
                  {f.name}
                </Link>
              </span>
            ))}
          </p>
        </div>

        <div className="text-center mt-6 pt-6 border-t border-white/10">
          <p style={{ color: '#6b7280', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ marginRight: '0.5rem', color: '#9ca3af' }}>Erstellt mit</span>
            <a
              href="https://formellavision.de"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(to right, #00D4FF, #8B5CF6, #FF6B35)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Formella Vision
            </a>
            <span style={{
              marginLeft: '0.5rem',
              color: '#00D4FF',
            }}>
              ✨
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
