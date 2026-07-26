import React, { useState } from "react";
import { ViewMode, UserRole } from "../../types";
import { TouristPortalView } from "./TouristPortalView";
import { CitizenPortalView } from "./CitizenPortalView";
import { InvestorPortalView } from "./InvestorPortalView";
import { EstablishmentPortalView } from "./EstablishmentPortalView";
import { ServiceProviderPortalView } from "./ServiceProviderPortalView";
import { MinistryPortalView } from "./MinistryPortalView";
import { SuperAdminPortalView } from "./SuperAdminPortalView";
import { PortalAuthModal } from "../auth/PortalAuthModal";
import {
  Compass,
  UserCheck,
  Briefcase,
  Shield,
  Building,
  Layers,
  Sparkles,
  Settings,
  Calendar,
  MapPin,
  TrendingUp,
  DollarSign,
  Users,
  Award,
  Ticket,
  Wallet,
  Star,
  CheckCircle2,
  Clock,
  PlusCircle,
  FileText,
  AlertTriangle,
  ArrowRight,
  Send,
  Eye,
  Download,
  Search,
  Filter,
  Check,
  X,
  PhoneCall,
  Car,
  LogIn,
  User,
  Lock,
  KeyRound
} from "lucide-react";

interface RolePortalsProps {
  userRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onSelectView: (view: ViewMode, targetId?: string) => void;
}

