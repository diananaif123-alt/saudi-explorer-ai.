import React, { useState, useRef, useEffect } from "react";
import { ViewMode, UserRole, LanguageCode } from "../types";
import { LANGUAGES_LIST, getTranslation } from "../data/translations";
import { SmartSearch } from "./SmartSearch";
import {
  Compass,
  Menu,
  Globe,
  Bell,
  User,
  Settings,
  Lock,
  LogOut,
  ChevronDown,
  Sparkles,
  Shield,
  Layers,
  Building,
  UserCheck,
  Briefcase
} from "lucide-react";

interface TopBarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode, targetId?: string) => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  userRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onOpenSidebar: () => void;
  savedTripsCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentView,
  onSelectView,
  language,
  onSelectLanguage,
  userRole,
  onSelectRole,
  onOpenSidebar,
  savedTripsCount
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const t = getTranslation(language);

  const ROLES_LIST: { id: UserRole; nameAr: string; nameEn: string; icon: React.ElementType }[] = [
    { id: "tourist", nameAr: "السائح الزائر", nameEn: "Tourist Portal", icon: Compass },
    { id: "citizen", nameAr: "المواطن والمقيم", nameEn: "Citizen Portal", icon: UserCheck },
    { id: "investor", nameAr: "المستثمر السياحي", nameEn: "Investor Portal", icon: Briefcase },
    { id: "tour-guide", nameAr: "المرشد السياحي", nameEn: "Tour Guide", icon: Shield },
    { id: "establishment", nameAr: "المنشأة السياحية", nameEn: "Tourism Establishment", icon: Building },
    { id: "service-provider", nameAr: "مزود الخدمات", nameEn: "Service Provider", icon: Layers },
    { id: "tourism-ministry", nameAr: "وزارة السياحة", nameEn: "Ministry of Tourism", icon: Sparkles },
    { id: "super-admin", nameAr: "مدير النظام", nameEn: "Super Admin", icon: Settings }
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setIsRoleDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentRoleObj = ROLES_LIST.find((r) => r.id === userRole) || ROLES_LIST[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          
          {/* Left / Start: Sidebar Trigger + Logo + Quick Portals Direct Link */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSidebar}
              className="p-2.5 text-emerald-950 hover:bg-emerald-50 rounded-2xl border border-stone-200 transition-colors cursor-pointer"
              title="فتح القائمة الرئيسية"
            >
              <Menu className="w-5 h-5 text-emerald-900" />
            </button>

            <button
              onClick={() => onSelectView("home")}
              className="flex items-center gap-2.5 group text-right cursor-pointer"
            >
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 p-2 shadow-md flex items-center justify-center border border-amber-400/30 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-amber-300" />
              </div>
              <div className="hidden sm:flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base sm:text-lg text-emerald-950 tracking-tight">
                    SAUDI EXPLORER
                  </span>
                  <span className="bg-amber-400 text-emerald-950 font-black text-[10px] px-1.5 py-0.2 rounded-md shadow-2xs">
                    AI
                  </span>
                </div>
                <span className="text-[11px] font-medium text-emerald-800 tracking-wide">
                  {t.tagline}
                </span>
              </div>
            </button>

            {/* Direct Link to Portals View */}
            <button
              onClick={() => onSelectView("portal")}
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-black rounded-xl shadow-2xs transition-all cursor-pointer"
              title="الانتقال للبوابات الوطنية"
            >
              <Layers className="w-4 h-4" />
              <span>البوابات الوطنية (8)</span>
            </button>
          </div>

          {/* Center: Search Box (On Medium / Large screens) */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SmartSearch onSelectView={onSelectView} placeholder="ابحث المباشر السريع..." />
          </div>

          {/* Right / End Controls: Role Switcher + Notifications + Lang + Profile Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Role Switcher Dropdown (Visible on ALL devices) */}
            <div ref={roleRef} className="relative flex">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-950 text-xs font-bold rounded-xl border border-emerald-200 transition-colors cursor-pointer"
              >
                <currentRoleObj.icon className="w-4 h-4 text-emerald-800" />
                <span className="max-w-[100px] sm:max-w-none truncate">{currentRoleObj.nameAr}</span>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-700" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3.5 py-2 text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                    اختر البوابة المخصصة (Role Portal)
                  </div>
                  <div className="max-h-72 overflow-y-auto py-1">
                    {ROLES_LIST.map((role) => {
                      const Icon = role.icon;
                      const isSelected = userRole === role.id;
                      return (
                        <button
                          key={role.id}
                          onClick={() => {
                            onSelectRole(role.id);
                            setIsRoleDropdownOpen(false);
                            onSelectView("portal");
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-right hover:bg-emerald-50 transition-colors cursor-pointer ${
                            isSelected ? "bg-emerald-50 font-bold text-emerald-950" : "text-stone-700"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${isSelected ? "text-amber-500" : "text-emerald-700"}`} />
                            <span>{role.nameAr}</span>
                          </div>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-700" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Dropdown */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2.5 text-stone-700 hover:bg-stone-100 rounded-2xl border border-stone-200 transition-colors cursor-pointer"
                title="الإشعارات والتنبيهات"
              >
                <Bell className="w-5 h-5 text-emerald-900" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-white animate-pulse" />
              </button>

              {isNotificationsOpen && (
                <div className="absolute left-0 sm:right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-stone-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-3">
                    <h4 className="font-extrabold text-sm text-stone-900">تنبيهات المنصة الوطنية</h4>
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      جديد
                    </span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100 text-stone-800">
                      <div className="font-bold text-emerald-950 mb-0.5">مرحباً بك في SAUDI EXPLORER AI</div>
                      <p className="text-stone-600">تم تفعيل حسابك بنجاح. يمكنك الآن استخدام المساعد الذكي وحجز الرحلات.</p>
                      <span className="text-[10px] text-stone-400 mt-1 block">منذ 5 دقائق</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 text-stone-800">
                      <div className="font-bold text-stone-900 mb-0.5">تأشيرة eVisa الموحدة</div>
                      <p className="text-stone-600">اكتشف إمكانية الحصول على التأشيرة الإلكترونية الفورية خلال دقيقة واحدة.</p>
                      <span className="text-[10px] text-stone-400 mt-1 block">منذ ساعة</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="p-2.5 text-stone-700 hover:bg-stone-100 rounded-2xl border border-stone-200 transition-colors cursor-pointer flex items-center gap-1"
                title="تغيير اللغة"
              >
                <Globe className="w-5 h-5 text-emerald-900" />
              </button>

              {isLangOpen && (
                <div className="absolute left-0 sm:right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                    اختر اللغة
                  </div>
                  <div className="max-h-56 overflow-y-auto py-1">
                    {LANGUAGES_LIST.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onSelectLanguage(lang.code as LanguageCode);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-right hover:bg-emerald-50 transition-colors cursor-pointer ${
                          language === lang.code ? "bg-emerald-50 text-emerald-950 font-bold" : "text-stone-700"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                        {language === lang.code && <span className="w-2 h-2 rounded-full bg-emerald-700" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar & Account Menu Dropdown */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 sm:pe-3 bg-stone-100 hover:bg-stone-200/80 rounded-2xl border border-stone-200 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-amber-300 font-bold flex items-center justify-center text-xs shadow-2xs">
                  S
                </div>
                <span className="hidden sm:inline text-xs font-bold text-emerald-950">
                  مستخدم المنصة
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 hidden sm:block" />
              </button>

              {isProfileOpen && (
                <div className="absolute left-0 sm:right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  
                  {/* User Brief */}
                  <div className="px-4 py-3 border-b border-stone-100 bg-emerald-50/50">
                    <div className="font-extrabold text-sm text-emerald-950">زائر المنصة الوطنية</div>
                    <div className="text-xs text-stone-500 font-medium">user@saudiexplorer.ai</div>
                    <span className="mt-1.5 inline-block bg-amber-400 text-emerald-950 font-bold text-[10px] px-2 py-0.5 rounded-full capitalize">
                      {userRole} Portal
                    </span>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        onSelectView("portal");
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-right text-stone-800 hover:bg-emerald-50 font-bold cursor-pointer"
                    >
                      <Compass className="w-4 h-4 text-emerald-700" />
                      <span>لوحة التحكم الخاصة بك ({userRole})</span>
                    </button>

                    <button
                      onClick={() => {
                        onSelectView("profile");
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-right text-stone-800 hover:bg-emerald-50 font-medium cursor-pointer"
                    >
                      <User className="w-4 h-4 text-emerald-700" />
                      <span>الملف الشخصي والحجوزات ({savedTripsCount})</span>
                    </button>

                    <button
                      onClick={() => {
                        onSelectView("settings");
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-right text-stone-800 hover:bg-emerald-50 font-medium cursor-pointer"
                    >
                      <Settings className="w-4 h-4 text-emerald-700" />
                      <span>إعدادات الحساب والمظهر</span>
                    </button>

                    <button
                      onClick={() => {
                        onSelectView("password-recovery");
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-right text-stone-800 hover:bg-emerald-50 font-medium cursor-pointer"
                    >
                      <Lock className="w-4 h-4 text-emerald-700" />
                      <span>تغيير كلمة المرور</span>
                    </button>
                  </div>

                  <div className="border-t border-stone-100 pt-1 mt-1">
                    <button
                      onClick={() => {
                        onSelectView("auth");
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-right text-rose-700 hover:bg-rose-50 font-bold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-600" />
                      <span>تسجيل الخروج / تبديل الحساب</span>
                    </button>
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
