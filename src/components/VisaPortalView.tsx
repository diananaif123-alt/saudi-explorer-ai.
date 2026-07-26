import React, { useState } from "react";
import { LanguageCode } from "../types";
import { getTranslation } from "../data/translations";
import {
  FileCheck,
  Globe,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ExternalLink,
  HelpCircle
} from "lucide-react";

interface VisaPortalViewProps {
  language: LanguageCode;
}

export const VisaPortalView: React.FC<VisaPortalViewProps> = ({ language }) => {
  const [nationality, setNationality] = useState("US");
  const [residencyStatus, setResidencyStatus] = useState("NONE");
  const [isChecking, setIsChecking] = useState(false);
  const [visaResult, setVisaResult] = useState<any>(null);

  const t = getTranslation(language);

  const handleCheckVisa = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);

    try {
      const response = await fetch("/api/visa-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nationality, residencyStatus })
      });

      const data = await response.json();
      setVisaResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsChecking(false);
    }
  };

  const countryOptions = [
    { code: "US", nameAr: "الولايات المتحدة الأمريكية", nameEn: "United States" },
    { code: "UK", nameAr: "المملكة المتحدة (بريطانيا)", nameEn: "United Kingdom" },
    { code: "CA", nameAr: "كندا", nameEn: "Canada" },
    { code: "EU", nameAr: "دول الاتحاد الأوروبي / الشنغن", nameEn: "European Union / Schengen" },
    { code: "AE", nameAr: "الإمارات العربية المتحدة", nameEn: "UAE" },
    { code: "KW", nameAr: "الكويت", nameEn: "Kuwait" },
    { code: "QA", nameAr: "قطر", nameEn: "Qatar" },
    { code: "BH", nameAr: "البحرين", nameEn: "Bahrain" },
    { code: "OM", nameAr: "سلطنة عمان", nameEn: "Oman" },
    { code: "CN", nameAr: "الصين الشعبية", nameEn: "China" },
    { code: "JP", nameAr: "اليابان", nameEn: "Japan" },
    { code: "KR", nameAr: "كوريا الجنوبية", nameEn: "South Korea" },
    { code: "AU", nameAr: "أستراليا", nameEn: "Australia" },
    { code: "MY", nameAr: "ماليزيا", nameEn: "Malaysia" },
    { code: "OTHER", nameAr: "جنسية أخرى (استعلام عام)", nameEn: "Other Nationalities" }
  ];

  return (
    <section className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-100 text-emerald-950 rounded-full text-xs font-bold mb-3">
            <FileCheck className="w-4 h-4 text-emerald-800" />
            <span>بوابة التأشيرة السياحية السعودية الموحدة</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-emerald-950 tracking-tight">
            {t.visaTitle}
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-2">{t.visaSub}</p>
        </div>

        {/* Checker Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md mb-8">
          <form onSubmit={handleCheckVisa} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Nationality */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  جنسية جواز السفر
                </label>
                <select
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                >
                  {countryOptions.map((c) => (
                    <option key={c.code} value={c.code}>
                      {language === "ar" ? c.nameAr : c.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Special Status / Residency */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  الإقامة المعتمدة أو التأشيرات الفعالة
                </label>
                <select
                  value={residencyStatus}
                  onChange={(e) => setResidencyStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                >
                  <option value="NONE">لا توجد إقامة خاصة / تقديم عادي</option>
                  <option value="GCC_RESIDENT">مقيم في إحدى دول مجلس التعاون الخليجي</option>
                  <option value="US_UK_EU_VISA">أحمل تأشيرة أمريكا أو بريطانيا أو شنغن سارية المفعول</option>
                </select>
              </div>

            </div>

            <button
              type="submit"
              disabled={isChecking}
              className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isChecking ? "جاري الاستعلام في النظام الموحد..." : t.checkVisaBtn}</span>
            </button>

          </form>
        </div>

        {/* Query Result View */}
        {visaResult && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-lg space-y-6 animate-in fade-in mb-8">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-100 text-emerald-900 rounded-2xl">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-800">نتيجة الاستعلام التأشيري</span>
                  <h3 className="text-lg sm:text-2xl font-black text-emerald-950">
                    {visaResult.type}
                  </h3>
                </div>
              </div>

              <div className="text-left">
                <div className="text-xs text-stone-500">رسوم التأشيرة الشاملة</div>
                <div className="text-xl font-black text-emerald-950">{visaResult.feeSAR} ر.س</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <div className="font-bold text-stone-500">صلاحية التأشيرة:</div>
                <div className="font-bold text-stone-900">{visaResult.validity}</div>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                <div className="font-bold text-amber-900">تنبيه النظام الوطني:</div>
                <div className="text-amber-950 leading-relaxed">{visaResult.note}</div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs text-emerald-950 mb-3">المستندات والمتطلبات الأساسية:</h4>
              <div className="space-y-2">
                {visaResult.requiredDocuments.map((doc: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs font-semibold text-stone-800 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Step-by-step Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <h3 className="text-lg font-black text-emerald-950 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <span>خطوات الحصول على التأشيرة السعودية في 3 دقائق</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 relative">
              <span className="w-8 h-8 rounded-xl bg-emerald-900 text-amber-300 font-extrabold flex items-center justify-center text-xs mb-3">
                1
              </span>
              <h4 className="font-bold text-sm text-stone-900 mb-1">تقديم الطلب الإلكتروني</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                تعبئة البيانات شخصياً في المنصة السياحية الوطنية وإرفاق صورة جواز السفر.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 relative">
              <span className="w-8 h-8 rounded-xl bg-emerald-900 text-amber-300 font-extrabold flex items-center justify-center text-xs mb-3">
                2
              </span>
              <h4 className="font-bold text-sm text-stone-900 mb-1">سداد الرسوم والتأمين الصحي</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                سداد الرسوم أوتوماتيكياً شاملة التأمين الطبي ضد مخاطر الطوارئ داخل المملكة.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 relative">
              <span className="w-8 h-8 rounded-xl bg-emerald-900 text-amber-300 font-extrabold flex items-center justify-center text-xs mb-3">
                3
              </span>
              <h4 className="font-bold text-sm text-stone-900 mb-1">استلام التأشيرة الفورية</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                وصول التأشيرة الإلكترونية المعتمدة إلى البريد الإلكتروني خلال دقائق معدودة.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
