import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsentBanner from "@/components/ConsentBanner";
import SearchDrawer from "@/components/SearchDrawer";
import { getAllPartners } from "@/lib/content";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Meine Anzeige Online — Hamburgs Partnernetzwerk",
    template: "%s | Meine Anzeige Online",
  },
  description:
    "Meine Anzeige Online ist Hamburgs exklusives Partnernetzwerk für lokale Unternehmen. Nur per Empfehlung. Persönliches Kennenlernen. Echter Mehrwert.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const partners = getAllPartners();
  const organizationSchema = buildOrganizationSchema();
  const webSiteSchema = buildWebSiteSchema();

  return (
    <html lang="de">
      <body className={inter.className}>
        <a href="#main-content" className="skip-link">
          Zum Inhalt springen
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ConsentBanner />
        <SearchDrawer partners={partners} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </body>
    </html>
  );
}
