import React, { useState } from "react";
import { LanguageCode, ViewMode, GeneratedItinerary } from "../../types";
import { AITripPlannerView } from "./AITripPlannerView";
import { SmartTranslatorView } from "./SmartTranslatorView";
import { AugmentedRealityView } from "./AugmentedRealityView";
import { AIAssistantView } from "../AIAssistantView";
import { VoiceAssistantModal } from "./VoiceAssistantModal";
import { SmartTourGuideModal } from "./SmartTourGuideModal";
import { ThreeDViewerModal } from "./ThreeDViewerModal";
import {
  Sparkles,
  Compass,
  Mic,
  Box,
  Languages,
  Bot,
  Calendar,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Cpu,
  MapPin,
  Zap,
  ChevronLeft
} from "lucide-react";

interface AIHubViewProps {
  language: LanguageCode;
  onGlobalLanguageChange: (lang: LanguageCode) => void;
  onNavigateView: (view: ViewMode, targetId?: string) => void;
  onSaveItinerary?: (itinerary: GeneratedItinerary) => void;
}

export const AIHubView: React.FC<AIHubViewProps> = ({
  language,
  onGlobalLanguageChange,
  onNavigateView,
  onSaveItinerary
}) => {
  const [activeTab, setActiveTab] = useState<
    "hub" | "planner" | "chat" | "voice" | "ar" | "3d" | "translator"
  >("hub");

  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isTourGuideOpen, setIsTourGuideOpen] = useState(false);
  const [is3DOpen, setIs3DOpen] = useState(false);

  const aiServices = [
    {
      id: "planner",
      titleAr: "خطط رحلتك بالذكاء الاصطناعي",
      titleEn: "AI Trip Planner",
      descAr: "توليد جداول ومسارات سياحية يومية مخصصة لميزانيتك واهتماماتك خلال ثوانٍ معدودة.",
      descEn: "Generate day-by-day travel itineraries tailored to your budget & interests.",
      icon: Calendar,
      badge: "الأكثر طلباً",
      color: "from-amber-500 to-amber-600"
    },
    {
      id: "chat",
      titleAr: "المساعد السياحي الذكي",
      titleEn: "Smart Tourist Assistant",
      descAr: "محادثة تفاعلية فورية للإجابة على جميع الاستفسارات والطقس وحجوزات الفنادق والمطاعم.",
      descEn: "Interactive instant chat for queries, weather, hotels, and restaurant advice.",
      icon: MessageSquare,
      badge: "محادثة حية",
      color: "from-emerald-600 to-emerald-700"
    },
    {
      id: "guide",
      titleAr: "المرشد السياحي الذكي",
      titleEn: "Smart Tour Guide",
      descAr: "مرشد صوتي تفاعلي يشرح تاريخ وثقافة المعالم بأصوات طبيعية ومعلومات غنية.",
      descEn: "Interactive audio guide explaining heritage & history with natural voice playback.",
      icon: Bot,
      badge: "صوت طبيعي",
      color: "from-stone-800 to-stone-900"
    },
    {
      id: "voice",
      titleAr: "المساعد الصوتي",
      titleEn: "Voice Assistant",
      descAr: "تحدث مباشرة بالصوت لتوجيه المنصة وتصفح المدن والخدمات وحجز المواصلات.",
      descEn: "Speak directly with speech recognition to control views & explore destinations.",
      icon: Mic,
      badge: "أوامر صوتية",
      color: "from-amber-600 to-amber-700"
    },
    {
      id: "ar",
      titleAr: "الواقع المعزز AR",
      titleEn: "Augmented Reality",
      descAr: "تجربة واقع معزز تفاعلية مع شخصية افتراضية ثلاثية الأبعاد تظهر على المعالم الحية.",
      descEn: "Augmented reality experience featuring 3D virtual guide on live camera feeds.",
      icon: Compass,
      badge: "AR 3D",
      color: "from-emerald-700 to-emerald-800"
    },
    {
      id: "3d",
      titleAr: "المجسمات ثلاثية الأبعاد",
      titleEn: "3D Landmark Models",
      descAr: "استكشف معالم المملكة الأثرية عبر مجسمات 3D تفاعلية عالية الدقة مع إمكانية التدوير والتكبير.",
      descEn: "Orbit, zoom & inspect high-resolution 3D models of iconic Saudi landmarks.",
      icon: Box,
      badge: "Interactive 3D",
      color: "from-stone-900 to-black"
    },
    {
      id: "translator",
      titleAr: "الترجمة الذكية",
      titleEn: "Smart Translation",
      descAr: "ترجمة فورية لأكثر من 100 لغة للنصوص، المحادثات، واللوحات الإرشادية السياحية.",
      descEn: "Instant certified translation across 100+ languages for travel chats & texts.",
      icon: Languages,
      badge: "100+ لغة",
      color: "from-amber-500 to-emerald-800"
    }
  ];

  const handleCardClick = (id: string) => {
    if (id === "voice") {
      setIsVoiceOpen(true);
    } else if (id === "guide") {
      setIsTourGuideOpen(true);
    } else if (id === "3d") {
      setIs3DOpen(true);
    } else {
      setActiveTab(id as any);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-16">
      
      {/* Top Navigation Tabs Header */}
      <div className="bg-emerald-950 text-white border-b border-emerald-900 sticky top-16 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
          {[
            { id: "hub", labelAr: "مركز الذكاء الاصطناعي", labelEn: "AI Hub Home", icon: Cpu },
            { id: "planner", labelAr: "مخطط الرحلات", labelEn: "Trip Planner", icon: Calendar },
            { id: "chat", labelAr: "المساعد السياحي", labelEn: "AI Assistant", icon: MessageSquare },
            { id: "ar", labelAr: "الواقع المعزز AR", labelEn: "AR View", icon: Compass },
            { id: "translator", labelAr: "الترجمة الذكية", labelEn: "Smart Translator", icon: Languages }
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-amber-400 text-emerald-950 font-black shadow-md"
                    : "bg-emerald-900/60 text-stone-200 hover:bg-emerald-900"
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{language === "ar" ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Render based on Active Tab */}
      {activeTab === "hub" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-12">
          
          {/* Main Hero Banner */}
          <div className="bg-gradient-to-r from-emerald-950 via-stone-950 to-emerald-950 text-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-amber-400/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center md:text-right relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-full text-xs font-black">
                <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>{language === "ar" ? "منظومة الذكاء الاصطناعي الوطنية السياحية" : "National AI Tourism Ecosystem"}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                مركز الذكاء الاصطناعي
              </h1>
              <p className="text-stone-300 text-xs sm:text-base leading-relaxed">
                {language === "ar"
                  ? "منصة سياحية ذكية متكاملة توفر التخطيط التلقائي للرحلات، المساعدات الصوتية، جولات الواقع المعزز AR، المجسمات ثلاثية الأبعاد، والترجمة الفورية لأكثر من 100 لغة."
                  : "An integrated AI tourism hub providing automated trip planning, voice assistance, 3D AR tours, interactive landmark models, and instant translation across 100+ languages."}
              </p>
            </div>

            <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-amber-400 text-emerald-950 font-black flex items-center justify-center text-4xl shadow-2xl border-4 border-amber-300 shrink-0">
              <Sparkles className="w-16 h-16 animate-pulse" />
            </div>
          </div>

          {/* AI Services Grid Cards */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-emerald-950">
                  {language === "ar" ? "خدمات الذكاء الاصطناعي المتاحة بالمنصة:" : "Available AI Services:"}
                </h2>
                <p className="text-xs text-stone-500 mt-1">اختر أي خدمة للبدء بالتفاعل المباشر بها فوراً</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiServices.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    onClick={() => handleCardClick(service.id)}
                    className="group bg-white rounded-3xl border border-stone-200/80 p-6 shadow-md hover:shadow-2xl hover:border-amber-400 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6 relative overflow-hidden"
                  >
                    {/* Top Accent Line */}
                    <div className={`h-2 -mx-6 -mt-6 bg-gradient-to-r ${service.color}`} />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="p-3 bg-emerald-50 text-emerald-900 rounded-2xl group-hover:bg-amber-400 group-hover:text-emerald-950 transition-colors">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black bg-stone-100 text-stone-700 px-2.5 py-1 rounded-full border border-stone-200">
                          {service.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-black text-stone-900 group-hover:text-emerald-900 transition-colors">
                          {language === "ar" ? service.titleAr : service.titleEn}
                        </h3>
                        <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                          {language === "ar" ? service.descAr : service.descEn}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs font-bold text-emerald-900 group-hover:text-amber-600">
                      <span>{language === "ar" ? "افتح الخدمة الآن" : "Launch Service"}</span>
                      <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* Sub Views */}
      {activeTab === "planner" && (
        <AITripPlannerView
          language={language}
          onSaveItinerary={onSaveItinerary}
        />
      )}

      {activeTab === "chat" && (
        <AIAssistantView
          language={language}
          onSelectDestination={(destName) => onNavigateView("destinations", destName)}
        />
      )}

      {activeTab === "ar" && (
        <AugmentedRealityView
          language={language}
        />
      )}

      {activeTab === "translator" && (
        <SmartTranslatorView
          language={language}
          onGlobalLanguageChange={onGlobalLanguageChange}
        />
      )}

      {/* Modals for Voice, Tour Guide, and 3D Model */}
      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        language={language}
        onClose={() => setIsVoiceOpen(false)}
        onNavigateView={onNavigateView}
      />

      <SmartTourGuideModal
        isOpen={isTourGuideOpen}
        language={language}
        onClose={() => setIsTourGuideOpen(false)}
        onOpenAR={() => setActiveTab("ar")}
        onOpen3D={() => setIs3DOpen(true)}
      />

      <ThreeDViewerModal
        isOpen={is3DOpen}
        language={language}
        onClose={() => setIs3DOpen(false)}
      />

    </div>
  );
};
