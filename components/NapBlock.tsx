import { Phone, Mail, MapPin } from "lucide-react";
import { NAP } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface NapBlockProps {
  className?: string;
  showAddress?: boolean;
  variant?: "light" | "dark";
}

export default function NapBlock({
  className,
  showAddress = true,
  variant = "light",
}: NapBlockProps) {
  const isDark = variant === "dark";

  return (
    <address
      className={cn("not-italic", className)}
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      <meta itemProp="name" content={NAP.name} />
      <meta itemProp="url" content={NAP.website} />

      <ul
        className={cn(
          "space-y-3 text-sm",
          isDark ? "text-gray-300" : "text-stone-600"
        )}
      >
        <li>
          <a
            href={`tel:${NAP.phone.replace(/\s/g, "")}`}
            itemProp="telephone"
            className={cn(
              "flex items-center gap-2.5 transition-colors",
              isDark
                ? "hover:text-white"
                : "hover:text-brand-blue"
            )}
          >
            <Phone
              size={15}
              className={cn(
                "shrink-0",
                isDark ? "text-brand-blue-light" : "text-brand-blue"
              )}
            />
            <span>{NAP.phone}</span>
          </a>
        </li>

        <li>
          <a
            href={`mailto:${NAP.email}`}
            itemProp="email"
            className={cn(
              "flex items-center gap-2.5 transition-colors",
              isDark
                ? "hover:text-white"
                : "hover:text-brand-blue"
            )}
          >
            <Mail
              size={15}
              className={cn(
                "shrink-0",
                isDark ? "text-brand-blue-light" : "text-brand-blue"
              )}
            />
            <span className="break-all">{NAP.email}</span>
          </a>
        </li>

        {showAddress && (
          <li
            className="flex items-start gap-2.5"
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress"
          >
            <MapPin
              size={15}
              className={cn(
                "mt-0.5 shrink-0",
                isDark ? "text-brand-blue-light" : "text-brand-blue"
              )}
            />
            <span>
              {NAP.street && (
                <>
                  <span itemProp="streetAddress">{NAP.street}</span>
                  <br />
                  <span itemProp="postalCode">{NAP.zip}</span>{" "}
                </>
              )}
              <span itemProp="addressLocality">{NAP.city}</span>
              <meta itemProp="addressRegion" content={NAP.state} />
              <meta itemProp="addressCountry" content={NAP.country} />
            </span>
          </li>
        )}
      </ul>
    </address>
  );
}
