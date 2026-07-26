import React, { useState } from "react";
import { ViewMode, UserRole } from "../types";
import {
  Compass,
  MapPin,
  Building2,
  Calendar,
  Sparkles,
  Bot,
  Mic,
  Box,
  Car,
  Map as MapIcon,
  Ticket,
  Wallet,
  Award,
  Heart,
  History,
  Languages,
  CloudSun,
  Bell,
  PhoneCall,
  HelpCircle,
  User,
  Settings,
  Lock,
  LogOut,
  ChevronDown,
  ChevronLeft,
  X,
  Layers,
  Shield,
  Briefcase,
  Building,
  UserCheck
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: ViewMode;
  onSelectView: (view: ViewMode, targetId?: string) => void;
  userRole?: UserRole;
  onLogout?: () => void;
}

interface NavSection {
  id: string;
  titleAr: string;
  titleEn: string;
  icon: React.ElementType;
  items: {
    id: string;
    labelAr: string;
    labelEn: string;
    view: ViewMode;
    badge?: string;
    targetId?: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentView,
  onSelectView,
  userRole = "tourist",
  onLogout
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    main: true,
    "role-portals": true,
    explore: true,
    ai: true,
    trips: false
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const sections: NavSection[] = [
    {
      id: "main",
      titleAr: "الرئيسية والبوابات",
      titleEn: "Home & Portals",
      icon: Compass,
      items: [
        { id: "home", labelAr: "الصفحة الرئيسية للمنصة", labelEn: "Platform Home", view: "home" },
        { id: "portal", labelAr: "لوحة التحكم للبوابة الحالية", labelEn: "Current Portal Dashboard", view: "portal", badge: userRole }
      ]
    },
    {
      id: "role-portals",
      titleAr: "بوابات القطاعات والأدوار الوطنية (8 بوابات)",
      titleEn: "National Role Portals (8 Portals)",
      icon: Layers,
      items: [
        { id: "p-tourist", labelAr: "1. بوابة السائح الزائر الشاملة", labelEn: "1. Tourist Portal", view: "tourist-portal", badge: "Tourist" },
        { id: "p-citizen", labelAr: "2. بوابة المواطن والمقيم", labelEn: "2. Citizen Portal", view: "citizen-portal", badge: "Citizen" },
        { id: "p-investor", labelAr: "3. بوابة المستثمر السياحي", labelEn: "3. Investor Portal", view: "investor-portal", badge: "Investor" },
        { id: "p-tourguide", labelAr: "4. بوابة المرشد السياحي", labelEn: "4. Tour Guide Portal", view: "tourguide-portal", badge: "Guide" },
        { id: "p-establishment", labelAr: "5. بوابة المنشأة السياحية", labelEn: "5. Establishment Portal", view: "establishment-portal", badge: "Biz" },
        { id: "p-provider", labelAr: "6. بوابة مزودي الخدمات والتنقل", labelEn: "6. Service Provider Portal", view: "provider-portal", badge: "Vendor" },
        { id: "p-ministry", labelAr: "7. بوابة وزارة السياحة والرقابة", labelEn: "7. Ministry Portal", view: "ministry-portal", badge: "Ministry" },
        { id: "p-superadmin", labelAr: "8. بوابة مدير النظام والأمن", labelEn: "8. Super Admin Portal", view: "superadmin-portal", badge: "Admin" }
      ]
    },
    {
      id: "explore",
      titleAr: "استكشف المملكة",
      titleEn: "Explore Saudi",
      icon: MapPin,
      items: [
        { id: "cities", labelAr: "المدن والوجهات الرئيسية", labelEn: "Cities & Destinations", view: "destinations" },
        { id: "map", labelAr: "الخريطة التفاعلية والآثار", labelEn: "Interactive Map", view: "map-explorer" },
        { id: "heritage", labelAr: "المواقع التاريخية والمتاحف", labelEn: "Heritage & Museums", view: "destinations" },
        { id: "nature", labelAr: "الشواطئ، الجبال والحدائق", labelEn: "Nature & Parks", view: "destinations" }
      ]
    },
    {
      id: "stay",
      titleAr: "الإقامة والطعام",
      titleEn: "Accommodation & Dining",
      icon: Building2,
      items: [
        { id: "hotels", labelAr: "الفنادق والمنتجعات والشقق", labelEn: "Hotels & Stays", view: "services" },
        { id: "dining", labelAr: "المطاعم والطهي الأصيل والمقاهي", labelEn: "Restaurants & Cafes", view: "services" }
      ]
    },
    {
      id: "activities",
      titleAr: "الأنشطة والفعاليات",
      titleEn: "Activities & Events",
      icon: Calendar,
      items: [
        { id: "events", labelAr: "مواسم وفعاليات المملكة", labelEn: "Seasons & Events", view: "services" },
        { id: "tours", labelAr: "الجولات والرحلات السياحية", labelEn: "Guided Tours", view: "services" }
      ]
    },
    {
      id: "ai",
      titleAr: "الذكاء الاصطناعي والتكولوجيا",
      titleEn: "AI & Smart Tech",
      icon: Sparkles,
      items: [
        { id: "ai-hub-nav", labelAr: "مركز الذكاء الاصطناعي الرئيسي", labelEn: "AI Hub Center", view: "ai-hub", badge: "AI Hub" },
        { id: "ai-planner", labelAr: "خطط رحلتك بالذكاء الاصطناعي", labelEn: "AI Trip Planner", view: "ai-hub" },
        { id: "ai-concierge", labelAr: "المساعد السياحي الذكي الصوتي", labelEn: "Smart Voice Assistant", view: "ai-hub" },
        { id: "ar-view", labelAr: "الواقع المعزز AR والمجسمات 3D", labelEn: "AR & 3D Interactive", view: "ai-hub", badge: "3D" }
      ]
    },
    {
      id: "transport",
      titleAr: "التنقل والرحلات",
      titleEn: "Transport & Rides",
      icon: Car,
      items: [
        { id: "explorer-ride", labelAr: "Explorer Ride (حجز المواصلات الذكي)", labelEn: "Explorer Ride", view: "explorer-ride", badge: "Ride" },
        { id: "car-rental", labelAr: "تأجير السيارات ووسائل النقل", labelEn: "Car Rental", view: "services" }
      ]
    },
    {
      id: "trips",
      titleAr: "حجوزاتي ومحفظتي",
      titleEn: "My Bookings & Wallet",
      icon: Ticket,
      items: [
        { id: "my-bookings", labelAr: "الحجوزات والمحفظة الموحدة", labelEn: "My Bookings & Wallet", view: "bookings", badge: "Wallet" },
        { id: "digital-wallet", labelAr: "المحفظة الرقمية ونقاط المكافآت", labelEn: "Digital Wallet & Points", view: "bookings" },
        { id: "passport-badge", labelAr: "الجواز السياحي والمفضلة", labelEn: "Tourism Passport & Saved", view: "profile" }
      ]
    },
    {
      id: "services",
      titleAr: "الخدمات والدعم",
      titleEn: "Services & Support",
      icon: Shield,
      items: [
        { id: "visa", labelAr: "التأشيرات والتصاريح eVisa", labelEn: "eVisas & Permits", view: "visa-portal" },
        { id: "translate", labelAr: "الترجمة الفورية للرحلات", labelEn: "Instant Translation", view: "ai-assistant" },
        { id: "weather", labelAr: "طقس وتوقعات المناطق", labelEn: "KSA Weather Forecast", view: "map-explorer" }
      ]
    },
    {
      id: "account",
      titleAr: "إعدادات الحساب",
      titleEn: "Account & Settings",
      icon: User,
      items: [
        { id: "profile-info", labelAr: "الملف الشخصي وتحديث البيانات", labelEn: "Profile Info", view: "profile" },
        { id: "settings-view", labelAr: "إعدادات المنصة والمظهر", labelEn: "Platform Settings", view: "settings" }
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-emerald-950/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-80 sm:w-96 bg-white text-stone-900 shadow-2xl flex flex-col h-full border-s border-stone-200">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-emerald-900 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 font-black flex items-center justify-center text-lg shadow-sm">
                S
              </div>
              <div>
                <h3 className="font-extrabold text-base tracking-tight text-white">SAUDI EXPLORER AI</h3>
                <p className="text-xs text-amber-200 font-medium">القائمة السياحية الموحدة</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Quick Role Card */}
          <div className="p-4 bg-emerald-50/70 border-b border-emerald-100/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                {userRole.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <span className="text-xs text-stone-500 font-medium">نوع البوابة الحالية:</span>
                <div className="font-bold text-xs text-emerald-950 capitalize">{userRole} Portal</div>
              </div>
            </div>
            <button
              onClick={() => {
                onSelectView("portal");
                onClose();
              }}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-white px-2.5 py-1.5 rounded-lg border border-emerald-200 shadow-2xs cursor-pointer"
            >
              دخول البوابة
            </button>
          </div>

          {/* Collapsible Accordion Sections */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {sections.map((section) => {
              const SectionIcon = section.icon;
              const isSectionOpen = openSections[section.id] ?? false;

              return (
                <div key={section.id} className="border border-stone-200/80 rounded-2xl overflow-hidden bg-white shadow-2xs">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-3.5 bg-stone-50/70 hover:bg-emerald-50/50 transition-colors text-right cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 font-bold text-xs sm:text-sm text-stone-900">
                      <SectionIcon className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{section.titleAr}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                        isSectionOpen ? "rotate-180 text-emerald-700" : ""
                      }`}
                    />
                  </button>

                  {isSectionOpen && (
                    <div className="p-2 space-y-1 bg-white divide-y divide-stone-50">
                      {section.items.map((item) => {
                        const isActive = currentView === item.view;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              onSelectView(item.view, item.targetId);
                              onClose();
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-right cursor-pointer ${
                              isActive
                                ? "bg-emerald-900 text-white font-bold shadow-xs"
                                : "text-stone-700 hover:bg-emerald-50/70 hover:text-emerald-950"
                            }`}
                          >
                            <span className="truncate">{item.labelAr}</span>
                            {item.badge && (
                              <span
                                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                  isActive
                                    ? "bg-amber-400 text-emerald-950"
                                    : "bg-emerald-100 text-emerald-900"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                onSelectView("settings");
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-stone-100 text-stone-800 text-xs font-bold rounded-xl border border-stone-200 transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4 text-emerald-700" />
              <span>الإعدادات</span>
            </button>

            {onLogout && (
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>خروج</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
