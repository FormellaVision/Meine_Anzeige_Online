export const NAP = {
  name: "Meine Anzeige Online",
  legalName: "Meine Anzeige Online",
  street: "Millerntor 1",
  zip: "20359",
  city: "Hamburg",
  state: "Hamburg",
  country: "DE",
  countryName: "Deutschland",
  phone: "+49 173 3878209",
  email: "info@meineanzeige.online",
  website: "https://meineanzeige.online",
  foundedYear: 2025,
  description:
    "Hamburgs exklusives Partnernetzwerk für lokale Unternehmen — nur per Empfehlung, persönliches Kennenlernen, echter Mehrwert.",
  priceRange: "€€",
  serviceType: "BusinessNetworkingService",
  areaServed: ["Hamburg", "Norderstedt", "Ahrensburg", "Reinbek", "Schenefeld"],
  geo: {
    latitude: 53.5511,
    longitude: 9.9937,
  },
  social: {
    facebook: "",
    instagram: "https://instagram.com/meineanzeigeonline",
    linkedin: "",
  },
  founders: [
    { name: "Christian Formella", role: "Gründer & Webdesigner", partnerSlug: "formella-vision" },
    { name: "Michael Wolfsohn", role: "Gründer & Partner", partnerSlug: "foto24-hamburg" },
  ],
};

export const SITE_URL = "https://meineanzeige.online";

export const BRAND = {
  primaryBlue: "#166BBF",
  offWhite: "#FFFFFF",
  warmCream: "#F4EEE1",
  softLightBlue: "#82AAD1",
  warmGold: "#E0DF8D",
};

export const NAV_LINKS = [
  { label: "Partner entdecken", href: "/partner" },
  { label: "Partner werden", href: "/partner-werden" },
  { label: "Veranstaltungen", href: "/veranstaltungen" },
  { label: "Über", href: "/ueber" },
  { label: "Kontakt", href: "/kontakt" },
];

export const DAYS_DE: Record<string, string> = {
  monday: "Montag",
  tuesday: "Dienstag",
  wednesday: "Mittwoch",
  thursday: "Donnerstag",
  friday: "Freitag",
  saturday: "Samstag",
  sunday: "Sonntag",
};

export const PROCESS_STEPS = [
  {
    icon: "UserPlus",
    title: "Empfohlen werden",
    description: "Jeder neue Partner wird von einem bestehenden Mitglied empfohlen. Das sichert Qualität von Anfang an.",
  },
  {
    icon: "FileText",
    title: "Anfrage stellen",
    description: "Sie füllen unser kurzes Bewerbungsformular aus. Wir prüfen Ihre Website und Ihren Auftritt.",
  },
  {
    icon: "Coffee",
    title: "Kennenlernen",
    description: "Bei einem persönlichen Gespräch — online oder vor Ort — lernen wir uns kennen.",
  },
  {
    icon: "CheckCircle",
    title: "Dabei sein",
    description: "Nach einer kurzen Probezeit werden Sie offiziell aufgenommen und im Netzwerk sichtbar.",
  },
];
