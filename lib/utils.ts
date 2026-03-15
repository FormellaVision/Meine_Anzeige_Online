import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateDE(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShortDE(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatTimeDE(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateTimeDE(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }) + " · " + date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) + " Uhr";
}

export function formatPhone(phone: string): string {
  return phone.replace(/\s+/g, "\u00A0");
}

export function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

export function cloudinaryUrl(
  url: string,
  options: { width?: number; quality?: number; format?: "auto" | "webp" | "avif" } = {}
): string {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  const { width, quality = 85, format = "auto" } = options;
  const transformations = [`q_${quality}`, `f_${format}`];
  if (width) transformations.push(`w_${width}`, "c_limit");
  const uploadSegment = "/image/upload/";
  const idx = url.indexOf(uploadSegment);
  if (idx === -1) return url;
  return (
    url.slice(0, idx + uploadSegment.length) +
    transformations.join(",") +
    "/" +
    url.slice(idx + uploadSegment.length)
  );
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

export function buildGoogleCalendarUrl(params: {
  title: string;
  start: string;
  end: string;
  location?: string;
  description?: string;
}): string {
  const startDate = new Date(params.start)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(".000Z", "Z");
  const endDate = new Date(params.end)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(".000Z", "Z");
  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", params.title);
  url.searchParams.set("dates", `${startDate}/${endDate}`);
  if (params.location) url.searchParams.set("location", params.location);
  if (params.description) url.searchParams.set("details", params.description);
  return url.toString();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
