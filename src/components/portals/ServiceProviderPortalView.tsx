import React, { useState } from "react";
import { LanguageCode, ViewMode } from "../../types";
import {
  MOCK_PROVIDER_SERVICES,
  MOCK_PROVIDER_ORDERS,
  MOCK_NOTIFICATIONS,
  ServiceProviderService,
  ServiceProviderOrder,
  PortalNotification
} from "../../data/phase6Data";
import {
  Layers,
  Car,
  Truck,
  Shield,
  Languages,
  PlusCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  Star,
  Bell,
  Search,
  Filter,
  FileText,
  Edit,
  Trash2,
  Sparkles,
  ChevronRight
} from "lucide-react";

interface ServiceProviderPortalViewProps {
  language: LanguageCode;
  onNavigateView: (view: ViewMode, targetId?: string) => void;
}

export const ServiceProviderPortalView: React.FC<ServiceProviderPortalViewProps> = ({
  language,
  onNavigateView
}) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "services" | "orders" | "reports" | "notifications"
  >("overview");

  // State
  const [services, setServices] = useState<ServiceProviderService[]>(MOCK_PROVIDER_SERVICES);
  const [orders, setOrders] = useState<ServiceProviderOrder[]>(MOCK_PROVIDER_ORDERS);
  const [notifications] = useState<PortalNotification[]>(MOCK_NOTIFICATIONS.provider);

  // New Service Modal
  const [isNewServiceModalOpen, setIsNewServiceModalOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState(600);
  const [newServiceDesc, setNewServiceDesc] = useState("");

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;

    const newSrv: ServiceProviderService = {
      id: `srv-${Math.floor(100 + Math.random() * 900)}`,
      nameAr: newServiceName,
      categoryAr: "خدمات مساندة سياحية",
      sectorType: "transport",
      priceSAR: newServicePrice,
      unitAr: "الخدمة / الطلب",
      descriptionAr: newServiceDesc || "خدمة جديدة تم إضافتها عبر منصة مزودي الخدمات.",
      isAvailable: true,
      activeOrdersCount: 0,
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600"
    };

    setServices((prev) => [newSrv, ...prev]);
    setIsNewServiceModalOpen(false);
    setNewServiceName("");
    setNewServiceDesc("");
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: "in_progress" | "completed" | "cancelled") => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="min-h-screen bg-stone-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-right">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-emerald-950 font-black text-xs px-3.5 py-1 rounded-full">
            <Layers className="w-4 h-4" />
            <span>بوابة مزودي الخدمات ذات العلاقة | Supporting Service Providers Portal</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            شركات النقل، التأجير، الفعاليات والخدمات اللوجستية
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            إدارة كافة الخدمات المساندة للقطاع السياحي واستقبال الطلبات المباشرة من الهيئات والمنشآت.
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
          { id: "overview", label: "لوحة الملخص", icon: Layers },
          { id: "services", label: "إدارة قائمة الخدمات", icon: Truck, badge: services.length },
          { id: "orders", label: "طلبات التزويد والتنفيذ", icon: FileText, badge: orders.length },
          { id: "reports", label: "تقارير الأداء", icon: DollarSign },
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
              <div className="text-stone-500 text-xs font-bold">الخدمات النشطة المتاحة</div>
              <div className="text-2xl font-black text-emerald-950">{services.length} خدمات</div>
              <div className="text-[10px] text-emerald-700 font-bold">متاحة للحجز المباشر</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <div className="text-stone-500 text-xs font-bold">الطلبيات النشطة الجارية</div>
              <div className="text-2xl font-black text-stone-900">{orders.length} طلبية</div>
              <div className="text-[10px] text-stone-400">من مختلف الفنادق والهيئات</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <div className="text-stone-500 text-xs font-bold">إجمالي أرباح الشهر</div>
              <div className="text-2xl font-black text-purple-900">48,500 SAR</div>
              <div className="text-[10px] text-purple-700 font-bold">تحديث فوري</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <div className="text-stone-500 text-xs font-bold">تقييم الجودة والالتزام</div>
              <div className="text-2xl font-black text-amber-500 flex items-center gap-1">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span>4.9 / 5.0</span>
              </div>
            </div>

          </div>

          <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-4">
            <h3 className="font-extrabold text-base text-emerald-950 border-b border-stone-100 pb-3">
              طلبات التزويد القادمة
            </h3>
            <div className="space-y-3">
              {orders.map((ord) => (
                <div key={ord.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-stone-900 text-sm">{ord.clientNameAr}</div>
                    <div className="text-stone-500">{ord.serviceNameAr} • {ord.date}</div>
                  </div>
                  <div className="text-left font-black text-emerald-900">{ord.amountSAR} SAR</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. SERVICES TAB */}
      {activeTab === "services" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-5 text-xs">
          <div className="flex justify-between items-center border-b border-stone-100 pb-3">
            <h2 className="text-base font-black text-emerald-950">إدارة قائمة الخدمات المقدمة للقطاع</h2>
            <button
              onClick={() => setIsNewServiceModalOpen(true)}
              className="px-4 py-2 bg-amber-400 text-emerald-950 font-black rounded-xl cursor-pointer flex items-center gap-1"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إضافة خدمة جديدة</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((srv) => (
              <div key={srv.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex justify-between font-black text-emerald-950 text-sm">
                  <span>{srv.nameAr}</span>
                  <span className="text-emerald-900">{srv.priceSAR} SAR / {srv.unitAr}</span>
                </div>
                <p className="text-stone-600">{srv.descriptionAr}</p>
                <div className="text-stone-400 font-bold">الطلبات الفعالة: {srv.activeOrdersCount} طلبية</div>
              </div>
            ))}
          </div>

          {isNewServiceModalOpen && (
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 space-y-3">
              <h4 className="font-bold text-emerald-950">إضافة خدمة مساندة جديدة للشركة</h4>
              <form onSubmit={handleAddService} className="space-y-3">
                <input
                  type="text"
                  placeholder="اسم الخدمة..."
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="w-full bg-white border border-stone-200 p-2.5 rounded-xl"
                />
                <button type="submit" className="w-full py-2.5 bg-emerald-900 text-white font-bold rounded-xl">
                  حفظ إضافة الخدمة
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* 3. ORDERS TAB */}
      {activeTab === "orders" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-4 text-xs">
          <h2 className="text-base font-black text-emerald-950 border-b border-stone-100 pb-3">
            سجل طلبات التنفيذ والتزويد الواردة
          </h2>

          <div className="space-y-3">
            {orders.map((ord) => (
              <div key={ord.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="font-black text-stone-900 text-sm">{ord.clientNameAr}</div>
                  <div className="text-stone-500 mt-1">{ord.serviceNameAr} • ملاحظات: {ord.notesAr}</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-black text-emerald-900">{ord.amountSAR} SAR</span>
                  <button
                    onClick={() => handleUpdateOrderStatus(ord.id, "completed")}
                    className="px-3 py-1.5 bg-emerald-900 text-white font-bold rounded-lg cursor-pointer"
                  >
                    إكمال الطلب
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. REPORTS TAB */}
      {activeTab === "reports" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-4 text-xs">
          <h2 className="text-base font-black text-emerald-950 border-b border-stone-100 pb-3">
            تقارير الأداء ومعدل تسليم الخدمات
          </h2>
          <div className="p-4 bg-stone-50 rounded-2xl text-stone-700">
            أداء الشركة هذا الشهر مرتفع بنسبة 18.5% مقارنة بالربع السابق مع الالتزام التام بالمواعيد.
          </div>
        </div>
      )}

    </div>
  );
};
