import {
  Heart,
  Monitor,
  Hammer,
  UtensilsCrossed,
  Scale,
  Home,
  Scissors,
  Camera,
  Users,
  Car,
  Megaphone,
  GraduationCap,
  Cpu,
  Sparkles,
  PawPrint,
  PartyPopper,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryIconProps {
  slug: string;
  size?: number;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  "gesundheit-wellness": Heart,
  "webdesign-digitales": Monitor,
  "handwerk-bau": Hammer,
  "gastronomie-catering": UtensilsCrossed,
  "recht-finanzen": Scale,
  immobilien: Home,
  "beauty-friseur": Scissors,
  "fotografie-medien": Camera,
  "coaching-beratung": Users,
  "auto-mobilitaet": Car,
  "marketing-werbung": Megaphone,
  "bildung-kurse": GraduationCap,
  "it-technik": Cpu,
  "reinigung-facility": Sparkles,
  "tier-natur": PawPrint,
  "veranstaltungen-event": PartyPopper,
  default: Building2,
};

export default function CategoryIcon({ slug, size = 24, className }: CategoryIconProps) {
  const Icon = iconMap[slug] ?? iconMap["default"];
  return <Icon size={size} className={cn(className)} />;
}