export const RolePortals: React.FC<RolePortalsProps> = ({
  userRole,
  onSelectRole,
  onSelectView
}) => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [portalUser, setPortalUser] = useState<{ name: string; email: string } | null>(null);

  const handlePortalAuthSuccess = (name: string, email: string) => {
    setPortalUser({ name, email });
  };

  // 1. TOURIST PORTAL
  const renderTouristPortal = () => (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-emerald-950 text-xs font-black mb-3">
            <Compass className="w-4 h-4" />
            <span>بوابة السائح الزائر | Tourist Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">أهلاً بك في أرض المغامرات والتاريخ الأصيل</h2>
          <p className="text-stone-200 text-xs sm:text-sm mt-2 leading-relaxed">
            استعرض حزم رحلاتك المخصصة، تابع رصيد نقاط المكافآت والجواز السياحي، واحجز رحلات Explorer Ride المباشرة.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => onSelectView("ai-assistant")}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black px-5 py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>تخطيط رحلة جديدة بالذكاء الاصطناعي</span>
            </button>
            <button
              onClick={() => onSelectView("map-explorer")}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold px-5 py-2.5 rounded-xl text-xs border border-white/20 backdrop-blur-sm transition-all cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-amber-300" />
              <span>الخريطة والتضاريس</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold mb-2">
            <span>الرحلات المكتملة</span>
            <Ticket className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-stone-900">4 رحلات</div>
          <span className="text-[10px] text-emerald-700 font-bold mt-1 block">العُلا، الدرعية، جدة، السودة</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold mb-2">
            <span>نقاط المكافآت</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">1,850 نقطة</div>
          <span className="text-[10px] text-stone-400 mt-1 block">تؤهلك لخصم 15% على الفنادق</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold mb-2">
            <span>الجواز السياحي الرقمي</span>
            <Shield className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-purple-700">مستوى فضي</div>
          <span className="text-[10px] text-purple-600 font-bold mt-1 block">6 أختام زائر معتمدة</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold mb-2">
            <span>المحفظة الرقمية</span>
            <Wallet className="w-4 h-4 text-emerald-800" />
          </div>
          <div className="text-2xl font-black text-emerald-900">2,400 ر.س</div>
          <span className="text-[10px] text-stone-400 mt-1 block">رصيد الاسترداد المباشر</span>
        </div>
      </div>

      {/* Quick Actions & Upcoming Itineraries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-extrabold text-base text-stone-900">رحلاتي القادمة وجداول الجولات</h3>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">2 حجز مؤكد</span>
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
              <button
                onClick={() => onSelectView("profile")}
                className="px-4 py-2 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                عرض التذكرة
              </button>
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
              <button
                onClick={() => onSelectView("profile")}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                التفاصيل
              </button>
            </div>
          </div>
        </div>

        {/* Explorer Ride Quick Shuttle Booking */}
        <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-3xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-extrabold mb-2">
              <Car className="w-4 h-4" />
              <span>خدمة Explorer Ride</span>
            </div>
            <h3 className="font-extrabold text-lg">حجز مواصلات فورية بين الوجهات</h3>
            <p className="text-stone-300 text-xs mt-2 leading-relaxed">
              احجز سيارة فاخرة مع سائق محترف للتنقل بين مطارات ومعالم المملكة بأسعار موحدة.
            </p>
          </div>
          <button
            onClick={() => onSelectView("services")}
            className="mt-6 w-full py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs rounded-xl transition-all shadow-sm cursor-pointer"
          >
            طلب مركبة Explorer Ride الآن
          </button>
        </div>

      </div>
    </div>
  );

  // 2. CITIZEN PORTAL
  const renderCitizenPortal = () => (
    <div className="space-y-8 animate-in fade-in">
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-emerald-950 text-xs font-black mb-3">
          <UserCheck className="w-4 h-4" />
          <span>بوابة المواطن والمقيم | Citizen & Resident Portal</span>
        </div>
        <h2 className="text-2xl font-extrabold">مرحباً بك في بوابة المشاركة والنمو السياحي الوطني</h2>
        <p className="text-xs sm:text-sm text-stone-200 mt-2">
          ساهم في تطوير السياحة المحلية، قدم مقترحاتك للمناطق، وشارِك في الفعاليات والتطوع الوطني.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* National Feedback & Suggestions Card */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-stone-900 flex items-center gap-2">
            <Send className="w-5 h-5 text-emerald-700" />
            <span>تقديم مقترح أو صوت المواطن للسياحة</span>
          </h3>
          <p className="text-xs text-stone-500">
            أرسل فكرتك لتطوير المعالم أو المرافق في منطقتك مباشرة لوزارة السياحة والجهات المختصة.
          </p>

          {isSubmitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>تم استلام مقترحك الوطني بنجاح! شكراً لمساهمتك.</span>
            </div>
          ) : (
            <div className="space-y-3">
              <textarea
                rows={3}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="اكتب مقترحك هنا (مثال: اقتراح إضافة مسار مشاة ترفيهي في وادي حنيفة)..."
                className="w-full p-3 rounded-2xl border border-stone-300 text-xs focus:outline-none focus:border-emerald-700"
              />
              <button
                onClick={() => {
                  if (feedbackText) setIsSubmitted(true);
                }}
                className="w-full py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                إرسال المقترح الوطني
              </button>
            </div>
          )}
        </div>

        {/* Local Events & Volunteering */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-stone-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-700" />
            <span>فرص التطوع والأنشطة الإقليمية</span>
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-stone-900">مبادرة تنظيم موسم الرياض 2026</div>
                <div className="text-stone-500 text-[11px]">30 ساعة تطوعية معتمدة</div>
              </div>
              <button className="px-3 py-1.5 bg-emerald-900 text-white font-bold rounded-lg cursor-pointer">
                انضمام
              </button>
            </div>

            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-stone-900">سفراء التراث العسيري في أبها</div>
                <div className="text-stone-500 text-[11px]">إرشاد زوار المهرجان الجبلي</div>
              </div>
              <button className="px-3 py-1.5 bg-emerald-900 text-white font-bold rounded-lg cursor-pointer">
                انضمام
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  // 3. INVESTOR PORTAL
  const renderInvestorPortal = () => (
    <div className="space-y-8 animate-in fade-in">
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-emerald-950 text-xs font-black mb-3">
          <Briefcase className="w-4 h-4" />
          <span>بوابة المستثمر السياحي | Investor Portal</span>
        </div>
        <h2 className="text-2xl font-extrabold">الفرص الاستثمارية الكبرى في قطاع السياحة السعودي</h2>
        <p className="text-xs sm:text-sm text-stone-200 mt-2">
          استكشف المشاريع الاستثمارية الواعدة بمتوسط عائد ROI يتراوح بين 14% و 22% بدعم من رؤية 2030.
        </p>
      </div>

      {/* Investment Opportunities Catalogue */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
              قطاع الضيافة والمنتجعات
            </span>
            <h4 className="font-extrabold text-base text-stone-900 mt-2">منتجع صحراوي بيئي فاخر في العُلا</h4>
            <div className="space-y-1 mt-3 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>القيمة المقدرة:</span>
                <span className="font-bold text-stone-900">120,000,000 ر.س</span>
              </div>
              <div className="flex justify-between">
                <span>العائد المتوقع ROI:</span>
                <span className="font-bold text-emerald-700">18.5% سنوياً</span>
              </div>
            </div>
          </div>
          <button className="w-full py-2.5 bg-emerald-900 text-white font-bold text-xs rounded-xl hover:bg-emerald-950 cursor-pointer">
            تحميل كراسة الشروط والدراسة
          </button>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
              السياحة الشاطئية البحرية
            </span>
            <h4 className="font-extrabold text-base text-stone-900 mt-2">نادي يخوت ومارينا عالمي في جدة</h4>
            <div className="space-y-1 mt-3 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>القيمة المقدرة:</span>
                <span className="font-bold text-stone-900">250,000,000 ر.س</span>
              </div>
              <div className="flex justify-between">
                <span>العائد المتوقع ROI:</span>
                <span className="font-bold text-emerald-700">21.0% سنوياً</span>
              </div>
            </div>
          </div>
          <button className="w-full py-2.5 bg-emerald-900 text-white font-bold text-xs rounded-xl hover:bg-emerald-950 cursor-pointer">
            تحميل كراسة الشروط والدراسة
          </button>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
              السياحة الجبلية والأدرينالين
            </span>
            <h4 className="font-extrabold text-base text-stone-900 mt-2">مجمع تلفريك ومغامرات السودة</h4>
            <div className="space-y-1 mt-3 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>القيمة المقدرة:</span>
                <span className="font-bold text-stone-900">85,000,000 ر.س</span>
              </div>
              <div className="flex justify-between">
                <span>العائد المتوقع ROI:</span>
                <span className="font-bold text-emerald-700">16.2% سنوياً</span>
              </div>
            </div>
          </div>
          <button className="w-full py-2.5 bg-emerald-900 text-white font-bold text-xs rounded-xl hover:bg-emerald-950 cursor-pointer">
            تحميل كراسة الشروط والدراسة
          </button>
        </div>
      </div>
    </div>
  );

  // 4. TOUR GUIDE PORTAL
  const renderTourGuidePortal = () => (
    <div className="space-y-8 animate-in fade-in">
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-emerald-950 text-xs font-black mb-3">
          <Shield className="w-4 h-4" />
          <span>بوابة المرشد السياحي المعتمد | Tour Guide Portal</span>
        </div>
        <h2 className="text-2xl font-extrabold">إدارة الجولات وطلبات السيّاح المباشرة</h2>
        <p className="text-xs sm:text-sm text-stone-200 mt-2">
          رقم الرخصة المعتمدة: <span className="font-bold text-amber-300">TG-2026-8841</span> | تقييم الزوار: 4.9 ★
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
        <h3 className="font-extrabold text-base text-stone-900">طلبات الحجز المباشرة القادمة من السيّاح</h3>
        <div className="space-y-3 text-xs">
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="font-bold text-stone-900 text-sm">جولة خاصة في حي الطريف التاريخي بالدرعية</div>
              <p className="text-stone-500 mt-0.5">عائلة زائرة من فرنسا (4 أشخاص) | 18 نوفمبر 2026</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-emerald-900 text-white font-bold rounded-xl cursor-pointer">
                قبول الجولة
              </button>
              <button className="px-4 py-2 bg-stone-200 text-stone-700 font-bold rounded-xl cursor-pointer">
                تعديل الموعد
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 5. ESTABLISHMENT PORTAL
  const renderEstablishmentPortal = () => (
    <div className="space-y-8 animate-in fade-in">
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-emerald-950 text-xs font-black mb-3">
          <Building className="w-4 h-4" />
          <span>بوابة المنشأة السياحية | Establishment Portal</span>
        </div>
        <h2 className="text-2xl font-extrabold">إدارة الفنادق، المنتجعات والمطاعم</h2>
        <p className="text-xs sm:text-sm text-stone-200 mt-2">
          متابعة الإشغال اليومي، توفر الغرف، العروض الموسمية، وتقييمات العملاء المباشرة.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200">
          <div className="text-xs text-stone-500 font-semibold">نسبة الإشغال الحالية</div>
          <div className="text-3xl font-black text-emerald-900 mt-1">92%</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-stone-200">
          <div className="text-xs text-stone-500 font-semibold">إجمالي الحجوزات هذا الشهر</div>
          <div className="text-3xl font-black text-stone-900 mt-1">348 حجز</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-stone-200">
          <div className="text-xs text-stone-500 font-semibold">متوسط التقييم العام</div>
          <div className="text-3xl font-black text-amber-500 mt-1">4.8 / 5.0</div>
        </div>
      </div>
    </div>
  );

  // 6. SERVICE PROVIDER PORTAL
  const renderServiceProviderPortal = () => (
    <div className="space-y-8 animate-in fade-in">
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-emerald-950 text-xs font-black mb-3">
          <Layers className="w-4 h-4" />
          <span>بوابة مزود الخدمات ذو العلاقة | Service Provider Portal</span>
        </div>
        <h2 className="text-2xl font-extrabold">القطاعات المساندة للسياحة الوطنية</h2>
        <p className="text-xs sm:text-sm text-stone-200 mt-2">
          إدارة حافلات النقل، تأجير السيارات، خدمات الترجمة، شركات التأمين والفعاليات اللوجستية.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-stone-200 space-y-4">
        <h3 className="font-extrabold text-base text-stone-900">طلبات التزويد والتنفيذ النشطة</h3>
        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-2">
          <div className="font-bold text-stone-900">تأمين 10 حافلات فاخرة لنقل وفد سياحي دولي بالرياض</div>
          <div className="text-stone-500">حالة الطلب: قيد التنفيذ | التاريخ: 20-25 نوفمبر 2026</div>
        </div>
      </div>
    </div>
  );

  // 7. MINISTRY PORTAL
  const renderMinistryPortal = () => (
    <div className="space-y-8 animate-in fade-in">
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-emerald-950 text-xs font-black mb-3">
          <Sparkles className="w-4 h-4" />
          <span>بوابة وزارة السياحة والرقابة الوطنية | Ministry of Tourism</span>
        </div>
        <h2 className="text-2xl font-extrabold">لوحة القيادة الوطنية ومؤشرات الأداء السياحي KPI</h2>
        <p className="text-xs sm:text-sm text-stone-200 mt-2">
          متابعة التدفق السياحي، تراخيص المنشآت، الخرائط الحرارية، والأرقام القياسية للمملكة.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200">
          <div className="text-xs text-stone-500 font-bold">عدد الزوار السياح هذا العام</div>
          <div className="text-2xl font-black text-emerald-900 mt-1">28,450,000</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-stone-200">
          <div className="text-xs text-stone-500 font-bold">الإنفاق السياحي الإجمالي</div>
          <div className="text-2xl font-black text-stone-900 mt-1">112 مليار ر.س</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-stone-200">
          <div className="text-xs text-stone-500 font-bold">المنشآت المعتمدة</div>
          <div className="text-2xl font-black text-emerald-800 mt-1">14,200 منشأة</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-stone-200">
          <div className="text-xs text-stone-500 font-bold">المرشدون المرخصون</div>
          <div className="text-2xl font-black text-purple-700 mt-1">5,800 مرشد</div>
        </div>
      </div>
    </div>
  );

  // 8. SUPER ADMIN PORTAL
  const renderSuperAdminPortal = () => (
    <div className="space-y-8 animate-in fade-in">
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-emerald-950 text-xs font-black mb-3">
          <Settings className="w-4 h-4" />
          <span>بوابة مدير النظام والإشراف الفني | Super Admin</span>
        </div>
        <h2 className="text-2xl font-extrabold">إدارة الصلاحيات، الأنظمة، والأمن السيبراني</h2>
        <p className="text-xs sm:text-sm text-stone-200 mt-2">
          متابعة استقرار المنصة، النسخ الاحتياطي، وحالة التكامل مع البوابات الحكومية.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-stone-200 space-y-4">
        <h3 className="font-extrabold text-base text-stone-900">حالة الخوادم والأنظمة الموحدة</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
          <div className="p-3 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200 flex items-center justify-between">
            <span>محرك AI & Gemini</span>
            <span className="text-emerald-700">سليم 100%</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200 flex items-center justify-between">
            <span>بوابة eVisa الموحدة</span>
            <span className="text-emerald-700">سليم 100%</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200 flex items-center justify-between">
            <span>الأمن السيبراني والحماية</span>
            <span className="text-emerald-700">محمي وعالي الأمان</span>
          </div>
        </div>
      </div>
    </div>
  );

  const getPortalContent = () => {
    switch (userRole) {
      case "tourist":
        return <TouristPortalView language="ar" onNavigateView={onSelectView} />;
      case "citizen":
        return <CitizenPortalView language="ar" onNavigateView={onSelectView} />;
      case "investor":
        return <InvestorPortalView language="ar" onNavigateView={onSelectView} />;
      case "tour-guide":
        return renderTourGuidePortal();
      case "establishment":
        return <EstablishmentPortalView language="ar" onNavigateView={onSelectView} />;
      case "service-provider":
        return <ServiceProviderPortalView language="ar" onNavigateView={onSelectView} />;
      case "tourism-ministry":
        return <MinistryPortalView language="ar" onNavigateView={onSelectView} />;
      case "super-admin":
        return <SuperAdminPortalView language="ar" onNavigateView={onSelectView} />;
      default:
        return <TouristPortalView language="ar" onNavigateView={onSelectView} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Quick Role Switcher Bar + Portal Authentication Trigger */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Left: Role Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-extrabold text-stone-500 whitespace-nowrap px-1">
            تبديل البوابة الوطنية:
          </span>
          <div className="flex items-center gap-1.5 min-w-max">
            {(["tourist", "citizen", "investor", "tour-guide", "establishment", "service-provider", "tourism-ministry", "super-admin"] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => onSelectRole(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer capitalize ${
                  userRole === r
                    ? "bg-emerald-900 text-white shadow-2xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Portal Login / Account Button */}
        <div className="flex items-center justify-end gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-100">
          {portalUser ? (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
              <User className="w-4 h-4 text-emerald-800" />
              <span className="font-bold text-emerald-950">{portalUser.name}</span>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-[10px] font-bold text-emerald-700 hover:underline mr-1 cursor-pointer"
              >
                (تغيير / دخول)
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-black rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-amber-300" />
              <span>تسجيل الدخول / إنشاء حساب للبوابة</span>
            </button>
          )}
        </div>
      </div>

      {/* Render Selected Role Portal */}
      {getPortalContent()}

      {/* Portal Auth Modal */}
      <PortalAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        portalRole={userRole}
        onAuthSuccess={handlePortalAuthSuccess}
      />

    </div>
  );
};
