import React, { useState, useEffect } from "react";
import { LanguageCode } from "../../types";
import {
  X,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  MapPin,
  Clock,
  Compass,
  CheckCircle2,
  Share2,
  Calendar,
  Building2,
  Bot
} from "lucide-react";

interface SmartTourGuideModalProps {
  isOpen: boolean;
  destinationNameAr?: string;
  destinationNameEn?: string;
  destinationImage?: string;
  language: LanguageCode;
  onClose: () => void;
  onOpenAR?: () => void;
  onOpen3D?: () => void;
}

export const SmartTourGuideModal: React.FC<SmartTourGuideModalProps> = ({
  isOpen,
  destinationNameAr = "حي الطريف التاريخي بالدرعية - الرياض",
  destinationNameEn = "At-Turaif Historic District, Diriyah - Riyadh",
  destinationImage = "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80",
  language,
  onClose,
  onOpenAR,
  onOpen3D
}) => {
  if (!isOpen) return null;

  const [isPlaying, setIsPlaying] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [activeTab, setActiveTab] = useState<"history" | "culture" | "activities" | "tips" | "nearby">("history");

  const name = language === "ar" ? destinationNameAr : destinationNameEn;

  const tourData = {
    historyAr: "يُعد حي الطريف المهد الأصيل للدولة السعودية الأولى وموقعاً مسجلاً في قائمة التراث العالمي لليونسكو منذ عام 2010. شُيد بالكامل من الطين النجدى الأثري على ضفاف وادي حنيفة، ويضم قصر سلوى الشهير ومقر الحكم وقصور أئمة الدولة السعودية الأولى.",
    historyEn: "At-Turaif in Diriyah is the historic birthplace of the first Saudi State and a UNESCO World Heritage Site since 2010. Built with authentic Najdi mud-brick architecture along Wadi Hanifah, it houses the majestic Salwa Palace.",
    
    cultureAr: "تتجسد في المكان أسمى قيم الضيافة السعودية النجديّة، مع الممرات الضيقة المسقوفة بجذوع النخل والنوافذ المثلثية المزخرفة بالروشان والطين الحصين التي تحافظ على برودة المباني حتى في أوقات الصيف.",
    cultureEn: "Experience deep Saudi Najdi hospitality in ancient narrow corridors shaded with palm trunks, adorned with triangular geometric vents and thick protective mud walls keeping interiors cool.",

    activitiesAr: [
      "جولة بالدليل السياحي داخل قصر سلوى التاريخي",
      "مشاهدة العرض الضوئي الأسطوري على جدران الطين في المساء",
      "تناول القهوة السعودية المبتكرة مع التمور النجديّة في المطل الفاخر",
      "متحف الخيل العربية ومتحف التجارة والعملة القديمة"
    ],
    activitiesEn: [
      "Guided tour inside the historic Salwa Palace",
      "Spectacular evening light projection show on mud-brick walls",
      "Authentic Saudi coffee & dates tasting at Bujairi Terrace",
      "Arabian Horse Museum and Ancient Currency Museum"
    ],

    tipsAr: [
      "يفضل الزيارة خلال فترات العصر والمساء للاستمتاع بالإضاءة الملكية الباهرة",
      "ارتدِ أحذية مريحة للمشي على المسارات الحجرية التاريخية",
      "قم باقتناء تذكرة المطل المسبقة لتجربة المطاعم الفاخرة المطلة مباشرة على الطريف"
    ],
    tipsEn: [
      "Visit late afternoon and evening to enjoy the grand architectural light illumination",
      "Wear comfortable walking shoes for cobblestone heritage pathways",
      "Reserve Bujairi Terrace access tickets in advance for prime views"
    ],

    bestTimeAr: "من أكتوبر إلى أبريل (الطقس المعتدل 16-24°م مع نسائم وادي حنيفة)",
    bestTimeEn: "October to April (Crisp weather 16-24°C with gentle Hanifah breezes)",

    nearbyAr: [
      { name: "مطل البجيري الفاخر", type: "مطاعم عالمية ومقاهي نجديّة", distance: "0.2 كم" },
      { name: "وادي حنيفة والحدائق المائية", type: "طبيعة ومسارات مشي", distance: "0.5 كم" },
      { name: "موسم الدرعية وحلبة E-Prix", type: "فعاليات ورياضة عالمية", distance: "1.2 كم" }
    ],
    nearbyEn: [
      { name: "Bujairi Terrace", type: "Fine Dining & Heritage Cafes", distance: "0.2 km" },
      { name: "Wadi Hanifah Park", type: "Nature & Walking Trails", distance: "0.5 km" },
      { name: "Diriyah Season & E-Prix Circuit", type: "Global Sports & Events", distance: "1.2 km" }
    ]
  };

  // Text-to-speech handler
  const speakTourText = () => {
    if (!("speechSynthesis" in window)) {
      alert("عذراً، متصفحك لا يدعم تشغيل الصوت المباشر.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const fullText = `${name}. ${tourData.historyAr} ${tourData.cultureAr}`;
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = language === "ar" ? "ar-SA" : "en-US";
    utterance.rate = speechRate;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-stone-900 text-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30 flex flex-col my-auto max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-stone-950 to-emerald-950 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black shadow-md">
              <Bot className="w-6 h-6 animate-bounce" style={{ animationDuration: "3s" }} />
            </div>
            <div>
              <div className="text-xs text-amber-300 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === "ar" ? "المرشد السياحي التفاعلي بالصوت" : "Interactive Smart Tour Guide"}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white">{name}</h2>
            </div>
          </div>

          <button
            onClick={() => {
              if ("speechSynthesis" in window) window.speechSynthesis.cancel();
              onClose();
            }}
            className="p-2.5 bg-stone-800 hover:bg-stone-700 rounded-full text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-stone-900">
          
          {/* Avatar Banner & Audio Player */}
          <div className="bg-gradient-to-r from-stone-950 via-emerald-950 to-stone-950 p-5 rounded-3xl border border-amber-400/30 flex flex-col sm:flex-row items-center gap-5 shadow-xl relative overflow-hidden">
            
            {/* Avatar Character */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-emerald-900 border-2 border-amber-400 overflow-hidden shadow-xl flex items-center justify-center relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                  alt="سعود - المرشد"
                  className={`w-full h-full object-cover transition-transform duration-500 ${isPlaying ? "scale-105 saturate-150" : "grayscale-20"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-1 text-[10px] font-black text-amber-300 bg-black/70 px-2 py-0.5 rounded-full">
                  سعود - المرشد
                </span>
              </div>

              {/* Sound Wave Indicator when playing */}
              {isPlaying && (
                <div className="absolute -top-2 -right-2 flex gap-1 bg-amber-400 text-stone-950 px-2 py-1 rounded-full text-[10px] font-bold shadow-md animate-pulse">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>يتحدث الآن...</span>
                </div>
              )}
            </div>

            {/* Controls & Speech info */}
            <div className="flex-1 text-center sm:text-right space-y-3">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center justify-center sm:justify-start gap-2">
                  <span>أهلاً بك! أنا سعود، مرشدك السياحي لهذه الجولة</span>
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  اضغط زر الاستماع لسماع شرح صوتي شامل وممتع لتاريخ وثقافة هذا المعلم الأصيل.
                </p>
              </div>

              {/* Action Buttons Bar */}
              <div className="flex items-center justify-center sm:justify-start gap-3 flex-wrap pt-1">
                <button
                  onClick={speakTourText}
                  className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
                    isPlaying
                      ? "bg-rose-600 hover:bg-rose-500 text-white"
                      : "bg-amber-400 hover:bg-amber-300 text-stone-950"
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>إيقاف الصوت</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>استمع للشرح الصوتي</span>
                    </>
                  )}
                </button>

                {onOpenAR && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAR();
                    }}
                    className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-2xl border border-emerald-500 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Compass className="w-4 h-4 text-amber-300" />
                    <span>الواقع المعزز AR</span>
                  </button>
                )}

                {onOpen3D && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpen3D();
                    }}
                    className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold text-xs rounded-2xl border border-amber-400/40 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Bot className="w-4 h-4 text-amber-400" />
                    <span>عرض 3D</span>
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-stone-800 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: "history", labelAr: "نبذة تاريخية", labelEn: "Historical Overview" },
              { id: "culture", labelAr: "معلومات ثقافية", labelEn: "Cultural Insights" },
              { id: "activities", labelAr: "أهم الأنشطة", labelEn: "Top Activities" },
              { id: "tips", labelAr: "نصائح الزيارة", labelEn: "Visit Tips" },
              { id: "nearby", labelAr: "أماكن قريبة", labelEn: "Nearby Spots" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-amber-400 text-stone-950 shadow-md"
                    : "bg-stone-800 text-stone-300 hover:bg-stone-700"
                }`}
              >
                {language === "ar" ? tab.labelAr : tab.labelEn}
              </button>
            ))}
          </div>

          {/* Tab Content Panels */}
          <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 leading-relaxed text-sm">
            {activeTab === "history" && (
              <div className="space-y-3">
                <h4 className="text-amber-300 font-extrabold text-base flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>تاريخ وتأسيس المكان</span>
                </h4>
                <p className="text-stone-200">{language === "ar" ? tourData.historyAr : tourData.historyEn}</p>
              </div>
            )}

            {activeTab === "culture" && (
              <div className="space-y-3">
                <h4 className="text-emerald-400 font-extrabold text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>العمارة والثقافة الأصيلة</span>
                </h4>
                <p className="text-stone-200">{language === "ar" ? tourData.cultureAr : tourData.cultureEn}</p>
              </div>
            )}

            {activeTab === "activities" && (
              <div className="space-y-3">
                <h4 className="text-amber-300 font-extrabold text-base mb-3">أفضل الأنشطة في هذا المعلم</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(language === "ar" ? tourData.activitiesAr : tourData.activitiesEn).map((act, i) => (
                    <div key={i} className="p-3 bg-stone-900 rounded-xl border border-stone-800 flex items-center gap-2 text-xs text-stone-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "tips" && (
              <div className="space-y-3">
                <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>أفضل وقت للزيارة:</strong> {language === "ar" ? tourData.bestTimeAr : tourData.bestTimeEn}</span>
                </div>

                <div className="space-y-2">
                  {(language === "ar" ? tourData.tipsAr : tourData.tipsEn).map((tip, i) => (
                    <div key={i} className="p-3 bg-stone-900 rounded-xl border border-stone-800 text-xs text-stone-300 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "nearby" && (
              <div className="space-y-3">
                <h4 className="text-amber-300 font-extrabold text-base mb-2">أماكن ومطاعم مميزة مجاورة</h4>
                <div className="space-y-2.5">
                  {(language === "ar" ? tourData.nearbyAr : tourData.nearbyEn).map((spot, i) => (
                    <div key={i} className="p-3 bg-stone-900 rounded-xl border border-stone-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-xs text-white">{spot.name}</div>
                        <div className="text-[11px] text-stone-400">{spot.type}</div>
                      </div>
                      <span className="text-xs font-black text-amber-300 bg-stone-800 px-2.5 py-1 rounded-lg border border-stone-700">
                        {spot.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex justify-between items-center">
          <span className="text-xs text-stone-400">
            {language === "ar" ? "مرشد الذكاء الاصطناعي تفاعلي صوتاً وكتابة" : "Interactive Smart Tour Guide"}
          </span>
          <button
            onClick={() => {
              if ("speechSynthesis" in window) window.speechSynthesis.cancel();
              onClose();
            }}
            className="px-5 py-2 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-xl text-xs cursor-pointer"
          >
            {language === "ar" ? "إغلاق الجولة" : "Close Tour"}
          </button>
        </div>

      </div>
    </div>
  );
};
