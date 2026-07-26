import React, { useState } from "react";
import { Destination, LanguageCode } from "../types";
import { MOCK_DESTINATIONS } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { MapPin, Star, SunMedium, Compass, ArrowUpRight, Sparkles } from "lucide-react";

interface DestinationsGridProps {
  language: LanguageCode;
  onSelectDestination: (destinationId: string) => void;
  onOpenAiPlanner: (destinationName: string) => void;
}

export const DestinationsGrid: React.FC<DestinationsGridProps> = ({
  language,
  onSelectDestination,
  onOpenAiPlanner
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const t = getTranslation(language);

  const categories = [
    { id: "all", nameAr: "جميع الوجهات", nameEn: "All Regions" },
    { id: "heritage", nameAr: "آثار وتراث عالمي", nameEn: "Heritage & UNESCO" },
    { id: "luxury", nameAr: "فخامة ومواسم", nameEn: "Luxury & Seasons" },
    { id: "coastal", nameAr: "البحر الأحمر والشواطئ", nameEn: "Coastal & Red Sea" },
    { id: "nature", nameAr: "طبيعة وجبال", nameEn: "Nature & Mountains" },
    { id: "adventure", nameAr: "مغامرة والمستقبل", nameEn: "Adventure & NEOM" }
  ];

  const filteredDestinations = MOCK_DESTINATIONS.filter((d) => {
    if (selectedCategory === "all") return true;
    return d.category === selectedCategory;
  });

  return (
    <section className="py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>مستكشف مناطق المملكة</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-emerald-950 tracking-tight">
              {t.trendingDestinations}
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-xl">
              اختر أي منطقة لاستكشاف معالمها التاريخية، أفضل أوقات الزيارة، والأنشطة الموصى بها.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-emerald-900 text-white shadow-sm"
                    : "bg-white text-stone-700 hover:bg-stone-200 border border-stone-200"
                }`}
              >
                {language === "ar" ? cat.nameAr : cat.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => {
            const name = language === "ar" ? dest.nameAr : dest.nameEn;
            const tagline = language === "ar" ? dest.taglineAr : dest.taglineEn;
            const region = language === "ar" ? dest.regionAr : dest.regionEn;
            const highlights = language === "ar" ? dest.highlightsAr : dest.highlightsEn;

            return (
              <div
                key={dest.id}
                className="group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Cover */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.heroImage}
                    alt={name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Rating Tag */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-stone-900 flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{dest.rating}</span>
                  </div>

                  {/* Location Tag */}
                  <div className="absolute bottom-4 right-4 left-4 text-white">
                    <div className="text-xs font-medium text-amber-300 flex items-center gap-1 mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{region}</span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">{name}</h3>
                  </div>
                </div>

                {/* Landmark Photo Thumbnails Strip */}
                <div className="bg-stone-900 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
                  <span className="text-[10px] text-amber-300 font-bold whitespace-nowrap">مجسمات 3D للمعالم:</span>
                  {dest.gallery.map((imgUrl, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-amber-400/30 shadow-2xs group/img"
                    >
                      <img src={imgUrl} alt={`${name} ${imgIdx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-stone-600 font-medium mb-4 line-clamp-2">
                      {tagline}
                    </p>

                    {/* Highlights List */}
                    <div className="space-y-1.5 mb-6">
                      <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
                        أبرز المعالم والتجارب:
                      </div>
                      {highlights.slice(0, 3).map((hl, i) => (
                        <div key={i} className="text-xs text-stone-700 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                          <span className="truncate">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-stone-100 flex items-center gap-2">
                    <button
                      onClick={() => onSelectDestination(dest.id)}
                      className="flex-1 py-2.5 px-4 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>{t.exploreBtn}</span>
                      <ArrowUpRight className="w-4 h-4 text-amber-300" />
                    </button>

                    <button
                      onClick={() => onOpenAiPlanner(name)}
                      title="خطط جدول الرحلة بالذكاء الاصطناعي"
                      className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
