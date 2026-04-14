import { MessageCircle, Mail } from "lucide-react";
import type { PartnerSpecialOffers } from "@/lib/types";

interface SpecialOffersProps {
  offers: PartnerSpecialOffers;
  partnerEmail?: string;
  partnerWhatsapp?: string;
}

export default function SpecialOffers({
  offers,
  partnerEmail,
  partnerWhatsapp,
}: SpecialOffersProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-stone-900 mb-4">{offers.title}</h2>
        <div className="space-y-4">
          {offers.offers.map((offer, i) => (
            <div
              key={i}
              className="rounded-xl border border-stone-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-stone-900">
                    {offer.title}
                  </h3>
                  <p className="mt-1 text-sm text-stone-600">
                    {offer.description}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-lg font-bold text-brand-blue">
                    {offer.price}
                  </p>
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
                        className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                      >
                        <MessageCircle size={14} />
                        WhatsApp
                      </a>
                    )}
                  {offer.contactMethods.includes("email") && partnerEmail && (
                    <a
                      href={`mailto:${partnerEmail}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <Mail size={14} />
                      E-Mail
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
