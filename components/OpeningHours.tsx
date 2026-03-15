import { cn } from "@/lib/utils";
import type { OpeningHours } from "@/lib/types";
import { DAYS_DE } from "@/lib/constants";

interface OpeningHoursProps {
  hours: OpeningHours;
  className?: string;
}

const DAY_KEYS: (keyof OpeningHours)[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const JS_DAY_TO_KEY: Record<number, keyof OpeningHours> = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
};

export default function OpeningHours({ hours, className }: OpeningHoursProps) {
  const todayKey = JS_DAY_TO_KEY[new Date().getDay()];

  return (
    <div className={cn("space-y-1", className)}>
      {DAY_KEYS.map((key) => {
        const label = DAYS_DE[key];
        const value = hours[key];
        const isToday = key === todayKey;
        const isClosed = !value || value.trim().toLowerCase() === "geschlossen";

        return (
          <div
            key={key}
            className={cn(
              "flex items-center justify-between gap-4 rounded-md px-3 py-1.5 text-sm",
              isToday
                ? "bg-brand-blue/8 ring-1 ring-brand-blue/20"
                : "hover:bg-stone-50"
            )}
            style={isToday ? { backgroundColor: "rgba(22, 107, 191, 0.06)" } : undefined}
          >
            <span
              className={cn(
                "font-medium w-24 shrink-0",
                isToday ? "text-brand-blue" : "text-stone-700"
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                "text-right",
                isClosed
                  ? "text-stone-400 italic"
                  : isToday
                  ? "text-brand-blue font-semibold"
                  : "text-stone-600"
              )}
            >
              {value ?? "Geschlossen"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
