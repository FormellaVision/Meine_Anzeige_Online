import { Search } from "lucide-react";
import type { Partner } from "@/lib/types";
import { getCategories, getAreas } from "@/lib/content";
import PartnerCard from "./PartnerCard";

interface PartnerGridProps {
  partners: Partner[];
  emptyMessage?: string;
}

export default function PartnerGrid({
  partners,
  emptyMessage = "Keine Partner gefunden. Bitte passe deine Suche oder Filter an.",
}: PartnerGridProps) {
  const categories = getCategories();
  const areas = getAreas();

  const categoryMap = new Map(categories.map((c) => [c.slug, c.name]));
  const areaMap = new Map(areas.map((a) => [a.slug, a.name]));

  if (partners.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 px-6 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/8 border border-brand-blue/10">
          <Search size={24} className="text-brand-blue/60" />
        </div>
        <p className="max-w-sm text-base font-medium text-gray-700">{emptyMessage}</p>
        <p className="mt-1.5 text-sm text-gray-400">
          Versuche es mit anderen Suchbegriffen oder entferne aktive Filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {partners.map((partner) => {
        const catSlug = Array.isArray(partner.categorySlug) ? partner.categorySlug[0] : partner.categorySlug;
        return (
          <PartnerCard
            key={partner.slug}
            partner={partner}
            categoryName={categoryMap.get(catSlug)}
            areaName={areaMap.get(partner.areaSlug)}
          />
        );
      })}
    </div>
  );
}
