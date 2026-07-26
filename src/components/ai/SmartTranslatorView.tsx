import React, { useState } from "react";
import { LanguageCode } from "../../types";
import {
  Languages,
  ArrowLeftRight,
  Volume2,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  Building2,
  MapPin,
  Compass,
  FileText
} from "lucide-react";

interface SmartTranslatorViewProps {
  language: LanguageCode;
  onGlobalLanguageChange: (lang: LanguageCode) => void;
}

export const SmartTranslatorView: React.FC<SmartTranslatorViewProps> = ({
  language,
  onGlobalLanguageChange
}) => {
  const [sourceLang, setSourceLang] = useState("ar");
  const [targetLang, setTargetLang] = useState("en");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"text" | "landmark" | "city" | "guide">("text");

  const languagesList = [
    { code: "ar", nameAr: "العربية", nameEn: "Arabic" },
    { code: "en", nameAr: "الإنكليزية", nameEn: "English" },
    { code: "fr", nameAr: "الفرنسية", nameEn: "French" },
    { code: "zh", nameAr: "الصينية", nameEn: "Chinese" },
    { code: "de", nameAr: "الألمانية", nameEn: "German" },
    { code: "es", nameAr: "الإسبانية", nameEn: "Spanish" },
    { code: "ru", nameAr: "الروسية", nameEn: "Russian" },
    { code: "ja", nameAr: "اليابانية", nameEn: "Japanese" },
    { code: "tr", nameAr: "التركية", nameEn: "Turkish" },
    { code: "ur", nameAr: "الأوردو", nameEn: "Urdu" }
  ];

  const handleTranslate = (textToTranslate?: string) => {
    const text = textToTranslate || inputText;
    if (!text.trim()) return;

    setIsTranslating(true);
    setTimeout(() => {
      // Mock instant translation logic for MVP with rich output
      if (sourceLang === "ar" && targetLang === "en") {
        setTranslatedText(`[Smart Translation to English]: ${text}`);
      } else if (sourceLang === "en" && targetLang === "ar") {
        setTranslatedText(`[ترجمة ذكية للعربية]: ${text}`);
      } else {
        setTranslatedText(`[Instant AI Translation (${targetLang.toUpperCase()})]: ${text}`);
      }
      setIsTranslating(false);
    }, 600);
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const handleSpeak = (text: string, langCode: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode === "ar" ? "ar-SA" : "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-emerald-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === "ar" ? "الترجمة الفورية لأكثر من 100 لغة" : "Instant Smart Translation for 100+ Languages"}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {language === "ar" ? "المترجم السياحي الذكي" : "Smart Tourist Translator"}
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
            {language === "ar"
              ? "ترجمة فورية معتمدة للنصوص، المحادثات، أسماء المعالم، ووصف المدن، مع خيار تغيير لغة الواجهة بالكامل بنقرة واحدة."
              : "Instant certified translation for texts, chats, landmark titles, and city guides with platform language switching."}
          </p>
        </div>

        {/* Global Platform Language Picker */}
        <div className="bg-stone-950/80 p-4 rounded-2xl border border-amber-400/40 text-center shrink-0 space-y-2">
          <div className="text-xs text-amber-300 font-bold flex items-center justify-center gap-1">
            <Languages className="w-4 h-4" />
            <span>{language === "ar" ? "تغيير لغة المنصة بالكامل:" : "Global Site Language:"}</span>
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => onGlobalLanguageChange("ar")}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                language === "ar" ? "bg-amber-400 text-stone-950 shadow-md" : "bg-stone-800 text-stone-300 hover:bg-stone-700"
              }`}
            >
              العربية (AR)
            </button>
            <button
              onClick={() => onGlobalLanguageChange("en")}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                language === "en" ? "bg-amber-400 text-stone-950 shadow-md" : "bg-stone-800 text-stone-300 hover:bg-stone-700"
              }`}
            >
              English (EN)
            </button>
          </div>
        </div>
      </div>

      {/* Translation Mode Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-2 no-scrollbar">
        {[
          { id: "text", labelAr: "ترجمة النصوص والمحادثات", labelEn: "Text & Conversation", icon: MessageSquare },
          { id: "landmark", labelAr: "ترجمة أسماء المعالم", labelEn: "Landmark Titles", icon: Building2 },
          { id: "city", labelAr: "ترجمة وصف المدن", labelEn: "City Descriptions", icon: MapPin },
          { id: "guide", labelAr: "ترجمة الإرشادات والتعليمات", labelEn: "Travel Guidelines", icon: FileText }
        ].map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-emerald-900 text-white shadow-md"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              <TabIcon className="w-4 h-4 text-amber-400" />
              <span>{language === "ar" ? tab.labelAr : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Main Translation Interface */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden p-6 space-y-6">
        
        {/* Language Selection Bar */}
        <div className="flex items-center justify-between gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-200">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-900 focus:outline-none focus:border-emerald-700 cursor-pointer"
          >
            {languagesList.map((l) => (
              <option key={l.code} value={l.code}>
                {language === "ar" ? l.nameAr : l.nameEn}
              </option>
            ))}
          </select>

          <button
            onClick={handleSwapLanguages}
            className="p-2 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl transition-all cursor-pointer shadow-xs"
            title="تبديل اللغات"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>

          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-900 focus:outline-none focus:border-emerald-700 cursor-pointer"
          >
            {languagesList.map((l) => (
              <option key={l.code} value={l.code}>
                {language === "ar" ? l.nameAr : l.nameEn}
              </option>
            ))}
          </select>
        </div>

        {/* Text Input & Output Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Source Box */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
              <span>النص المراد ترجمته:</span>
              <button
                onClick={() => handleSpeak(inputText, sourceLang)}
                className="p-1 hover:bg-stone-100 rounded-lg text-stone-500 cursor-pointer"
                title="استماع"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                handleTranslate(e.target.value);
              }}
              placeholder={
                language === "ar"
                  ? "اكتب النص أو العبارة السياحية هنا للترجمة الفورية..."
                  : "Type text or phrases here for instant translation..."
              }
              className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-emerald-700 resize-none"
            />
          </div>

          {/* Target Box */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
              <span>الترجمة الناتجة ({targetLang.toUpperCase()}):</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleSpeak(translatedText, targetLang)}
                  className="p-1 hover:bg-stone-100 rounded-lg text-stone-500 cursor-pointer"
                  title="استماع للترجمة"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopy}
                  className="p-1 hover:bg-stone-100 rounded-lg text-stone-500 cursor-pointer"
                  title="نسخ النص"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="w-full h-40 p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-950 font-medium overflow-y-auto">
              {isTranslating ? (
                <div className="flex items-center gap-2 text-emerald-800 animate-pulse">
                  <Sparkles className="w-4 h-4" />
                  <span>جاري الترجمة الفورية...</span>
                </div>
              ) : translatedText ? (
                translatedText
              ) : (
                <span className="text-stone-400">ستظهر الترجمة الدقيقة هنا مباشرة...</span>
              )}
            </div>
          </div>

        </div>

        {/* Quick Sample Presets */}
        <div className="pt-4 border-t border-stone-100">
          <div className="text-xs font-bold text-stone-700 mb-2">عبارات سياحية جاهزة للترجمة السريعة:</div>
          <div className="flex flex-wrap gap-2">
            {[
              "كم يبعد حي الطريف عن وسط الرياض؟",
              "أين أجد أفضل مطعم ماكولات سعودية تقليدية؟",
              "كيف يمكنني حجز جولة سياحية مرخصة؟",
              "ما هي أوقات زيارة مدائن صالح بـ العُلا؟"
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputText(preset);
                  handleTranslate(preset);
                }}
                className="px-3 py-1.5 bg-stone-100 hover:bg-amber-100 text-stone-800 text-xs font-semibold rounded-xl border border-stone-200 transition-colors cursor-pointer"
              >
                "{preset}"
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
