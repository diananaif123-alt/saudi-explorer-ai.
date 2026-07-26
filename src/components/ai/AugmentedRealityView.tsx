import React, { useState, useRef } from "react";
import { LanguageCode } from "../../types";
import {
  Camera,
  Compass,
  Sparkles,
  MapPin,
  X,
  Search,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Bot,
  CheckCircle2,
  Maximize2
} from "lucide-react";

interface AugmentedRealityViewProps {
  language: LanguageCode;
  selectedLandmarkName?: string;
  onClose?: () => void;
  onSelectLandmark?: (name: string) => void;
}

export const AugmentedRealityView: React.FC<AugmentedRealityViewProps> = ({
  language,
  selectedLandmarkName = "حي الطريف التاريخي - الدرعية",
  onClose,
  onSelectLandmark
}) => {
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [currentLandmark, setCurrentLandmark] = useState(selectedLandmarkName);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showNearbyAR, setShowNearbyAR] = useState(true);

  const landmarksList = [
    { nameAr: "حي الطريف التاريخي - الدرعية", nameEn: "At-Turaif Historic District, Diriyah", image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80", dist: "0.1 كم" },
    { nameAr: "موقع الحِجْر الأثري - العُلا", nameEn: "Hegra World Heritage Site, AlUla", image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80", dist: "1.4 كم" },
    { nameAr: "حي البلد التاريخي - جدة", nameEn: "Historic Al-Balad, Jeddah", image: "https://images.unsplash.com/photo-1578895210405-907db48a7812?auto=format&fit=crop&w=800&q=80", dist: "2.1 كم" },
    { nameAr: "مسرح مرايا العاكس - العُلا", nameEn: "Maraya Concert Hall, AlUla", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80", dist: "0.8 كم" }
  ];

  const handleSpeechToggle = () => {
    if (!("speechSynthesis" in window)) {
      alert("الوصول للصوت المباشر غير مدعوم في متصفحك الحالي.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const text = `أهلاً بك في تجربة الواقع المعزز لمعلم ${currentLandmark}. يمكنك الآن مشاهدة الدليل الافتراضي والاستمتاع بالمعلومات التاريخية.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ar-SA";
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white p-4 sm:p-8 relative overflow-hidden flex flex-col justify-between">
      
      {/* Background Camera Simulation Viewport */}
      <div className="absolute inset-0 z-0 bg-stone-900">
        {/* Simulated Camera Feed */}
        <img
          src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1920&q=80"
          alt="AR Camera Feed"
          className="w-full h-full object-cover brightness-75 contrast-110 scale-105 filter transition-all duration-700"
        />
        {/* AR Grid Matrix Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-emerald-950/20 backdrop-blur-3xs pointer-events-none" />
      </div>

      {/* Top Header Controls Bar */}
      <div className="relative z-10 flex items-center justify-between gap-4 bg-stone-950/80 backdrop-blur-md p-4 rounded-3xl border border-stone-800/80 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-400 text-stone-950 rounded-2xl shadow-sm">
            <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: "12s" }} />
          </div>
          <div>
            <div className="text-xs text-amber-300 font-extrabold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === "ar" ? "نظام الواقع المعزز AR 3D" : "3D AR Viewport Engine"}</span>
            </div>
            <h1 className="text-base sm:text-xl font-black text-white">
              {currentLandmark}
            </h1>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCameraActive(!isCameraActive)}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              isCameraActive
                ? "bg-emerald-600 text-white border-emerald-400"
                : "bg-stone-800 text-stone-300 border-stone-700"
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>{isCameraActive ? (language === "ar" ? "الكاميرا نشطة" : "Camera Active") : (language === "ar" ? "تشغيل الكاميرا" : "Enable Camera")}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-2xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Middle Interactive AR Canvas Overlay */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center pointer-events-none py-12">
        
        {/* Floating 3D Virtual Character / Avatar Guide */}
        <div className="relative pointer-events-auto flex flex-col items-center animate-bounce" style={{ animationDuration: "4s" }}>
          
          {/* Avatar Speech Bubble */}
          <div className="bg-stone-950/90 text-white p-4 rounded-3xl border-2 border-amber-400 max-w-sm text-center shadow-2xl mb-4 backdrop-blur-md relative">
            <div className="text-xs font-black text-amber-300 mb-1 flex items-center justify-center gap-1">
              <Bot className="w-4 h-4 text-amber-400" />
              <span>سعود - الدليل الافتراضي ثلاثي الأبعاد</span>
            </div>
            <p className="text-xs text-stone-200 leading-relaxed font-medium">
              مرحباً بك! يمكنك الآن استكشاف جدران {currentLandmark} الأثرية وحجر الأساس وتوجيه كاميرتك للتفاعل المباشر.
            </p>
            {/* Pointer arrow */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-stone-950 border-r-2 border-b-2 border-amber-400 rotate-45" />
          </div>

          {/* Avatar Hologram Circle */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-amber-400/80 p-1 bg-emerald-950/80 backdrop-blur-md shadow-[0_0_50px_rgba(245,158,11,0.5)] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
              alt="Avatar 3D"
              className="w-full h-full object-cover rounded-full"
            />
            {/* Animated scanning beam */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-400/20 via-transparent to-transparent animate-pulse" />
          </div>

          {/* Floating Action Button */}
          <button
            onClick={handleSpeechToggle}
            className={`mt-4 px-5 py-2.5 rounded-full font-black text-xs flex items-center gap-2 shadow-2xl border transition-all cursor-pointer ${
              isPlayingAudio
                ? "bg-rose-600 border-rose-400 text-white"
                : "bg-amber-400 hover:bg-amber-300 text-stone-950 border-amber-300"
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Pause className="w-4 h-4" />
                <span>إيقاف حديث المرشد</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>استمع للشرح بالصوت الطبيعي</span>
              </>
            )}
          </button>
        </div>

        {/* Floating AR Point Markers in the camera field */}
        {showNearbyAR && (
          <div className="absolute top-1/4 left-10 pointer-events-auto bg-emerald-900/90 backdrop-blur-md text-white px-3.5 py-2 rounded-2xl border border-emerald-400/60 shadow-xl flex items-center gap-2 animate-pulse">
            <MapPin className="w-4 h-4 text-amber-300" />
            <div>
              <div className="text-[11px] font-black">قصر سلوى التاريخي</div>
              <div className="text-[9px] text-amber-200">مسافة: 15 متراً</div>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Landmark Selector & Manual Search */}
      <div className="relative z-10 bg-stone-950/90 backdrop-blur-md p-4 rounded-3xl border border-stone-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <Search className="w-4 h-4" />
            <span>{language === "ar" ? "ابحث أو اختر المعلم لعرض الدليل الافتراضي:" : "Search or select landmark for AR:"}</span>
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === "ar" ? "اكتب اسم أي معلم أو مدينة..." : "Type landmark or city name..."}
              className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Landmarks Horizontal Carousel */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pt-1">
          {landmarksList
            .filter((l) =>
              searchQuery
                ? l.nameAr.includes(searchQuery) || l.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
                : true
            )
            .map((item, idx) => {
              const name = language === "ar" ? item.nameAr : item.nameEn;
              const isSelected = currentLandmark === name;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    setCurrentLandmark(name);
                    if (onSelectLandmark) onSelectLandmark(name);
                  }}
                  className={`p-2 rounded-2xl border transition-all cursor-pointer shrink-0 flex items-center gap-3 w-64 ${
                    isSelected
                      ? "bg-amber-400 text-stone-950 border-amber-300 font-extrabold shadow-lg"
                      : "bg-stone-900 hover:bg-stone-800 text-stone-200 border-stone-800"
                  }`}
                >
                  <img src={item.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs truncate">{name}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{item.dist}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

    </div>
  );
};
