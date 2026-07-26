import React, { useState } from "react";
import { ViewMode, LanguageCode } from "../types";
import { LANGUAGES_LIST, getTranslation } from "../data/translations";
import {
  Compass,
  Sparkles,
  Globe,
  MapPin,
  Calendar,
  Briefcase,
  FileCheck,
  User,
  ChevronDown,
  Menu,
  X,
  ShieldAlert,
  Car,
  Ticket
} from "lucide-react";

interface HeaderProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  savedTripsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  language,
  onSelectLanguage,
  savedTripsCount
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = getTranslation(language);

  const navItems = [
    { id: "home" as ViewMode, label: t.navHome, icon: Compass },
    { id: "ai-hub" as ViewMode, label: "مركز الذكاء الاصطناعي", icon: Sparkles, badge: "AI Hub" },
    { id: "explorer-ride" as ViewMode, label: "Explorer Ride", icon: Car, badge: "جديد" },
    { id: "bookings" as ViewMode, label: "الحجوزات والمحفظة", icon: Ticket },
    { id: "destinations" as ViewMode, label: t.navDestinations, icon: MapPin },
    { id: "services" as ViewMode, label: t.navServices, icon: Briefcase },
    { id: "map-explorer" as ViewMode, label: t.navMap, icon: Globe },
    { id: "visa-portal" as ViewMode, label: t.navVisa, icon: FileCheck },
    { id: "profile" as ViewMode, label: t.navProfile, icon: User, count: savedTripsCount }
  ];

  const activeLangObj = LANGUAGES_LIST.find((l) => l.code === language) || LANGUAGES_LIST[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <button
            onClick={() => onSelectView("home")}
            className="flex items-center gap-3 group text-right cursor-pointer"
          >
            {/* Custom SVG Emerald & Sand Gold Compass Logo Symbol */}
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 p-2 shadow-md flex items-center justify-center border border-amber-400/30 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-amber-300 animate-spin-slow" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-emerald-950 rounded-full"></span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-emerald-950 tracking-tight">
                  SAUDI EXPLORER
                </span>
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-xs px-1.5 py-0.5 rounded-md shadow-xs">
                  AI
                </span>
              </div>
              <span className="text-xs font-medium text-emerald-800 tracking-wide">
                {t.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-emerald-50/60 p-1.5 rounded-2xl border border-emerald-100">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-emerald-900 text-white shadow-sm"
                      : "text-emerald-950 hover:bg-emerald-100/70 hover:text-emerald-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-emerald-700"}`} />
                  <span>{item.label}</span>

                  {item.badge && (
                    <span className="bg-amber-400 text-emerald-950 font-extrabold text-[10px] px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}

                  {item.count !== undefined && item.count > 0 && (
                    <span className="bg-amber-400 text-emerald-950 text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Controls: Language Selector & Mobile Trigger */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-emerald-950 text-xs sm:text-sm font-medium rounded-xl border border-stone-200 transition-colors cursor-pointer"
              >
                <Globe className="w-4 h-4 text-emerald-800" />
                <span className="hidden sm:inline">{activeLangObj.name}</span>
                <span className="sm:hidden">{activeLangObj.flag}</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
              </button>

              {isLangOpen && (
                <div className="absolute left-0 sm:right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                    اختر اللغة / Select Language
                  </div>
                  <div className="max-h-64 overflow-y-auto py-1">
                    {LANGUAGES_LIST.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onSelectLanguage(lang.code as LanguageCode);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm text-right hover:bg-emerald-50 transition-colors cursor-pointer ${
                          language === lang.code ? "bg-emerald-50 text-emerald-900 font-bold" : "text-stone-700"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                        {language === lang.code && (
                          <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-emerald-950 hover:bg-stone-100 rounded-xl cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white/98 backdrop-blur-lg px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectView(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-emerald-900 text-white shadow-xs"
                    : "text-stone-700 hover:bg-emerald-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? "text-amber-300" : "text-emerald-700"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-amber-400 text-emerald-950 text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
