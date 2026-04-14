"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CircleAlert as AlertCircle, Chrome as Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="text-center max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <AlertCircle className="w-16 h-16 text-destructive/20" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Etwas ist schief gelaufen
        </h1>
        <p className="text-muted-foreground mb-8">
          Es gab einen unerwarteten Fehler. Bitte versuche es später erneut oder kontaktiere uns.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Erneut versuchen
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
          >
            <Home className="w-4 h-4" />
            Zur Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}
