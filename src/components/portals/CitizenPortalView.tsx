import React, { useState } from "react";
import { LanguageCode, ViewMode } from "../../types";
import { MOCK_DESTINATIONS } from "../../data/mockData";
import {
  UserCheck,
  Send,
  AlertTriangle,
  Users,
  MapPin,
  Calendar,
  Star,
  CheckCircle2,
  Clock,
  Search,
  Bell,
  Heart,
  Settings,
  MessageSquare,
  Newspaper,
  Award,
  ChevronRight,
  Sparkles,
  LogOut,
  Upload,
  ThumbsUp,
  Share2,
  Filter,
  Check,
  Building,
  ShieldAlert
} from "lucide-react";

interface CitizenPortalViewProps {
  language: LanguageCode;
  onNavigateView: (view: ViewMode, targetId?: string) => void;
}

export const CitizenPortalView: React.FC<CitizenPortalViewProps> = ({
  language,
  onNavigateView
}) => {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "explore" | "community-volunteering" | "suggest-site" | "report-issue" | "ratings-news" | "favorites" | "notifications" | "profile-settings"
  >("dashboard");

  // Filter for Explore
  const [exploreFilter, setExploreFilter] = useState<"all" | "cities" | "landmarks" | "events" | "activities" | "nearby">("all");

  // Submitted Site Proposals State
  const [proposals, setProposals] = useState([
    {
      id: "prop-101",
      title: "تطوير مسار مشاة ومطل ضفاف وادي حنيفة",
      location: "الرياض",
      category: "منتزهات وبيئة",
      date: "2026-07-20",
      status: "قيد الدراسة الفنية",
      statusColor: "bg-amber-100 text-amber-900"
    },
    {
      id: "prop-102",
      title: "ترميم سوق القيصرية التراثي بالهفوف",
      location: "الأحساء",
      category: "تراث وثقافة",
      date: "2026-06-15",
      status: "مقبول ومجدول للتنفيذ",
      statusColor: "bg-emerald-100 text-emerald-900"
    }
  ]);

  // Suggest Form State
  const [suggestForm, setSuggestForm] = useState({
    title: "",
    city: "الرياض",
    category: "تراث وثقافة",
    description: "",
    photoUrl: ""
  });
  const [suggestSuccess, setSuggestSuccess] = useState(false);

  // Reported Issues State
  const [issues, setIssues] = useState([
    {
      id: "iss-501",
      title: "صيانة اللوحات الإرشادية في مطل جبل الذرة",
      location: "أبها",
      severity: "متوسطة",
      date: "2026-07-24",
      status: "تمت المعالجة",
      statusColor: "bg-emerald-100 text-emerald-900"
    }
  ]);

  // Report Form State
  const [reportForm, setReportForm] = useState({
    title: "",
    location: "جدة - البلد",
    type: "نظافة وصيانة مرافق",
    severity: "عادية",
    details: ""
  });
  const [reportSuccess, setReportSuccess] = useState(false);

  // Notifications
  const [notifications] = useState([
    { id: "1", title: "موافقة على فرصة تطوع", body: "تم قبولك سفيرًا للتراث العسيري في أبها (30 ساعة تطوعية معتمدة).", time: "أمس", isRead: false },
    { id: "2", title: "تحديث المقترح الوطني", body: "تم نقل مقترحك لتطوير وادي حنيفة للجنة الهيئة السكنية.", time: "منذ 3 أيام", isRead: true }
  ]);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(["riyadh-diriyah", "abha-asir"]);

  // Profile
  const [profileForm, setProfileForm] = useState({
    name: "م. فيصل بن طارق الماجد",
    email: "faisal.citizen@example.sa",
    phone: "+966 55 444 3322",
    nationalId: "1088776655",
    city: "الرياض"
  });
  const [profileSaved, setProfileSaved] = useState(false);

  const handleSuggestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestForm.title.trim()) return;

    const newProp = {
      id: `prop-${Math.floor(100 + Math.random() * 900)}`,
      title: suggestForm.title,
      location: suggestForm.city,
      category: suggestForm.category,
      date: new Date().toISOString().split("T")[0],
      status: "قيد الدراسة الفنية",
      statusColor: "bg-amber-100 text-amber-900"
    };

    setProposals([newProp, ...proposals]);
    setSuggestSuccess(true);
    setTimeout(() => {
      setSuggestSuccess(false);
      setSuggestForm({ title: "", city: "الرياض", category: "تراث وثقافة", description: "", photoUrl: "" });
    }, 2500);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportForm.title.trim()) return;

    const newIss = {
      id: `iss-${Math.floor(500 + Math.random() * 900)}`,
      title: reportForm.title,
      location: reportForm.location,
      severity: reportForm.severity,
      date: new Date().toISOString().split("T")[0],
      status: "قيد المراجعة والمتابعة",
      statusColor: "bg-amber-100 text-amber-900"
    };

    setIssues([newIss, ...issues]);
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setReportForm({ title: "", location: "جدة - البلد", type: "نظافة وصيانة مرافق", severity: "عادية", details: "" });
    }, 2500);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-emerald-950 font-black text-xs px-3.5 py-1 rounded-full shadow-sm">
            <UserCheck className="w-4 h-4" />
            <span>بوابة المواطن والمقيم | Citizen Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">مرحباً بك، {profileForm.name}</h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
            منصتك الوطنية للمشاركة المجتمعية، اقتراح تطوير المواقع السياحية، التطوع المحلي، والإبلاغ المباشر عن جودة الخدمات.
          </p>
        </div>

        <button
          onClick={() => setActiveTab("notifications")}
          className="relative p-2.5 bg-emerald-900 hover:bg-emerald-800 text-amber-300 rounded-xl border border-amber-400/30 cursor-pointer shadow-md transition-all"
        >
          <Bell className="w-5 h-5" />
          {notifications.filter((n) => !n.isRead).length > 0 && (
            <span className="absolute -top-1 -left-1 bg-amber-400 text-emerald-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-emerald-950">
              {notifications.filter((n) => !n.isRead).length}
            </span>
          )}
        </button>
      </div>

      {/* Navigation Sub-Sidebar / Tab Ribbon */}
      <div className="bg-white p-2 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: "dashboard", label: "لوحة التحكم", icon: UserCheck },
          { id: "explore", label: "استكشف والأماكن القريبة", icon: MapPin },
          { id: "community-volunteering", label: "التطوع والمبادرات", icon: Users },
          { id: "suggest-site", label: "اقتراح تطوير موقع", icon: Send, badge: proposals.length },
          { id: "report-issue", label: "الإبلاغ عن مشكلة", icon: AlertTriangle, badge: issues.length },
          { id: "ratings-news", label: "التقييمات والأخبار", icon: Newspaper },
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="text-xs text-stone-500 font-semibold mb-1">المقترحات المقدمة</div>
              <div className="text-2xl font-black text-emerald-900">{proposals.length} مقترحات</div>
              <span className="text-[10px] text-emerald-700 font-bold mt-1 block">1 مقبول ومجدول</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="text-xs text-stone-500 font-semibold mb-1">ساعات التطوع المعتمدة</div>
              <div className="text-2xl font-black text-amber-600">45 ساعة</div>
              <span className="text-[10px] text-stone-400 mt-1 block">شهادة تطوع رقمية موثقة</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="text-xs text-stone-500 font-semibold mb-1">البلاغات المعالجة</div>
              <div className="text-2xl font-black text-purple-700">100% نسبة معالجة</div>
              <span className="text-[10px] text-purple-600 font-bold mt-1 block">تم إصلاح البلاغات</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="text-xs text-stone-500 font-semibold mb-1">خصومات المواطن</div>
              <div className="text-2xl font-black text-emerald-800">مفعلة 15%</div>
              <span className="text-[10px] text-stone-400 mt-1 block">على الفنادق والرحلات</span>
            </div>
          </div>

          {/* Quick Action Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-base text-stone-900 flex items-center justify-between">
                <span>مقترحات التطوير الأخيرة</span>
                <button
                  onClick={() => setActiveTab("suggest-site")}
                  className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
                >
                  + تقديم مقترح جديد
                </button>
              </h3>

              <div className="space-y-3">
                {proposals.map((p) => (
                  <div key={p.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-bold text-stone-900">{p.title}</h4>
                      <p className="text-stone-500 mt-0.5">{p.location} | {p.category}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${p.statusColor}`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-base text-stone-900 flex items-center justify-between">
                <span>فرص التطوع الوطنية المتاحة</span>
                <button
                  onClick={() => setActiveTab("community-volunteering")}
                  className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
                >
                  استعراض الكل
                </button>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-stone-900">سفراء التراث العسيري بالدير</h4>
                    <p className="text-stone-500">30 ساعة معتمدة | أبها والسودة</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("community-volunteering")}
                    className="px-3 py-1.5 bg-emerald-900 text-white font-bold rounded-lg cursor-pointer"
                  >
                    تقديم
                  </button>
                </div>

                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-stone-900">منظمو موسم الرياض 2026</h4>
                    <p className="text-stone-500">50 ساعة معتمدة | بوليفارد الرياض</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("community-volunteering")}
                    className="px-3 py-1.5 bg-emerald-900 text-white font-bold rounded-lg cursor-pointer"
                  >
                    تقديم
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: EXPLORE & NEARBY */}
      {activeTab === "explore" && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: "all", label: "الكل" },
              { id: "cities", label: "المدن" },
              { id: "landmarks", label: "المعالم" },
              { id: "events", label: "الفعاليات المحلية" },
              { id: "activities", label: "الأنشطة" },
              { id: "nearby", label: "الأماكن القريبة مني" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setExploreFilter(f.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                  exploreFilter === f.id
                    ? "bg-emerald-900 text-white shadow-xs"
                    : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {MOCK_DESTINATIONS.map((dest) => (
              <div key={dest.id} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
                <img src={dest.heroImage} alt={dest.nameAr} className="w-full h-44 object-cover" />
                <div className="p-5 space-y-2">
                  <h3 className="font-black text-stone-900 text-base">{dest.nameAr}</h3>
                  <p className="text-xs text-stone-500">{dest.taglineAr}</p>
                  <button
                    onClick={() => onNavigateView("destinations", dest.id)}
                    className="w-full mt-2 py-2 bg-emerald-900 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    استكشاف
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: COMMUNITY & VOLUNTEERING */}
      {activeTab === "community-volunteering" && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 text-amber-900 rounded-2xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-900">المبادرات السياحية والعمل التطوعي الوطني</h2>
              <p className="text-xs text-stone-500 mt-1">شارِك كمتطوع معتمد وساهم في خدمة ضيوف الرحمن والسياح بالجمعيات والمواسم.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 font-bold rounded-full text-[10px]">مبادرة معتمدة</span>
              <h4 className="font-black text-stone-900 text-sm">سفراء التراث الوطني في حي الطريف بالدرعية</h4>
              <p className="text-stone-600 leading-relaxed">استقبال الوفود الزائرة، توفير الشرح التاريخي وتوجيه السياح داخل أرجاء الطريف.</p>
              <div className="flex items-center justify-between font-bold pt-2 border-t border-stone-200 text-stone-500">
                <span>35 ساعة معتمدة</span>
                <button className="px-4 py-2 bg-emerald-900 text-white rounded-xl cursor-pointer">التسجيل المباشر</button>
              </div>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 font-bold rounded-full text-[10px]">مبادرة معتمدة</span>
              <h4 className="font-black text-stone-900 text-sm">مرشدو الطبيعة في جبال أبها والسودة</h4>
              <p className="text-stone-600 leading-relaxed">توجيه هواة المشي الجبلي والمسارات السياحية ورفع وعي النظافة البيئية.</p>
              <div className="flex items-center justify-between font-bold pt-2 border-t border-stone-200 text-stone-500">
                <span>40 ساعة معتمدة</span>
                <button className="px-4 py-2 bg-emerald-900 text-white rounded-xl cursor-pointer">التسجيل المباشر</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SUGGEST SITE DEVELOPMENT */}
      {activeTab === "suggest-site" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-2xl">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-900">اقتراح تطوير موقع أو معلم سياحي</h2>
              <p className="text-xs text-stone-500 mt-1">صوتك مسموع! شاركنا أفكارك لتطوير التجهيزات والمرافق في منطقتك.</p>
            </div>
          </div>

          {suggestSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 font-bold text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>تم إرسال المقترح الوطني بنجاح وسيتم إشعاراتكم بالنتيجة!</span>
            </div>
          )}

          <form onSubmit={handleSuggestSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">عنوان المقترح</label>
                <input
                  type="text"
                  required
                  value={suggestForm.title}
                  onChange={(e) => setSuggestForm({ ...suggestForm, title: e.target.value })}
                  placeholder="مثال: إنشاء مسار دراجات ومطاعم في الكورنيش"
                  className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">المدينة / المنطقة</label>
                <select
                  value={suggestForm.city}
                  onChange={(e) => setSuggestForm({ ...suggestForm, city: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                >
                  <option value="الرياض">الرياض</option>
                  <option value="العُلا">العُلا</option>
                  <option value="جدة">جدة</option>
                  <option value="أبها">أبها</option>
                  <option value="الأحساء">الأحساء</option>
                  <option value="تبوك">تبوك</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">تفاصيل المقترح والرؤية المرجوة</label>
              <textarea
                rows={4}
                required
                value={suggestForm.description}
                onChange={(e) => setSuggestForm({ ...suggestForm, description: e.target.value })}
                placeholder="اشرح الأثر السياحي المتوقع وكيف سيخدم الأهالي والزوار..."
                className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-xs rounded-xl cursor-pointer"
            >
              إرسال المقترح للهيئة
            </button>
          </form>
        </div>
      )}

      {/* TAB 5: REPORT AN ISSUE */}
      {activeTab === "report-issue" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-rose-100 text-rose-900 rounded-2xl">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-900">الإبلاغ عن مشكلة أو ملاحظة في المرافق السياحية</h2>
              <p className="text-xs text-stone-500 mt-1">ساعدنا بالحفاظ على جودة ونظافة وأمان الوجهات السياحية في المملكة.</p>
            </div>
          </div>

          {reportSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 font-bold text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>تم رفع البلاغ بنجاح وتمريره للفرق الميدانية للمتابعة والمعالجة.</span>
            </div>
          )}

          <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">عنوان الملاحظة</label>
                <input
                  type="text"
                  required
                  value={reportForm.title}
                  onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                  placeholder="مثال: صيانة إضاءة المسار التراثي"
                  className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">الموقع المباشر</label>
                <input
                  type="text"
                  required
                  value={reportForm.location}
                  onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">تفاصيل الملاحظة</label>
              <textarea
                rows={3}
                required
                value={reportForm.details}
                onChange={(e) => setReportForm({ ...reportForm, details: e.target.value })}
                placeholder="اكتب وصفاً مختصراً للملاحظة لتسهيل معالجتها بسرعة..."
                className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl cursor-pointer"
            >
              رفع البلاغ المباشر
            </button>
          </form>
        </div>
      )}

      {/* TAB 6: RATINGS & NEWS */}
      {activeTab === "ratings-news" && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-6">
          <h2 className="text-xl font-black text-stone-900">الأخبار السياحية الوطنية والعروض الحصرية للمواطن</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 font-bold rounded-full text-[10px]">خبر عاجل</span>
              <h4 className="font-bold text-stone-900 text-sm">وزارة السياحة تعلن وصول 100 مليون زائر سياحي قبل موعد الرؤية</h4>
              <p className="text-stone-500">تسجيل أرقام قياسية تاريخية في الإشغال والانفاق السياحي بكافة مناطق المملكة.</p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 font-bold rounded-full text-[10px]">عرض المواطن</span>
              <h4 className="font-bold text-emerald-950 text-sm">خصم 20% على الطيران الداخلي والفنادق الوطنية</h4>
              <p className="text-stone-600">عرض استثنائي لحاملي الهوية الوطنية عند الحجز عبر منصة SAUDI EXPLORER AI.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: FAVORITES */}
      {activeTab === "favorites" && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-lg font-black text-stone-900">الأماكن والمبادرات المفضلة</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_DESTINATIONS.filter((d) => favorites.includes(d.id)).map((dest) => (
              <div key={dest.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm text-stone-900">{dest.nameAr}</h4>
                  <p className="text-xs text-stone-500">{dest.regionAr}</p>
                </div>
                <button
                  onClick={() => onNavigateView("destinations", dest.id)}
                  className="px-3 py-1.5 bg-emerald-900 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  عرض
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: NOTIFICATIONS */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-lg font-black text-stone-900">الإشعارات والتحديثات</h3>
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-stone-900">{n.title}</h4>
                  <p className="text-xs text-stone-600 mt-1">{n.body}</p>
                  <span className="text-[10px] text-stone-400 mt-1 block">{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: PROFILE & SETTINGS */}
      {activeTab === "profile-settings" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <h3 className="text-lg font-black text-stone-900">إعدادات ملف المواطن والمقيم</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setProfileSaved(true);
              setTimeout(() => setProfileSaved(false), 3000);
            }}
            className="space-y-4 text-xs"
          >
            {profileSaved && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 font-bold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span>تم تحديث بيانات ملف المواطن بنجاح!</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">الاسم بالكامل</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">رقم الهوية الوطنية / الإقامة</label>
                <input
                  type="text"
                  value={profileForm.nationalId}
                  onChange={(e) => setProfileForm({ ...profileForm, nationalId: e.target.value })}
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
                <label className="font-bold text-stone-700 block mb-1">رقم الجوال</label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-between items-center">
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-900 text-white font-extrabold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                حفظ التعديلات
              </button>

              <button
                type="button"
                onClick={() => onNavigateView("auth")}
                className="px-6 py-3 bg-rose-50 text-rose-700 font-extrabold text-xs rounded-xl cursor-pointer flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
