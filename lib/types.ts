export interface PartnerContact {
  contactName: string;
  phone: string;
  email: string;
  website: string;
  whatsapp: string;
}

export interface PartnerSocial {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  xing?: string;
}

export interface PartnerAddress {
  street: string;
  zip: string;
  city: string;
  googleMapsUrl?: string;
}

export interface PartnerImages {
  logo: string;
  icon: string;
  gallery: string[];
}

export interface RecommendedBy {
  name: string;
  slug: string;
  note?: string;
}

export interface SpecialOffer {
  title: string;
  description: string;
  price: string;
  contactMethods: ('whatsapp' | 'email')[];
}

export interface PartnerSpecialOffers {
  title: string;
  offers: SpecialOffer[];
}

export interface OpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface Partner {
  name: string;
  slug: string;
  categorySlug: string;
  tags: string[];
  areaSlug: string;
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  services: string[];
  contact: PartnerContact;
  social: PartnerSocial;
  address: PartnerAddress;
  openingHours: OpeningHours;
  images: PartnerImages;
  recommendedBy?: RecommendedBy;
  specialOffers?: PartnerSpecialOffers;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  featured: boolean;
  createdAt: string;
  _placeholder?: boolean;
}

export interface EventContentBlock {
  type: 'h2' | 'h3' | 'p' | 'ul' | 'li';
  text: string;
}

export interface EventCTA {
  label: string;
  url: string;
}

export interface EventImages {
  cover: string;
  gallery: string[];
}

export interface EventOrganizer {
  name: string;
  contactEmail: string;
}

export interface MAOEvent {
  title: string;
  slug: string;
  dateStart: string;
  dateEnd: string;
  areaSlug: string;
  locationName: string;
  address: string;
  shortDescription: string;
  content: EventContentBlock[];
  cta: EventCTA;
  images: EventImages;
  organizer: EventOrganizer;
  featured: boolean;
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
  description?: string;
}

export interface Area {
  name: string;
  slug: string;
  description?: string;
}

export interface ConsentState {
  status: 'undecided' | 'accepted_all' | 'rejected_all' | 'custom';
  essential: boolean;
  external_media: boolean;
  analytics: boolean;
}
