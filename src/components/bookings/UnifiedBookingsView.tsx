import React, { useState } from "react";
import { LanguageCode, UnifiedBookingItem, ViewMode } from "../../types";
import { INITIAL_BOOKINGS } from "../../data/phase5Data";
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  Building2,
  Utensils,
  Car,
  Compass,
  Sparkles,
  Printer,
  Share2,
  Trash2,
  Edit,
  Star,
  CheckCircle2,
  XCircle,
  Clock3,
  Award,
  Wallet,
  FileText,
  Search,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  X,
  MessageSquare
} from "lucide-react";

interface UnifiedBookingsViewProps {
  language: LanguageCode;
  onNavigateView: (view: ViewMode, targetId?: string) => void;
  customBookings?: UnifiedBookingItem[];
}

export const UnifiedBookingsView: React.FC<UnifiedBookingsViewProps> = ({
  language,
  onNavigateView,
  customBookings
}) => {
  const [bookingsList, setBookingsList] = useState<UnifiedBookingItem[]>(
    customBookings && customBookings.length > 0 ? customBookings : INITIAL_BOOKINGS
  );

  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<UnifiedBookingItem | null>(null);
  const [selectedBookingForRating, setSelectedBookingForRating] = useState<UnifiedBookingItem | null>(null);
  const [ratingStars, setRatingStars] = useState(5);
  const [ratingComment, setRatingComment] = useState("");
  const [ratingSuccessMsg, setRatingSuccessMsg] = useState(false);

  // Digital Wallet Stats
  const totalRewardPoints = bookingsList.reduce((acc, b) => acc + (b.rewardPointsEarned || 0), 0) + 420;
  const totalSpentSAR = bookingsList.reduce((acc, b) => acc + b.costSAR, 0);

  // Filters calculation
  const filteredBookings = bookingsList.filter((b) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "upcoming" && (b.status === "upcoming" || b.status === "confirmed")) ||
      (activeTab === "completed" && b.status === "completed") ||
      (activeTab === "cancelled" && b.status === "cancelled");

    const matchesType = selectedTypeFilter === "all" || b.type === selectedTypeFilter;

    const matchesSearch =
      b.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesType && matchesSearch;
  });

  const handleCancelBooking = (bookingId: string) => {
    if (confirm("هل أنت تأكد من إمكانية إلغاء هذا الحجز المنسق؟")) {
      setBookingsList((prev) =>
        prev.map((item) => (item.id === bookingId ? { ...item, status: "cancelled", canCancel: false } : item))
      );
      if (selectedBookingForDetails?.id === bookingId) {
        setSelectedBookingForDetails((prev) => (prev ? { ...prev, status: "cancelled", canCancel: false } : null));
      }
    }
  };

  const handleSaveRating = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForRating) return;

    setBookingsList((prev) =>
      prev.map((item) =>
        item.id === selectedBookingForRating.id
          ? {
              ...item,
              isRated: true,
              userRating: ratingStars,
              userReview: ratingComment || "خدمة راقية جداً وتجربة ممتازة!"
            }
          : item
      )
    );

    setRatingSuccessMsg(true);
    setTimeout(() => {
      setRatingSuccessMsg(false);
      setSelectedBookingForRating(null);
      setRatingComment("");
    }, 1500);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hotel":
      case "resort":
        return Building2;
      case "restaurant":
        return Utensils;
      case "ride":
        return Car;
      case "event":
      case "tour":
      default:
        return Calendar;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
      case "upcoming":
        return (
          <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            مؤكد وقادم
          </span>
        );
      case "completed":
        return (
          <span className="bg-stone-100 text-stone-700 border border-stone-300 font-bold text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-stone-500" />
            مكتمل
          </span>
        );
      case "cancelled":
        return (
          <span className="bg-rose-100 text-rose-800 border border-rose-300 font-bold text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <XCircle className="w-3 h-3 text-rose-600" />
            ملغى
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-right">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-emerald-950 font-black text-xs px-3 py-1 rounded-full">
            <Ticket className="w-3.5 h-3.5" />
            <span>نظام الحجوزات والمحفظة الرقمية الموحدة</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            إدارة كافة حجوزاتك وقسائمك في مكان واحد
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            متابعة حجز الفنادق، المطاعم، الجولات، الفعاليات، ورحلات Explorer Ride واستعراض الفواتير الرقمية ونقاط المكافآت.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateView("explorer-ride")}
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black rounded-2xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Car className="w-4 h-4" />
            <span>حجز Explorer Ride جديد</span>
          </button>
        </div>
      </div>

      {/* Digital Wallet & Proactive AI Bar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Wallet Stats Box (6 cols) */}
        <div className="md:col-span-6 bg-white p-6 rounded-3xl shadow-md border border-stone-200 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-emerald-900 text-amber-300 rounded-2xl">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-black text-emerald-950">المحفظة الرقمية ونقاط المكافآت</h2>
                <div className="text-xs text-stone-500">Explorer Rewards Wallet</div>
              </div>
            </div>
            <span className="bg-amber-400 text-emerald-950 font-black text-xs px-2.5 py-1 rounded-full">
              عضوية VIP
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
              <div className="text-[11px] text-stone-500 font-bold">رصيد نقاط المكافآت</div>
              <div className="text-xl font-black text-emerald-950 mt-1 flex items-center gap-1">
                <Award className="w-5 h-5 text-amber-500" />
                <span>{totalRewardPoints} نقطة</span>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200">
              <div className="text-[11px] text-amber-900 font-bold">إجمالي الحجوزات</div>
              <div className="text-xl font-black text-emerald-950 mt-1">
                {totalSpentSAR} SAR
              </div>
            </div>
          </div>
        </div>

        {/* Proactive AI Smart Suggestions Engine (6 cols) */}
        <div className="md:col-span-6 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 rounded-3xl shadow-md border border-amber-400/30 space-y-3">
          <div className="flex items-center gap-2 text-amber-300">
            <Sparkles className="w-5 h-5 text-amber-400 animate-spin-slow" />
            <h3 className="font-extrabold text-sm">الاقتراحات والتوصيات الذكية (AI Engine)</h3>
          </div>

          <div className="p-3.5 bg-emerald-900/80 rounded-2xl border border-emerald-700/80 space-y-2 text-xs">
            <div className="font-bold text-amber-200">
              💡 بناءً على حجزك القادم في "الدرعية":
            </div>
            <p className="text-emerald-100 leading-relaxed">
              يقترح النظام حجز رحلة <strong>Explorer Ride Premium</strong> قبل موعد حجز المطعم بـ 30 دقيقة لتفادي الازدحام المروري، والوصول في أفضل وقت لالتقاط الصور عند غروب الشمس.
            </p>
          </div>
        </div>

      </div>

      {/* Bookings Filters & Search Toolbar */}
      <div className="bg-white p-5 rounded-3xl shadow-md border border-stone-200 space-y-4">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-100 pb-4">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
            {[
              { id: "all", name: "جميع الحجوزات" },
              { id: "upcoming", name: "القادمة والمؤكدة" },
              { id: "completed", name: "المكتملة" },
              { id: "cancelled", name: "الملغاة" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-emerald-900 text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedTypeFilter}
              onChange={(e) => setSelectedTypeFilter(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-stone-800 focus:outline-none"
            >
              <option value="all">جميع الأنواع</option>
              <option value="hotel">فنادق ومنتجعات</option>
              <option value="restaurant">مطاعم</option>
              <option value="tour">جولات سياحية</option>
              <option value="event">فعاليات</option>
              <option value="ride">Explorer Ride</option>
            </select>
          </div>

        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث برقم الحجز، اسم الخدمة، أو الوجهة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

      </div>

      {/* Bookings List Cards */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center space-y-3">
            <Ticket className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-extrabold text-stone-800">لا توجد حجوزات مطابقة للبحث</h3>
            <p className="text-xs text-stone-500">يمكنك حجز تجربة أو رحلة جديدة من الأقسام المتاحة بالمنصة.</p>
          </div>
        ) : (
          filteredBookings.map((b) => {
            const IconComponent = getTypeIcon(b.type);

            return (
              <div
                key={b.id}
                className="bg-white p-5 rounded-3xl shadow-sm border border-stone-200 hover:border-emerald-700 transition-all flex flex-col md:flex-row items-center justify-between gap-5"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img
                    src={b.image}
                    alt=""
                    className="w-24 h-24 rounded-2xl object-cover shadow-xs flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(b.status)}
                      <span className="text-xs font-mono font-bold text-stone-400">
                        {b.bookingNumber}
                      </span>
                    </div>

                    <h3 className="font-black text-base text-emerald-950 mt-1">
                      {b.titleAr}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 mt-1.5 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        {b.locationAr}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                        {b.date} ({b.time})
                      </span>
                    </div>

                    <div className="text-[11px] text-amber-700 font-bold mt-1">
                      🎁 مكافأة محققة: +{b.rewardPointsEarned} نقطة Explorer
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-stone-100 gap-3">
                  <div className="text-right">
                    <div className="text-[10px] text-stone-400">إجمالي التكلفة:</div>
                    <div className="text-lg font-black text-emerald-900">
                      {b.costSAR} SAR
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedBookingForDetails(b)}
                      className="px-4 py-2 bg-emerald-900 hover:bg-emerald-950 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
                    >
                      تفاصيل والقسيمة
                    </button>

                    {b.status === "completed" && !b.isRated && (
                      <button
                        onClick={() => setSelectedBookingForRating(b)}
                        className="px-3 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black rounded-xl text-xs cursor-pointer flex items-center gap-1"
                      >
                        <Star className="w-3.5 h-3.5 fill-emerald-950" />
                        <span>تقييم</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Booking Details & Voucher Modal */}
      {selectedBookingForDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
            
            <div className="p-5 bg-emerald-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base">تفاصيل القسيمة والفاتورة الرقمية</h3>
              </div>
              <button
                onClick={() => setSelectedBookingForDetails(null)}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-right">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <div className="text-xs text-stone-400 font-bold">رمز القسيمة الموحد:</div>
                  <div className="text-base font-black text-emerald-950 font-mono">
                    {selectedBookingForDetails.bookingNumber}
                  </div>
                </div>
                {getStatusBadge(selectedBookingForDetails.status)}
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between border-b border-stone-200 pb-1.5">
                  <span className="text-stone-500">اسم الخدمة/الفعالية:</span>
                  <span className="font-bold text-stone-900">{selectedBookingForDetails.titleAr}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-1.5">
                  <span className="text-stone-500">الموقع والتاريخ:</span>
                  <span className="font-bold text-stone-900">
                    {selectedBookingForDetails.locationAr} ({selectedBookingForDetails.date})
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-1.5">
                  <span className="text-stone-500">التكلفة الإجمالية:</span>
                  <span className="font-black text-emerald-900">{selectedBookingForDetails.costSAR} SAR</span>
                </div>
                {selectedBookingForDetails.detailsAr && (
                  <div className="pt-1 text-stone-600">
                    <strong>تفاصيل الحجز:</strong> {selectedBookingForDetails.detailsAr}
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة الفاتورة</span>
                </button>

                {selectedBookingForDetails.canCancel && (
                  <button
                    onClick={() => handleCancelBooking(selectedBookingForDetails.id)}
                    className="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>إلغاء الحجز</span>
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedBookingForDetails(null)}
                className="px-5 py-2 bg-emerald-900 text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Service Rating Modal */}
      {selectedBookingForRating && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
            
            <div className="p-5 bg-amber-400 text-emerald-950 flex items-center justify-between">
              <h3 className="font-black text-base">تقييم الخدمة والسائق / المنشأة</h3>
              <button
                onClick={() => setSelectedBookingForRating(null)}
                className="p-1.5 bg-emerald-950/10 hover:bg-emerald-950/20 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-emerald-950" />
              </button>
            </div>

            {ratingSuccessMsg ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                <h4 className="font-black text-emerald-950">شكراً لك! تم حفظ تقييمك بنجاح.</h4>
              </div>
            ) : (
              <form onSubmit={handleSaveRating} className="p-6 space-y-4 text-right">
                <div className="text-xs font-bold text-stone-600">
                  يرجى تقييم تجربتك لـ: <strong>{selectedBookingForRating.titleAr}</strong>
                </div>

                {/* Stars Selector */}
                <div className="flex items-center justify-center gap-2 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatingStars(star)}
                      className="p-1 transition-transform hover:scale-125 cursor-pointer"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= ratingStars ? "fill-amber-400 text-amber-400" : "text-stone-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ملاحظاتك وتقييمك الشخصي (اختياري):
                  </label>
                  <textarea
                    rows={3}
                    value={ratingComment}
                    onChange={(e) => setRatingComment(e.target.value)}
                    placeholder="اكتب انطباعك عن الخدمة، النظافة، والالتزام بالوقت..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  إرسال التقييم
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
