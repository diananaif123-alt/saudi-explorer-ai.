import React, { useState } from "react";
import { LanguageCode, ViewMode } from "../../types";
import {
  MOCK_SYSTEM_LOGS,
  MOCK_SECURITY_ALERTS,
  MOCK_SYSTEM_BACKUPS,
  MOCK_PORTAL_CONFIGS,
  MOCK_PLATFORM_SERVICES,
  MOCK_SYSTEM_USERS,
  SystemLogEntry,
  SystemSecurityAlert,
  SystemBackupItem,
  PlatformPortalConfig,
  PlatformServiceConfig,
  SystemUser
} from "../../data/phase7Data";
import {
  ShieldAlert,
  ShieldCheck,
  Server,
  HardDrive,
  Users,
  Key,
  Layers,
  Activity,
  Search,
  Database,
  Cpu,
  RefreshCw,
  PlusCircle,
  Edit,
  Trash2,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Terminal,
  Settings,
  Sliders,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Eye,
  FileText,
  X,
  Radio
} from "lucide-react";

interface SuperAdminPortalViewProps {
  language: LanguageCode;
  onNavigateView: (view: ViewMode, targetId?: string) => void;
}

export const SuperAdminPortalView: React.FC<SuperAdminPortalViewProps> = ({
  language,
  onNavigateView
}) => {
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "users"
    | "roles"
    | "portals"
    | "services"
    | "security"
    | "backups"
    | "performance"
    | "audit_logs"
  >("overview");

  // State Datasets
  const [portalConfigs, setPortalConfigs] = useState<PlatformPortalConfig[]>(MOCK_PORTAL_CONFIGS);
  const [servicesConfigs, setServicesConfigs] = useState<PlatformServiceConfig[]>(MOCK_PLATFORM_SERVICES);
  const [usersList, setUsersList] = useState<SystemUser[]>(MOCK_SYSTEM_USERS);
  const [logsList, setLogsList] = useState<SystemLogEntry[]>(MOCK_SYSTEM_LOGS);
  const [securityAlerts, setSecurityAlerts] = useState<SystemSecurityAlert[]>(MOCK_SECURITY_ALERTS);
  const [backupsList, setBackupsList] = useState<SystemBackupItem[]>(MOCK_SYSTEM_BACKUPS);

  // Search & Filters
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  // Modals & Forms
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<any>("admin");

  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<SystemBackupItem | null>(null);
  const [restoreProgressMsg, setRestoreProgressMsg] = useState(false);

  // Toggle Portal Status
  const togglePortalStatus = (portalId: string) => {
    setPortalConfigs((prev) =>
      prev.map((p) => (p.id === portalId ? { ...p, isEnabled: !p.isEnabled } : p))
    );
  };

  // Toggle Service Status
  const toggleServiceStatus = (serviceId: string) => {
    setServicesConfigs((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, isEnabled: !s.isEnabled } : s))
    );
  };

  // Add Admin Account
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const newUsr: SystemUser = {
      id: `usr-${Math.floor(100 + Math.random() * 900)}`,
      nameAr: newUserName,
      email: newUserEmail,
      phone: "+966 50 000 9999",
      role: newUserRole,
      cityAr: "الرياض والدرعية",
      registeredDate: new Date().toISOString().split("T")[0],
      status: "active"
    };

    setUsersList((prev) => [newUsr, ...prev]);
    setIsNewUserModalOpen(false);
    setNewUserName("");
    setNewUserEmail("");
  };

  // Trigger Backup Simulation
  const handleCreateNewBackup = () => {
    const newBak: SystemBackupItem = {
      id: `bak-${Date.now()}`,
      filename: `saudi_explorer_manual_db_${new Date().toISOString().slice(0, 10).replace(/-/g, "")}.bak`,
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
      sizeMB: 489,
      type: "full",
      status: "ready"
    };
    setBackupsList((prev) => [newBak, ...prev]);
  };

  // Simulate Restore Backup
  const handleRestoreBackup = () => {
    setRestoreProgressMsg(true);
    setTimeout(() => {
      setRestoreProgressMsg(false);
      setIsRestoreModalOpen(false);
      setSelectedBackup(null);
    }, 2000);
  };

  // Global Filtered Logs
  const filteredLogs = logsList.filter(
    (log) =>
      log.userName.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      log.operationType.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      log.detailsAr.toLowerCase().includes(globalSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in">
      
      {/* Super Admin Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-right">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-emerald-950 font-black text-xs px-3.5 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>بوابة مدير النظام الأعلى | Super Admin Operations Control</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            إدارة البنية التحتية، الأمان، الصلاحيات والبوابات الثمانية
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            التحكم الكامل بصلاحيات الوصول، حالة الخدمات، النسخ الاحتياطية، أمن المنصة ومراقبة السجلات الفورية.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCreateNewBackup}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black rounded-2xl text-xs flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Database className="w-4 h-4" />
            <span>إنشاء نسخة احتياطية فورية</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white p-2 rounded-2xl border border-stone-200 shadow-md flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: "overview", label: "حالة النظام العامة", icon: Server },
          { id: "users", label: "الحسابات والمستخدمين", icon: Users, badge: usersList.length },
          { id: "roles", label: "إدارة الصلاحيات (RBAC)", icon: Key },
          { id: "portals", label: "إدارة البوابات الثمانية", icon: Layers, badge: portalConfigs.length },
          { id: "services", label: "الخدمات الأساسية للذكاء الاصطناعي", icon: Cpu, badge: servicesConfigs.length },
          { id: "security", label: "الأمن وسجلات الدخول", icon: ShieldAlert, badge: securityAlerts.length },
          { id: "backups", label: "النسخ الاحتياطية", icon: Database },
          { id: "performance", label: "مراقبة الموارد والأداء", icon: Activity },
          { id: "audit_logs", label: "السجلات الشاملة", icon: Terminal }
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
              <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                <span>حالة الخوادم والنظام</span>
                <Server className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="text-2xl font-black text-emerald-950 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span>مستقر 100%</span>
              </div>
              <div className="text-[10px] text-emerald-700 font-bold">جميع الخدمات تعمل بكفاءة عالية</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                <span>إجمالي المستخدمين المسجلين</span>
                <Users className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-stone-900">28,450 حساب</div>
              <div className="text-[10px] text-stone-400">موزعين على 8 بوابات رئيسية</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                <span>مساحة التخزين المستهلكة</span>
                <HardDrive className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl font-black text-purple-900">124 GB / 1 TB</div>
              <div className="text-[10px] text-purple-700 font-bold">استهلاك م مـتوازن</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                <span>التنبيهات الأمنية</span>
                <ShieldAlert className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-amber-600">0 حرجة</div>
              <div className="text-[10px] text-stone-400">جدار الحماية الفعال يعمل</div>
            </div>

          </div>

          <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-4">
            <h3 className="font-extrabold text-base text-emerald-950 border-b border-stone-100 pb-3">
              سجل أحدث العمليات والأنشطة بالنظام
            </h3>
            <div className="space-y-3 text-xs">
              {logsList.map((log) => (
                <div key={log.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="font-bold text-stone-900 text-sm">{log.userName} ({log.userRole})</span>
                    <div className="text-emerald-900 font-bold mt-0.5">{log.operationType}</div>
                    <div className="text-stone-500 text-[11px] mt-0.5">{log.detailsAr}</div>
                  </div>
                  <div className="text-left font-mono text-stone-400 text-[10px]">
                    {log.timestamp} • IP: {log.ipAddress}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. USERS MANAGEMENT TAB */}
      {activeTab === "users" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-5 text-xs">
          <div className="flex justify-between items-center border-b border-stone-100 pb-3">
            <h2 className="text-base font-black text-emerald-950">إدارة الحسابات وتعيين الأدوار العليا</h2>
            <button
              onClick={() => setIsNewUserModalOpen(true)}
              className="px-4 py-2.5 bg-amber-400 text-emerald-950 font-black rounded-xl cursor-pointer flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إنشاء حساب مشرف جديد</span>
            </button>
          </div>

          <div className="space-y-3">
            {usersList.map((u) => (
              <div key={u.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex justify-between items-center">
                <div>
                  <div className="font-bold text-stone-900 text-sm">{u.nameAr}</div>
                  <div className="text-stone-500 mt-1">{u.email} • الدور: {u.role}</div>
                </div>
                <span className="bg-emerald-100 text-emerald-900 font-bold px-3 py-1 rounded-full text-[10px]">
                  {u.status}
                </span>
              </div>
            ))}
          </div>

          {/* New Admin Account Modal */}
          {isNewUserModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-md rounded-3xl p-6 space-y-4 border border-stone-200 shadow-2xl">
                <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                  <h3 className="font-black text-emerald-950 text-base">إنشاء حساب جديد</h3>
                  <button onClick={() => setIsNewUserModalOpen(false)}>
                    <X className="w-5 h-5 text-stone-400" />
                  </button>
                </div>

                <form onSubmit={handleAddUser} className="space-y-3">
                  <input
                    type="text"
                    placeholder="الاسم الكامل..."
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5"
                  />
                  <input
                    type="email"
                    placeholder="البريد الإلكتروني..."
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5"
                  />
                  <button type="submit" className="w-full py-3 bg-emerald-900 text-white font-bold rounded-xl">
                    حفظ وإنشاء الحساب
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. ROLES & RBAC TAB */}
      {activeTab === "roles" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-4 text-xs">
          <h2 className="text-base font-black text-emerald-950 border-b border-stone-100 pb-3">
            نظام التحكم بالصلاحيات (Role-Based Access Control - RBAC)
          </h2>
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 font-bold">
            لكل بوابة بالمنصة حزمة صلاحيات منفصلة ويمكن تخصيص أدوار جديدة للمستقبل بسهولة.
          </div>
        </div>
      )}

      {/* 4. PORTALS MANAGEMENT TAB */}
      {activeTab === "portals" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-5 text-xs">
          <h2 className="text-base font-black text-emerald-950 border-b border-stone-100 pb-3">
            التحكم بالحالة التشغيلية للبوابات الثمانية
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portalConfigs.map((p) => (
              <div key={p.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{p.nameAr}</h4>
                  <div className="text-stone-500 mt-1">المستخدمون النشطون: {p.activeUsersCount}</div>
                </div>

                <button
                  onClick={() => togglePortalStatus(p.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                    p.isEnabled ? "bg-emerald-900 text-white" : "bg-stone-300 text-stone-700"
                  }`}
                >
                  {p.isEnabled ? "مفعّلة" : "معطّلة"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SERVICES TAB */}
      {activeTab === "services" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-5 text-xs">
          <h2 className="text-base font-black text-emerald-950 border-b border-stone-100 pb-3">
            إدارة خدمات الذكاء الاصطناعي والمحركات الأساسية
          </h2>

          <div className="space-y-3">
            {servicesConfigs.map((s) => (
              <div key={s.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{s.nameAr}</h4>
                  <div className="text-stone-500 mt-1">الاستدعاءات الشهرية: {s.monthlyCalls}</div>
                </div>

                <button
                  onClick={() => toggleServiceStatus(s.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                    s.isEnabled ? "bg-emerald-900 text-white" : "bg-stone-300 text-stone-700"
                  }`}
                >
                  {s.isEnabled ? "الخدمة تعمل" : "متوقفة للصيانة"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. SECURITY TAB */}
      {activeTab === "security" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-4 text-xs">
          <h2 className="text-base font-black text-emerald-950 border-b border-stone-100 pb-3">
            لوحة الأمان وتنبيهات الجدار الناري
          </h2>

          <div className="space-y-3">
            {securityAlerts.map((sec) => (
              <div key={sec.id} className="p-4 bg-amber-50 rounded-2xl border border-amber-300 space-y-1">
                <div className="font-bold text-emerald-950">{sec.titleAr}</div>
                <div className="text-stone-600">{sec.detailsAr}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. BACKUPS TAB */}
      {activeTab === "backups" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-5 text-xs">
          <div className="flex justify-between items-center border-b border-stone-100 pb-3">
            <h2 className="text-base font-black text-emerald-950">النسخ الاحتياطية لقواعد البيانات</h2>
            <button
              onClick={handleCreateNewBackup}
              className="px-4 py-2 bg-emerald-900 text-white font-bold rounded-xl cursor-pointer"
            >
              أخذ نسخة الآن
            </button>
          </div>

          <div className="space-y-3">
            {backupsList.map((b) => (
              <div key={b.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex justify-between items-center">
                <div>
                  <div className="font-mono font-bold text-stone-900">{b.filename}</div>
                  <div className="text-stone-500 mt-1">{b.createdAt} • الحجم: {b.sizeMB} MB</div>
                </div>

                <button
                  onClick={() => {
                    setSelectedBackup(b);
                    setIsRestoreModalOpen(true);
                  }}
                  className="px-3 py-1.5 bg-amber-400 text-emerald-950 font-black rounded-xl cursor-pointer"
                >
                  استعادة النسخة
                </button>
              </div>
            ))}
          </div>

          {isRestoreModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-md rounded-3xl p-6 space-y-4 text-center border border-stone-200 shadow-2xl">
                <h3 className="font-black text-emerald-950 text-base">تأكيد استعادة النسخة الاحتياطية</h3>
                <p className="text-stone-600">هل أنت تأكد من استعادة ملف البيانات {selectedBackup?.filename}؟</p>
                
                {restoreProgressMsg ? (
                  <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl font-bold">
                    جاري استعادة البيانات والتهيأة...
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleRestoreBackup}
                      className="flex-1 py-2.5 bg-emerald-900 text-white font-bold rounded-xl"
                    >
                      بدء الاستعادة
                    </button>
                    <button
                      onClick={() => setIsRestoreModalOpen(false)}
                      className="flex-1 py-2.5 bg-stone-200 text-stone-800 font-bold rounded-xl"
                    >
                      إلغاء
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 8. PERFORMANCE TAB */}
      {activeTab === "performance" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-4 text-xs">
          <h2 className="text-base font-black text-emerald-950 border-b border-stone-100 pb-3">
            مراقبة الأداء، استهلاك الموارد وسعة الخوادم
          </h2>
          <div className="p-4 bg-stone-50 rounded-2xl text-stone-700">
            استهلاك وحدة المعالجة المركزية CPU: 18% | الذاكرة العشوائية RAM: 32% | سرعة الاستجابة Average Latency: 42ms.
          </div>
        </div>
      )}

      {/* 9. AUDIT LOGS TAB */}
      {activeTab === "audit_logs" && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-5 text-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-100 pb-3">
            <h2 className="text-base font-black text-emerald-950">السجلات الشاملة للعمليات بالنظام</h2>
            <input
              type="text"
              placeholder="البحث الشامل بالسجل..."
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 w-full sm:w-64"
            />
          </div>

          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold text-stone-900">{log.userName}</span>
                  <span className="font-mono text-stone-400 text-[10px]">{log.timestamp}</span>
                </div>
                <div className="text-emerald-900 font-bold">{log.operationType}</div>
                <div className="text-stone-600">{log.detailsAr}</div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
