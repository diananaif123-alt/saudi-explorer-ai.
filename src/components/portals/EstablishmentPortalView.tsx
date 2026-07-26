import React, { useState } from "react";
import { LanguageCode, ViewMode } from "../../types";
import {
  MOCK_ESTABLISHMENT_PROFILE,
  MOCK_ESTABLISHMENT_BOOKINGS,
  MOCK_ESTABLISHMENT_OFFERS,
  MOCK_ESTABLISHMENT_REVIEWS,
  MOCK_NOTIFICATIONS,
  EstablishmentProfileData,
  EstablishmentBooking,
  EstablishmentOffer,
  EstablishmentReview,
  PortalNotification
} from "../../data/phase6Data";
import {
  Building2,
  Calendar,
  Users,
  DollarSign,
  Star,
  CheckCircle2,
  Clock,
  PlusCircle,
  Edit,
  Trash2,
  Bell,
  MessageSquare,
  Tag,
  Share2,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  X,
  Search,
  Filter,
  FileText
} from "lucide-react";

interface EstablishmentPortalViewProps {
  language: LanguageCode;
  onNavigateView: (view: ViewMode, targetId?: string) => void;
}

export const EstablishmentPortalView: React.FC<EstablishmentPortalViewProps> = ({
  language,
  onNavigateView
}) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "management" | "bookings" | "offers" | "reviews" | "notifications"
  >("overview");

  // State
  const [profile, setProfile] = useState<EstablishmentProfileData>(MOCK_ESTABLISHMENT_PROFILE);
  const [bookings, setBookings] = useState<EstablishmentBooking[]>(MOCK_ESTABLISHMENT_BOOKINGS);
  const [offers, setOffers] = useState<EstablishmentOffer[]>(MOCK_ESTABLISHMENT_OFFERS);
  const [reviews, setReviews] = useState<EstablishmentReview[]>(MOCK_ESTABLISHMENT_REVIEWS);
  const [notifications] = useState<PortalNotification[]>(MOCK_NOTIFICATIONS.establishment);

  // New Offer Form state
  const [isNewOfferModalOpen, setIsNewOfferModalOpen] = useState(false);
  const [newOfferTitle, setNewOfferTitle] = useState("");
  const [newOfferDiscount, setNewOfferDiscount] = useState(15);
  const [newOfferCode, setNewOfferCode] = useState("SPECIAL15");

  // Reply Review state
  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOfferTitle.trim()) return;

    const offerObj: EstablishmentOffer = {
      id: `off-${Math.floor(100 + Math.random() * 900)}`,
      titleAr: newOfferTitle,
      discountPercent: newOfferDiscount,
      validUntil: "2026-10-31",
      code: newOfferCode,
      descriptionAr: "عرض ترويجي جديد مضاف عبر لوحة التحكم.",
      status: "active"
    };

    setOffers((prev) => [offerObj, ...prev]);
    setIsNewOfferModalOpen(false);
    setNewOfferTitle("");
  };

  const handleReplyReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingReviewId || !replyText.trim()) return;

    setReviews((prev) =>
      prev.map((r) =>
        r.id === replyingReviewId
          ? { ...r, replyAr: replyText, isReplied: true }
          : r
      )
    );

    setReplyingReviewId(null);
    setReplyText("");
  };

  return (
    <div className="min-h-screen bg-stone-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-right">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-emerald-950 font-black text-xs px-3.5 py-1 rounded-full">
            <Building2 className="w-4 h-4" />
            <span>بوابة المنشآت السياحية | Tourism Establishments Portal</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            {profile.nameAr}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            الرخصة السياحية المعتمدة: <span className="font-mono text-amber-300">{profile.licenseNumber}</span> | {profile.categoryAr} - {profile.cityAr}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("notifications")}
            className="p-3 bg-emerald-900 hover:bg-emerald-800 text-amber-300 rounded-2xl border border-amber-400/30 cursor-pointer shadow-md"
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-stone-200 shadow-md flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: "overview", label: "لوحة التحكم الرئيسية", icon: Building2 },
          { id: "management", label: "إدارة بيانات المنشأة", icon: Edit },
          { id: "bookings", label: "إدارة الحجوزات", icon: Calendar, badge: bookings.length },
          { id: "offers", label: "العروض والباقات", icon: Tag, badge: offers.length },
          { id: "reviews", label: "التقييمات والآراء", icon: Star },
          { id: "notifications", label: "الإشعارات", icon: Bell }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-emerald-900 text-white shadow-xs"
                  : "bg-stone-50 text-stone-700 hover:bg-stone-100"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-stone-500"}`} />
              <span>{tab.label}</span>
              {tab.badge ? (
                <span className="bg-amber-400 text-emerald-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {tab.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <div className="text-stone-500 text-xs font-bold">نسبة الإشغال الحالية</div>
              <div className="text-2xl font-black text-emerald-950">{profile.occupancyRatePercent}%</div>
              <div className="text-[10px] text-emerald-700 font-bold">مستوى ممتاز لهذا الموسم</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <div className="text-stone-500 text-xs font-bold">الإيرادات الشهرية التقديرية</div>
              <div className="text-2xl font-black text-stone-900">{profile.monthlyRevenueSAR.toLocaleString()} SAR</div>
              <div className="text-[10px] text-stone-400">بيانات محاكاة</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <div className="text-stone-500 text-xs font-bold">إجمالي الزوار والنزلاء</div>
              <div className="text-2xl font-black text-purple-900">{profile.totalVisitors} زائر</div>
              <div className="text-[10px] text-purple-700 font-bold">موزعين على مدار الشهر</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <div className="text-stone-500 text-xs font-bold">متوسط التقييم العام</div>
              <div className="text-2xl font-black text-amber-500 flex items-center gap-1">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span>{profile.averageRating} / 5.0</span>
              </div>
            </div>

          </div>

          <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-4">
            <h3 className="font-extrabold text-base text-emerald-950 border-b border-stone-100 pb-3">
              أحدث الحجوزات الواردة
            </h3>
            <div className="space-y-3">
              {bookings.slice(0, 2).map((b) => (
                <div key={b.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-stone-900 text-sm">{b.customerNameAr}</div>
                    <div className="text-stone-500">{b.serviceOrRoomAr} • {b.date}</div>
                  </div>
                  <div className="text-left font-black text-emerald-900">{b.amountSAR} SAR</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. MANAGEMENT TAB */}
      {activeTab === "management" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-5 text-xs">
          <h2 className="text-base font-black text-emerald-950 border-b border-stone-100 pb-3">
            تعديل وإدارة بيانات المنشأة السياحية
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-stone-700 mb-1">اسم المنشأة بالعربية:</label>
              <input
                type="text"
                value={profile.nameAr}
                onChange={(e) => setProfile({ ...profile, nameAr: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">العنوان والمنطقة:</label>
              <input
                type="text"
                value={profile.addressAr}
                onChange={(e) => setProfile({ ...profile, addressAr: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-stone-700 mb-1">الوصف التفصيلي للمنشأة:</label>
              <textarea
                rows={3}
                value={profile.descriptionAr}
                onChange={(e) => setProfile({ ...profile, descriptionAr: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => alert("تم حفظ البيانات بنجاح!")}
              className="px-6 py-2.5 bg-emerald-900 text-white font-bold rounded-xl shadow-xs cursor-pointer"
            >
              حفظ التعديلات
            </button>
          </div>
        </div>
      )}

      {/* 3. BOOKINGS TAB */}
      {activeTab === "bookings" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-4 text-xs">
          <h2 className="text-base font-black text-emerald-950 border-b border-stone-100 pb-3">
            سجل الحجوزات الواردة لـ {profile.nameAr}
          </h2>

          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="font-black text-stone-900 text-sm">{b.customerNameAr}</div>
                  <div className="text-stone-500 mt-1">{b.serviceOrRoomAr} • عدد الضيوف: {b.guestsCount}</div>
                  <div className="text-stone-400 mt-0.5 font-mono">هاتف التواصل: {b.phone}</div>
                </div>

                <div className="text-left">
                  <span className="font-black text-emerald-900 text-base">{b.amountSAR} SAR</span>
                  <div className="text-[10px] text-amber-600 font-bold mt-1">حالة الحجز: {b.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. OFFERS TAB */}
      {activeTab === "offers" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-5 text-xs">
          <div className="flex justify-between items-center border-b border-stone-100 pb-3">
            <h2 className="text-base font-black text-emerald-950">العروض والخصومات الموسمية</h2>
            <button
              onClick={() => setIsNewOfferModalOpen(true)}
              className="px-4 py-2 bg-amber-400 text-emerald-950 font-black rounded-xl cursor-pointer flex items-center gap-1"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إضافة عرض جديد</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offers.map((off) => (
              <div key={off.id} className="p-4 bg-amber-50/80 rounded-2xl border border-amber-300 space-y-2">
                <div className="flex justify-between font-black text-emerald-950">
                  <span>{off.titleAr}</span>
                  <span className="bg-amber-400 px-2 py-0.5 rounded-full text-[10px]">خصم {off.discountPercent}%</span>
                </div>
                <p className="text-stone-600">{off.descriptionAr}</p>
                <div className="font-mono text-emerald-900 font-bold">كود العرض: {off.code}</div>
              </div>
            ))}
          </div>

          {isNewOfferModalOpen && (
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <h4 className="font-bold text-stone-900">إنشاء باقة / عرض ترويجي جديد</h4>
              <form onSubmit={handleAddOffer} className="space-y-3">
                <input
                  type="text"
                  placeholder="عنوان العرض (مثال: باقة عطلة الأسبوع)..."
                  value={newOfferTitle}
                  onChange={(e) => setNewOfferTitle(e.target.value)}
                  className="w-full bg-white border border-stone-200 p-2.5 rounded-xl"
                />
                <button type="submit" className="w-full py-2.5 bg-emerald-900 text-white font-bold rounded-xl">
                  حفظ ونشر العرض
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* 5. REVIEWS TAB */}
      {activeTab === "reviews" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-4 text-xs">
          <h2 className="text-base font-black text-emerald-950 border-b border-stone-100 pb-3">
            تقييمات وملاحظات النزلاء
          </h2>

          <div className="space-y-3">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-stone-900">{rev.authorNameAr}</span>
                  <span className="text-amber-500 font-bold">★ {rev.rating}</span>
                </div>
                <p className="text-stone-600">{rev.commentAr}</p>

                {rev.isReplied ? (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-bold">
                    رد المنشأة: {rev.replyAr}
                  </div>
                ) : (
                  <button
                    onClick={() => setReplyingReviewId(rev.id)}
                    className="text-emerald-800 font-bold hover:underline"
                  >
                    رد على التقييم ➔
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
