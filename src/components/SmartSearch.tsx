import React, { useState, useRef, useEffect } from "react";
import { Search, MapPin, Building2, Utensils, Calendar, Sparkles, TrendingUp, X } from "lucide-react";
import { ViewMode } from "../types";
import { MOCK_DESTINATIONS, MOCK_SERVICES } from "../data/mockData";

interface SmartSearchProps {
  onSelectView: (view: ViewMode, targetId?: string) => void;
  placeholder?: string;
  className?: string;
}

interface SearchItem {
  id: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  type: "city" | "landmark" | "hotel" | "restaurant" | "event" | "service";
  image?: string;
  view: ViewMode;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({
  onSelectView,
  placeholder = "ابحث عن المدن، الفنادق، المعالم، أو الفعاليات...",
  className = ""
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Index search items
  const items: SearchItem[] = [
    ...MOCK_DESTINATIONS.map((d) => ({
      id: d.id,
      titleAr: d.nameAr,
      titleEn: d.nameEn,
      categoryAr: d.regionAr,
      categoryEn: d.regionEn,
      type: "city" as const,
      image: d.heroImage,
      view: "destination-detail" as ViewMode
    })),
    ...MOCK_SERVICES.map((s) => ({
      id: s.id,
      titleAr: s.nameAr,
      titleEn: s.nameEn,
      categoryAr: s.locationAr,
      categoryEn: s.locationEn,
      type: (s.type === "hotel" ? "hotel" : s.type === "restaurant" ? "restaurant" : "service") as SearchItem["type"],
      image: s.image,
      view: "services" as ViewMode
    })),
    // Demo quick suggestions
    {
      id: "alula-balloon",
      titleAr: "مهرجان المناطيد في العُلا",
      titleEn: "AlUla Hot Air Balloon Festival",
      categoryAr: "العُلا - المدينة المنورة",
      categoryEn: "AlUla",
      type: "event" as const,
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600",
      view: "destinations"
    },
    {
      id: "diriyah-season",
      titleAr: "موسم الدرعية التاريخية",
      titleEn: "Diriyah Historic Season",
      categoryAr: "الدرعية - الرياض",
      categoryEn: "Diriyah",
      type: "event" as const,
      image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=600",
      view: "destinations"
    }
  ];

  const filteredItems = query.trim()
    ? items.filter(
        (i) =>
          i.titleAr.toLowerCase().includes(query.toLowerCase()) ||
          i.titleEn.toLowerCase().includes(query.toLowerCase()) ||
          i.categoryAr.toLowerCase().includes(query.toLowerCase())
      )
    : items.slice(0, 5); // Show top trending when empty

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: SearchItem) => {
    onSelectView(item.view, item.id);
    setIsOpen(false);
    setQuery("");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "city":
      case "landmark":
        return <MapPin className="w-4 h-4 text-emerald-600" />;
      case "hotel":
        return <Building2 className="w-4 h-4 text-amber-600" />;
      case "restaurant":
        return <Utensils className="w-4 h-4 text-rose-600" />;
      case "event":
        return <Calendar className="w-4 h-4 text-purple-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div className="relative flex items-center bg-white border border-emerald-900/15 rounded-2xl shadow-sm focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-600/20 transition-all">
        <Search className="w-5 h-5 text-emerald-800 me-3 ms-4 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full py-3.5 pe-4 text-stone-900 bg-transparent text-sm placeholder:text-stone-400 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="p-1.5 text-stone-400 hover:text-stone-600 me-2 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-2 flex items-center justify-between border-b border-stone-100 text-xs font-bold text-stone-400 uppercase tracking-wider">
            <span>{query.trim() ? "نتائج البحث الأوتوماتيكية" : "الأكثر بحثاً في المملكة"}</span>
            <span className="flex items-center gap-1 text-emerald-700">
              <TrendingUp className="w-3.5 h-3.5" /> الذكاء الاصطناعي
            </span>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-stone-50">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center gap-3.5 px-4 py-3 hover:bg-emerald-50/80 transition-colors text-right cursor-pointer group"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.titleAr}
                      className="w-11 h-11 rounded-xl object-cover border border-stone-200 shrink-0 group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-emerald-100/60 flex items-center justify-center shrink-0">
                      {getIcon(item.type)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-900 truncate group-hover:text-emerald-950">
                        {item.titleAr}
                      </span>
                      <span className="text-xs text-stone-400 font-normal hidden sm:inline">
                        ({item.titleEn})
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-0.5">
                      {getIcon(item.type)}
                      <span className="truncate">{item.categoryAr}</span>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-6 text-center text-stone-500 text-sm">
                لم نجد نتائج مطابقة لـ "{query}". يمكنك التحدث مباشرة مع المساعد الذكي لتخطيط رحلتك!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
