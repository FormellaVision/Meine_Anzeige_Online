import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendPartnerApplyMail } from "@/lib/mailer";
import { isPreviewMode, logFormSubmission } from "@/lib/preview-logger";

const recommendedBySchema = z
  .string()
  .trim()
  .refine(
    (v) => v.toLowerCase() === "nein" || v.length >= 2,
    "Bitte Name oder 'Nein' eintragen."
  );

const PartnerApplySchema = z.object({
  companyName: z.string().trim().min(1, "Unternehmensname ist erforderlich."),
  contactName: z.string().trim().min(1, "Ansprechperson ist erforderlich."),
  email: z.string().trim().email("Ungültige E-Mail-Adresse."),
  phone: z.string().optional(),
  website: z.string().trim().url("Ungültige Website-Adresse."),
  categorySlug: z.string().trim().min(1, "Kategorie ist erforderlich."),
  areaSlug: z.string().trim().min(1, "Bezirk ist erforderlich."),
  shortPitch: z.string().trim().min(10, "Kurzbeschreibung zu kurz.").max(500),
  referredBy: recommendedBySchema,
  "bot-field": z.string().max(0, "Bot detected.").optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body["bot-field"]) {
      return NextResponse.json({ ok: true });
    }

    const parsed = PartnerApplySchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ ok: false, errors }, { status: 422 });
    }

    if (isPreviewMode()) {
      logFormSubmission({
        type: "partner-apply",
        timestamp: new Date().toISOString(),
        payload: parsed.data as Record<string, unknown>,
        ip: req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown",
        userAgent: req.headers.get("user-agent") ?? "unknown",
      });
      return NextResponse.json({ ok: true, mode: "preview" });
    }

    await sendPartnerApplyMail(parsed.data);

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Serverfehler.";
    const isConfig = message.includes("not configured");
    return NextResponse.json(
      { ok: false, error: isConfig ? "Mail delivery not configured" : "Mail send failed" },
      { status: 500 }
    );
  }
}
