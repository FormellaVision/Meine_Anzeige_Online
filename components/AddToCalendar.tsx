"use client";

import { Calendar } from "lucide-react";
import { buildGoogleCalendarUrl } from "@/lib/utils";

interface AddToCalendarProps {
  title: string;
  dateStart: string;
  dateEnd: string;
  location?: string;
  description?: string;
}

export default function AddToCalendar({
  title,
  dateStart,
  dateEnd,
  location,
  description,
}: AddToCalendarProps) {
  const handleClick = () => {
    const url = buildGoogleCalendarUrl({
      title,
      start: dateStart,
      end: dateEnd,
      location,
      description,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-full border border-brand-blue px-5 py-2.5 text-sm font-medium text-brand-blue transition-all duration-200 hover:bg-brand-blue hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
    >
      <Calendar size={15} />
      In Kalender eintragen
    </button>
  );
}
