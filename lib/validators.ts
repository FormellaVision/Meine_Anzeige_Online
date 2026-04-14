import { z } from "zod";

const UrlSchema = z.string().url().or(z.literal(""));
const OptionalUrlSchema = z.string().url().optional().or(z.literal("")).optional();

export const PartnerContactSchema = z.object({
  contactName: z.string().min(1, "contactName is required"),
  phone: z.string().min(1, "phone is required"),
  email: z.string().email("email must be a valid email"),
  website: z.string().url("website must be a valid URL"),
  whatsapp: UrlSchema,
});

export const PartnerSocialSchema = z.object({
  facebook: OptionalUrlSchema,
  instagram: OptionalUrlSchema,
  linkedin: OptionalUrlSchema,
  xing: OptionalUrlSchema,
});

export const PartnerAddressSchema = z.object({
  street: z.string().optional().default(""),
  zip: z.string().optional().default(""),
  city: z.string().min(1, "address.city is required"),
  googleMapsUrl: UrlSchema,
});

export const OpeningHoursSchema = z.object({
  monday: z.string().optional().default(""),
  tuesday: z.string().optional().default(""),
  wednesday: z.string().optional().default(""),
  thursday: z.string().optional().default(""),
  friday: z.string().optional().default(""),
  saturday: z.string().optional().default(""),
  sunday: z.string().optional().default(""),
});

export const PartnerImagesSchema = z.object({
  logo: z.string().optional().default(""),
  icon: z.string().optional().default(""),
  gallery: z.array(z.string()).optional().default([]),
});

export const RecommendedBySchema = z.object({
  name: z.string().min(1, "recommendedBy.name is required"),
  slug: z.string().min(1, "recommendedBy.slug is required"),
  note: z.string().optional(),
});

export const SpecialOfferSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string(),
  price: z.string(),
  contactMethods: z.array(z.enum(["whatsapp", "email"])).optional().default([]),
});

export const PartnerSpecialOffersSchema = z.object({
  title: z.string().min(1, "title is required"),
  offers: z.array(SpecialOfferSchema),
});

export const PartnerSchema = z.object({
  name: z.string().min(1, "name is required"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must be lowercase letters, numbers, and hyphens only"),
  categorySlug: z.string().min(1, "categorySlug is required"),
  tags: z.array(z.string()).optional().default([]),
  areaSlug: z.string().min(1, "areaSlug is required"),
  shortDescription: z.string().min(1, "shortDescription is required"),
  longDescription: z.string().min(1, "longDescription is required"),
  highlights: z.array(z.string()).optional().default([]),
  services: z.array(z.string()).optional().default([]),
  contact: PartnerContactSchema,
  social: PartnerSocialSchema.optional().default({}),
  address: PartnerAddressSchema,
  openingHours: OpeningHoursSchema.optional().default({}),
  images: PartnerImagesSchema,
  recommendedBy: RecommendedBySchema.optional(),
  specialOffers: PartnerSpecialOffersSchema.optional(),
  role: z.string().optional().default("member"),
  status: z.enum(["active", "inactive", "pending"]),
  featured: z.boolean(),
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "createdAt must be YYYY-MM-DD format"),
  _placeholder: z.boolean().optional(),
});

export const EventContentBlockSchema = z.object({
  type: z.enum(["h2", "h3", "p", "ul", "li"]),
  text: z.string(),
});

export const EventCTASchema = z.object({
  label: z.string(),
  url: z.string(),
});

export const EventImagesSchema = z.object({
  cover: z.string().optional().default(""),
  gallery: z.array(z.string()).optional().default([]),
});

export const EventOrganizerSchema = z.object({
  name: z.string().min(1, "organizer.name is required"),
  contactEmail: z.string().email("organizer.contactEmail must be a valid email"),
});

export const EventSchema = z.object({
  title: z.string().min(1, "title is required"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must be lowercase letters, numbers, and hyphens only"),
  dateStart: z.string().min(1, "dateStart is required"),
  dateEnd: z.string().min(1, "dateEnd is required"),
  areaSlug: z.string().min(1, "areaSlug is required"),
  locationName: z.string().min(1, "locationName is required"),
  address: z.string().min(1, "address is required"),
  shortDescription: z.string().min(1, "shortDescription is required"),
  content: z.array(EventContentBlockSchema).optional().default([]),
  cta: EventCTASchema.optional().default({ label: "", url: "" }),
  images: EventImagesSchema.optional().default({ cover: "", gallery: [] }),
  organizer: EventOrganizerSchema,
  featured: z.boolean().optional().default(false),
});

export type ValidatedPartner = z.infer<typeof PartnerSchema>;
export type ValidatedEvent = z.infer<typeof EventSchema>;

export function validatePartner(data: unknown, filename: string): ValidatedPartner {
  const result = PartnerSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`[MAO] Invalid partner JSON in "${filename}":\n${errors}`);
  }
  return result.data;
}

export function validateEvent(data: unknown, filename: string): ValidatedEvent {
  const result = EventSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`[MAO] Invalid event JSON in "${filename}":\n${errors}`);
  }
  return result.data;
}

export function checkUniqueSlugs(items: Array<{ slug: string }>, type: string): void {
  const seen = new Set<string>();
  const duplicates: string[] = [];
  for (const item of items) {
    if (seen.has(item.slug)) {
      duplicates.push(item.slug);
    }
    seen.add(item.slug);
  }
  if (duplicates.length > 0) {
    throw new Error(`[MAO] Duplicate ${type} slugs found: ${duplicates.join(", ")}`);
  }
}
