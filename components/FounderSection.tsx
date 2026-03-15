import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { NAP } from "@/lib/constants";
import SectionHeading from "@/components/SectionHeading";

interface FounderCardProps {
  name: string;
  role: string;
  partnerSlug: string;
  photoSrc: string;
  quote?: string;
}

interface FounderSectionProps {
  showTitle?: boolean;
}

const FOUNDER_PHOTOS: Record<string, string> = {
  "formella-vision": "https://res.cloudinary.com/dqkld61zu/image/upload/v1773517266/Christian_Formella_Profilbild_01_raqdy9.webp",
  "foto24-hamburg": "https://res.cloudinary.com/dqkld61zu/image/upload/v1773516818/Michael_Wolfsohn_Foto24-Hamburg_q7nvyc.webp",
};

const FOUNDER_QUOTES: Record<string, string> = {
  "formella-vision":
    "Gute Zusammenarbeit entsteht durch echte Beziehungen — nicht durch anonyme Plattformen.",
  "foto24-hamburg":
    "Ein Netzwerk ist so stark wie das Vertrauen, das seine Mitglieder einander schenken.",
};

function FounderCard({ name, role, partnerSlug, photoSrc, quote }: FounderCardProps) {
  return (
    <Link
      href={`/partner/${partnerSlug}`}
      className="group flex w-full max-w-xs flex-col items-center rounded-2xl border border-stone-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
    >
      <div className="relative mb-5 h-[120px] w-[120px] overflow-hidden rounded-full ring-4 ring-brand-blue/10">
        <Image
          src={photoSrc}
          alt={name}
          fill
          className="object-cover"
          sizes="120px"
        />
      </div>

      <h3 className="mb-1 text-lg font-bold text-stone-900">{name}</h3>

      <span className="mb-3 inline-block rounded-full bg-brand-blue/8 px-3 py-1 text-xs font-semibold text-brand-blue">
        {role}
      </span>

      {quote && (
        <p className="mb-4 text-center text-sm leading-relaxed text-stone-500 italic">
          &ldquo;{quote}&rdquo;
        </p>
      )}

      <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue transition-all duration-200 group-hover:gap-2">
        Zum Profil
        <ArrowRight size={13} />
      </span>
    </Link>
  );
}

export default function FounderSection({ showTitle = true }: FounderSectionProps) {
  return (
    <section className="bg-white py-20 px-4" aria-label="Gründer">
      <div className="mx-auto max-w-5xl">
        {showTitle && (
          <div className="mb-12 text-center">
            <SectionHeading
              eyebrow="Das Herzstück"
              title="Gegründet von zwei Hamburger Unternehmern"
              subtitle="Gegründet von zwei Hamburger Unternehmern, die an echte Partnerschaften glauben."
              centered
            />
          </div>
        )}

        <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-10">
          {NAP.founders.map((founder) => (
            <FounderCard
              key={founder.partnerSlug}
              name={founder.name}
              role={founder.role}
              partnerSlug={founder.partnerSlug}
              photoSrc={FOUNDER_PHOTOS[founder.partnerSlug] ?? ""}
              quote={FOUNDER_QUOTES[founder.partnerSlug]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
