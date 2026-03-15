import { Resend } from "resend";

function getConfig(): { resend: Resend; from: string; to: string } {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  const to = process.env.MAIL_TO;

  if (!key) throw new Error("Mail delivery not configured: RESEND_API_KEY missing");
  if (!from) throw new Error("Mail delivery not configured: MAIL_FROM missing");
  if (!to) throw new Error("Mail delivery not configured: MAIL_TO missing");

  return { resend: new Resend(key), from, to };
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:4px 8px;color:#6b7280;font-size:13px;white-space:nowrap">${label}</td><td style="padding:4px 8px;font-size:13px">${value}</td></tr>`;
}

function table(rows: string): string {
  return `<table style="border-collapse:collapse;width:100%;margin-top:16px">${rows}</table>`;
}

function wrap(title: string, body: string): string {
  return `<!DOCTYPE html><html><body style="font-family:sans-serif;background:#f9fafb;padding:32px">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e5e7eb">
    <h2 style="margin:0 0 16px;font-size:18px;color:#111827">${title}</h2>
    ${body}
  </div></body></html>`;
}

async function send(subject: string, html: string, replyTo: string): Promise<void> {
  const { resend, from, to } = getConfig();
  const result = await resend.emails.send({ from, to, replyTo, subject, html });
  if (result.error) {
    throw new Error(`Mail send failed: ${result.error.message}`);
  }
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  recommendedBy: string;
  partnerName?: string;
  partnerSlug?: string;
}

export interface GeneralContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  recommendedBy: string;
}

export interface PartnerApplyPayload {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  website: string;
  categorySlug: string;
  areaSlug: string;
  shortPitch: string;
  referredBy: string;
}

export async function sendContactMail(data: ContactPayload): Promise<void> {
  const subject = data.partnerName
    ? `Neue Anfrage an ${data.partnerName}`
    : "Neue Kontaktanfrage";

  const html = wrap(
    subject,
    table(
      row("Name", data.name) +
      row("E-Mail", `<a href="mailto:${data.email}">${data.email}</a>`) +
      (data.phone ? row("Telefon", data.phone) : "") +
      (data.partnerName ? row("Partner", data.partnerName) : "") +
      row("Weiterempfohlen von", data.recommendedBy) +
      `</table><p style="margin-top:20px;font-size:14px;color:#374151"><strong>Nachricht:</strong></p><p style="font-size:14px;color:#374151;white-space:pre-wrap">${data.message}</p><table>`
    )
  );

  await send(subject, html, data.email);
}

export async function sendGeneralContactMail(data: GeneralContactPayload): Promise<void> {
  const subject = `Kontakt: ${data.subject}`;

  const html = wrap(
    subject,
    table(
      row("Name", data.name) +
      row("E-Mail", `<a href="mailto:${data.email}">${data.email}</a>`) +
      (data.phone ? row("Telefon", data.phone) : "") +
      row("Betreff", data.subject) +
      row("Weiterempfohlen von", data.recommendedBy) +
      `</table><p style="margin-top:20px;font-size:14px;color:#374151"><strong>Nachricht:</strong></p><p style="font-size:14px;color:#374151;white-space:pre-wrap">${data.message}</p><table>`
    )
  );

  await send(subject, html, data.email);
}

export async function sendPartnerApplyMail(data: PartnerApplyPayload): Promise<void> {
  const subject = `Neue Partner-Bewerbung: ${data.companyName}`;

  const html = wrap(
    subject,
    table(
      row("Unternehmen", data.companyName) +
      row("Ansprechperson", data.contactName) +
      row("E-Mail", `<a href="mailto:${data.email}">${data.email}</a>`) +
      (data.phone ? row("Telefon", data.phone) : "") +
      row("Website", `<a href="${data.website}">${data.website}</a>`) +
      row("Kategorie", data.categorySlug) +
      row("Bezirk", data.areaSlug) +
      row("Weiterempfohlen von", data.referredBy) +
      `</table><p style="margin-top:20px;font-size:14px;color:#374151"><strong>Kurzbeschreibung:</strong></p><p style="font-size:14px;color:#374151;white-space:pre-wrap">${data.shortPitch}</p><table>`
    )
  );

  await send(subject, html, data.email);
}
