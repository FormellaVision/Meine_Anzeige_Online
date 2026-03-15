import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  as?: "h2" | "h3";
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3", centered && "text-center")}>
      {eyebrow && (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-widest",
            light ? "text-brand-gold" : "text-brand-blue"
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl",
          light ? "text-white" : "text-stone-900"
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p
          className={cn(
            "text-base leading-relaxed max-w-2xl",
            centered && "mx-auto",
            light ? "text-brand-blue-light/90" : "text-stone-500"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
