"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function openSearch() {
  window.dispatchEvent(new Event("mao:open-search"));
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstFocusableRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!mobileOpen) return;
      if (e.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const panel = mobileMenuRef.current;
      if (!panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname === href || pathname.startsWith(href + "/");
    },
    [pathname]
  );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-white shadow-sm border-b border-stone-100"
            : "bg-white/90 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-baseline gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 rounded-sm"
            aria-label="MAO – Meine Anzeige Online – Startseite"
          >
            <span className="text-xl font-bold tracking-tight text-brand-blue">
              MAO
            </span>
            <span className="hidden text-xs font-medium text-stone-400 sm:block">
              Meine Anzeige Online
            </span>
          </Link>

          <nav
            className="hidden items-center gap-0.5 md:flex"
            aria-label="Hauptnavigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-1",
                  isActive(link.href)
                    ? "text-brand-blue"
                    : "text-stone-600 hover:text-brand-blue hover:bg-stone-50"
                )}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 rounded-full bg-brand-blue" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={openSearch}
              className="flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-brand-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              aria-label="Suche öffnen"
            >
              <Search size={18} />
            </button>

            <Link
              href="/partner-werden"
              className={cn(
                "hidden rounded-full px-4 py-2 text-sm font-medium text-white transition-colors md:block",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
                isActive("/partner-werden")
                  ? "bg-brand-blue/80"
                  : "bg-brand-blue hover:bg-brand-blue/90"
              )}
            >
              Partner werden
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue md:hidden"
              aria-label="Menü öffnen"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          aria-modal="true"
          role="dialog"
          aria-label="Mobilnavigation"
          id="mobile-menu"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeMobile}
            aria-hidden="true"
          />

          <div
            ref={mobileMenuRef}
            className="absolute right-0 top-0 flex h-full w-72 flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
              <Link
                href="/"
                onClick={closeMobile}
                className="flex items-baseline gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-sm"
              >
                <span className="text-lg font-bold text-brand-blue">MAO</span>
                <span className="text-xs text-stone-400">Meine Anzeige Online</span>
              </Link>
              <button
                ref={firstFocusableRef}
                onClick={closeMobile}
                className="flex h-9 w-9 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                aria-label="Menü schließen"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobilnavigation">
              <ul className="space-y-0.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className={cn(
                        "flex rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue",
                        isActive(link.href)
                          ? "bg-brand-blue/8 text-brand-blue"
                          : "text-stone-700 hover:bg-stone-50 hover:text-brand-blue"
                      )}
                      aria-current={isActive(link.href) ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-stone-100 px-4 pb-8 pt-4 space-y-2">
              <button
                onClick={() => { closeMobile(); openSearch(); }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                <Search size={16} />
                Partner suchen
              </button>
              <Link
                href="/partner-werden"
                onClick={closeMobile}
                className="flex w-full items-center justify-center rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                Partner werden
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
