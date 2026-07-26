import React, { useState } from "react";
import { LanguageCode, MapLandmarkMarker, ViewMode } from "../../types";
import { MAP_LANDMARKS } from "../../data/phase5Data";
import {
  MapPin,
  Search,
  Filter,
  Navigation,
  Clock,
  Car,
  Building2,
  Utensils,
  Sparkles,
  Calendar,
  Compass,
  ChevronRight,
  Star,
  CheckCircle2,
  Route,
  Zap,
  Info
} from "lucide-react";

interface InteractiveMapExplorerProps {
  language: LanguageCode;
  onNavigateView: (view: ViewMode, targetId?: string) => void;
  onBookRideToLandmark?: (landmarkName: string) => void;
  onBookServiceModal?: (serviceName: string) => void;
}

export const InteractiveMapExplorer: React.FC<InteractiveMapExplorerProps> = ({
  language,
  onNavigateView,
  onBookRideToLandmark,
  onBookServiceModal
}) => {
  const [selectedCity, setSelectedCity] = useState("الرياض");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedLandmark, setSelectedLandmark] = useState<MapLandmarkMarker | null>(MAP_LANDMARKS[0]);
  
  // Route calculator state
  const [routeStart, setRouteStart] = useState("مطار الملك خالد الدولي");
  const [routeDestination, setRouteDestination] = useState("حي الطريف التاريخي - الدرعية");
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(28.5);
  const [calculatedEta, setCalculatedEta] = useState<number | null>(24);

  const categories = [
    { id: "all", nameAr: "الكل", nameEn: "All", icon: Compass },
    { id: "hotel", nameAr: "الفنادق", nameEn: "Hotels", icon: Building2 },
    { id: "restaurant", nameAr: "المطاعم", nameEn: "Restaurants", icon: Utensils },
    { id: "event", nameAr: "الفعاليات", nameEn: "Events", icon: Calendar },
    { id: "entertainment", nameAr: "الترفيه", nameEn: "Entertainment", icon: Sparkles },
    { id: "transport", nameAr: "وسائل النقل", nameEn: "Transport", icon: Car }
  ];

  const filteredLandmarks = MAP_LANDMARKS.filter((lm) => {
    const matchesCity = selectedCity === "الكل" || lm.cityAr === selectedCity;
    const matchesCategory = activeCategory === "all" || lm.category === activeCategory;
    const matchesSearch =
      lm.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lm.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lm.cityAr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesCategory && matchesSearch;
  });

  const handleCalculateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculatingRoute(true);
    setTimeout(() => {
      setIsCalculatingRoute(false);
      // Random simulated distance & duration based on text length or mock calculation
      const dist = Math.floor(15 + Math.random() * 30);
      const eta = Math.floor(dist * 0.9 + 5);
      setCalculatedDistance(dist);
      setCalculatedEta(eta);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-stone-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-right">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-emerald-950 font-black text-xs px-3 py-1 rounded-full">
            <Navigation className="w-3.5 h-3.5" />
            <span>نظام الخرائط التفاعلي المباشر</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            استكشف المملكة بخريطة ذكية شاملة
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            ابحث عن الفنادق، المطاعم، الفعاليات، ووسائل النقل، واحسب مسارات التنقل بدقة مع توفر خدمة Explorer Ride الفورية.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateView("explorer-ride")}
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black rounded-2xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Car className="w-4 h-4" />
            <span>احجز رحلة Explorer Ride</span>
          </button>
        </div>
      </div>

      {/* Main Map Explorer Controls & Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Controls, Route Calculator & Search Filters (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Search & City Filter Card */}
          <div className="bg-white p-5 rounded-3xl shadow-md border border-stone-200 space-y-4">
            <h3 className="text-sm font-black text-emerald-950 flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-500" />
              <span>البحث واختيار المدينة</span>
            </h3>

            {/* City Selector Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {["الكل", "الرياض", "جدة", "العلا"].map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCity === city
                      ? "bg-emerald-900 text-white shadow-xs"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن مدينة، فندق، مطعم، أو معلم..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-amber-400 text-emerald-950 shadow-xs"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.nameAr}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Route Distance & ETA Calculator Box */}
          <div className="bg-white p-5 rounded-3xl shadow-md border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-emerald-950 flex items-center gap-2">
                <Route className="w-4 h-4 text-emerald-700" />
                <span>حاسبة المسار والوقت المتوقع (ETA)</span>
              </h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                محاكاة مباشرة
              </span>
            </div>

            <form onSubmit={handleCalculateRoute} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-500 mb-1">
                  نقطة الانطلاق (موقعك الحالي):
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={routeStart}
                    onChange={(e) => setRouteStart(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                  />
                  <MapPin className="w-3.5 h-3.5 text-emerald-700 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-500 mb-1">
                  الوجهة المطلوبة:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={routeDestination}
                    onChange={(e) => setRouteDestination(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                  />
                  <Navigation className="w-3.5 h-3.5 text-amber-600 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isCalculatingRoute}
                className="w-full py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                {isCalculatingRoute ? (
                  <span>جاري حساب المسار...</span>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>حساب المسافة والوقت المتوقع</span>
                  </>
                )}
              </button>
            </form>

            {calculatedDistance !== null && calculatedEta !== null && (
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/80 space-y-2 animate-in fade-in">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-white rounded-xl shadow-2xs border border-emerald-100">
                    <div className="text-[10px] text-stone-500 font-bold">المسافة الكلية</div>
                    <div className="text-sm font-black text-emerald-950 mt-0.5">
                      {calculatedDistance} كم
                    </div>
                  </div>

                  <div className="p-2 bg-white rounded-xl shadow-2xs border border-emerald-100">
                    <div className="text-[10px] text-stone-500 font-bold">الوقت المتوقع (ETA)</div>
                    <div className="text-sm font-black text-emerald-950 mt-0.5">
                      {calculatedEta} دقيقة
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-stone-600">التنقل الموصى به:</span>
                  <button
                    onClick={() => {
                      if (onBookRideToLandmark) {
                        onBookRideToLandmark(routeDestination);
                      } else {
                        onNavigateView("explorer-ride");
                      }
                    }}
                    className="text-emerald-900 font-black hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>طلب Explorer Ride</span>
                    <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Search Results List */}
          <div className="bg-white p-5 rounded-3xl shadow-md border border-stone-200 space-y-3 max-h-96 overflow-y-auto">
            <div className="text-xs font-bold text-stone-500 flex justify-between items-center">
              <span>المعالم والوجهات المتاحة ({filteredLandmarks.length})</span>
              <span className="text-[10px] text-emerald-700">انقر للتحديد على الخريطة</span>
            </div>

            <div className="space-y-2">
              {filteredLandmarks.map((lm) => (
                <button
                  key={lm.id}
                  onClick={() => setSelectedLandmark(lm)}
                  className={`w-full p-3 rounded-2xl text-right transition-all flex items-center gap-3 border cursor-pointer ${
                    selectedLandmark?.id === lm.id
                      ? "bg-emerald-50 border-emerald-700 shadow-sm"
                      : "bg-stone-50 border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  <img
                    src={lm.image}
                    alt=""
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-extrabold text-stone-900 truncate">
                      {lm.nameAr}
                    </div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      <span>{lm.cityAr}</span>
                      <span className="mx-1">•</span>
                      <span className="text-amber-600 font-bold flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {lm.rating}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Interactive Visual Map & Landmark Details Modal Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Interactive Map Canvas Container */}
          <div className="relative bg-emerald-950 rounded-3xl overflow-hidden shadow-xl border border-stone-300 min-h-[480px] flex flex-col justify-between p-6 text-white group">
            
            {/* Background Map Graphic Pattern / Grid Overlay */}
            <div
              className="absolute inset-0 opacity-25 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-emerald-950/40" />

            {/* Top Map Status Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="bg-emerald-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-emerald-700 text-xs font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>تغطية الخريطة المباشرة: {selectedCity}</span>
              </div>

              <div className="bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-400/40 text-xs text-amber-300 font-extrabold">
                {filteredLandmarks.length} نقاط نشطة
              </div>
            </div>

            {/* Interactive Pins Overlay on Map Graphic */}
            <div className="relative z-10 my-auto py-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredLandmarks.slice(0, 6).map((lm, idx) => {
                const isSelected = selectedLandmark?.id === lm.id;
                return (
                  <button
                    key={lm.id}
                    onClick={() => setSelectedLandmark(lm)}
                    className={`p-3 rounded-2xl backdrop-blur-md transition-all cursor-pointer text-right flex items-center gap-2.5 border ${
                      isSelected
                        ? "bg-amber-400 text-emerald-950 border-white scale-105 shadow-xl font-black"
                        : "bg-emerald-900/80 text-white border-emerald-700 hover:bg-emerald-800"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-xl flex-shrink-0 ${
                        isSelected ? "bg-emerald-950 text-amber-300" : "bg-emerald-800 text-amber-400"
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs truncate font-extrabold">{lm.nameAr}</div>
                      <div className="text-[10px] opacity-80">{lm.category}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Route Simulated Polyline Line */}
            {calculatedDistance && (
              <div className="relative z-10 bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-amber-400/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Route className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-amber-200">
                    المسار المحدد: {routeStart} ➔ {routeDestination}
                  </span>
                </div>
                <div className="font-extrabold text-white bg-amber-500/30 px-2.5 py-1 rounded-xl">
                  {calculatedDistance} كم ({calculatedEta} دقيقة)
                </div>
              </div>
            )}
          </div>

          {/* Selected Landmark Interactive Action Card */}
          {selectedLandmark && (
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-stone-200 space-y-4 animate-in slide-in-from-bottom-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedLandmark.image}
                    alt=""
                    className="w-20 h-20 rounded-2xl object-cover shadow-sm flex-shrink-0"
                  />
                  <div>
                    <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                      {selectedLandmark.cityAr} • {selectedLandmark.category}
                    </div>
                    <h2 className="text-lg font-black text-emerald-950 mt-0.5">
                      {selectedLandmark.nameAr}
                    </h2>
                    <div className="flex items-center gap-3 text-xs text-stone-600 mt-1">
                      <span className="flex items-center gap-1 font-bold text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {selectedLandmark.rating}
                      </span>
                      {selectedLandmark.priceSAR !== undefined && (
                        <span>
                          التكلفة التقريبية:{" "}
                          <strong className="text-emerald-900">
                            {selectedLandmark.priceSAR === 0 ? "مجاناً" : `${selectedLandmark.priceSAR} SAR`}
                          </strong>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      if (onBookRideToLandmark) {
                        onBookRideToLandmark(selectedLandmark.nameAr);
                      } else {
                        onNavigateView("explorer-ride");
                      }
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Car className="w-4 h-4 text-amber-300" />
                    <span>التنقل بـ Explorer Ride</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onBookServiceModal) {
                        onBookServiceModal(selectedLandmark.nameAr);
                      }
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>حجز الخدمة</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed border-t border-stone-100 pt-3">
                {selectedLandmark.descriptionAr}
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
