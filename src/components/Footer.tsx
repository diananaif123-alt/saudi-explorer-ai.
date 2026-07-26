import React from "react";
import { LanguageCode, ViewMode } from "../types";
import { getTranslation } from "../data/translations";
import { Compass, Sparkles, ShieldCheck, Heart } from "lucide-react";

interface FooterProps {
  language: LanguageCode;
  onSelectView: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onSelectView }) => {
  const t = getTranslation(language);

  return (
    <footer className="bg-emerald-950 text-white border-t border-emerald-900 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg tracking-tight">SAUDI EXPLORER AI</span>
            </div>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              المنصة السياحية الوطنية الذكية الموحدة للمملكة العربية السعودية، لاكتشاف المعالم والأنشطة وتخطيط الرحلات بالذكاء الاصطناعي.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-[11px] font-bold border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>اكتشف السعودية بذكاء</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-amber-300 mb-3">القوائم السريعة</h4>
            <ul className="space-y-2 text-xs text-emerald-100/90">
              <li>
                <button onClick={() => onSelectView("home")} className="hover:text-amber-300 cursor-pointer">
                  {t.navHome}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView("ai-assistant")} className="hover:text-amber-300 cursor-pointer">
                  {t.navAiAssistant}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView("destinations")} className="hover:text-amber-300 cursor-pointer">
                  {t.navDestinations}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView("services")} className="hover:text-amber-300 cursor-pointer">
                  {t.navServices}
                </button>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-bold text-sm text-amber-300 mb-3">أبرز الوجهات</h4>
            <ul className="space-y-2 text-xs text-emerald-100/90">
              <li>العُلا ومسرح مرايا</li>
              <li>الرياض والدرعية التاريخية</li>
              <li>جدة والبحر الأحمر</li>
              <li>أبها وعسير الخضراء</li>
              <li>تبوك ونيوم ووادي الديسة</li>
            </ul>
          </div>

          {/* MVP Disclaimer Notice */}
          <div className="p-4 bg-emerald-900/60 rounded-2xl border border-emerald-800 text-xs space-y-2">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>إشعار النموذج الأولي (MVP)</span>
            </div>
            <p className="text-[11px] text-emerald-100/80 leading-relaxed">
              {t.footerMvpNotice}
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/70 gap-4 text-center">
          <div>{t.footerRights}</div>
          <div className="flex items-center gap-1">
            <span>صُمم بفخامة واحترافية للمملكة العربية السعودية</span>
            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
};
