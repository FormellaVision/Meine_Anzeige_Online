'use client';

import Link from 'next/link';
import { Chrome as Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="text-center max-w-md mx-auto">
        <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Seite nicht gefunden
        </h1>
        <p className="text-muted-foreground mb-8">
          Die gesuchte Seite existiert nicht oder wurde verschoben.
          Vielleicht findest du was du suchst über unsere Partner.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Home className="w-4 h-4" />
            Zur Startseite
          </Link>
          <Link
            href="/partner"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
          >
            <Search className="w-4 h-4" />
            Partner entdecken
          </Link>
        </div>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-1 mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Zurück
        </button>
      </div>
    </main>
  );
}
