import React, { useState } from "react";
import { ViewMode, LanguageCode } from "../types";
import { LANGUAGES_LIST, getTranslation } from "../data/translations";
import {
  Settings,
  Globe,
  Sun,
  Moon,
  Monitor,
  Bell,
  ShieldCheck,
  KeyRound,
  Type,
  Check,
  Save,
  ArrowRight
} from "lucide-react";

interface SettingsViewProps {
  onSelectView: (view: ViewMode) => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onSelectView,
  language,
  onSelectLanguage
}) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">("light");
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const t = getTranslation(language);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in">
      
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-900 text-amber-300 rounded-2xl shadow-sm">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-stone-900">إعدادات المنصة والحساب</h1>
            <p className="text-xs text-stone-500 mt-0.5">خصص إعدادات المظهر، اللغة، الإشعارات والأمان</p>
          </div>
        </div>

        <button
          onClick={() => onSelectView("home")}
          className="flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 text-sm font-bold flex items-center gap-2 animate-in fade-in">
          <Check className="w-5 h-5 text-emerald-700" />
          <span>تم حفظ الإعدادات والتفضيلات بنجاح!</span>
        </div>
      )}

      {/* 1. LANGUAGE & REGION */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 font-extrabold text-base text-stone-900 border-b border-stone-100 pb-3">
          <Globe className="w-5 h-5 text-emerald-700" />
          <span>اللغة والموقع الإقليمي</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-2">اختر لغة واجهة المنصة:</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {LANGUAGES_LIST.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => onSelectLanguage(lang.code as LanguageCode)}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-emerald-900 text-white border-emerald-900 shadow-sm"
                      : "bg-stone-50 text-stone-800 border-stone-200 hover:bg-emerald-50"
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="truncate">{lang.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. APPEARANCE & THEME */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 font-extrabold text-base text-stone-900 border-b border-stone-100 pb-3">
          <Sun className="w-5 h-5 text-emerald-700" />
          <span>المظهر وعرض الواجهة</span>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold text-stone-700">نمط الألوان (المظهر الفاتح موصى به وفق هوية المرحلة الثانية):</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setThemeMode("light")}
              className={`p-4 rounded-2xl border flex flex-col items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                themeMode === "light"
                  ? "bg-emerald-900 text-white border-emerald-900 shadow-sm"
                  : "bg-stone-50 text-stone-800 border-stone-200"
              }`}
            >
              <Sun className="w-5 h-5" />
              <span>فاتح فاخر (افتراضي)</span>
            </button>

            <button
              onClick={() => setThemeMode("dark")}
              className={`p-4 rounded-2xl border flex flex-col items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                themeMode === "dark"
                  ? "bg-emerald-900 text-white border-emerald-900 shadow-sm"
                  : "bg-stone-50 text-stone-800 border-stone-200"
              }`}
            >
              <Moon className="w-5 h-5" />
              <span>داكن ليلي</span>
            </button>

            <button
              onClick={() => setThemeMode("system")}
              className={`p-4 rounded-2xl border flex flex-col items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                themeMode === "system"
                  ? "bg-emerald-900 text-white border-emerald-900 shadow-sm"
                  : "bg-stone-50 text-stone-800 border-stone-200"
              }`}
            >
              <Monitor className="w-5 h-5" />
              <span>تلقائي حسب الجهاز</span>
            </button>
          </div>
        </div>

        {/* Font Size Adjuster */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-stone-700 mb-2">حجم الخط والنصوص:</label>
          <div className="flex items-center gap-3 bg-stone-50 p-1.5 rounded-2xl border border-stone-200 max-w-sm">
            <button
              onClick={() => setFontSize("sm")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                fontSize === "sm" ? "bg-white text-emerald-950 shadow-2xs" : "text-stone-600"
              }`}
            >
              صغير
            </button>
            <button
              onClick={() => setFontSize("md")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                fontSize === "md" ? "bg-white text-emerald-950 shadow-2xs" : "text-stone-600"
              }`}
            >
              متوسط
            </button>
            <button
              onClick={() => setFontSize("lg")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                fontSize === "lg" ? "bg-white text-emerald-950 shadow-2xs" : "text-stone-600"
              }`}
            >
              كبير
            </button>
          </div>
        </div>
      </div>

      {/* 3. NOTIFICATIONS */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 font-extrabold text-base text-stone-900 border-b border-stone-100 pb-3">
          <Bell className="w-5 h-5 text-emerald-700" />
          <span>تفضيلات التنبيهات والإشعارات</span>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
            <div>
              <div className="font-bold text-xs text-stone-900">تنبيهات البريد الإلكتروني</div>
              <p className="text-[11px] text-stone-500">تأكيد الحجوزات والفعاليات والرحلات الموصى بها</p>
            </div>
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={(e) => setEmailNotifs(e.target.checked)}
              className="w-5 h-5 rounded text-emerald-800 focus:ring-emerald-700"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
            <div>
              <div className="font-bold text-xs text-stone-900">تنبيهات الرسائل النصية (SMS)</div>
              <p className="text-[11px] text-stone-500">رموز التحقق والتنبيهات الطارئة</p>
            </div>
            <input
              type="checkbox"
              checked={smsNotifs}
              onChange={(e) => setSmsNotifs(e.target.checked)}
              className="w-5 h-5 rounded text-emerald-800 focus:ring-emerald-700"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
            <div>
              <div className="font-bold text-xs text-stone-900">إشعارات المساعد السياحي الذكي</div>
              <p className="text-[11px] text-stone-500">اقتراحات الرحلات الفورية وتحديثات الطقس</p>
            </div>
            <input
              type="checkbox"
              checked={pushNotifs}
              onChange={(e) => setPushNotifs(e.target.checked)}
              className="w-5 h-5 rounded text-emerald-800 focus:ring-emerald-700"
            />
          </label>
        </div>
      </div>

      {/* Save Settings Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-md transition-all cursor-pointer text-sm"
        >
          <Save className="w-5 h-5" />
          <span>حفظ التغيرات والتفضيلات</span>
        </button>
      </div>

    </div>
  );
};
