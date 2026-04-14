"use client";

import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AutoScrollPlugin = AutoScroll as any;
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cloudinaryUrl } from "@/lib/utils";

interface LogoEntry {
  id: string;
  description: string;
  image: string;
  href: string;
  className?: string;
}

const logos: LogoEntry[] = [
  {
    id: "formella-vision",
    description: "Formella Vision – Webdesign Hamburg",
    image: cloudinaryUrl(
      "https://res.cloudinary.com/dqkld61zu/image/upload/v1773540399/Formella_Vision_wwnlhs.svg",
      { width: 200, quality: 90, format: "auto" }
    ),
    href: "https://formellavision.de/",
    className: "h-12 w-auto",
  },
  {
    id: "physiowohltat",
    description: "Physiowohltat – Physiotherapie Norderstedt",
    image: cloudinaryUrl(
      "https://res.cloudinary.com/dqkld61zu/image/upload/v1773540418/Physiowohltat_banner_hms433.png",
      { width: 200, quality: 85, format: "auto" }
    ),
    href: "https://physiowohltat.com/",
    className: "h-8 w-auto",
  },
  {
    id: "foto24-hamburg",
    description: "Foto24 Hamburg – Fotograf Hamburg",
    image: cloudinaryUrl(
      "https://res.cloudinary.com/dqkld61zu/image/upload/v1773540443/Foto24.Hamburg_Logo_quer_giituo.svg",
      { width: 200, quality: 90, format: "auto" }
    ),
    href: "https://foto24.hamburg/",
    className: "h-8 w-auto",
  },
];

const doubledLogos = [...logos, ...logos, ...logos];

export default function PartnerLogoSlider() {
  return (
    <section className="bg-white border-b border-stone-100 py-10" aria-label="Partner">
      <div className="container flex flex-col items-center text-center mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">Unsere Partner</p>
        <h2 className="text-2xl font-bold text-stone-800">
          Starke Partner = starkes Netzwerk
        </h2>
      </div>
      <div className="relative mx-auto max-w-5xl overflow-hidden">
        <Carousel
          opts={{ loop: true, dragFree: false }}
          plugins={[AutoScrollPlugin({ playOnInit: true, speed: 1.2, stopOnInteraction: false })]}
        >
          <CarouselContent className="ml-0 items-center">
            {doubledLogos.map((logo, i) => (
              <CarouselItem
                key={`${logo.id}-${i}`}
                className="flex basis-1/2 justify-center pl-0 sm:basis-1/3 md:basis-1/4"
              >
                <a
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto mx-8 flex shrink-0 items-center justify-center"
                >
                  <Image
                    src={logo.image}
                    alt={logo.description}
                    width={200}
                    height={48}
                    className={`${logo.className} object-contain`}
                    loading="lazy"
                    unoptimized={logo.image.endsWith(".svg")}
                  />
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
      </div>
    </section>
  );
}
