import React, { useState } from "react";
import { TourismService, LanguageCode } from "../types";
import { MOCK_SERVICES } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { BookingModal } from "./BookingModal";
import {
  BedDouble,
  Utensils,
  Train,
  Ticket,
  Star,
  MapPin,
  CheckCircle2,
  PhoneCall,
  Search,
  Briefcase
} from "lucide-react";

interface UnifiedServicesViewProps {
  language: LanguageCode;
}

export const UnifiedServicesView: React.FC<UnifiedServicesViewProps> = ({ language }) => {
  const [activeType, setActiveType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | null>(null);

  const t = getTranslation(language);

  const categories = [
    { id: "all", labelAr: "جميع الخدمات", labelEn: "All Services", icon: Briefcase },
    { id: "hotel", labelAr: "الإقامة والفنادق", labelEn: "Hotels & Resorts", icon: BedDouble },
    { id: "restaurant", labelAr: "المطاعم والطهي", labelEn: "Culinary & Dining", icon: Utensils },
    { id: "transport", labelAr: "النقل والقطارات", labelEn: "Transport & Trains", icon: Train },
    { id: "event", labelAr: "الفعاليات والمواسم", labelEn: "Events & Seasons", icon: Ticket }
  ];

  const filteredServices = MOCK_SERVICES.filter((service) => {
    const matchesType = activeType === "all" || service.type === activeType;
    const matchesSearch =
      searchQuery.trim() === "" ||
      service.nameAr.includes(searchQuery) ||
      service.locationAr.includes(searchQuery) ||
      service.nameEn.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <section className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-100 text-emerald-950 rounded-full text-xs font-bold mb-3">
            <Briefcase className="w-4 h-4 text-emerald-800" />
            <span>النافذة السياحية الوطنية الموحدة</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-emerald-950 tracking-tight">
            الخدمات السياحية الموحدة بالمملكة
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-2">
            احجز الإقامة، المائدة السعودية الأصيلة، تذاكر قطار الحرمين السريع، وفعاليات المواسم من مكان واحد.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-stone-200 shadow-sm mb-8 space-y-4">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeType === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveType(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-emerald-900 text-white shadow-xs"
                        : "bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-emerald-700"}`} />
                    <span>{language === "ar" ? cat.labelAr : cat.labelEn}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute right-3.5 top-3 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن فندق، مطعم، تذكرة..."
                className="w-full pr-10 pl-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
              />
            </div>
          </div>

        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const name = language === "ar" ? service.nameAr : service.nameEn;
            const location = language === "ar" ? service.locationAr : service.locationEn;
            const desc = language === "ar" ? service.descriptionAr : service.descriptionEn;
            const features = language === "ar" ? service.featuresAr : service.featuresEn;
            const priceLabel = language === "ar" ? service.priceLabelAr : service.priceLabelEn;

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Service Image Cover */}
                  <div className="relative h-52 overflow-hidden">
                    <img src={service.image} alt={name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-stone-900 flex items-center gap-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{service.rating}</span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-emerald-950/90 text-white backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold">
                      {service.priceSAR} {priceLabel}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="text-xs font-medium text-emerald-800 flex items-center gap-1 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{location}</span>
                    </div>

                    <h3 className="text-lg font-black text-emerald-950 mb-2">{name}</h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">{desc}</p>

                    {/* Features List */}
                    <div className="space-y-1.5 mb-4">
                      {features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="text-xs text-stone-700 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {service.contactPhone && (
                      <div className="text-[11px] text-stone-500 flex items-center gap-1 mb-4">
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{service.contactPhone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedServiceForBooking(name)}
                    className="w-full py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>حجز وإصدار قسيمة موحدة</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Direct Booking Modal */}
      {selectedServiceForBooking && (
        <BookingModal
          serviceName={selectedServiceForBooking}
          isOpen={!!selectedServiceForBooking}
          onClose={() => setSelectedServiceForBooking(null)}
        />
      )}
    </section>
  );
};
