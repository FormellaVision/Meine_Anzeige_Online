import fs from "fs";
import path from "path";

export type FormType = "partner-apply" | "contact" | "general-contact";

export interface LogEntry {
  type: FormType;
  timestamp: string;
  payload: Record<string, unknown>;
  ip: string;
  userAgent: string;
}

const LOGS_DIR = path.join(process.cwd(), "logs");
const LOGS_FILE = path.join(LOGS_DIR, "forms.ndjson");

export function logFormSubmission(entry: LogEntry): void {
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }
  fs.appendFileSync(LOGS_FILE, JSON.stringify(entry) + "\n", "utf-8");
}

export function isPreviewMode(): boolean {
  return (process.env.FORMS_MODE ?? "prod") === "preview";
}
