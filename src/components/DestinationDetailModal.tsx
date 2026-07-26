import React, { useState } from "react";
import { Destination, LanguageCode } from "../types";
import { MOCK_SERVICES } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { SmartTourGuideModal } from "./ai/SmartTourGuideModal";
import { VoiceAssistantModal } from "./ai/VoiceAssistantModal";
import { ThreeDViewerModal } from "./ai/ThreeDViewerModal";
import {
  X,
  MapPin,
  Star,
  SunMedium,
  Calendar,
  Sparkles,
  BedDouble,
  Utensils,
  Train,
  Ticket,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  PhoneCall,
  Bot,
  Mic,
  Compass,
  Box,
  Bookmark,
  Heart,
  Maximize2,
  ZoomIn,
  ZoomOut
} from "lucide-react";

interface DestinationDetailModalProps {
  destination: Destination | null;
  language: LanguageCode;
  onClose: () => void;
  onGenerateAiItinerary: (destName: string) => void;
  onBookService: (serviceName: string) => void;
  onNavigateView?: (view: any, targetId?: string) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  language,
  onClose,
  onGenerateAiItinerary,
  onBookService,
  onNavigateView
}) => {
  if (!destination) return null;

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isTourGuideOpen, setIsTourGuideOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [is3DOpen, setIs3DOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFullscreenPhotoOpen, setIsFullscreenPhotoOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const t = getTranslation(language);

  const name = language === "ar" ? destination.nameAr : destination.nameEn;
  const region = language === "ar" ? destination.regionAr : destination.regionEn;
  const desc = language === "ar" ? destination.descriptionAr : destination.descriptionEn;
  const climate = language === "ar" ? destination.climateAr : destination.climateEn;
  const bestTime = language === "ar" ? destination.bestTimeAr : destination.bestTimeEn;
  const highlights = language === "ar" ? destination.highlightsAr : destination.highlightsEn;

  // Filter regional services
  const regionalServices = MOCK_SERVICES.filter(
    (s) => s.destinationId === destination.id || s.destinationId === "all"
  );

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
        <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 my-auto flex flex-col max-h-[90vh]">
          
          {/* Modal Header Bar */}
          <div className="p-4 sm:p-6 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-400 text-emerald-950 rounded-xl">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-amber-300 font-semibold">{region}</div>
                <h2 className="text-lg sm:text-2xl font-black">{name}</h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isSaved ? "bg-rose-600 text-white" : "bg-white/10 hover:bg-white/20 text-white"
                }`}
                title="إضافة للمفضلة"
              >
                <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
              </button>

              <button
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="p-6 overflow-y-auto space-y-8 flex-1">
            
            {/* AI Super Toolbar for Destination */}
            <div className="bg-stone-900 text-white p-4 rounded-2xl border border-amber-400/40 space-y-3">
              <div className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>أدوات الذكاء الاصطناعي الخاصة بـ {name}:</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <button
                  onClick={() => setIsTourGuideOpen(true)}
                  className="p-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Bot className="w-4 h-4" />
                  <span>ابدأ الجولة الذكية</span>
                </button>

                <button
                  onClick={() => setIsVoiceOpen(true)}
                  className="p-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Mic className="w-4 h-4 text-amber-300" />
                  <span>المساعد الصوتي</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateView) onNavigateView("ai-hub");
                  }}
                  className="p-2.5 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>الواقع المعزز AR</span>
                </button>

                <button
                  onClick={() => setIs3DOpen(true)}
                  className="p-2.5 bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Box className="w-4 h-4" />
                  <span>المجسم 3D</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onGenerateAiItinerary(name);
                  }}
                  className="col-span-2 sm:col-span-1 p-2.5 bg-emerald-900 hover:bg-emerald-950 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-700"
                >
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>إضافة للخطة</span>
                </button>
              </div>
            </div>

            {/* Gallery Carousel */}
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden group">
              <img
                src={destination.gallery[activePhotoIdx] || destination.heroImage}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Fullscreen Expand Button */}
              <button
                onClick={() => {
                  setZoomLevel(1);
                  setIsFullscreenPhotoOpen(true);
                }}
                className="absolute top-4 left-4 p-2.5 bg-black/60 hover:bg-black/80 text-white rounded-xl backdrop-blur-md border border-white/20 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-lg"
                title="عرض المعرض بملء الشاشة مع التكبير"
              >
                <Maximize2 className="w-4 h-4 text-amber-300" />
                <span className="hidden sm:inline">عرض مكبر</span>
              </button>

              {/* Gallery Navigation Arrows */}
              {destination.gallery.length > 1 && (
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() =>
                      setActivePhotoIdx(
                        (prev) => (prev - 1 + destination.gallery.length) % destination.gallery.length
                      )
                    }
                    className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setActivePhotoIdx((prev) => (prev + 1) % destination.gallery.length)
                    }
                    className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Gallery Thumbnails Overlay */}
              <div className="absolute bottom-4 right-4 left-4 flex gap-2 overflow-x-auto no-scrollbar">
                {destination.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                      activePhotoIdx === idx ? "border-amber-400 scale-105 shadow-md" : "border-white/50 opacity-70"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick AI Action Banner */}
            <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3 text-right">
                <div className="p-3 bg-amber-400 text-emerald-950 rounded-xl">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg">
                    تخطيط جدول سياحي ذكي لـ {name}
                  </h3>
                  <p className="text-xs text-emerald-100">
                    احصل على مسار يومي شامل مخصص لميزانيتك واهتماماتك خلال ثوانٍ.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onGenerateAiItinerary(name);
                }}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap"
              >
                توليد الجدول بالذكاء الاصطناعي
              </button>
            </div>

            {/* Key Overview & Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80 flex items-start gap-3">
                <SunMedium className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-amber-900">الطقس والمناخ السائد</div>
                  <div className="text-xs text-stone-700 mt-0.5">{climate}</div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 flex items-start gap-3">
                <Calendar className="w-5 h-5 text-emerald-700 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-emerald-900">أفضل موسم للزيارة</div>
                  <div className="text-xs text-stone-700 mt-0.5">{bestTime}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-base font-bold text-emerald-950 mb-2">نبذة عن المنطقة</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{desc}</p>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-base font-bold text-emerald-950 mb-3">أبرز المعالم والتجارب المطلوبة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {highlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center gap-2 text-xs font-semibold text-stone-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Tourism Services Preview */}
            {regionalServices.length > 0 && (
              <div>
                <h3 className="text-base font-bold text-emerald-950 mb-3">
                  الإقامة والتجارب في المنطقة
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {regionalServices.map((service) => (
                    <div
                      key={service.id}
                      className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3"
                    >
                      <img
                        src={service.image}
                        alt=""
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-stone-900 truncate">
                          {language === "ar" ? service.nameAr : service.nameEn}
                        </div>
                        <div className="text-[11px] text-stone-500 truncate">
                          {language === "ar" ? service.locationAr : service.locationEn}
                        </div>
                        <div className="text-xs font-extrabold text-emerald-900 mt-1">
                          {service.priceSAR} {language === "ar" ? service.priceLabelAr : service.priceLabelEn}
                        </div>
                      </div>

                      <button
                        onClick={() => onBookService(service.nameAr)}
                        className="px-3 py-1.5 bg-emerald-900 text-white rounded-lg text-xs font-bold hover:bg-emerald-950 cursor-pointer"
                      >
                        حجز
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-xl text-xs sm:text-sm cursor-pointer"
            >
              إغلاق
            </button>
          </div>

        </div>
      </div>

      {/* Embedded Modals */}
      <SmartTourGuideModal
        isOpen={isTourGuideOpen}
        destinationNameAr={destination.nameAr}
        destinationNameEn={destination.nameEn}
        destinationImage={destination.heroImage}
        language={language}
        onClose={() => setIsTourGuideOpen(false)}
      />

      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        language={language}
        onClose={() => setIsVoiceOpen(false)}
        onNavigateView={(view, targetId) => {
          onClose();
          if (onNavigateView) onNavigateView(view, targetId);
        }}
      />

      <ThreeDViewerModal
        isOpen={is3DOpen}
        landmarkNameAr={destination.nameAr}
        landmarkNameEn={destination.nameEn}
        landmarkImage={destination.heroImage}
        language={language}
        onClose={() => setIs3DOpen(false)}
      />

      {/* Fullscreen Interactive Photo Viewer Modal */}
      {isFullscreenPhotoOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in">
          {/* Top Controls */}
          <div className="flex items-center justify-between text-white z-10 border-b border-stone-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-black text-amber-400 text-sm sm:text-base">
                معرض صور {name} High-Res Gallery
              </span>
              <span className="text-xs text-stone-400">
                الصورة {activePhotoIdx + 1} من {destination.gallery.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                className="p-2 bg-stone-800 hover:bg-stone-700 rounded-xl text-white transition-colors cursor-pointer"
                title="تصغير"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono text-amber-300 min-w-[45px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                className="p-2 bg-stone-800 hover:bg-stone-700 rounded-xl text-white transition-colors cursor-pointer"
                title="تكبير"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsFullscreenPhotoOpen(false)}
                className="p-2 bg-amber-400 text-emerald-950 font-black rounded-xl hover:bg-amber-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Photo Display Area */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={destination.gallery[activePhotoIdx] || destination.heroImage}
              alt={name}
              style={{ transform: `scale(${zoomLevel})` }}
              className="max-h-[75vh] max-w-[90vw] object-contain transition-transform duration-200 rounded-2xl shadow-2xl"
            />

            {/* Side Navigation Arrows */}
            {destination.gallery.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActivePhotoIdx(
                      (prev) => (prev - 1 + destination.gallery.length) % destination.gallery.length
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-stone-900/80 hover:bg-amber-400 hover:text-emerald-950 text-white rounded-full transition-all cursor-pointer shadow-2xl border border-stone-700"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <button
                  onClick={() =>
                    setActivePhotoIdx((prev) => (prev + 1) % destination.gallery.length)
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-stone-900/80 hover:bg-amber-400 hover:text-emerald-950 text-white rounded-full transition-all cursor-pointer shadow-2xl border border-stone-700"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex justify-center gap-3 overflow-x-auto py-2">
            {destination.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActivePhotoIdx(idx);
                  setZoomLevel(1);
                }}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                  activePhotoIdx === idx ? "border-amber-400 scale-110 shadow-lg" : "border-stone-700 opacity-60"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

