import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactMail } from "@/lib/mailer";
import { isPreviewMode, logFormSubmission } from "@/lib/preview-logger";

const recommendedBySchema = z
  .string()
  .trim()
  .refine(
    (v) => v.toLowerCase() === "nein" || v.length >= 2,
    "Bitte Name oder 'Nein' eintragen."
  );

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name ist erforderlich."),
  email: z.string().trim().email("Ungültige E-Mail-Adresse."),
  phone: z.string().optional(),
  message: z.string().trim().min(10, "Nachricht zu kurz."),
  recommendedBy: recommendedBySchema,
  "partner-name": z.string().optional(),
  "partner-slug": z.string().optional(),
  "bot-field": z.string().max(0, "Bot detected.").optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body["bot-field"]) {
      return NextResponse.json({ ok: true });
    }

    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ ok: false, errors }, { status: 422 });
    }

    if (isPreviewMode()) {
      logFormSubmission({
        type: "contact",
        timestamp: new Date().toISOString(),
        payload: parsed.data as Record<string, unknown>,
        ip: req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown",
        userAgent: req.headers.get("user-agent") ?? "unknown",
      });
      return NextResponse.json({ ok: true, mode: "preview" });
    }

    await sendContactMail({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message,
      recommendedBy: parsed.data.recommendedBy,
      partnerName: parsed.data["partner-name"],
      partnerSlug: parsed.data["partner-slug"],
    });

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
