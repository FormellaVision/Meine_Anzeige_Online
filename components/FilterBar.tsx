"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, ChevronDown, X } from "lucide-react";
import type { Category, Area } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  categories: Category[];
  areas: Area[];
  basePath?: string;
}

export default function FilterBar({ categories, areas, basePath = "/partner" }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [area, setArea] = useState("");

  useEffect(() => {
    setQ(searchParams.get("q") ?? "");
    setCat(searchParams.get("cat") ?? "");
    setArea(searchParams.get("area") ?? "");
  }, [searchParams]);

  const pushParams = useCallback(
    (nextQ: string, nextCat: string, nextArea: string) => {
      const params = new URLSearchParams();
      if (nextQ.trim()) params.set("q", nextQ.trim());
      if (nextCat) params.set("cat", nextCat);
      if (nextArea) params.set("area", nextArea);
      const query = params.toString();
      router.push(`${basePath}${query ? `?${query}` : ""}`, { scroll: false } as Parameters<typeof router.push>[1]);
    },
    [router, basePath]
  );

  const handleQChange = (value: string) => {
    setQ(value);
  };

  const handleQKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      pushParams(q, cat, area);
    }
  };

  const handleQBlur = () => {
    pushParams(q, cat, area);
  };

  const handleCatChange = (value: string) => {
    setCat(value);
    pushParams(q, value, area);
  };

  const handleAreaChange = (value: string) => {
    setArea(value);
    pushParams(q, cat, value);
  };

  const handleReset = () => {
    setQ("");
    setCat("");
    setArea("");
    router.push(basePath, { scroll: false } as Parameters<typeof router.push>[1]);
  };

  const hasActiveFilters = q.trim() !== "" || cat !== "" || area !== "";

  const selectBaseClass = cn(
    "appearance-none cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-9 text-sm text-gray-700",
    "transition-colors duration-150 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20",
    "hover:border-gray-300"
  );

  return (
    <div className="w-full rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={q}
            onChange={(e) => handleQChange(e.target.value)}
            onKeyDown={handleQKeyDown}
            onBlur={handleQBlur}
            placeholder="Partner suchen…"
            className={cn(
              "w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900",
              "placeholder:text-gray-400 transition-colors duration-150",
              "focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20",
              "hover:border-gray-300"
            )}
          />
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
          <div className="relative">
            <select
              value={cat}
              onChange={(e) => handleCatChange(e.target.value)}
              className={cn(selectBaseClass, "min-w-[180px] w-full sm:w-auto")}
              aria-label="Kategorie filtern"
            >
              <option value="">Alle Kategorien</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          <div className="relative">
            <select
              value={area}
              onChange={(e) => handleAreaChange(e.target.value)}
              className={cn(selectBaseClass, "min-w-[160px] w-full sm:w-auto")}
              aria-label="Gebiet filtern"
            >
              <option value="">Alle Gebiete</option>
              {areas.map((a) => (
                <option key={a.slug} value={a.slug}>
                  {a.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className={cn(
                "inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white",
                "px-3.5 py-2.5 text-sm font-medium text-gray-500 transition-colors duration-150",
                "hover:border-gray-300 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-blue/20",
                "whitespace-nowrap"
              )}
              aria-label="Filter zurücksetzen"
            >
              <X size={14} className="shrink-0" />
              Filter zurücksetzen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
