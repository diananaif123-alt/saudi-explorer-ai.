import React, { useState } from "react";
import { LanguageCode, ViewMode } from "../../types";
import {
  MOCK_INVESTMENT_OPPORTUNITIES,
  MOCK_INVESTOR_APPLICATIONS,
  MOCK_NOTIFICATIONS,
  DetailedInvestmentOpportunity,
  InvestorApplicationRequest,
  PortalNotification
} from "../../data/phase6Data";
import {
  Briefcase,
  TrendingUp,
  MapPin,
  Building2,
  DollarSign,
  PieChart,
  BarChart3,
  FileText,
  Bell,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Bookmark,
  Share2,
  Layers,
  ChevronRight,
  Sparkles,
  Map,
  X,
  User,
  ShieldCheck,
  Send,
  Eye,
  ArrowUpRight,
  Award
} from "lucide-react";

interface InvestorPortalViewProps {
  language: LanguageCode;
  onNavigateView: (view: ViewMode, targetId?: string) => void;
}

export const InvestorPortalView: React.FC<InvestorPortalViewProps> = ({
  language,
  onNavigateView
}) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "opportunities" | "map" | "reports" | "applications" | "notifications" | "profile"
  >("overview");

  // State datasets
  const [opportunities, setOpportunities] = useState<DetailedInvestmentOpportunity[]>(MOCK_INVESTMENT_OPPORTUNITIES);
  const [applications, setApplications] = useState<InvestorApplicationRequest[]>(MOCK_INVESTOR_APPLICATIONS);
  const [savedOppIds, setSavedOppIds] = useState<string[]>(["inv-01"]);
  const [notifications, setNotifications] = useState<PortalNotification[]>(MOCK_NOTIFICATIONS.investor);

  // Filters
  const [selectedCityFilter, setSelectedCityFilter] = useState("all");
  const [selectedSectorFilter, setSelectedSectorFilter] = useState("all");
  const [selectedLevelFilter, setSelectedLevelFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [selectedOpportunityModal, setSelectedOpportunityModal] = useState<DetailedInvestmentOpportunity | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyForm, setApplyForm] = useState({
    investorName: "شركة الاستثمارات السعودية المتقدمة",
    proposedBudgetSAR: "150,000,000",
    phone: "+966 50 888 7777",
    notes: "نود تقديم طلب اهتمام مبدئي للاستثمار وإبداء الرغبة بتمويل المشروع."
  });
  const [applySuccessMsg, setApplySuccessMsg] = useState(false);

  // Active Region for Investment Map
  const [selectedMapRegion, setSelectedMapRegion] = useState("alula");

  const toggleSaveOpportunity = (id: string) => {
    setSavedOppIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApplyInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpportunityModal) return;

    const newApp: InvestorApplicationRequest = {
      id: `req-${Math.floor(100 + Math.random() * 900)}`,
      opportunityId: selectedOpportunityModal.id,
      opportunityTitleAr: selectedOpportunityModal.titleAr,
      cityAr: selectedOpportunityModal.cityAr,
      investorName: applyForm.investorName,
      proposedBudgetSAR: `${applyForm.proposedBudgetSAR} ر.س`,
      submittedDate: new Date().toISOString().split("T")[0],
      status: "under_review",
      reviewNotesAr: "تم استلام طلب إبداء الاهتمام الاستثماري وهو قيد الدراسة والتحقق الفني."
    };

    setApplications((prev) => [newApp, ...prev]);
    setApplySuccessMsg(true);

    setTimeout(() => {
      setApplySuccessMsg(false);
      setIsApplyModalOpen(false);
      setSelectedOpportunityModal(null);
    }, 1500);
  };

  // Filter logic
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchCity = selectedCityFilter === "all" || opp.cityAr.includes(selectedCityFilter);
    const matchSector = selectedSectorFilter === "all" || opp.sectorAr.includes(selectedSectorFilter);
    const matchLevel = selectedLevelFilter === "all" || opp.level === selectedLevelFilter;
    const matchSearch =
      opp.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.descriptionAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.cityAr.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCity && matchSector && matchLevel && matchSearch;
  });

  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-stone-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in">
      
      {/* Portal Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-right">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-emerald-950 font-black text-xs px-3.5 py-1 rounded-full">
            <Briefcase className="w-4 h-4" />
            <span>بوابة المستثمر السياحي المباشرة | Investor Portal</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            لوحة تحكم وتتبع الفرص الاستثمارية الكبرى
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            استكشف أضخم الفرص الاستثمارية في القطاع السياحي بالجمهورية والرؤية الوطنية 2030، وتابع طلبات الاستثمار المؤشرات المباشرة.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("notifications")}
            className="relative p-3 bg-emerald-900 hover:bg-emerald-800 text-amber-300 rounded-2xl border border-amber-400/30 cursor-pointer shadow-md"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center border-2 border-emerald-950">
                {unreadNotifCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black rounded-2xl text-xs flex items-center gap-2 cursor-pointer shadow-md"
          >
            <User className="w-4 h-4" />
            <span>ملف الشركة المستثمرة</span>
          </button>
        </div>
      </div>

      {/* Portal Main Navigation Bar */}
      <div className="bg-white p-2 rounded-2xl border border-stone-200 shadow-md flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: "overview", label: "لوحة الملخص", icon: BarChart3 },
          { id: "opportunities", label: "الفرص الاستثمارية", icon: Briefcase },
          { id: "map", label: "الخريطة الاستثمارية", icon: Map },
          { id: "reports", label: "التقارير والمؤشرات", icon: PieChart },
          { id: "applications", label: "الطلبات والمشاريع", icon: FileText },
          { id: "notifications", label: "مركز الإشعارات", icon: Bell, badge: unreadNotifCount },
          { id: "profile", label: "إدارة الحساب", icon: ShieldCheck }
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
              {tab.badge && tab.badge > 0 ? (
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
          {/* Investment Summary Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                <span>إجمالي محفظة الاستثمار</span>
                <DollarSign className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="text-2xl font-black text-emerald-950">425,000,000 SAR</div>
              <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>+14.2% نمو سنوي متوقع</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                <span>الفرص المتاحة المستهدفة</span>
                <Briefcase className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-stone-900">{opportunities.length} فرص كبرى</div>
              <div className="text-[10px] text-stone-500">موزعة على 4 مناطق سياحية</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                <span>الطلبات والمشاريع الحالية</span>
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl font-black text-purple-900">{applications.length} طلبات نشطة</div>
              <div className="text-[10px] text-purple-700 font-bold">1 موافقة مبدئية معتمدة</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                <span>متوسط العائد ROI</span>
                <Award className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-amber-600">19.1% سنوياً</div>
              <div className="text-[10px] text-stone-400">بناءً على دراسات الجدوى الجاهزة</div>
            </div>

          </div>

          {/* Quick Featured Opportunities Grid */}
          <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="text-base font-black text-emerald-950">الفرص الاستثمارية المقترحة حالياً</h2>
              </div>
              <button
                onClick={() => setActiveTab("opportunities")}
                className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>عرض كافة الفرص ({opportunities.length})</span>
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {opportunities.slice(0, 2).map((opp) => (
                <div
                  key={opp.id}
                  className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:border-emerald-700 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-amber-400 text-emerald-950 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                      مستوى {opp.level}
                    </span>
                    <span className="text-xs font-bold text-stone-500">{opp.cityAr}</span>
                  </div>

                  <h3 className="font-extrabold text-sm text-emerald-950">{opp.titleAr}</h3>
                  <p className="text-xs text-stone-600 line-clamp-2">{opp.descriptionAr}</p>

                  <div className="flex items-center justify-between border-t border-stone-200 pt-3 text-xs">
                    <div>
                      <span className="text-[10px] text-stone-400 block">التكلفة التقديرية</span>
                      <span className="font-black text-emerald-900">{opp.estimatedValueSAR}</span>
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] text-stone-400 block">العائد المتوقع ROI</span>
                      <span className="font-black text-amber-600">{opp.expectedRoiPercent}%</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedOpportunityModal(opp)}
                    className="w-full py-2 bg-emerald-900 hover:bg-emerald-950 text-white font-bold rounded-xl text-xs cursor-pointer"
                  >
                    تفاصيل الفرصة ودراسة الجدوى
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. OPPORTUNITIES TAB */}
      {activeTab === "opportunities" && (
        <div className="space-y-6">
          
          {/* Filters Bar */}
          <div className="bg-white p-5 rounded-3xl shadow-md border border-stone-200 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <select
                  value={selectedCityFilter}
                  onChange={(e) => setSelectedCityFilter(e.target.value)}
                  className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-stone-800"
                >
                  <option value="all">جميع المدن والمناطق</option>
                  <option value="العُلا">العُلا</option>
                  <option value="جدة">جدة</option>
                  <option value="أبها">أبها والسودة</option>
                  <option value="الرياض">الرياض والدرعية</option>
                </select>

                <select
                  value={selectedLevelFilter}
                  onChange={(e) => setSelectedLevelFilter(e.target.value)}
                  className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-stone-800"
                >
                  <option value="all">جميع مستويات الفرص</option>
                  <option value="VIP">مستوى VIP كبرى</option>
                  <option value="High">مستوى عالي High</option>
                  <option value="Medium">مستوى متوسط</option>
                </select>
              </div>

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="ابحث باسم المشروع أو القطاع..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

            </div>
          </div>

          {/* Opportunities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opp) => {
              const isSaved = savedOppIds.includes(opp.id);

              return (
                <div
                  key={opp.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={opp.image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-emerald-950/80 backdrop-blur-md text-amber-300 font-black text-[10px] px-3 py-1 rounded-full border border-amber-400/40">
                      مستوى {opp.level}
                    </div>

                    <button
                      onClick={() => toggleSaveOpportunity(opp.id)}
                      className="absolute top-3 left-3 p-2 bg-white/80 hover:bg-white rounded-full text-stone-800 cursor-pointer shadow-xs"
                      title="حفظ الفرصة"
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? "fill-emerald-800 text-emerald-800" : ""}`} />
                    </button>
                  </div>

                  <div className="p-5 space-y-3 flex-1">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-800">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      <span>{opp.regionAr}</span>
                    </div>

                    <h3 className="font-black text-base text-emerald-950">{opp.titleAr}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">{opp.descriptionAr}</p>

                    <div className="grid grid-cols-2 gap-2 bg-stone-50 p-3 rounded-2xl border border-stone-200 text-xs">
                      <div>
                        <span className="text-[10px] text-stone-400 block">التكلفة التقديرية</span>
                        <span className="font-black text-emerald-950">{opp.estimatedValueSAR}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 block">العائد المتوقع ROI</span>
                        <span className="font-black text-amber-600">{opp.expectedRoiPercent}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 block">مدة التنفيذ</span>
                        <span className="font-bold text-stone-800">{opp.executionMonths} شهراً</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 block">نسبة الإشغال المتوقعة</span>
                        <span className="font-bold text-emerald-800">{opp.expectedOccupancyPercent}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-stone-50 border-t border-stone-200 flex gap-2">
                    <button
                      onClick={() => setSelectedOpportunityModal(opp)}
                      className="flex-1 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white font-bold rounded-xl text-xs cursor-pointer"
                    >
                      عرض التفاصيل الكاملة
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* 3. INVESTMENT MAP TAB */}
      {activeTab === "map" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-emerald-950 flex items-center gap-2">
                <Map className="w-5 h-5 text-amber-500" />
                <span>الخريطة التفاعلية للفرص والمناطق الاستثمارية الواعدة</span>
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                استعرض توزيع الفرص، المشاريع الحالية، والمؤشرات الاستثمارية حسب المنطقة.
              </p>
            </div>

            {/* Region Selector buttons */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {[
                { id: "alula", name: "العُلا والمدينة" },
                { id: "jeddah", name: "جدة ومكة" },
                { id: "abha", name: "أبها وعسير" },
                { id: "riyadh", name: "الرياض والدرعية" }
              ].map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedMapRegion(reg.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedMapRegion === reg.id
                      ? "bg-emerald-900 text-white shadow-xs"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {reg.name}
                </button>
              ))}
            </div>
          </div>

          {/* Map Simulation Container */}
          <div className="relative bg-emerald-950 rounded-3xl overflow-hidden min-h-[400px] shadow-xl p-6 text-white flex flex-col justify-between">
            <div
              className="absolute inset-0 opacity-40 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-emerald-950/30" />

            <div className="relative z-10 flex justify-between items-center">
              <span className="bg-amber-400 text-emerald-950 font-black text-xs px-3 py-1 rounded-full">
                المنطقة المختارة: {selectedMapRegion.toUpperCase()}
              </span>
              <span className="text-xs text-amber-200 font-mono">مؤشر الجاذبية الاستثمارية: 94.8%</span>
            </div>

            <div className="relative z-10 my-auto text-center space-y-3 py-12">
              <MapPin className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
              <h3 className="text-2xl font-black">
                {selectedMapRegion === "alula" && "منطقة العُلا والمدينة المنورة - الضيافة البيئية والتراث"}
                {selectedMapRegion === "jeddah" && "منطقة جدة والساحل الغربي - السياحة البحرية واليخوت"}
                {selectedMapRegion === "abha" && "منطقة عسير - السياحة الجبلية والمغامرات"}
                {selectedMapRegion === "riyadh" && "منطقة الرياض والدرعية - الفعاليات والسياحة الثقافية"}
              </h3>
              <p className="text-xs text-stone-200 max-w-xl mx-auto">
                تحتوي المنطقة على أكثر من 12 فرصة استثمارية جاهزة مع كامل التسهيلات الحكومية والحرية المالية.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-emerald-900/80 p-2.5 rounded-2xl border border-emerald-700">
                <span className="text-[10px] text-stone-300 block">المشاريع الحالية</span>
                <span className="font-black text-amber-300 text-sm">18 مشروعاً</span>
              </div>
              <div className="bg-emerald-900/80 p-2.5 rounded-2xl border border-emerald-700">
                <span className="text-[10px] text-stone-300 block">متوسط النمو السنوي</span>
                <span className="font-black text-amber-300 text-sm">+21.4%</span>
              </div>
              <div className="bg-emerald-900/80 p-2.5 rounded-2xl border border-emerald-700">
                <span className="text-[10px] text-stone-300 block">عدد الزوار المتوقع</span>
                <span className="font-black text-amber-300 text-sm">2.4M زائر</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. REPORTS TAB */}
      {activeTab === "reports" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-base font-black text-emerald-950 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-amber-500" />
              <span>التقارير والإحصائيات الاستثمارية الوطنية (Demo Analytics)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
              <h3 className="font-bold text-sm text-stone-900">توزيع الزوار حسب المدن الأكثر زيارة</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>الرياض والدرعية</span>
                    <span className="text-emerald-900">38%</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-900 h-full w-[38%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>جدة والواجهة البحرية</span>
                    <span className="text-emerald-900">29%</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[29%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>العُلا والتراث التاريخي</span>
                    <span className="text-emerald-900">21%</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full w-[21%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
              <h3 className="font-bold text-sm text-stone-900">الأنشطة الأكثر طلباً ومعدلات الإشغال</h3>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white rounded-xl border border-stone-200 flex justify-between">
                  <span>الفنادق والمنتجعات التراثية</span>
                  <span className="font-black text-emerald-900">88% إشغال</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-stone-200 flex justify-between">
                  <span>الأنشطة الشاطئية واليخوت</span>
                  <span className="font-black text-amber-600">82% إشغال</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-stone-200 flex justify-between">
                  <span>رحلات وسيارات Explorer Ride</span>
                  <span className="font-black text-purple-700">94% طلباً</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 5. APPLICATIONS TAB */}
      {activeTab === "applications" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-5">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-base font-black text-emerald-950 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" />
              <span>متابعة الطلبات الاستثمارية الحالية والمشاريع</span>
            </h2>
          </div>

          <div className="space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="p-5 rounded-2xl border border-stone-200 bg-stone-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-900 font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                      {app.status === "initial_approval" ? "موافقة مبدئية" : "قيد الدراسة"}
                    </span>
                    <span className="text-xs font-mono text-stone-400">#{app.id}</span>
                  </div>
                  <h3 className="font-black text-sm text-emerald-950 mt-1">{app.opportunityTitleAr}</h3>
                  <div className="text-xs text-stone-500 mt-1">
                    المستثمر: {app.investorName} • الميزانية المقترحة: {app.proposedBudgetSAR}
                  </div>
                  <div className="text-xs text-emerald-800 font-bold mt-1">
                    ملاحظات المراجعة: {app.reviewNotesAr}
                  </div>
                </div>

                <div className="text-left">
                  <span className="text-[10px] text-stone-400 block">تاريخ تقديم الطلب</span>
                  <span className="text-xs font-bold text-stone-800">{app.submittedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. NOTIFICATIONS TAB */}
      {activeTab === "notifications" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-4">
          <h2 className="text-base font-black text-emerald-950 flex items-center gap-2 border-b border-stone-100 pb-3">
            <Bell className="w-5 h-5 text-amber-500" />
            <span>مركز الإشعارات والتحديثات الاستثمارية</span>
          </h2>

          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                  n.isRead ? "bg-stone-50 border-stone-200" : "bg-amber-50/80 border-amber-300"
                }`}
              >
                <div className="p-2 bg-emerald-900 text-amber-300 rounded-xl mt-0.5">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-xs text-emerald-950">{n.titleAr}</h4>
                    <span className="text-[10px] text-stone-400">{n.date} - {n.time}</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">{n.bodyAr}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. PROFILE TAB */}
      {activeTab === "profile" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-6">
          <h2 className="text-base font-black text-emerald-950 flex items-center gap-2 border-b border-stone-100 pb-3">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <span>إدارة حساب الشركة المستثمرة</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">اسم الشركة/المجموعة:</label>
              <input
                type="text"
                defaultValue="شركة الاستثمارات السعودية المتقدمة"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-stone-700 mb-1">السجل التجاري / الترخيص:</label>
              <input
                type="text"
                defaultValue="CR-1010-884920"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 font-mono font-bold"
              />
            </div>
          </div>
        </div>
      )}

      {/* Opportunity Details Modal */}
      {selectedOpportunityModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="p-5 bg-emerald-950 text-white flex items-center justify-between">
              <h3 className="font-extrabold text-base">{selectedOpportunityModal.titleAr}</h3>
              <button
                onClick={() => setSelectedOpportunityModal(null)}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-right">
              <img
                src={selectedOpportunityModal.image}
                alt=""
                className="w-full h-56 object-cover rounded-2xl shadow-sm"
              />

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-2">
                <h4 className="font-black text-emerald-950 text-sm">وصف وتفاصيل الجدوى الاقتصادية</h4>
                <p className="text-stone-700 leading-relaxed">{selectedOpportunityModal.descriptionAr}</p>
                <div className="pt-2 font-bold text-emerald-900">
                  خلاصة الدراسات: {selectedOpportunityModal.feasibilitySummaryAr}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {selectedOpportunityModal.kpis.map((kpi, idx) => (
                  <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-stone-500 text-[10px] block">{kpi.labelAr}</span>
                    <span className="font-black text-emerald-950 text-sm mt-0.5 block">{kpi.valueAr}</span>
                  </div>
                ))}
              </div>

              {!isApplyModalOpen && (
                <button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-sm rounded-2xl shadow-md cursor-pointer transition-all"
                >
                  تقديم طلب إبداء اهتمام استثماري (محاكاة)
                </button>
              )}

              {/* Application Form Drawer */}
              {isApplyModalOpen && (
                <div className="p-5 bg-stone-50 rounded-2xl border border-amber-300 space-y-4 animate-in fade-in">
                  <h4 className="font-black text-xs text-emerald-950">نموذج إبداء الرغبة والاهتمام الاستثماري</h4>
                  {applySuccessMsg ? (
                    <div className="p-4 bg-emerald-100 text-emerald-900 rounded-xl font-bold text-xs text-center">
                      تم تقديم طلبك الاستثماري بنجاح وتمت إضافته للوحة متابعة الطلبات!
                    </div>
                  ) : (
                    <form onSubmit={handleApplyInterest} className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">اسم الجهة/المستثمر:</label>
                        <input
                          type="text"
                          value={applyForm.investorName}
                          onChange={(e) => setApplyForm({ ...applyForm, investorName: e.target.value })}
                          className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">الميزانية المقترحة (SAR):</label>
                        <input
                          type="text"
                          value={applyForm.proposedBudgetSAR}
                          onChange={(e) => setApplyForm({ ...applyForm, proposedBudgetSAR: e.target.value })}
                          className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-stone-900"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 bg-emerald-900 text-white font-bold rounded-xl shadow-xs"
                      >
                        إرسال الطلب رسمياً
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
