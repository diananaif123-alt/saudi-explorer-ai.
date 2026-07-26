import React, { useState, useEffect } from "react";
import { ViewMode, LanguageCode } from "../types";
import { getTranslation } from "../data/translations";
import { SmartSearch } from "./SmartSearch";
import {
  Compass,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  MapPin,
  Flame,
  Calendar,
  Layers,
  ArrowLeft
} from "lucide-react";

interface HeroSliderProps {
  onSelectView: (view: ViewMode, targetId?: string) => void;
  language: LanguageCode;
}

const HERO_SLIDES = [
  {
    id: "alula",
    titleAr: "العُلا - مجسم 3D لأعجوبة العالم الأثرية",
    titleEn: "AlUla - 3D Heritage Masterpiece",
    subAr: "حُجر صالح، الجبال المنحوتة، ومسرح مرايا العاكس بتقنية العرض ثلاثي الأبعاد 3D.",
    image: "/src/assets/images/alula_3d_landmark_1785089188749.jpg",
    badge: "مجسم 3D تفاعلي - يونسكو",
    destinationId: "alula"
  },
  {
    id: "diriyah",
    titleAr: "الدرعية التاريخية - 3D جوهرة المملكة",
    titleEn: "Diriyah At-Turaif - 3D Najdi Palace",
    subAr: "حي الطريف التاريخي، العمارة النجدية الأصيلة في نمذجة ثلاثية الأبعاد عالية الدقة.",
    image: "/src/assets/images/diriyah_3d_landmark_1785089203376.jpg",
    badge: "مجسم 3D ثلاثي الأبعاد",
    destinationId: "diriyah"
  },
  {
    id: "jeddah-balad",
    titleAr: "جدة التاريخية (البلد) - 3D رواشين البحر الأحمر",
    titleEn: "Historic Jeddah Al-Balad - 3D Heritage",
    subAr: "الرواشين الخشبية المبتكرة والحارات التاريخية في إخراج بصري 3D فائق الدقة.",
    image: "/src/assets/images/jeddah_3d_landmark_1785089227156.jpg",
    badge: "مجسم 3D تراث بحري",
    destinationId: "jeddah"
  },
  {
    id: "soudah-abha",
    titleAr: "جبال السودة وعسير - 3D سقف المملكة الخضراء",
    titleEn: "Soudah Peaks - 3D Green Mountains",
    subAr: "القمم الخضراء المغطاة بالضباب والعمارة العسيرية الملونة برسم 3D احترافي.",
    image: "/src/assets/images/soudah_3d_landmark_1785089254175.jpg",
    badge: "نمذجة 3D طبيعة جبلية",
    destinationId: "abha"
  },
  {
    id: "neom",
    titleAr: "نيوم وذا لاين - 3D مستقبل السياحة العالمية",
    titleEn: "NEOM The Line - 3D Futuristic Vision",
    subAr: "مشروع نيوم ذو الواجهة الزجاجية العاكسة على ساحل البحر الأحمر بتصميم 3D مستقبلي.",
    image: "/src/assets/images/neom_3d_landmark_1785089241501.jpg",
    badge: "رؤية 3D مستقبلية",
    destinationId: "neom"
  }
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ onSelectView, language }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const t = getTranslation(language);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const slide = HERO_SLIDES[currentSlide];

  const quickPrompts = [
    "خطط رحلة عائلية 4 أيام في العلا",
    "أفضل المطاعم النجودية في الرياض",
    "جولة في جدة التاريخية يوم الجمعة",
    "رحلة استكشافية جبلية في السودة"
  ];

  return (
    <div className="relative overflow-hidden bg-emerald-950 text-white rounded-3xl shadow-2xl mx-4 sm:mx-6 lg:mx-8 my-6 border border-emerald-800/40">
      {/* Background Image Carousel with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={slide.image}
          alt={slide.titleAr}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-1000 scale-105"
        />
        {/* Soft Golden & Emerald Light Gradient Overlay to maintain high contrast light/lux feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-emerald-900/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 py-12 sm:py-20 flex flex-col items-center text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-amber-300/40 text-amber-300 text-xs sm:text-sm font-bold mb-6 animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{slide.badge}</span>
        </div>

        {/* Dynamic Slide Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4 drop-shadow-md">
          {language === "en" ? slide.titleEn : slide.titleAr}
        </h1>

        <p className="text-base sm:text-xl text-stone-200 max-w-3xl font-light mb-8 leading-relaxed">
          {language === "en" ? slide.subAr : slide.subAr}
        </p>

        {/* Embedded Smart Search Box */}
        <div className="w-full max-w-2xl mb-6">
          <SmartSearch onSelectView={onSelectView} placeholder={t.searchPlaceholder} />
        </div>

        {/* Quick AI Prompts */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-xs text-stone-300">
          <span className="font-semibold text-amber-300 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" /> مقترحات ذكية:
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onSelectView("ai-assistant")}
              className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white font-medium transition-colors cursor-pointer"
            >
              "{prompt}"
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onSelectView("ai-assistant")}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-black px-7 py-3.5 rounded-2xl shadow-lg transition-transform active:scale-95 cursor-pointer text-sm sm:text-base"
          >
            <Sparkles className="w-5 h-5 text-emerald-950" />
            <span>خطط لرحلتك بالذكاء الاصطناعي</span>
            <ArrowLeft className="w-4 h-4 me-1" />
          </button>

          <button
            onClick={() => onSelectView("map-explorer")}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 font-bold px-6 py-3.5 rounded-2xl transition-all cursor-pointer text-sm sm:text-base"
          >
            <MapPin className="w-5 h-5 text-amber-300" />
            <span>الخريطة التفاعلية للمملكة</span>
          </button>
        </div>
      </div>

      {/* Slider Navigation Controls & Indicators */}
      <div className="relative z-10 bg-emerald-950/60 backdrop-blur-md px-6 py-3 border-t border-white/10 flex items-center justify-between">
        
        {/* Play/Pause & Slide Counter */}
        <div className="flex items-center gap-3 text-xs text-stone-300 font-medium">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title={isPlaying ? "إيقاف التدوير الآلي" : "تشغيل التدوير الآلي"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <span>
            {currentSlide + 1} / {HERO_SLIDES.length}
          </span>
        </div>

        {/* Slide Indicators Dots */}
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((s, index) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === index ? "w-8 bg-amber-400" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`شريحة ${index + 1}`}
            />
          ))}
        </div>

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-1">
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
            }
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
