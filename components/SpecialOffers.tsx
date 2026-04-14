import { MessageCircle, Mail } from "lucide-react";
import type { PartnerSpecialOffers } from "@/lib/types";

interface SpecialOffersProps {
  offers: PartnerSpecialOffers;
  partnerEmail?: string;
  partnerWhatsapp?: string;
  partnerName?: string;
}

function parsePrice(priceStr: string): number | null {
  const match = priceStr.match(/(\d+(?:[.,]\d+)?)/);
  if (!match) return null;
  return parseFloat(match[1].replace(",", "."));
}

function calculateDiscountedPrice(originalPrice: number): string {
  const discounted = originalPrice * 0.9;
  return discounted % 1 === 0 ? discounted.toFixed(0) : discounted.toFixed(2);
}

export default function SpecialOffers({
  offers,
  partnerEmail,
  partnerWhatsapp,
  partnerName,
}: SpecialOffersProps) {
  return (
    <section className="border-t border-stone-100 bg-gradient-to-b from-brand-blue/5 to-transparent py-12 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Angebote für MAO Mitglieder</h2>
          <p className="text-sm text-stone-600">{offers.title}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offers.offers.map((offer, i) => {
            const originalPrice = parsePrice(offer.price);
            const discountedPrice =
              originalPrice !== null
                ? calculateDiscountedPrice(originalPrice)
                : null;

            return (
              <div
                key={i}
                className="rounded-xl border border-stone-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-stone-900">
                    {offer.title}
                  </h3>
                  <p className="mt-1 text-sm text-stone-600">
                    {offer.description}
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-stone-500 line-through">
                      {offer.price}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                      <span>-10%</span>
                      <span className="text-sm font-bold text-green-700">
                        {discountedPrice}€
                      </span>
                    </span>
                  </div>
                </div>

                {offer.contactMethods && offer.contactMethods.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {offer.contactMethods.includes("whatsapp") &&
                      partnerWhatsapp && (
                        <a
                          href={
                            partnerWhatsapp.startsWith("http")
                              ? partnerWhatsapp
                              : `https://wa.me/${partnerWhatsapp.replace(
                                  /\D/g,
                                  ""
                                )}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700 transition-colors hover:bg-green-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                        >
                          <MessageCircle size={13} />
                          WhatsApp
                        </a>
                      )}
                    {offer.contactMethods.includes("email") && partnerEmail && (
                      <a
                        href={`mailto:${partnerEmail}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        <Mail size={13} />
                        E-Mail
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
