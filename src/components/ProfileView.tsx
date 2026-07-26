import React, { useState } from "react";
import { GeneratedItinerary, LanguageCode } from "../types";
import { getTranslation } from "../data/translations";
import {
  User,
  ShieldCheck,
  KeyRound,
  Bookmark,
  Activity,
  Printer,
  Trash2,
  Calendar,
  CheckCircle2,
  Lock
} from "lucide-react";

interface ProfileViewProps {
  savedItineraries: GeneratedItinerary[];
  onRemoveItinerary: (index: number) => void;
  language: LanguageCode;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  savedItineraries,
  onRemoveItinerary,
  language
}) => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const t = getTranslation(language);

  const mockActivityLogs = [
    { action: "تسجيل دخول آمن إلى المنصة", time: "اليوم، 09:12 ص", ip: "185.20.xxx.12" },
    { action: "توليد جدول رحلة بالذكاء الاصطناعي (العُلا)", time: "اليوم، 09:25 ص", ip: "185.20.xxx.12" },
    { action: "استعلام عن التأشيرة السياحية الفورية", time: "أمس، 04:18 م", ip: "185.20.xxx.12" }
  ];

  return (
    <section className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* User Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-right">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-900 to-emerald-950 text-amber-300 font-extrabold flex items-center justify-center text-xl shadow-md border border-amber-400/30">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-emerald-950">
                  عبدالله بن محمد العتيبي
                </h2>
                <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  حساب موثق
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">abdullah.alotaibi@example.sa</p>
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <div>
              <div className="font-bold text-emerald-950">حماية النظام الوطني</div>
              <div className="text-[11px] text-stone-500">جاهز للربط مع النفاذ الوطني الموحد (نفاذ)</div>
            </div>
          </div>
        </div>

        {/* Saved Trips Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-emerald-950 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-500" />
              <span>جدول رحلاتي المحفوظة ({savedItineraries.length})</span>
            </h3>
          </div>

          {savedItineraries.length === 0 ? (
            <div className="p-8 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-300">
              <Calendar className="w-10 h-10 text-stone-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-stone-600">لا توجد جداول رحلات محفوظة حتى الآن.</p>
              <p className="text-[11px] text-stone-400 mt-1">
                استخدم مولد الذكاء الاصطناعي لتصميم جدولك وقمت بحفظه هنا.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedItineraries.map((itinerary, index) => (
                <div
                  key={index}
                  className="p-5 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      رحلة محفوظة #{index + 1}
                    </span>
                    <h4 className="text-lg font-black text-emerald-950 mt-1">
                      {itinerary.title}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-1">
                      {itinerary.summary}
                    </p>
                    <div className="text-xs font-bold text-emerald-900 mt-2">
                      الميزانية: {itinerary.estimatedBudgetSAR}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>طباعة</span>
                    </button>

                    <button
                      onClick={() => onRemoveItinerary(index)}
                      className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Simulated Security & 2FA Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Security Controls */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-700" />
              <span>إعدادات الأمان والصلاحيات</span>
            </h3>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-stone-900">التحقق بخطوتين (2FA)</div>
                <div className="text-[11px] text-stone-500">تأمين الحساب بإنذارات SMS أو الرمز الحركي</div>
              </div>

              <button
                onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                  is2FAEnabled ? "bg-emerald-900 justify-end" : "bg-stone-300 justify-start"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-md"></span>
              </button>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl text-[11px] text-amber-900 border border-amber-200">
              جاهزية النظام: تم تصميم واجهات البرمجة وهياكل قواعد البيانات لتدعم التشفير الكامل وقواعد الصلاحيات المتقدمة.
            </div>
          </div>

          {/* Activity Logs */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-700" />
              <span>سجلات النشاط الحديثة</span>
            </h3>

            <div className="space-y-2">
              {mockActivityLogs.map((log, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs flex justify-between items-center"
                >
                  <div>
                    <div className="font-bold text-stone-900">{log.action}</div>
                    <div className="text-[10px] text-stone-400">{log.time}</div>
                  </div>
                  <div className="font-mono text-[10px] text-stone-500 bg-white px-2 py-1 rounded-md border">
                    {log.ip}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
