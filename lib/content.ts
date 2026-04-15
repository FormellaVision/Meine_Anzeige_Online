import fs from "fs";
import path from "path";
import type { Partner, MAOEvent, Category, Area } from "./types";
import { validatePartner, validateEvent, checkUniqueSlugs } from "./validators";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getAllPartners(): Partner[] {
  const dir = path.join(CONTENT_DIR, "partners");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json") && !f.startsWith("_"));
  const partners = files.flatMap((f) => {
    try {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      const data = JSON.parse(raw);
      const validated = validatePartner(data, f);
      return [validated as Partner];
    } catch (err) {
      if (process.env.NODE_ENV === "production") {
        throw err;
      }
      console.error(`[MAO] ${err instanceof Error ? err.message : String(err)}`);
      return [];
    }
  });

  checkUniqueSlugs(partners, "partner");

  return partners
    .filter((p) => p.status === "active")
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      if (a.createdAt !== b.createdAt) return b.createdAt.localeCompare(a.createdAt);
      return a.name.localeCompare(b.name, "de");
    });
}

export function getPartnerBySlug(slug: string): Partner | null {
  const filePath = path.join(CONTENT_DIR, "partners", `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);
    return validatePartner(data, `${slug}.json`) as Partner;
  } catch {
    return null;
  }
}

export function getPartnersByCategory(categorySlug: string): Partner[] {
  return getAllPartners().filter((p) => {
    if (Array.isArray(p.categorySlug)) {
      return p.categorySlug.includes(categorySlug);
    }
    return p.categorySlug === categorySlug;
  });
}

export function getPartnersByArea(areaSlug: string): Partner[] {
  return getAllPartners().filter((p) => p.areaSlug === areaSlug);
}

export function getFeaturedPartners(): Partner[] {
  return getAllPartners().filter((p) => p.featured);
}

export function getSimilarPartners(partner: Partner, limit = 3): Partner[] {
  const partnerCats = Array.isArray(partner.categorySlug) ? partner.categorySlug : [partner.categorySlug];
  const all = getAllPartners().filter((p) => p.slug !== partner.slug);

  const sameCatAndArea = all.filter((p) => {
    const pCats = Array.isArray(p.categorySlug) ? p.categorySlug : [p.categorySlug];
    const hasSameCategory = pCats.some(cat => partnerCats.includes(cat));
    return hasSameCategory && p.areaSlug === partner.areaSlug;
  });

  if (sameCatAndArea.length >= limit) return sameCatAndArea.slice(0, limit);

  const sameCat = all.filter((p) => {
    const pCats = Array.isArray(p.categorySlug) ? p.categorySlug : [p.categorySlug];
    return pCats.some(cat => partnerCats.includes(cat));
  });

  const merged = [...sameCatAndArea];
  for (const p of sameCat) {
    if (merged.length >= limit) break;
    if (!merged.find((m) => m.slug === p.slug)) merged.push(p);
  }
  for (const p of all) {
    if (merged.length >= limit) break;
    if (!merged.find((m) => m.slug === p.slug)) merged.push(p);
  }
  return merged.slice(0, limit);
}

export function getAllEvents(): MAOEvent[] {
  const dir = path.join(CONTENT_DIR, "events");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json") && !f.startsWith("_"));
  const events = files.flatMap((f) => {
    try {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      const data = JSON.parse(raw);
      const validated = validateEvent(data, f);
      return [validated as MAOEvent];
    } catch (err) {
      if (process.env.NODE_ENV === "production") {
        throw err;
      }
      console.error(`[MAO] ${err instanceof Error ? err.message : String(err)}`);
      return [];
    }
  });

  checkUniqueSlugs(events, "event");

  return events.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.dateStart.localeCompare(b.dateStart);
  });
}

export function getUpcomingEvents(limit = 3): MAOEvent[] {
  const now = new Date().toISOString();
  return getAllEvents()
    .filter((e) => e.dateEnd >= now)
    .slice(0, limit);
}

export function getEventBySlug(slug: string): MAOEvent | null {
  const filePath = path.join(CONTENT_DIR, "events", `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);
    return validateEvent(data, `${slug}.json`) as MAOEvent;
  } catch {
    return null;
  }
}

export function getCategories(): Category[] {
  const filePath = path.join(CONTENT_DIR, "categories.json");
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Category[];
}

export function getCategoryBySlug(slug: string): Category | null {
  return getCategories().find((c) => c.slug === slug) ?? null;
}

export function getAreas(): Area[] {
  const filePath = path.join(CONTENT_DIR, "areas.json");
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Area[];
}

export function getAreaBySlug(slug: string): Area | null {
  return getAreas().find((a) => a.slug === slug) ?? null;
}
