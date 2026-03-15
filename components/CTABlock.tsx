import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTABlockProps {
  title: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: "blue" | "cream";
}

export default function CTABlock({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = "blue",
}: CTABlockProps) {
  const isBlue = variant === "blue";

  return (
    <section
      className={cn(
        "w-full py-20 px-4",
        isBlue ? "bg-brand-blue" : "bg-brand-cream"
      )}
    >
      <div className="mx-auto max-w-3xl text-center space-y-6">
        <h2
          className={cn(
            "text-3xl font-bold tracking-tight sm:text-4xl",
            isBlue ? "text-white" : "text-stone-900"
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "text-base leading-relaxed",
            isBlue ? "text-brand-blue-light/90" : "text-stone-600"
          )}
        >
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href={primaryHref}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all duration-200 hover:gap-3",
              isBlue
                ? "bg-white text-brand-blue hover:bg-brand-cream"
                : "bg-brand-blue text-white hover:bg-brand-blue-dark"
            )}
          >
            {primaryLabel}
            <ArrowRight size={15} />
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold border transition-all duration-200",
                isBlue
                  ? "border-white/40 text-white hover:bg-white/10"
                  : "border-stone-400 text-stone-700 hover:bg-stone-200/60"
              )}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
