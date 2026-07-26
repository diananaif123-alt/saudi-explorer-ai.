import React, { useState } from "react";
import { LanguageCode, ViewMode } from "../../types";
import {
  MINISTRY_KPIS,
  MOCK_MANAGED_CITIES,
  MOCK_MANAGED_LANDMARKS,
  MOCK_MANAGED_EVENTS,
  MOCK_SYSTEM_USERS,
  MOCK_CMS_ARTICLES,
  ManagedCity,
  ManagedLandmark,
  ManagedEvent,
  SystemUser,
  CMSContentItem,
  MinistryKPI
} from "../../data/phase7Data";
import {
  Building2,
  Building,
  Landmark as LandmarkIcon,
  MapPin,
  Users,
  Calendar,
  Briefcase,
  TrendingUp,
  Award,
  BarChart3,
  PieChart,
  Map,
  PlusCircle,
  Edit3,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Bell,
  Send,
  FileText,
  Image as ImageIcon,
  HelpCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Compass,
  ArrowUpRight,
  X,
  Eye,
  Sliders,
  Layers,
  Activity
} from "lucide-react";

interface MinistryPortalViewProps {
  language: LanguageCode;
  onNavigateView: (view: ViewMode, targetId?: string) => void;
}

export const MinistryPortalView: React.FC<MinistryPortalViewProps> = ({
  language,
  onNavigateView
}) => {
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "map"
    | "cities"
    | "landmarks"
    | "events"
    | "users"
    | "reports"
    | "cms"
    | "notifications"
  >("overview");

  // State Datasets
  const [cities, setCities] = useState<ManagedCity[]>(MOCK_MANAGED_CITIES);
  const [landmarks, setLandmarks] = useState<ManagedLandmark[]>(MOCK_MANAGED_LANDMARKS);
  const [events, setEvents] = useState<ManagedEvent[]>(MOCK_MANAGED_EVENTS);
  const [users, setUsers] = useState<SystemUser[]>(MOCK_SYSTEM_USERS);
  const [cmsArticles, setCmsArticles] = useState<CMSContentItem[]>(MOCK_CMS_ARTICLES);

  // Map Filter State
  const [activeMapLayer, setActiveMapLayer] = useState<
    "tourists" | "events" | "establishments" | "investments" | "services"
  >("tourists");
  const [selectedMapRegion, setSelectedMapRegion] = useState<string>("riyadh");

  // Search & Filter States
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [citySearchQuery, setCitySearchQuery] = useState("");

  // Modals
  const [isAddCityModalOpen, setIsAddCityModalOpen] = useState(false);
  const [newCityName, setNewCityName] = useState("");
  const [newCityRegion, setNewCityRegion] = useState("منطقة الرياض");
  const [newCityDesc, setNewCityDesc] = useState("");

  const [isAddLandmarkModalOpen, setIsAddLandmarkModalOpen] = useState(false);
  const [newLandmarkName, setNewLandmarkName] = useState("");
  const [newLandmarkCity, setNewLandmarkCity] = useState("الرياض والدرعية");
  const [newLandmarkCategory, setNewLandmarkCategory] = useState<any>("تاريخي");

  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventCity, setNewEventCity] = useState("الرياض والدرعية");

  const [isSendNotificationModalOpen, setIsSendNotificationModalOpen] = useState(false);
  const [notifTarget, setNotifTarget] = useState("all");
  const [notifTitle, setNotifTitle] = useState("");
  const [notifBody, setNotifBody] = useState("");
  const [notifSentMsg, setNotifSentMsg] = useState(false);

  // User Actions
  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "active" ? "suspended" : "active" }
          : u
      )
    );
  };

  // Add City Handler
  const handleAddCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityName.trim()) return;

    const newC: ManagedCity = {
      id: `city-${Math.floor(100 + Math.random() * 900)}`,
      nameAr: newCityName,
      nameEn: "New Destination",
      regionAr: newCityRegion,
      visitorsCount: "50,000 زائر",
      establishmentsCount: 12,
      landmarksCount: 4,
      eventsCount: 2,
      descriptionAr: newCityDesc || "مدينة سياحية جديدة مضافة حديثاً لسجلات وزارة السياحة.",
      image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=800",
      status: "active"
    };

    setCities((prev) => [newC, ...prev]);
    setIsAddCityModalOpen(false);
    setNewCityName("");
    setNewCityDesc("");
  };

  // Add Landmark Handler
  const handleAddLandmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLandmarkName.trim()) return;

    const newLm: ManagedLandmark = {
      id: `lm-${Math.floor(100 + Math.random() * 900)}`,
      nameAr: newLandmarkName,
      cityAr: newLandmarkCity,
      categoryAr: newLandmarkCategory,
      rating: 4.8,
      annualVisitors: "150,000",
      displayOrder: landmarks.length + 1,
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600",
      status: "published"
    };

    setLandmarks((prev) => [newLm, ...prev]);
    setIsAddLandmarkModalOpen(false);
    setNewLandmarkName("");
  };

  // Add Event Handler
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const newEv: ManagedEvent = {
      id: `ev-${Math.floor(100 + Math.random() * 900)}`,
      titleAr: newEventTitle,
      cityAr: newEventCity,
      startDate: "2026-09-01",
      endDate: "2026-09-15",
      categoryAr: "مهرجان",
      attendeesCount: "80,000",
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600"
    };

    setEvents((prev) => [newEv, ...prev]);
    setIsAddEventModalOpen(false);
    setNewEventTitle("");
  };

  // Send Notification Handler
  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle.trim()) return;

    setNotifSentMsg(true);
    setTimeout(() => {
      setNotifSentMsg(false);
      setIsSendNotificationModalOpen(false);
      setNotifTitle("");
      setNotifBody("");
    }, 1500);
  };

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const matchRole = userRoleFilter === "all" || u.role === userRoleFilter;
    const matchQuery =
      u.nameAr.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.cityAr.toLowerCase().includes(userSearchQuery.toLowerCase());
    return matchRole && matchQuery;
  });

  return (
    <div className="min-h-screen bg-stone-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in">
      
      {/* Header Banner - Ministry Branding */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-right">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-emerald-950 font-black text-xs px-3.5 py-1 rounded-full">
            <Building className="w-4 h-4" />
            <span>وزارة السياحة - بوابة التنظيم والإشراف المباشر | Ministry of Tourism</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            لوحة القيادة والمؤشرات الوطنية للقطاع السياحي
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            الإشراف الشامل على المدن، المعالم، الفعاليات، المرخصين والمستثمرين لضمان إثراء تجربة زوار المملكة وتحقيق أهداف رؤية 2030.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSendNotificationModalOpen(true)}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black rounded-2xl text-xs flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Send className="w-4 h-4" />
            <span>بث إشعار رسمي للمستخدمين</span>
          </button>
        </div>
      </div>

      {/* Portal Navigation Bar */}
      <div className="bg-white p-2 rounded-2xl border border-stone-200 shadow-md flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: "overview", label: "مؤشرات الأداء (KPIs)", icon: BarChart3 },
          { id: "map", label: "الخريطة الوطنية التفاعلية", icon: Map },
          { id: "cities", label: "إدارة المدن والوجهات", icon: Building2, badge: cities.length },
          { id: "landmarks", label: "إدارة المعالم والمتاحف", icon: LandmarkIcon, badge: landmarks.length },
          { id: "events", label: "إدارة المواسم والفعاليات", icon: Calendar, badge: events.length },
          { id: "users", label: "إدارة جميع المستخدمين", icon: Users, badge: users.length },
          { id: "reports", label: "التقارير التحليلية", icon: PieChart },
          { id: "cms", label: "إدارة المحتوى (CMS)", icon: FileText },
          { id: "notifications", label: "مرسل الإشعارات", icon: Bell }
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

      {/* 1. OVERVIEW / KPIS TAB */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          
          {/* National KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MINISTRY_KPIS.map((kpi, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2 hover:border-emerald-800 transition-all"
              >
                <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                  <span>{kpi.labelAr}</span>
                  <Activity className="w-4 h-4 text-emerald-800" />
                </div>
                <div className="text-2xl font-black text-emerald-950">{kpi.valueAr}</div>
                <div className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{kpi.changeAr}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Analytical Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-black text-emerald-950 text-base flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-amber-500" />
                  <span>أكثر الوجهات السياحية زيارة هذا العام</span>
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>الرياض والدرعية (4.2M زائر)</span>
                    <span className="text-emerald-900">35%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-emerald-900 h-full w-[35%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>جدة والواجهة البحرية (3.9M زائر)</span>
                    <span className="text-emerald-900">30%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[30%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>أبها وعسير الجبلية (2.1M زائر)</span>
                    <span className="text-emerald-900">20%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full w-[20%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>العُلا والتراث التارخي (1.8M زائر)</span>
                    <span className="text-emerald-900">15%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-teal-600 h-full w-[15%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-black text-emerald-950 text-base flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-500" />
                  <span>أكثر الخدمات المساندة استخداماً بالمنصة</span>
                </h3>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex justify-between items-center">
                  <span className="font-bold text-stone-800">التنقل الذكي Explorer Ride</span>
                  <span className="font-black text-emerald-900">342,000 طلبية</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex justify-between items-center">
                  <span className="font-bold text-stone-800">المرشدين السياحيين التفاعليين</span>
                  <span className="font-black text-amber-600">84,500 جولة</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex justify-between items-center">
                  <span className="font-bold text-stone-800">الحجوزات الفندقية والمنتجعات</span>
                  <span className="font-black text-purple-700">128,000 حجز</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2. INTERACTIVE MAP TAB */}
      {activeTab === "map" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-emerald-950 flex items-center gap-2">
                <Map className="w-5 h-5 text-amber-500" />
                <span>الخريطة الوطنية الرقمية والجيومكانية للمملكة العربية السعودية</span>
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                توزيع السياح، الفعاليات، المنشآت، والفرص الاستثمارية حسب المنطقة بالتفصيل.
              </p>
            </div>

            {/* Layer Switcher */}
            <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-2xl overflow-x-auto no-scrollbar">
              {[
                { id: "tourists", name: "توزيع السياح" },
                { id: "events", name: "توزيع الفعاليات" },
                { id: "establishments", name: "المنشآت المرخصة" },
                { id: "investments", name: "الفرص الاستثمارية" },
                { id: "services", name: "مزودو الخدمات" }
              ].map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveMapLayer(layer.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeMapLayer === layer.id
                      ? "bg-emerald-900 text-white shadow-xs"
                      : "text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {layer.name}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Map Canvas Container */}
          <div className="relative bg-emerald-950 rounded-3xl overflow-hidden min-h-[460px] shadow-2xl p-6 text-white flex flex-col justify-between">
            <div
              className="absolute inset-0 opacity-40 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-emerald-950/40" />

            <div className="relative z-10 flex justify-between items-center">
              <span className="bg-amber-400 text-emerald-950 font-black text-xs px-3.5 py-1 rounded-full">
                طبقة العرض النشطة: {activeMapLayer.toUpperCase()}
              </span>
              <span className="text-xs text-amber-200 font-mono">تحديث النظام المباشر: 2026-07-26</span>
            </div>

            {/* Interactive Pins Simulation */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 my-auto text-center py-8">
              {[
                { id: "riyadh", title: "الرياض والدرعية", val: "4.2M", desc: "840 منشأة" },
                { id: "jeddah", title: "جدة والساحل", val: "3.9M", desc: "750 منشأة" },
                { id: "alula", title: "العُلا التاريخية", val: "1.8M", desc: "220 منشأة" },
                { id: "abha", title: "أبها والسودة", val: "2.1M", desc: "310 منشأة" }
              ].map((pin) => (
                <div
                  key={pin.id}
                  onClick={() => setSelectedMapRegion(pin.id)}
                  className={`p-4 rounded-2xl backdrop-blur-md cursor-pointer transition-all border ${
                    selectedMapRegion === pin.id
                      ? "bg-amber-400 text-emerald-950 border-white scale-105 shadow-xl font-black"
                      : "bg-emerald-900/80 hover:bg-emerald-800/90 text-white border-emerald-700"
                  }`}
                >
                  <MapPin className={`w-6 h-6 mx-auto mb-2 ${selectedMapRegion === pin.id ? "text-emerald-950" : "text-amber-400"}`} />
                  <div className="text-xs font-bold">{pin.title}</div>
                  <div className="text-lg font-black mt-1">{pin.val}</div>
                  <div className="text-[10px] opacity-80">{pin.desc}</div>
                </div>
              ))}
            </div>

            {/* Region Details Bar */}
            <div className="relative z-10 bg-emerald-900/90 backdrop-blur-md p-4 rounded-2xl border border-emerald-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-bold text-amber-300 block">تفاصيل المنطقة المختارة: {selectedMapRegion.toUpperCase()}</span>
                <span className="text-stone-200">
                  تحتوي على كافة التسهيلات والتراخيص الحكومية المباشرة مع شبكة مواصلات Explorer Ride.
                </span>
              </div>
              <button className="px-4 py-2 bg-amber-400 text-emerald-950 font-black rounded-xl cursor-pointer hover:bg-amber-300 whitespace-nowrap">
                تنزيل التقرير الجيومكاني كامل
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. CITIES MANAGEMENT TAB */}
      {activeTab === "cities" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-5 text-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-3">
            <div>
              <h2 className="text-base font-black text-emerald-950">إدارة المدن والوجهات السياحية</h2>
              <p className="text-stone-500 mt-0.5">إضافة، تعديل الوصف، الصور والمعالم لكل مدينة.</p>
            </div>

            <button
              onClick={() => setIsAddCityModalOpen(true)}
              className="px-4 py-2.5 bg-amber-400 text-emerald-950 font-black rounded-xl cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إضافة مدينة سياحية جديدة</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cities.map((city) => (
              <div key={city.id} className="p-5 rounded-3xl border border-stone-200 bg-stone-50/60 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="relative h-40 rounded-2xl overflow-hidden">
                    <img src={city.image} alt="" className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 bg-emerald-950/80 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                      {city.regionAr}
                    </span>
                  </div>

                  <h3 className="font-black text-base text-emerald-950">{city.nameAr}</h3>
                  <p className="text-stone-600 line-clamp-2">{city.descriptionAr}</p>

                  <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-2xl border border-stone-200 text-center font-bold text-stone-800">
                    <div>
                      <span className="text-[10px] text-stone-400 block font-normal">الزوار</span>
                      <span className="text-emerald-900">{city.visitorsCount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block font-normal">المنشآت</span>
                      <span className="text-amber-600">{city.establishmentsCount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block font-normal">المعالم</span>
                      <span className="text-purple-700">{city.landmarksCount}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-stone-200">
                  <button className="flex-1 py-2 bg-emerald-900 text-white font-bold rounded-xl cursor-pointer">
                    تعديل البيانات والصور
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add City Modal */}
          {isAddCityModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-md rounded-3xl p-6 space-y-4 border border-stone-200 shadow-2xl">
                <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                  <h3 className="font-black text-emerald-950 text-base">إضافة مدينة سياحية جديدة</h3>
                  <button onClick={() => setIsAddCityModalOpen(false)}>
                    <X className="w-5 h-5 text-stone-400" />
                  </button>
                </div>

                <form onSubmit={handleAddCity} className="space-y-3">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">اسم المدينة (بالعربية):</label>
                    <input
                      type="text"
                      placeholder="مثال: نجران والتراث..."
                      value={newCityName}
                      onChange={(e) => setNewCityName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">المنطقة التابعة لها:</label>
                    <input
                      type="text"
                      value={newCityRegion}
                      onChange={(e) => setNewCityRegion(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">وصف موجز للمدينة:</label>
                    <textarea
                      rows={2}
                      placeholder="وصف المقومات السياحية..."
                      value={newCityDesc}
                      onChange={(e) => setNewCityDesc(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5"
                    />
                  </div>

                  <button type="submit" className="w-full py-3 bg-emerald-900 text-white font-bold rounded-xl">
                    حفظ وإضافة المدينة
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. LANDMARKS MANAGEMENT TAB */}
      {activeTab === "landmarks" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-5 text-xs">
          <div className="flex justify-between items-center border-b border-stone-100 pb-3">
            <h2 className="text-base font-black text-emerald-950">إدارة المعالم، المتاحف والأماكن التراثية</h2>
            <button
              onClick={() => setIsAddLandmarkModalOpen(true)}
              className="px-4 py-2.5 bg-amber-400 text-emerald-950 font-black rounded-xl cursor-pointer flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إضافة معلم جديد</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {landmarks.map((lm) => (
              <div key={lm.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-4">
                <img src={lm.image} alt="" className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex-1 space-y-1">
                  <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {lm.categoryAr}
                  </span>
                  <h4 className="font-black text-stone-900 text-sm">{lm.nameAr}</h4>
                  <div className="text-stone-500">{lm.cityAr} • {lm.annualVisitors} زائر سنوياً</div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Landmark Modal */}
          {isAddLandmarkModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-md rounded-3xl p-6 space-y-4 border border-stone-200 shadow-2xl">
                <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                  <h3 className="font-black text-emerald-950 text-base">إضافة معلم جديد</h3>
                  <button onClick={() => setIsAddLandmarkModalOpen(false)}>
                    <X className="w-5 h-5 text-stone-400" />
                  </button>
                </div>

                <form onSubmit={handleAddLandmark} className="space-y-3">
                  <input
                    type="text"
                    placeholder="اسم المعلم..."
                    value={newLandmarkName}
                    onChange={(e) => setNewLandmarkName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5"
                  />
                  <button type="submit" className="w-full py-3 bg-emerald-900 text-white font-bold rounded-xl">
                    حفظ وإدراج المعلم
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. EVENTS MANAGEMENT TAB */}
      {activeTab === "events" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-5 text-xs">
          <div className="flex justify-between items-center border-b border-stone-100 pb-3">
            <h2 className="text-base font-black text-emerald-950">إدارة المواسم، الفعاليات والمهرجانات</h2>
            <button
              onClick={() => setIsAddEventModalOpen(true)}
              className="px-4 py-2.5 bg-amber-400 text-emerald-950 font-black rounded-xl cursor-pointer flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إضافة فعالية جديدة</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.map((ev) => (
              <div key={ev.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <span className="bg-amber-400 text-emerald-950 font-black text-[10px] px-2.5 py-0.5 rounded-full">
                  {ev.categoryAr}
                </span>
                <h4 className="font-black text-stone-900 text-sm">{ev.titleAr}</h4>
                <div className="text-stone-500">{ev.cityAr} • الحضور المتوقع: {ev.attendeesCount}</div>
                <div className="text-emerald-900 font-bold">التاريخ: {ev.startDate} إلى {ev.endDate}</div>
              </div>
            ))}
          </div>

          {/* Add Event Modal */}
          {isAddEventModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-md rounded-3xl p-6 space-y-4 border border-stone-200 shadow-2xl">
                <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                  <h3 className="font-black text-emerald-950 text-base">إضافة فعالية جديدة</h3>
                  <button onClick={() => setIsAddEventModalOpen(false)}>
                    <X className="w-5 h-5 text-stone-400" />
                  </button>
                </div>

                <form onSubmit={handleAddEvent} className="space-y-3">
                  <input
                    type="text"
                    placeholder="عنوان الفعالية..."
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5"
                  />
                  <button type="submit" className="w-full py-3 bg-emerald-900 text-white font-bold rounded-xl">
                    اعتماد ونشر الفعالية
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. USERS MANAGEMENT TAB */}
      {activeTab === "users" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-5 text-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-100 pb-3">
            <h2 className="text-base font-black text-emerald-950">إدارة كافة حسابات المستخدمين والتراخيص</h2>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl p-2 text-stone-800 font-bold"
              >
                <option value="all">جميع أنواع الحسابات</option>
                <option value="tourist">سائح / زائر</option>
                <option value="investor">مستثمر سياحي</option>
                <option value="tour_guide">مرشد سياحي</option>
                <option value="establishment">منشأة سياحية</option>
                <option value="service_provider">مزود خدمة</option>
              </select>

              <input
                type="text"
                placeholder="ابحث بالاسم أو البريد..."
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl p-2 text-stone-900 w-full sm:w-48"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredUsers.map((u) => (
              <div key={u.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-stone-900 text-sm">{u.nameAr}</span>
                    <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2 py-0.2 rounded-full">
                      {u.role}
                    </span>
                  </div>
                  <div className="text-stone-500 mt-1">{u.email} • {u.phone} • {u.cityAr}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleUserStatus(u.id)}
                    className={`px-3 py-1.5 font-bold rounded-xl cursor-pointer ${
                      u.status === "active"
                        ? "bg-rose-100 text-rose-800 hover:bg-rose-200"
                        : "bg-emerald-100 text-emerald-900 hover:bg-emerald-200"
                    }`}
                  >
                    {u.status === "active" ? "إيقاف الحساب" : "تفعيل الحساب"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. REPORTS TAB */}
      {activeTab === "reports" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-4 text-xs">
          <h2 className="text-base font-black text-emerald-950 border-b border-stone-100 pb-3">التقارير الإحصائية الرسمية</h2>
          <div className="p-4 bg-stone-50 rounded-2xl text-stone-700">
            شهد القطاع السياحي نمواً بنسبة 18.4% خلال الربع الحالي مع إجمالي 14,850,200 زائر بكافة الوجهات.
          </div>
        </div>
      )}

      {/* 8. CMS TAB */}
      {activeTab === "cms" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-4 text-xs">
          <h2 className="text-base font-black text-emerald-950 border-b border-stone-100 pb-3">نظام إدارة المحتوى الأخبار والأسئلة الشائعة</h2>
          <div className="space-y-3">
            {cmsArticles.map((art) => (
              <div key={art.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{art.titleAr}</h4>
                  <div className="text-stone-500 mt-1">{art.authorAr} • التاريخ: {art.publishedDate}</div>
                </div>
                <span className="font-mono text-emerald-900 font-bold">{art.viewsCount} مشاهدة</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. NOTIFICATIONS TAB */}
      {activeTab === "notifications" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-5 text-xs">
          <h2 className="text-base font-black text-emerald-950 border-b border-stone-100 pb-3">مركز إرسال الإشعارات والتنبيهات المباشرة</h2>
          
          <form onSubmit={handleSendNotification} className="space-y-4 max-w-xl">
            {notifSentMsg && (
              <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl font-bold text-center">
                تم إرسال الإشعار بنجاح إلى الفئة المستهدفة!
              </div>
            )}
            <div>
              <label className="block font-bold text-stone-700 mb-1">الفئة المستهدفة للإشعار:</label>
              <select
                value={notifTarget}
                onChange={(e) => setNotifTarget(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3"
              >
                <option value="all">جميع مستخدمي المنصة (عام)</option>
                <option value="investors">المستثمرون فقط</option>
                <option value="establishments">المنشآت الفندقية والسياحية</option>
                <option value="guides">المرشدون السياحيون</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">عنوان الإشعار:</label>
              <input
                type="text"
                placeholder="عنوان التنبيه..."
                value={notifTitle}
                onChange={(e) => setNotifTitle(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">نص الرسالة والإشعار:</label>
              <textarea
                rows={3}
                placeholder="تفاصيل الإشعار الرسمية..."
                value={notifBody}
                onChange={(e) => setNotifBody(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900"
              />
            </div>

            <button type="submit" className="w-full py-3 bg-emerald-900 text-white font-bold rounded-xl cursor-pointer">
              إرسال الإشعار فوراً
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
