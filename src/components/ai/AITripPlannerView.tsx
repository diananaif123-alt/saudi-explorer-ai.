import React, { useState } from "react";
import { LanguageCode, GeneratedItinerary } from "../../types";
import { MOCK_DESTINATIONS, MOCK_SERVICES } from "../../data/mockData";
import {
  Sparkles,
  Calendar,
  MapPin,
  Users,
  Wallet,
  Compass,
  CheckCircle2,
  Clock,
  Car,
  BedDouble,
  Download,
  Bookmark,
  Share2,
  Utensils,
  Camera,
  Sun,
  Moon,
  Coffee,
  ArrowRight
} from "lucide-react";

interface AITripPlannerViewProps {
  language: LanguageCode;
  initialDestinationName?: string;
  onSaveItinerary?: (itinerary: GeneratedItinerary) => void;
  onSelectDestination?: (destId: string) => void;
}

export const AITripPlannerView: React.FC<AITripPlannerViewProps> = ({
  language,
  initialDestinationName = "الرياض",
  onSaveItinerary,
  onSelectDestination
}) => {
  const [city, setCity] = useState(initialDestinationName);
  const [arrivalDate, setArrivalDate] = useState("2025-11-10");
  const [departureDate, setDepartureDate] = useState("2025-11-14");
  const [personsCount, setPersonsCount] = useState(2);
  const [budgetSAR, setBudgetSAR] = useState(8000);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["heritage", "dining", "culture"]);
  const [transportType, setTransportType] = useState("private-car");
  const [stayType, setStayType] = useState("luxury-hotel");

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedItinerary | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const interestsList = [
    { id: "heritage", labelAr: "التراث والآثار التاريخية", labelEn: "Heritage & History" },
    { id: "dining", labelAr: "المأكولات الأصيلة والفنون", labelEn: "Authentic Dining" },
    { id: "adventure", labelAr: "المغامرات والتخييم الصحراوي", labelEn: "Desert Adventure" },
    { id: "luxury", labelAr: "الفخامة والتسوق الراقي", labelEn: "Luxury & Shopping" },
    { id: "nature", labelAr: "الطبيعة والشواطئ والأودية", labelEn: "Nature & Beaches" },
    { id: "culture", labelAr: "المتاحف والمعارض الفنية", labelEn: "Museums & Art" }
  ];

  const handleInterestToggle = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setSavedSuccess(false);

    setTimeout(() => {
      const plan: GeneratedItinerary = {
        title: `برنامج زيارة ${city} الذكي الشامل`,
        summary: `خطة سياحية مخصصة لـ ${personsCount} أشخاص بميزانية تقديرية ${budgetSAR} ريال، شاملة زيارة أبرز المعالم، الإقامة المريحة، وأفضل التجارب الموصى بها.`,
        estimatedBudgetSAR: `${budgetSAR} SAR`,
        bestTimeToVisit: "أكتوبر - أبريل (الموسم الذهبي للطقس المعتدل)",
        days: [
          {
            dayNumber: 1,
            title: "اليوم الأول: العراقة والتاريخ الأصيل",
            morning: "استكشاف حي الطريف التاريخي بالدرعية المسجل باليونسكو وتناول القهوة النجديّة في البجيري (أوقات الزيارة: 09:00 ص - 12:30 م | المسافة: 12 كم)",
            afternoon: "زيارة متحف المصمك وسوق الزل الشعبي لشراء التذكارات والتمور الملكية (أوقات الزيارة: 04:00 م - 07:00 م)",
            evening: "عشاء فاخر في مطعم سهيل النجدي يليه جولة ليلية بروافد وادي حنيفة",
            proTip: "احجز دخول البجيري مسبقاً عبر المنصة لتفادي فترة الانتظار."
          },
          {
            dayNumber: 2,
            title: "اليوم الثاني: المعالم الحديثة والتسوق الفاخر",
            morning: "زيارة برج المملكة والصعود إلى جسر المشاهدة البانورامي بارتفاع 300 متر (01:00 م - 03:00 م)",
            afternoon: "استكشاف منطقة بوليفارد سيتي والاستمتاع بالعروض الترفيهية والمطاعم العالمية",
            evening: "حضور أحد العروض المسرحية العالمية أو الفعاليات الحية بموسم الرياض",
            proTip: "تتوفر حافلات Explorer Ride للتنقل المباشر بين البوليفارد والمراكز."
          },
          {
            dayNumber: 3,
            title: "اليوم الثالث: المغامرة الصحراوية والطبيعة",
            morning: "رحلة سفاري وتخييم في الكثبان الذهبية بوادي نِمار مع ركوب الجمال والرمال (07:00 ص - 11:30 ص)",
            afternoon: "تناول الغداء في مخيم ملكي فاخر وسط أجواء العرضة السعودية",
            evening: "العودة للفندق والاسترخاء مع جلسة سبا واسترخاء مميزة",
            proTip: "ارتدِ ملاءات خفيفة وأحذية مخصصة للمشي على الرمال."
          }
        ],
        recommendedHotels: ["فندق الفصول الأربعة برج المملكة", "فندق كورت يارد ماريوت العليا"],
        recommendedDining: ["مطعم سهيل النجدي الأصيل", "مطعم القرية التراثية"],
        packingList: ["نظارات شمسية وقبعة حماية", "ملابس قطنية خفيفة لليوم وسترة دافئة للمساء", "حذاء مشي مريح للتنقل التاريخي"],
        visaAndEtiquette: "تتوفر التأشيرة السياحية الفورية عبر بوابة eVisa بالمنصة. يُحترم الثوب المحلي واللباس المحتشم في المواقع الأثرية."
      };

      setGeneratedPlan(plan);
      setIsGenerating(false);
    }, 1200);
  };

  const handleSaveToProfile = () => {
    if (generatedPlan && onSaveItinerary) {
      onSaveItinerary(generatedPlan);
      setSavedSuccess(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === "ar" ? "تخطيط ذكي مخصص للرحلات" : "AI Custom Trip Planner"}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {language === "ar" ? "خطط رحلتك بالذكاء الاصطناعي" : "AI Trip Planner"}
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
            {language === "ar"
              ? "حدد وجهتك، تواريخ سفرك، وميزانيتك لإنشاء مسار سياحي يومي متكامل يشمل المعالم، المطاعم، الفنادق، وأوقات الزيارة المثالية."
              : "Set your destination, dates, and budget to generate a full day-by-day travel itinerary with landmarks, dining, and stay recommendations."}
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-amber-400 text-emerald-950 font-black flex items-center justify-center text-3xl shadow-2xl shrink-0">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: "15s" }} />
        </div>
      </div>

      {/* Input Form Section */}
      <form onSubmit={handleGeneratePlan} className="bg-white rounded-3xl border border-stone-200 shadow-xl p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-black text-emerald-950 border-b border-stone-100 pb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-500" />
          <span>{language === "ar" ? "تفاصيل ومعطيات رحلتك القادمة:" : "Your Trip Specifications:"}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* City Destination Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>المدينة والوجهة:</span>
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs font-bold text-stone-900 focus:outline-none focus:border-emerald-700"
            >
              {MOCK_DESTINATIONS.map((d) => (
                <option key={d.id} value={language === "ar" ? d.nameAr : d.nameEn}>
                  {language === "ar" ? d.nameAr : d.nameEn} - {language === "ar" ? d.regionAr : d.regionEn}
                </option>
              ))}
            </select>
          </div>

          {/* Arrival Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700">تاريخ الوصول:</label>
            <input
              type="date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-900 focus:outline-none focus:border-emerald-700"
            />
          </div>

          {/* Departure Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700">تاريخ المغادرة:</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-900 focus:outline-none focus:border-emerald-700"
            />
          </div>

          {/* Persons Count */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-emerald-700" />
              <span>عدد المسافرين:</span>
            </label>
            <input
              type="number"
              min={1}
              max={20}
              value={personsCount}
              onChange={(e) => setPersonsCount(Number(e.target.value))}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-900 focus:outline-none focus:border-emerald-700"
            />
          </div>

        </div>

        {/* Budget & Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          
          {/* Budget SAR */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5 text-emerald-700" />
              <span>الميزانية التقديرية (ريال):</span>
            </label>
            <input
              type="number"
              step={500}
              value={budgetSAR}
              onChange={(e) => setBudgetSAR(Number(e.target.value))}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-900 focus:outline-none focus:border-emerald-700"
            />
          </div>

          {/* Transport Method */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-emerald-700" />
              <span>وسيلة التنقل المفضلة:</span>
            </label>
            <select
              value={transportType}
              onChange={(e) => setTransportType(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-900 focus:outline-none focus:border-emerald-700"
            >
              <option value="private-car">سيارة خاصة مع سائق سياحي</option>
              <option value="rental-car">تأجير سيارة قيادة ذاتية</option>
              <option value="train">قطار الحرمين / السكة الحديدية</option>
              <option value="explorer-ride">تطبيق Explorer Ride</option>
            </select>
          </div>

          {/* Accommodation Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5 text-emerald-700" />
              <span>نوع الإقامة المفضل:</span>
            </label>
            <select
              value={stayType}
              onChange={(e) => setStayType(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-900 focus:outline-none focus:border-emerald-700"
            >
              <option value="luxury-hotel">فندق فاخر 5 نجوم</option>
              <option value="heritage-hotel">فندق وسياحة تراثية أصيلة</option>
              <option value="beach-resort">منتجع شاطئي وفاخر</option>
              <option value="apartment">شقق فندقية مخدومة</option>
            </select>
          </div>

        </div>

        {/* Interests Checkbox Pills */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-700">اهتماماتك الرئيسية خلال الزيارة:</label>
          <div className="flex flex-wrap gap-2">
            {interestsList.map((interest) => {
              const isSelected = selectedInterests.includes(interest.id);
              return (
                <button
                  type="button"
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-emerald-900 text-white shadow-sm border border-emerald-800"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200"
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? "text-amber-400" : "text-stone-400"}`} />
                  <span>{language === "ar" ? interest.labelAr : interest.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Submit Button */}
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:opacity-95 text-emerald-950 font-black text-sm sm:text-base rounded-2xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              <span>جاري توليد المسار بالذكاء الاصطناعي...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>توليد جدول الرحلة بالذكاء الاصطناعي الآن</span>
            </>
          )}
        </button>
      </form>

      {/* Generated Itinerary Output Display */}
      {generatedPlan && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-8 animate-in slide-in-from-bottom-6">
          
          {/* Header & Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-extrabold mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>تم توليد الجدول بنجاح</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-emerald-950">{generatedPlan.title}</h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">{generatedPlan.summary}</p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleSaveToProfile}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                  savedSuccess
                    ? "bg-emerald-700 text-white"
                    : "bg-emerald-900 hover:bg-emerald-950 text-white"
                }`}
              >
                <Bookmark className="w-4 h-4 text-amber-300" />
                <span>{savedSuccess ? "تم الحفظ في رحلاتي!" : "حفظ الخطة لم الملف الشخصي"}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl border border-stone-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-emerald-700" />
                <span>طباعة / PDF</span>
              </button>
            </div>
          </div>

          {/* Days Schedule */}
          <div className="space-y-6">
            <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <span>جدول الأيام بالتفصيل:</span>
            </h3>

            <div className="space-y-4">
              {generatedPlan.days.map((day) => (
                <div key={day.dayNumber} className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
                    <h4 className="font-black text-emerald-950 text-sm sm:text-base">{day.title}</h4>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                      اليوم {day.dayNumber}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-stone-200/80 space-y-1">
                      <div className="font-bold text-amber-700 flex items-center gap-1">
                        <Sun className="w-3.5 h-3.5" />
                        <span>الصباح:</span>
                      </div>
                      <p className="text-stone-700 leading-relaxed">{day.morning}</p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-stone-200/80 space-y-1">
                      <div className="font-bold text-emerald-700 flex items-center gap-1">
                        <Coffee className="w-3.5 h-3.5" />
                        <span>بعد الظهيرة:</span>
                      </div>
                      <p className="text-stone-700 leading-relaxed">{day.afternoon}</p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-stone-200/80 space-y-1">
                      <div className="font-bold text-stone-800 flex items-center gap-1">
                        <Moon className="w-3.5 h-3.5" />
                        <span>المساء:</span>
                      </div>
                      <p className="text-stone-700 leading-relaxed">{day.evening}</p>
                    </div>
                  </div>

                  {day.proTip && (
                    <div className="text-[11px] font-bold text-emerald-900 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200/80 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>نصيحة الذكاء الاصطناعي: {day.proTip}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-2">
              <h4 className="font-bold text-xs text-amber-900">الفنادق الموصى بها:</h4>
              <ul className="text-xs text-stone-700 space-y-1 list-disc list-inside">
                {generatedPlan.recommendedHotels.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 space-y-2">
              <h4 className="font-bold text-xs text-emerald-900">المطاعم والطهي الموصى به:</h4>
              <ul className="text-xs text-stone-700 space-y-1 list-disc list-inside">
                {generatedPlan.recommendedDining.map((d, idx) => (
                  <li key={idx}>{d}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
