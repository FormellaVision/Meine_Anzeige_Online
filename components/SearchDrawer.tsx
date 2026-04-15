"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, X, MapPin, Tag } from "lucide-react";
import type { Partner } from "@/lib/types";
import CategoryIcon from "./CategoryIcon";

interface SearchDrawerProps {
  partners: Partner[];
}

function filterPartners(partners: Partner[], query: string): Partner[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return partners
    .filter((p) => {
      if (p.status !== "active") return false;
      if (p.name.toLowerCase().includes(q)) return true;
      if (p.shortDescription.toLowerCase().includes(q)) return true;
      if (p.tags.some((tag) => tag.toLowerCase().includes(q))) return true;
      return false;
    })
    .slice(0, 8);
}

export default function SearchDrawer({ partners }: SearchDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Partner[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("mao:open-search", handleOpen);
    return () => window.removeEventListener("mao:open-search", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  }, []);

  const handleQueryChange = useCallback(
    (val: string) => {
      setQuery(val);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setResults(filterPartners(partners, val));
      }, 300);
    },
    [partners]
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        close();
      }
    },
    [close]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40"
      aria-modal="true"
      role="dialog"
      aria-label="Partnersuche"
      onClick={handleOverlayClick}
    >
      <div className="absolute inset-0 bg-black/40 transition-opacity" aria-hidden="true" />

      <div
        ref={panelRef}
        className={[
          "absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl",
          "flex flex-col",
          "transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Partner suchen</h2>
          <button
            onClick={close}
            className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            aria-label="Suche schließen"
          >
            <X size={18} />
          </button>
        </div>

        <div className="border-b border-gray-100 px-5 py-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Name, Kategorie, Stichwort …"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                onClick={() => handleQueryChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Suche leeren"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {query.trim() === "" && (
            <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-cream">
                <Search size={20} className="text-brand-blue" />
              </div>
              <p className="text-sm text-gray-500">
                Geben Sie einen Namen, eine Kategorie oder ein Stichwort ein.
              </p>
            </div>
          )}

          {query.trim() !== "" && results.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Search size={20} className="text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Keine Partner gefunden</p>
                <p className="mt-1 text-sm text-gray-500">
                  Versuchen Sie einen anderen Suchbegriff oder stöbern Sie in allen{" "}
                  <Link
                    href="/partner"
                    onClick={close}
                    className="text-brand-blue underline-offset-2 hover:underline"
                  >
                    Partnern
                  </Link>
                  .
                </p>
              </div>
            </div>
          )}

          {results.length > 0 && (
            <ul className="divide-y divide-gray-50 py-2">
              {results.map((partner) => (
                <li key={partner.slug}>
                  <Link
                    href={`/partner/${partner.slug}`}
                    onClick={close}
                    className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-brand-cream/40 focus:outline-none focus-visible:bg-brand-cream/40"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-cream text-brand-blue">
                      <CategoryIcon slug={Array.isArray(partner.categorySlug) ? partner.categorySlug[0] : partner.categorySlug} size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {partner.name}
                      </p>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1 truncate">
                          <Tag size={10} className="flex-shrink-0" />
                          <span className="truncate">{(Array.isArray(partner.categorySlug) ? partner.categorySlug[0] : partner.categorySlug).replace(/-/g, " ")}</span>
                        </span>
                        <span className="flex-shrink-0 text-gray-300">·</span>
                        <span className="flex items-center gap-1 truncate">
                          <MapPin size={10} className="flex-shrink-0" />
                          <span className="truncate">{partner.address.city}</span>
                        </span>
                      </div>
                    </div>

                    <svg
                      className="flex-shrink-0 text-gray-300"
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {results.length > 0 && (
            <div className="border-t border-gray-100 px-5 py-3">
              <Link
                href={`/partner?q=${encodeURIComponent(query)}`}
                onClick={close}
                className="flex items-center justify-center gap-2 rounded-xl border border-brand-blue/30 py-2.5 text-sm font-medium text-brand-blue transition-colors hover:bg-brand-cream/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                <Search size={14} />
                Alle Ergebnisse anzeigen
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
