export type ViewMode =
  | "home"
  | "ai-hub"
  | "ai-assistant"
  | "destinations"
  | "destination-detail"
  | "services"
  | "map-explorer"
  | "explorer-ride"
  | "bookings"
  | "visa-portal"
  | "tourist-portal"
  | "citizen-portal"
  | "tourguide-portal"
  | "investor-portal"
  | "establishment-portal"
  | "provider-portal"
  | "ministry-portal"
  | "superadmin-portal"
  | "profile"
  | "settings"
  | "portal"
  | "auth"
  | "password-recovery"
  | "register";

export interface VehicleCategory {
  id: string;
  nameAr: string;
  nameEn: string;
  typeKey: "economy" | "comfort" | "premium" | "family" | "xl" | "green" | "accessible";
  image: string;
  seats: number;
  basePriceSAR: number;
  perKmSAR: number;
  etaMins: number;
  comfortLevelAr: string;
  comfortLevelEn: string;
  descriptionAr: string;
  descriptionEn: string;
  badgeAr?: string;
  badgeEn?: string;
}

export interface RideDriver {
  id: string;
  nameAr: string;
  nameEn: string;
  avatar: string;
  rating: number;
  tripsCount: number;
  carModelAr: string;
  carModelEn: string;
  carColorAr: string;
  carColorEn: string;
  plateNumber: string;
  phone: string;
}

export interface RideBookingState {
  id: string;
  pickupName: string;
  dropoffName: string;
  pickupCoords: { lat: number; lng: number };
  dropoffCoords: { lat: number; lng: number };
  vehicle: VehicleCategory;
  driver: RideDriver;
  distanceKm: number;
  durationMins: number;
  estimatedPriceSAR: number;
  status: "searching" | "accepted" | "driver_arriving" | "in_transit" | "completed" | "cancelled";
  aiTourModeEnabled: boolean;
  bookingType: "instant" | "scheduled";
  scheduledDate?: string;
  scheduledTime?: string;
  tripType: "one_way" | "round_trip" | "multi_stop";
  createdAt: string;
}

export interface UnifiedBookingItem {
  id: string;
  type: "hotel" | "resort" | "restaurant" | "tour" | "event" | "ride";
  titleAr: string;
  titleEn: string;
  locationAr: string;
  locationEn: string;
  date: string;
  time: string;
  costSAR: number;
  status: "confirmed" | "upcoming" | "completed" | "cancelled";
  bookingNumber: string;
  image: string;
  guestsCount?: number;
  rewardPointsEarned: number;
  canCancel: boolean;
  canModify: boolean;
  isRated?: boolean;
  userRating?: number;
  userReview?: string;
  detailsAr?: string;
  detailsEn?: string;
}

export interface MapLandmarkMarker {
  id: string;
  nameAr: string;
  nameEn: string;
  category: "hotel" | "restaurant" | "event" | "entertainment" | "transport" | "heritage" | "nature";
  lat: number;
  lng: number;
  cityAr: string;
  cityEn: string;
  rating: number;
  priceSAR?: number;
  image: string;
  descriptionAr: string;
  descriptionEn: string;
}

export type UserRole =
  | "tourist"
  | "citizen"
  | "investor"
  | "tour-guide"
  | "establishment"
  | "service-provider"
  | "tourism-ministry"
  | "super-admin";

export type LanguageCode = "ar" | "en" | "fr" | "zh" | "de" | "es" | "ru" | "ja" | "tr" | "ur";

export interface Destination {
  id: string;
  nameAr: string;
  nameEn: string;
  regionAr: string;
  regionEn: string;
  taglineAr: string;
  taglineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  heroImage: string;
  gallery: string[];
  climateAr: string;
  climateEn: string;
  bestTimeAr: string;
  bestTimeEn: string;
  highlightsAr: string[];
  highlightsEn: string[];
  category: "heritage" | "nature" | "luxury" | "coastal" | "adventure";
  rating: number;
  coordinates: { lat: number; lng: number };
  mapRegionId: string;
}

export interface TourismService {
  id: string;
  type: "hotel" | "restaurant" | "transport" | "event" | "experience";
  nameAr: string;
  nameEn: string;
  locationAr: string;
  locationEn: string;
  destinationId: string;
  image: string;
  rating: number;
  priceSAR: number;
  priceLabelAr: string;
  priceLabelEn: string;
  descriptionAr: string;
  descriptionEn: string;
  featuresAr: string[];
  featuresEn: string[];
  bookingAvailable: boolean;
  contactPhone?: string;
  coordinates?: { lat: number; lng: number };
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  itineraryData?: GeneratedItinerary;
}

export interface GeneratedItinerary {
  title: string;
  summary: string;
  estimatedBudgetSAR: string;
  bestTimeToVisit: string;
  days: {
    dayNumber: number;
    title: string;
    morning: string;
    afternoon: string;
    evening: string;
    proTip?: string;
  }[];
  recommendedHotels: string[];
  recommendedDining: string[];
  packingList: string[];
  visaAndEtiquette?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  phone: string;
  nationality: string;
  savedItineraries: GeneratedItinerary[];
  savedDestinationIds: string[];
  savedServiceIds: string[];
  isTwoFactorEnabled: boolean;
  passportBadgeNumber?: string;
  rewardPoints?: number;
}

export interface SearchResultItem {
  id: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  type: "city" | "landmark" | "hotel" | "restaurant" | "event" | "activity" | "trip" | "investor" | "service";
  image?: string;
  targetView: ViewMode;
  targetId?: string;
}

export interface InvestmentOpportunity {
  id: string;
  titleAr: string;
  titleEn: string;
  regionAr: string;
  sectorAr: string;
  estimatedValueSAR: string;
  expectedRoiPercent: number;
  statusAr: string;
  image: string;
}
