import React, { useState, useEffect } from "react";
import { ViewMode, LanguageCode } from "../../types";
import {
  Bell,
  Search,
  Sparkles,
  Bookmark,
  History,
  X,
  Type,
  Eye,
  Sliders,
  Compass,
  MapPin,
  Calendar,
  Ticket,
  Car,
  Briefcase,
  Building,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronLeft
} from "lucide-react";
import { SmartSearch } from "../SmartSearch";

interface Phase8GlobalHubProps {
  language: LanguageCode;
  onNavigateView: (view: ViewMode, targetId?: string) => void;
  savedTripsCount: number;
}

export const Phase8GlobalHub: React.FC<Phase8GlobalHubProps> = ({
  language,
  onNavigateView,
  savedTripsCount
}) => {
  const [fontSizeScale, setFontSizeScale] = useState<"normal" | "large" | "xlarge">("normal");
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mock Notification dataset
  const [notifications, setNotifications] = useState([
    {
      id: "n1",
      title: "تم تأكيد طلب Explorer Ride",
      desc: "سيارة فاخرة كهربائية بالطريق إليك متجهة نحو الدرعية التاريخية.",
      time: "قبل 5 دقائق",
      type: "ride",
      read: false
    },
    {
      id: "n2",
      title: "تحديث جدول رحلة العلا",
      desc: "قام المساعد الذكي AI بإضافة فعالية شتاء طنطورة إلى مسار رحلتك.",
      time: "قبل ساعة",
      type: "ai",
      read: false
    },
    {
      id: "n3",
      title: "تأكيد حجز الفندق",
      desc: "تم إصدار الفاتورة وتأكيد حجز فندق قصر الدرعية للـ 3 ليال القادمة.",
      time: "قبل 3 ساعات",
      type: "booking",
      read: true
    }
  ]);

  // Mock Activity History
  const [activityLogs, setActivityLogs] = useState([
    { id: "a1", action: "زيارة صفحة المعالم - حي الطريف التاريخي", time: "اليوم 10:15 am", icon: MapPin },
    { id: "a2", action: "تشغيل المرشد الصوتي التفاعلي لجدة البلد", time: "اليوم 09:40 am", icon: Sparkles },
    { id: "a3", action: "توليد خطة سفر 3 أيام لأبها والسودة", time: "أمس 04:20 pm", icon: Compass },
    { id: "a4", action: "طلب مركبة Explorer Ride نحو مطار الملك خالد", time: "أمس 01:10 pm", icon: Car }
  ]);

  // Accessibility Font Scaling Effect
  useEffect(() => {
    const root = document.documentElement;
    if (fontSizeScale === "large") {
      root.style.fontSize = "17px";
    } else if (fontSizeScale === "xlarge") {
      root.style.fontSize = "18px";
    } else {
      root.style.fontSize = "16px";
    }
  }, [fontSizeScale]);

  // Accessibility High Contrast Effect
  useEffect(() => {
    if (isHighContrast) {
      document.body.classList.add("high-contrast-mode");
    } else {
      document.body.classList.remove("high-contrast-mode");
    }
  }, [isHighContrast]);

  // Show temporary toast notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    triggerToast("تم تعيين كافة الإشعارات كـ مقروءة");
  };

  return (
    <>
      {/* Floating Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-emerald-950 text-white border border-amber-400/50 shadow-2xl px-5 py-3 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Unified Global Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 px-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 space-y-4 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-black text-emerald-950 text-base">
                  محرك البحث الشامل لمنصة SAUDI EXPLORER AI
                </h3>
              </div>
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <SmartSearch
              onSelectView={(view, id) => {
                setIsSearchModalOpen(false);
                onNavigateView(view, id);
              }}
              placeholder="ابحث عن مدينة، معلم، فندق، فعالية، مستثمر، خدمة أو مرشد..."
            />

            <div className="text-[11px] text-stone-500 text-center pt-2">
              اضغط Esc أو زر الإغلاق للخروج من نافذة البحث الشامل
            </div>
          </div>
        </div>
      )}

      {/* Global Notifications Drawer Overlay */}
      {isNotificationsDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between space-y-4 animate-in slide-in-from-left duration-200">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-500" />
                  <h3 className="font-black text-emerald-950 text-base">مركز الإشعارات والتنبيهات الموحد</h3>
                </div>
                <button
                  onClick={() => setIsNotificationsDrawerOpen(false)}
                  className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-5 h-5 text-stone-400" />
                </button>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-stone-500">التنبيهات الأخيرة:</span>
                <button
                  onClick={markAllNotificationsRead}
                  className="text-emerald-900 font-bold hover:underline cursor-pointer"
                >
                  تعيين الكل كـ مقروء
                </button>
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[70vh]">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-2xl border text-xs space-y-1.5 transition-all ${
                      notif.read
                        ? "bg-stone-50 border-stone-200 text-stone-700"
                        : "bg-amber-50/80 border-amber-300 text-emerald-950 font-bold"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-black">{notif.title}</span>
                      <span className="text-[10px] text-stone-400">{notif.time}</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed text-[11px]">{notif.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setIsNotificationsDrawerOpen(false);
                onNavigateView("bookings");
              }}
              className="w-full py-3 bg-emerald-900 text-white font-black text-xs rounded-2xl cursor-pointer hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Ticket className="w-4 h-4 text-amber-400" />
              <span>عرض المحفظة الرقمية والحجوزات</span>
            </button>
          </div>
        </div>
      )}

      {/* Activity Logs Modal */}
      {isActivityModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 space-y-4 border border-stone-200 shadow-2xl animate-in fade-in">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-amber-500" />
                <h3 className="font-black text-emerald-950 text-base">سجل النشاط والاستخدام الشخصي</h3>
              </div>
              <button
                onClick={() => setIsActivityModalOpen(false)}
                className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto text-xs">
              {activityLogs.map((act) => {
                const Icon = act.icon;
                return (
                  <div key={act.id} className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 text-emerald-900 rounded-xl">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-stone-900">{act.action}</div>
                      <div className="text-[10px] text-stone-400">{act.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                setActivityLogs([]);
                triggerToast("تم تفريغ سجل النشاط بنجاح");
              }}
              className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl cursor-pointer"
            >
              مسح سجل النشاط
            </button>
          </div>
        </div>
      )}
    </>
  );
};
