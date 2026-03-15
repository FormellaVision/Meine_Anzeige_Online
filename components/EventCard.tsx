import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import type { MAOEvent } from "@/lib/types";
import { formatTimeDE } from "@/lib/utils";
import Badge from "./Badge";

interface EventCardProps {
  event: MAOEvent;
  areaName?: string;
}

const GERMAN_MONTHS = [
  "Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
  "Jul", "Aug", "Sep", "Okt", "Nov", "Dez",
];

export default function EventCard({ event, areaName }: EventCardProps) {
  const startDate = new Date(event.dateStart);
  const endDate = new Date(event.dateEnd);
  const day = startDate.getDate();
  const month = GERMAN_MONTHS[startDate.getMonth()];

  const timeRange = `${formatTimeDE(event.dateStart)} – ${formatTimeDE(event.dateEnd)} Uhr`;

  return (
    <Link
      href={`/veranstaltungen/${event.slug}`}
      className="group block rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
    >
      <div className="flex gap-4 p-5">
        <div className="shrink-0 flex flex-col items-center justify-start pt-0.5">
          <div className="flex flex-col items-center justify-center w-14 rounded-xl bg-brand-blue/8 border border-brand-blue/12 px-2 py-2.5">
            <span className="text-2xl font-bold leading-none text-brand-blue tabular-nums">
              {String(day).padStart(2, "0")}
            </span>
            <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-brand-blue/70">
              {month}
            </span>
          </div>
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            {event.featured && (
              <Badge variant="featured" label="Featured" />
            )}
          </div>

          <h3 className="font-semibold text-base text-gray-900 leading-snug line-clamp-2 mb-2">
            {event.title}
          </h3>

          {event.shortDescription && (
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-3">
              {event.shortDescription}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-3">
            <span className="inline-flex items-center gap-1 text-xs text-gray-500">
              <Clock size={12} className="shrink-0 text-gray-400" />
              {timeRange}
            </span>
            {event.locationName && (
              <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                <MapPin size={12} className="shrink-0 text-gray-400" />
                <span className="truncate max-w-[160px]">{event.locationName}</span>
              </span>
            )}
            {areaName && (
              <Badge variant="area" label={areaName} />
            )}
          </div>

          <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue transition-all duration-200 group-hover:gap-2.5">
              {event.cta.label}
              <ArrowRight size={13} className="shrink-0" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
