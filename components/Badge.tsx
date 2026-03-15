import { Star, ShieldCheck, Flame, MapPin, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type BadgeVariant = "featured" | "geprueft" | "gruender" | "area" | "category" | "role";

interface BadgeProps {
  variant: BadgeVariant;
  label: string;
  className?: string;
}

interface VariantConfig {
  containerClass: string;
  labelClass: string;
  Icon?: LucideIcon;
}

const variantConfigs: Record<BadgeVariant, VariantConfig> = {
  featured: {
    containerClass: "bg-brand-gold border border-brand-gold/60",
    labelClass: "text-stone-800",
    Icon: Star,
  },
  geprueft: {
    containerClass: "bg-transparent border border-brand-gold",
    labelClass: "text-brand-blue",
    Icon: ShieldCheck,
  },
  gruender: {
    containerClass: "bg-brand-blue border border-brand-blue",
    labelClass: "text-white",
    Icon: Flame,
  },
  area: {
    containerClass: "border border-brand-blue-light/40",
    labelClass: "text-brand-blue-dark",
    Icon: MapPin,
  },
  category: {
    containerClass: "bg-gray-100 border border-gray-200",
    labelClass: "text-gray-700",
  },
  role: {
    containerClass: "bg-brand-blue-light/30 border border-brand-blue-light/50",
    labelClass: "text-stone-800",
  },
};

export default function Badge({ variant, label, className }: BadgeProps) {
  const config = variantConfigs[variant];
  const Icon = config.Icon;

  const areaStyle =
    variant === "area"
      ? { backgroundColor: "rgba(130, 170, 209, 0.20)" }
      : undefined;

  return (
    <span
      style={areaStyle}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium leading-none tracking-wide",
        config.containerClass,
        className
      )}
    >
      {Icon && <Icon size={11} className="shrink-0" />}
      {label}
    </span>
  );
}
