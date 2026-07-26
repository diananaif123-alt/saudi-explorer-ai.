import React, { useState } from "react";
import { Destination, LanguageCode } from "../types";
import { MOCK_DESTINATIONS } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { MapPin, Star, Compass, ArrowUpRight, Filter, Sparkles } from "lucide-react";

interface InteractiveSaudiMapProps {
  language: LanguageCode;
  onSelectDestination: (id: string) => void;
  onGenerateAiItinerary: (name: string) => void;
}

export const InteractiveSaudiMap: React.FC<InteractiveSaudiMapProps> = ({
  language,
  onSelectDestination,
  onGenerateAiItinerary
}) => {
  const [activePinId, setActivePinId] = useState<string>("alula");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const t = getTranslation(language);

  const selectedDestination =
    MOCK_DESTINATIONS.find((d) => d.id === activePinId) || MOCK_DESTINATIONS[0];

  const pins = [
    { id: "alula", nameAr: "العُلا ومسرح مرايا", x: "32%", y: "28%", category: "heritage" },
    { id: "riyadh-diriyah", nameAr: "الرياض والدرعية", x: "55%", y: "45%", category: "luxury" },
    { id: "jeddah-redsea", nameAr: "جدة والبحر الأحمر", x: "34%", y: "58%", category: "coastal" },
    { id: "abha-asir", nameAr: "أبها وعسير", x: "42%", y: "78%", category: "nature" },
    { id: "tabuk-neom", nameAr: "تبوك ونيوم والديسة", x: "24%", y: "18%", category: "adventure" },
    { id: "eastern-alahsa", nameAr: "الأحساء والشرقية", x: "72%", y: "42%", category: "nature" }
  ];

  const filteredPins = pins.filter((p) => {
    if (filterCategory === "all") return true;
    return p.category === filterCategory;
  });

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold mb-3">
            <Compass className="w-4 h-4 text-emerald-800 animate-spin-slow" />
            <span>خريطة التغطية الوطنية السياحية</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-emerald-950 tracking-tight">
            {t.mapTitle}
          </h2>
          <p className="text-stone-600 text-sm mt-2">{t.mapSub}</p>
        </div>

        {/* Map Layout Container */}
        <div className="bg-stone-50 rounded-3xl p-4 sm:p-8 border border-stone-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Interactive Map Canvas (SVG + Pins) */}
          <div className="lg:col-span-7 relative bg-gradient-to-br from-emerald-50/60 via-stone-100 to-amber-50/40 rounded-2xl p-6 border border-stone-200/80 min-h-[380px] sm:min-h-[460px] flex items-center justify-center overflow-hidden no-swipe">
            
            {/* Styled KSA SVG Silhouette Background */}
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full max-h-[440px] drop-shadow-md transition-all"
            >
              {/* Simplified Saudi Arabia Landmass Path */}
              <path
                d="M 180 120 Q 280 80 400 90 Q 520 100 620 160 Q 720 220 700 320 Q 660 400 580 460 Q 480 540 380 550 Q 280 500 240 420 Q 220 320 180 220 Z"
                fill="#064e3b"
                fillOpacity="0.08"
                stroke="#064e3b"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
              <path
                d="M 220 150 Q 300 110 420 120 Q 520 130 600 190 Q 660 250 640 330 Q 600 390 520 440 Q 420 500 320 480 Q 260 420 230 310 Q 210 220 220 150 Z"
                fill="#064e3b"
                fillOpacity="0.04"
              />
            </svg>

            {/* Region Pins */}
            {filteredPins.map((pin) => {
              const isSelected = pin.id === activePinId;
              return (
                <div
                  key={pin.id}
                  style={{ left: pin.x, top: pin.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                  onClick={() => setActivePinId(pin.id)}
                >
                  {/* Glowing Ring */}
                  {isSelected && (
                    <span className="absolute -inset-2 rounded-full bg-amber-400/40 animate-ping" />
                  )}

                  {/* Pin Icon */}
                  <div
                    className={`relative p-2.5 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                      isSelected
                        ? "bg-amber-400 text-emerald-950 scale-125 border-2 border-white ring-2 ring-amber-400"
                        : "bg-emerald-900 text-white hover:bg-emerald-800 hover:scale-110"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>

                  {/* Pin Label Badge */}
                  <div
                    className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-extrabold shadow-md transition-all ${
                      isSelected
                        ? "bg-emerald-950 text-white opacity-100 scale-100"
                        : "bg-white/90 text-stone-800 opacity-0 group-hover:opacity-100 scale-95"
                    }`}
                  >
                    {pin.nameAr}
                  </div>
                </div>
              );
            })}

            {/* Map Category Filters */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-1.5 rounded-xl border border-stone-200 shadow-xs flex items-center gap-1 z-30">
              <Filter className="w-3.5 h-3.5 text-stone-500 ml-1" />
              {[
                { id: "all", name: "الكل" },
                { id: "heritage", name: "تراث" },
                { id: "coastal", name: "شواطئ" },
                { id: "nature", name: "طبيعة" }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterCategory(f.id)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                    filterCategory === f.id
                      ? "bg-emerald-900 text-white"
                      : "text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>

          </div>

          {/* Selected Destination Card Info */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-stone-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                <img
                  src={selectedDestination.heroImage}
                  alt={selectedDestination.nameAr}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-stone-900 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{selectedDestination.rating}</span>
                </div>
              </div>

              <div className="text-xs text-amber-600 font-bold mb-1">
                {selectedDestination.regionAr}
              </div>

              <h3 className="text-2xl font-black text-emerald-950 mb-2">
                {selectedDestination.nameAr}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {selectedDestination.descriptionAr}
              </p>

              {/* Highlights Preview */}
              <div className="space-y-1 mb-6">
                <div className="text-[11px] font-bold text-emerald-900">أبرز الأنشطة:</div>
                {selectedDestination.highlightsAr.slice(0, 3).map((hl, i) => (
                  <div key={i} className="text-xs text-stone-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => onSelectDestination(selectedDestination.id)}
                className="w-full py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>استكشف كافة تفاصيل المنطقة</span>
                <ArrowUpRight className="w-4 h-4 text-amber-300" />
              </button>

              <button
                onClick={() => onGenerateAiItinerary(selectedDestination.nameAr)}
                className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs sm:text-sm rounded-xl border border-amber-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>توليد مسار الرحلة بالذكاء الاصطناعي</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
