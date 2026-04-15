"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Partner } from "@/lib/types";
import { cloudinaryUrl } from "@/lib/utils";
import CategoryIcon from "./CategoryIcon";
import Badge from "./Badge";

interface PartnerCardProps {
  partner: Partner;
  categoryName?: string;
  areaName?: string;
}

export default function PartnerCard({ partner, categoryName, areaName }: PartnerCardProps) {
  const hasLogo = partner.images.logo && partner.images.logo.trim() !== "";

  return (
    <Link
      href={`/partner/${partner.slug}`}
      className="group block rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
    >
      <div className="flex flex-col h-full p-5">
        <div className="flex items-start gap-4 mb-4">
          <div className="shrink-0">
            {hasLogo ? (
              <div className="relative h-14 w-14 rounded-lg overflow-hidden border border-gray-100 bg-white">
                <Image
                  src={cloudinaryUrl(partner.images.logo, { width: 112, quality: 85, format: "auto" })}
                  alt={`${partner.name} Logo`}
                  fill
                  className="object-cover"
                  sizes="56px"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-brand-blue/8 border border-brand-blue/10">
                <CategoryIcon
                  slug={Array.isArray(partner.categorySlug) ? partner.categorySlug[0] : partner.categorySlug}
                  size={26}
                  className="text-brand-blue"
                />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start gap-1.5 mb-1">
              {partner.featured && (
                <Badge variant="featured" label="Featured" />
              )}
              {partner.role === "founder" && (
                <Badge variant="gruender" label="Gründer" />
              )}
            </div>
            <h3 className="font-semibold text-lg text-gray-900 leading-tight truncate">
              {partner.name}
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {categoryName && (
            <Badge variant="category" label={categoryName} />
          )}
          {areaName && (
            <Badge variant="area" label={areaName} />
          )}
        </div>

        {partner.shortDescription && (
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed flex-1 mb-4">
            {partner.shortDescription}
          </p>
        )}

        <div className="mt-auto flex items-center justify-end pt-2 border-t border-gray-50">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-blue transition-all duration-200 group-hover:gap-2">
            Mehr erfahren
            <ArrowRight size={13} className="shrink-0" />
          </span>
        </div>
      </div>
    </Link>
  );
}
