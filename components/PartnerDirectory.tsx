"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronDown, X, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Partner, Category, Area } from "@/lib/types";
import PartnerCard from "@/components/PartnerCard";
import { cn } from "@/lib/utils";

interface PartnerDirectoryProps {
  partners: Partner[];
  categories: Category[];
  areas: Area[];
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function PartnerDirectory({ partners, categories, areas }: PartnerDirectoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [cat, setCat] = useState(searchParams.get("cat") ?? "");
  const [area, setArea] = useState(searchParams.get("area") ?? "");
  const isFirstRender = useRef(true);

  const debouncedQ = useDebounce(q, 200);

  const categoryMap = useMemo(() => new Map(categories.map((c) => [c.slug, c.name])), [categories]);
  const areaMap = useMemo(() => new Map(areas.map((a) => [a.slug, a.name])), [areas]);

  const filtered = useMemo(() => {
    let result = partners;
    if (debouncedQ.trim() !== "") {
      const query = debouncedQ.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          (p.tags ?? []).some((tag) => tag.toLowerCase().includes(query)) ||
          (categoryMap.get(p.categorySlug) ?? "").toLowerCase().includes(query) ||
          (areaMap.get(p.areaSlug) ?? "").toLowerCase().includes(query)
      );
    }
    if (cat !== "") {
      result = result.filter((p) => p.categorySlug === cat);
    }
    if (area !== "") {
      result = result.filter((p) => p.areaSlug === area);
    }
    return result;
  }, [partners, debouncedQ, cat, area, categoryMap, areaMap]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const params = new URLSearchParams();
    if (debouncedQ.trim()) params.set("q", debouncedQ.trim());
    if (cat) params.set("cat", cat);
    if (area) params.set("area", area);
    const query = params.toString();
    router.replace(`/partner${query ? `?${query}` : ""}`, { scroll: false });
  }, [debouncedQ, cat, area, router]);

  const handleReset = useCallback(() => {
    setQ("");
    setCat("");
    setArea("");
    router.replace("/partner", { scroll: false });
  }, [router]);

  const hasActiveFilters = q.trim() !== "" || cat !== "" || area !== "";

  const selectClass = cn(
    "appearance-none cursor-pointer rounded-xl border border-stone-200 bg-white pl-4 pr-9 py-2.5 text-sm text-stone-700",
    "transition-colors duration-150 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20",
    "hover:border-stone-300"
  );

  const activeCategory = cat ? categoryMap.get(cat) : null;
  const activeArea = area ? areaMap.get(area) : null;

  return (
    <div>
      <div className="rounded-2xl border border-stone-100 bg-white p-4 shadow-sm mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Partner, Branche oder Bezirk suchen…"
              className={cn(
                "w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm text-stone-900",
                "placeholder:text-stone-400 transition-colors duration-150",
                "focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20",
                "hover:border-stone-300"
              )}
              aria-label="Partner suchen"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                aria-label="Suche löschen"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
            <div className="relative">
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className={cn(selectClass, "min-w-[180px] w-full sm:w-auto", cat ? "border-brand-blue text-brand-blue" : "")}
                aria-label="Kategorie filtern"
              >
                <option value="">Alle Kategorien</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className={cn("pointer-events-none absolute right-3 top-1/2 -translate-y-1/2", cat ? "text-brand-blue" : "text-stone-400")}
              />
            </div>

            <div className="relative">
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className={cn(selectClass, "min-w-[160px] w-full sm:w-auto", area ? "border-brand-blue text-brand-blue" : "")}
                aria-label="Bezirk filtern"
              >
                <option value="">Alle Bezirke</option>
                {areas.map((a) => (
                  <option key={a.slug} value={a.slug}>{a.name}</option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className={cn("pointer-events-none absolute right-3 top-1/2 -translate-y-1/2", area ? "text-brand-blue" : "text-stone-400")}
              />
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className={cn(
                  "inline-flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-white",
                  "px-3.5 py-2.5 text-sm font-medium text-stone-500 transition-colors duration-150",
                  "hover:border-stone-300 hover:text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-blue/20",
                  "whitespace-nowrap"
                )}
                aria-label="Filter zurücksetzen"
              >
                <X size={14} className="shrink-0" />
                Zurücksetzen
              </button>
            )}
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-2 pt-3 border-t border-stone-100">
            <span className="text-xs text-stone-400 font-medium">Aktive Filter:</span>
            {q.trim() && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/8 border border-brand-blue/20 px-2.5 py-1 text-xs font-medium text-brand-blue">
                &ldquo;{q.trim()}&rdquo;
                <button onClick={() => setQ("")} aria-label="Suchbegriff entfernen">
                  <X size={11} />
                </button>
              </span>
            )}
            {activeCategory && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/8 border border-brand-blue/20 px-2.5 py-1 text-xs font-medium text-brand-blue">
                {activeCategory}
                <button onClick={() => setCat("")} aria-label="Kategorie entfernen">
                  <X size={11} />
                </button>
              </span>
            )}
            {activeArea && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/8 border border-brand-blue/20 px-2.5 py-1 text-xs font-medium text-brand-blue">
                {activeArea}
                <button onClick={() => setArea("")} aria-label="Bezirk entfernen">
                  <X size={11} />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm font-medium text-stone-500">
          <span className="font-bold text-stone-900">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "Partner gefunden" : "Partner gefunden"}
          {hasActiveFilters && (
            <span className="text-stone-400"> von {partners.length} gesamt</span>
          )}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-200 bg-stone-50/60 px-6 py-20 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/8 border border-brand-blue/10">
            <Users size={26} className="text-brand-blue/60" />
          </div>
          <p className="text-lg font-semibold text-stone-800 mb-2">
            Keine Partner gefunden
          </p>
          <p className="max-w-sm text-sm text-stone-500 mb-6">
            Versuchen Sie einen anderen Suchbegriff oder entfernen Sie aktive Filter.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.slice(0, 4).map((c) => (
              <button
                key={c.slug}
                onClick={() => { setCat(c.slug); setQ(""); }}
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 hover:border-brand-blue hover:text-brand-blue transition-colors"
              >
                {c.name}
              </button>
            ))}
          </div>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-blue/90"
          >
            <X size={14} />
            Alle Filter zurücksetzen
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((partner) => (
            <PartnerCard
              key={partner.slug}
              partner={partner}
              categoryName={categoryMap.get(partner.categorySlug)}
              areaName={areaMap.get(partner.areaSlug)}
            />
          ))}
        </div>
      )}

      {filtered.length > 0 && filtered.length < partners.length && (
        <div className="mt-8 text-center">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue hover:underline"
          >
            Alle {partners.length} Partner anzeigen
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
