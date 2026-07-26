import React, { useState } from "react";
import { LanguageCode, ViewMode } from "../../types";
import { MOCK_DESTINATIONS, MOCK_SERVICES } from "../../data/mockData";
import { PortalAuthModal } from "../auth/PortalAuthModal";
import {
  Compass,
  Sparkles,
  MapPin,
  Calendar,
  Ticket,
  Award,
  Shield,
  Wallet,
  Car,
  Search,
  Bell,
  Heart,
  Star,
  User,
  Settings,
  SlidersHorizontal,
  ChevronRight,
  Mic,
  Camera,
  Box,
  CheckCircle2,
  Clock,
  ArrowRight,
  Building,
  Utensils,
  Coffee,
  BedDouble,
  Palmtree,
  Maximize2,
  X,
  LogOut,
  Globe,
  Lock,
  Moon,
  Sun,
  Send,
  Eye,
  Plus,
  LogIn
} from "lucide-react";

interface TouristPortalViewProps {
  language: LanguageCode;
  onNavigateView: (view: ViewMode, targetId?: string) => void;
}

export const TouristPortalView: React.FC<TouristPortalViewProps> = ({
  language,
  onNavigateView
}) => {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "explore" | "ai-planner" | "ride" | "maps-3d-ar" | "bookings-wallet" | "favorites" | "notifications" | "profile-settings"
  >("dashboard");

  // Sub-category filter for Explore tab
  const [exploreCategory, setExploreCategory] = useState<
    "all" | "cities" | "landmarks" | "heritage" | "hotels" | "resorts" | "restaurants" | "cafes" | "events" | "activities"
  >("all");

  // Portal Search
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>(["alula", "riyadh-diriyah", "jeddah-redsea"]);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: "1", title: "تأكيد حجز رحلة العُلا", body: "تم تأكيد حجزك في منتجع العُلا لـ 15 نوفمبر 2026 بنجاح.", time: "منذ ساعتين", isRead: false },
    { id: "2", title: "مكافأة الجواز السياحي", body: "حصلت على ختم سياحي جديد من حي الدرعية التاريخي (+250 نقطة).", time: "أمس", isRead: false },
    { id: "3", title: "عرض خاص للسياح", body: "خصم 20% على جولات Explorer Ride في مدينة جدة.", time: "منذ 3 أيام", isRead: true }
  ]);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: "سارة عبد العزيز الحارثي",
    email: "sara.tourist@example.sa",
    phone: "+966 50 123 4567",
    nationality: "المملكة العربية السعودية",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    language: "ar",
    isDarkMode: false
  });
  const [passwordForm, setPasswordForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  // AR & 3D Modal
  const [active3DLandmarkModal, setActive3DLandmarkModal] = useState<any>(null);
  const [isVoiceAssistantActive, setIsVoiceAssistantActive] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaveSuccess(true);
    setTimeout(() => setProfileSaveSuccess(false), 3000);
  };

  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      
      {/* Top Portal Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-emerald-950 font-black text-xs px-3.5 py-1 rounded-full shadow-sm">
            <Compass className="w-4 h-4" />
            <span>بوابة السائح الزائر الشاملة | Tourist Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">أهلاً بك، {profileForm.name}</h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
            منصتك الرقمية الموحدة لاستكشاف معالم المملكة، التخطيط الذكي للرحلات، حجز المواصلات، وإدارة الجواز السياحي والمحفظة.
          </p>
        </div>

        {/* Quick Portal Action Buttons & Search */}
        <div className="relative z-10 flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-emerald-300 absolute right-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث في المدن، الفنادق، المعالم..."
              className="w-full sm:w-64 pl-4 pr-9 py-2 bg-white/10 text-white placeholder-emerald-200 text-xs rounded-xl border border-white/20 focus:outline-none focus:bg-white/20"
            />
          </div>

          <button
            onClick={() => setActiveTab("notifications")}
            className="relative p-2.5 bg-emerald-900 hover:bg-emerald-800 text-amber-300 rounded-xl border border-amber-400/30 cursor-pointer shadow-md transition-all"
            title="الإشعارات"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifCount > 0 && (
              <span className="absolute -top-1 -left-1 bg-amber-400 text-emerald-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-emerald-950">
                {unreadNotifCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Sub-Sidebar / Tab Ribbon */}
      <div className="bg-white p-2 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: "dashboard", label: "لوحة التحكم", icon: Compass },
          { id: "explore", label: "استكشف المملكة", icon: Globe },
          { id: "ai-planner", label: "التخطيط الذكي للرحلات", icon: Sparkles },
          { id: "ride", label: "Explorer Ride", icon: Car },
          { id: "maps-3d-ar", label: "الخرائط والـ 3D / AR", icon: Box },
          { id: "bookings-wallet", label: "الحجوزات والمحفظة", icon: Wallet },
          { id: "favorites", label: "المفضلة", icon: Heart, badge: favorites.length },
          { id: "profile-settings", label: "الملف الشخصي والإعدادات", icon: Settings }
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

      {/* TAB 1: DASHBOARD */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between text-stone-500 text-xs font-semibold mb-2">
                <span>الرحلات المكتملة</span>
                <Ticket className="w-4 h-4 text-emerald-700" />
              </div>
              <div className="text-2xl font-black text-stone-900">5 رحلات</div>
              <span className="text-[10px] text-emerald-700 font-bold mt-1 block">العُلا، الدرعية، جدة، السودة، نيوم</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between text-stone-500 text-xs font-semibold mb-2">
                <span>نقاط المكافآت</span>
                <Award className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-amber-600">2,450 نقطة</div>
              <span className="text-[10px] text-stone-400 mt-1 block">تؤهلك لخصم 20% على الفنادق</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between text-stone-500 text-xs font-semibold mb-2">
                <span>الجواز السياحي الرقمي</span>
                <Shield className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-black text-purple-700">مستوى ذهبي</div>
              <span className="text-[10px] text-purple-600 font-bold mt-1 block">8 أختام زيارة معتمدة</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between text-stone-500 text-xs font-semibold mb-2">
                <span>المحفظة الرقمية</span>
                <Wallet className="w-4 h-4 text-emerald-800" />
              </div>
              <div className="text-2xl font-black text-emerald-900">3,800 ر.س</div>
              <span className="text-[10px] text-stone-400 mt-1 block">رصيد الاسترداد المباشر جاهز</span>
            </div>
          </div>

          {/* Quick AI Tour Guide & Explorer Ride Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Upcoming Trip Card */}
            <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-extrabold text-base text-stone-900">رحلاتي القادمة والحجوزات المؤكدة</h3>
                <button
                  onClick={() => setActiveTab("bookings-wallet")}
                  className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>عرض الكل</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=200"
                      alt="AlUla"
                      className="w-14 h-14 rounded-2xl object-cover shadow-2xs"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-stone-900">مهرجان المناطيد والاسترخاء في العُلا</h4>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                        <span>15 نوفمبر 2026 - 3 أيام</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-950 font-extrabold text-[11px] rounded-full">
                      مؤكد #BK-9041
                    </span>
                    <button
                      onClick={() => onNavigateView("bookings")}
                      className="px-3.5 py-1.5 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs rounded-xl cursor-pointer"
                    >
                      التفاصيل
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-stone-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=200"
                      alt="Diriyah"
                      className="w-14 h-14 rounded-2xl object-cover shadow-2xs"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-stone-900">عشاء تاريخي في مطل البجيري بالدرعية</h4>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                        <span>22 نوفمبر 2026 - ليلة واحدة</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-stone-100 text-stone-700 font-extrabold text-[11px] rounded-full">
                      قادم #BK-8812
                    </span>
                    <button
                      onClick={() => onNavigateView("bookings")}
                      className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      التفاصيل
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Voice & AR Assistant Banner */}
            <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-900 text-white rounded-3xl p-6 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-300 text-xs font-extrabold mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>المساعد السياحي بالذكاء الاصطناعي</span>
                </div>
                <h3 className="font-extrabold text-lg">المرشد الصوتي والواقع المعزز 3D</h3>
                <p className="text-stone-300 text-xs mt-2 leading-relaxed">
                  تحدث مع المرشد السياحي الذكي للحصول على نصائح مخصصة، معرفة الأوقات المثالية، وعرض المجسمات ثلاثية الأبعاد للمعالم.
                </p>
              </div>

              <div className="space-y-2 mt-6">
                <button
                  onClick={() => onNavigateView("ai-assistant")}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>محادثة المرشد السياحي الذكي</span>
                </button>
                <button
                  onClick={() => setActiveTab("maps-3d-ar")}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Box className="w-4 h-4 text-amber-300" />
                  <span>عرض المجسمات والواقع المعزز</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: EXPLORE KSA */}
      {activeTab === "explore" && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: "all", label: "الكل" },
              { id: "cities", label: "المدن" },
              { id: "landmarks", label: "المعالم" },
              { id: "heritage", label: "المواقع التاريخية" },
              { id: "hotels", label: "الفنادق" },
              { id: "resorts", label: "المنتجعات" },
              { id: "restaurants", label: "المطاعم" },
              { id: "cafes", label: "المقاهي" },
              { id: "events", label: "الفعاليات" },
              { id: "activities", label: "الأنشطة" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setExploreCategory(cat.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                  exploreCategory === cat.id
                    ? "bg-emerald-900 text-white shadow-xs"
                    : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_DESTINATIONS.filter((dest) => {
              if (searchQuery) {
                return (
                  dest.nameAr.includes(searchQuery) ||
                  dest.taglineAr.includes(searchQuery) ||
                  dest.regionAr.includes(searchQuery)
                );
              }
              return true;
            }).map((dest) => {
              const isFav = favorites.includes(dest.id);

              return (
                <div
                  key={dest.id}
                  className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={dest.heroImage}
                      alt={dest.nameAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <button
                      onClick={() => toggleFavorite(dest.id)}
                      className={`absolute top-3 left-3 p-2.5 rounded-full backdrop-blur-md cursor-pointer transition-all ${
                        isFav ? "bg-rose-500 text-white" : "bg-black/40 text-white hover:bg-black/60"
                      }`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>

                    <div className="absolute bottom-3 right-3 text-white">
                      <span className="text-[10px] font-bold bg-amber-400 text-emerald-950 px-2 py-0.5 rounded-full">
                        {dest.regionAr}
                      </span>
                      <h3 className="text-lg font-black mt-1">{dest.nameAr}</h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {dest.descriptionAr}
                    </p>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-100">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span>{dest.rating}</span>
                      </div>
                      <span className="text-stone-500 font-medium">{dest.bestTimeAr}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => onNavigateView("destinations", dest.id)}
                        className="flex-1 py-2 bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                      >
                        تفاصيل الوجهة
                      </button>
                      <button
                        onClick={() => onNavigateView("ai-assistant")}
                        className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
                        title="تخطيط مع AI"
                      >
                        <Sparkles className="w-4 h-4 text-emerald-700" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: SMART TRIP PLANNING */}
      {activeTab === "ai-planner" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-2xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-900">مساعد التخطيط الذكي للرحلات المخصصة</h2>
              <p className="text-xs text-stone-500 mt-1">
                صمم جدولا زمني متكاملا يشمل الفنادق، الأنشطة، المواصلات والوجبات بناءً على ميزانيتك واهتماماتك.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold">
            <button
              onClick={() => onNavigateView("ai-assistant")}
              className="p-5 bg-stone-50 hover:bg-emerald-50/60 border border-stone-200 hover:border-emerald-200 rounded-2xl text-right transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-emerald-950 font-black flex items-center justify-center mb-3">
                1
              </div>
              <h4 className="text-sm font-black text-stone-900 group-hover:text-emerald-900">جدول رحلة 3 أيام في العُلا</h4>
              <p className="text-stone-500 text-[11px] font-normal mt-1">تنسيق مسار المناطيد، جبل الفيل ومسرح مرايا.</p>
            </button>

            <button
              onClick={() => onNavigateView("ai-assistant")}
              className="p-5 bg-stone-50 hover:bg-emerald-50/60 border border-stone-200 hover:border-emerald-200 rounded-2xl text-right transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-emerald-950 font-black flex items-center justify-center mb-3">
                2
              </div>
              <h4 className="text-sm font-black text-stone-900 group-hover:text-emerald-900">مسار عائلي في الرياض والدرعية</h4>
              <p className="text-stone-500 text-[11px] font-normal mt-1">حجوزات مطل البجيري، بوليفارد ومطل حافة العالم.</p>
            </button>

            <button
              onClick={() => onNavigateView("ai-assistant")}
              className="p-5 bg-stone-50 hover:bg-emerald-50/60 border border-stone-200 hover:border-emerald-200 rounded-2xl text-right transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-emerald-950 font-black flex items-center justify-center mb-3">
                3
              </div>
              <h4 className="text-sm font-black text-stone-900 group-hover:text-emerald-900">جولة شاطئية وبحرية في جدة</h4>
              <p className="text-stone-500 text-[11px] font-normal mt-1">تنسيق رحلات الغوص، جدة البلد واليخوت.</p>
            </button>
          </div>

          <button
            onClick={() => onNavigateView("ai-assistant")}
            className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-950 text-white font-black text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>الانتقال لمُولد الخطط الذكية المتكامل بالذكاء الاصطناعي</span>
          </button>
        </div>
      )}

      {/* TAB 4: EXPLORER RIDE */}
      {activeTab === "ride" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 text-amber-900 rounded-2xl">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-stone-900">خدمة Explorer Ride المباشرة</h2>
                <p className="text-xs text-stone-500 mt-1">حجز تنقلات فورية أو مجدولة بين مطارات ومعالم المملكة.</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateView("explorer-ride")}
              className="px-4 py-2 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              الذهاب لشاشة الحجز الكاملة
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">اقتصادية</span>
              <h4 className="font-bold text-stone-900 text-sm">كامري / سوناتا</h4>
              <p className="text-xs text-stone-500">من 120 ر.س / مشوار</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <span className="text-[10px] font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full">عائلية XL</span>
              <h4 className="font-bold text-stone-900 text-sm">جمس يوكون / فان VIP</h4>
              <p className="text-xs text-stone-500">من 280 ر.س / مشوار</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">فاخرة Chauffeur</span>
              <h4 className="font-bold text-stone-900 text-sm">مرسيدس S-Class</h4>
              <p className="text-xs text-stone-500">من 600 ر.س / مشوار</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MAPS, 3D & AR */}
      {activeTab === "maps-3d-ar" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-stone-900">المجسمات ثلاثية الأبعاد 3D والواقع المعزز AR</h3>
                <p className="text-xs text-stone-500 mt-1">استعرض المعالم التراثية في العُلا والدرعية وجدة بنماذج 3D تفاعلية.</p>
              </div>
              <button
                onClick={() => onNavigateView("map-explorer")}
                className="px-4 py-2 bg-emerald-900 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                فتح خريطة التضاريس التفاعلية
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                onClick={() => setActive3DLandmarkModal({ title: "مسرح مرايا بالعُلا", model: "Maraya 3D", desc: "أكبر مبنى مغطى بالمرايا في العالم يقع في وادي عشار." })}
                className="p-4 bg-stone-50 hover:bg-emerald-50 rounded-2xl border border-stone-200 cursor-pointer transition-all space-y-2 group"
              >
                <div className="h-32 rounded-xl bg-stone-200 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&q=80&w=400" alt="Maraya" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-2 right-2 bg-black/60 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">مجسم 3D</span>
                </div>
                <h4 className="font-bold text-sm text-stone-900">مسرح مرايا - العُلا</h4>
                <p className="text-xs text-stone-500">انقر لاستعراض النموذج ثلاثي الأبعاد</p>
              </div>

              <div
                onClick={() => setActive3DLandmarkModal({ title: "حي الطريف التاريخي", model: "At-Turaif 3D", desc: "موقع اليونسكو بمهد الدولة السعودية الأولى بالدرعية." })}
                className="p-4 bg-stone-50 hover:bg-emerald-50 rounded-2xl border border-stone-200 cursor-pointer transition-all space-y-2 group"
              >
                <div className="h-32 rounded-xl bg-stone-200 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=400" alt="Diriyah" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-2 right-2 bg-black/60 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">مجسم 3D</span>
                </div>
                <h4 className="font-bold text-sm text-stone-900">حي الطريف - الدرعية</h4>
                <p className="text-xs text-stone-500">انقر لاستعراض النموذج ثلاثي الأبعاد</p>
              </div>

              <div
                onClick={() => setActive3DLandmarkModal({ title: "رواشين جدة التاريخية", model: "Al-Balad 3D", desc: "المعمار الخشبي الأسطوري في منطقة البلد بجدة." })}
                className="p-4 bg-stone-50 hover:bg-emerald-50 rounded-2xl border border-stone-200 cursor-pointer transition-all space-y-2 group"
              >
                <div className="h-32 rounded-xl bg-stone-200 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1578895210405-907db48a7812?auto=format&fit=crop&q=80&w=400" alt="Jeddah" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-2 right-2 bg-black/60 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">مجسم 3D</span>
                </div>
                <h4 className="font-bold text-sm text-stone-900">جدة التاريخية (البلد)</h4>
                <p className="text-xs text-stone-500">انقر لاستعراض النموذج ثلاثي الأبعاد</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: BOOKINGS & WALLET */}
      {activeTab === "bookings-wallet" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Wallet & Passport Card */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-base text-stone-900 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-800" />
                <span>المحفظة الرقمية والجواز السياحي</span>
              </h3>

              <div className="p-4 bg-emerald-950 text-white rounded-2xl space-y-3">
                <div className="flex justify-between items-center text-xs text-emerald-200">
                  <span>الرصيد المتاح للاسترداد الحقيقي</span>
                  <Shield className="w-4 h-4 text-amber-300" />
                </div>
                <div className="text-3xl font-black text-amber-300">3,800 ر.س</div>
                <div className="text-[11px] text-stone-300">رقم الحساب الرقمي: SA-9048-1120</div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="font-bold text-stone-900">أختام الجواز السياحي الرقمي:</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold rounded-full">✓ ختم العُلا</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold rounded-full">✓ ختم الدرعية</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold rounded-full">✓ ختم جدة البلد</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold rounded-full">✓ ختم رجال ألمع</span>
                </div>
              </div>
            </div>

            {/* Reward Points */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-base text-stone-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>برنامج نقاط المكافآت والمزايا</span>
              </h3>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                <div className="text-2xl font-black text-amber-800">2,450 نقطة</div>
                <p className="text-xs text-stone-600">
                  تؤهلك هذه النقاط للحصول على ليلة إقامة مجانية في الفنادق الشريكة أو خصم 20% على حجز Explorer Ride.
                </p>
              </div>

              <button
                onClick={() => onNavigateView("bookings")}
                className="w-full py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                سجل الرحلات الكامل والتذاكر
              </button>
            </div>

          </div>
        </div>
      )}

      {/* TAB 7: FAVORITES */}
      {activeTab === "favorites" && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-lg font-black text-stone-900">قائمة الوجهات والمعالم المفضلة</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MOCK_DESTINATIONS.filter((d) => favorites.includes(d.id)).map((dest) => (
              <div key={dest.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <img src={dest.heroImage} alt={dest.nameAr} className="w-full h-32 object-cover rounded-xl" />
                <h4 className="font-bold text-sm text-stone-900">{dest.nameAr}</h4>
                <p className="text-xs text-stone-500">{dest.regionAr}</p>
                <button
                  onClick={() => onNavigateView("destinations", dest.id)}
                  className="w-full py-2 bg-emerald-900 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  التفاصيل
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: NOTIFICATIONS */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-lg font-black text-stone-900">الإشعارات والتنبيهات الخاصة بالسائح</h3>
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-stone-900">{n.title}</h4>
                  <p className="text-xs text-stone-600 mt-1">{n.body}</p>
                  <span className="text-[10px] text-stone-400 mt-1 block">{n.time}</span>
                </div>
                {!n.isRead && (
                  <span className="w-2.5 h-2.5 bg-amber-400 rounded-full"></span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: PROFILE & SETTINGS */}
      {activeTab === "profile-settings" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <h3 className="text-lg font-black text-stone-900">تعديل البيانات وإعدادات الحساب</h3>

          {profileSaveSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 font-bold text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>تم حفظ تعديلات البيانات الشخصية والإعدادات بنجاح!</span>
            </div>
          )}

          <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">رقم الهاتف</label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">الجنسية</label>
                <input
                  type="text"
                  value={profileForm.nationality}
                  onChange={(e) => setProfileForm({ ...profileForm, nationality: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200">
              <h4 className="font-bold text-stone-900 text-sm mb-3">تغيير كلمة المرور</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="password"
                  placeholder="كلمة المرور الحالية"
                  className="p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
                <input
                  type="password"
                  placeholder="كلمة المرور الجديدة"
                  className="p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
                <input
                  type="password"
                  placeholder="تأكيد كلمة المرور الجديدة"
                  className="p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                حفظ التعديلات
              </button>

              <button
                type="button"
                onClick={() => onNavigateView("auth")}
                className="px-6 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-xs rounded-xl cursor-pointer flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3D Landmark Viewer Modal */}
      {active3DLandmarkModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 relative">
            <button
              onClick={() => setActive3DLandmarkModal(null)}
              className="absolute top-4 left-4 p-2 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-emerald-950 text-xs font-bold">
              <Box className="w-4 h-4" />
              <span>معاينة مجسم ثلاثي الأبعاد 3D</span>
            </div>
            <h3 className="text-lg font-black text-stone-900">{active3DLandmarkModal.title}</h3>
            <p className="text-xs text-stone-600 leading-relaxed">{active3DLandmarkModal.desc}</p>
            <div className="h-64 rounded-2xl bg-stone-900 flex items-center justify-center text-amber-300 flex-col gap-2 relative overflow-hidden">
              <Box className="w-16 h-16 animate-bounce text-amber-400" />
              <span className="text-xs font-bold">نموذج 3D تفاعلي يعمل بتقنية WebGL</span>
              <span className="text-[10px] text-stone-400">يمكنك التدوير والتكبير بكل اتجاه</span>
            </div>
            <button
              onClick={() => setActive3DLandmarkModal(null)}
              className="w-full py-2.5 bg-emerald-900 text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              إغلاق المعاينة
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
