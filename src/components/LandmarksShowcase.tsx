import React from "react";
import { LanguageCode } from "../types";
import { Camera, MapPin, ArrowUpRight, Sparkles } from "lucide-react";

interface LandmarksShowcaseProps {
  language: LanguageCode;
  onSelectDestination: (destId: string) => void;
}

export const LandmarksShowcase: React.FC<LandmarksShowcaseProps> = ({
  language,
  onSelectDestination
}) => {
  const landmarks = [
    {
      id: "at-turaif",
      nameAr: "حي الطريف التاريخي بالدرعية (مجسم 3D)",
      nameEn: "At-Turaif Historic District 3D Render",
      locationAr: "الدرعية - الرياض",
      locationEn: "Diriyah, Riyadh",
      image: "/src/assets/images/diriyah_3d_landmark_1785089203376.jpg",
      destinationId: "riyadh",
      badgeAr: "نمذجة 3D يونسكو",
      badgeEn: "3D UNESCO Heritage"
    },
    {
      id: "hegra",
      nameAr: "موقع الحِجْر ومدائن صالح (مجسم 3D)",
      nameEn: "Hegra World Heritage 3D Site",
      locationAr: "العُلا - المدينة المنورة",
      locationEn: "AlUla, Madinah",
      image: "/src/assets/images/alula_3d_landmark_1785089188749.jpg",
      destinationId: "alula",
      badgeAr: "عرض 3D ثلاثي الأبعاد",
      badgeEn: "3D Heritage View"
    },
    {
      id: "al-balad",
      nameAr: "حي البلد التاريخي بجدة (مجسم 3D)",
      nameEn: "Historic Al-Balad Jeddah 3D",
      locationAr: "جدة - مكة المكرمة",
      locationEn: "Jeddah, Makkah",
      image: "/src/assets/images/jeddah_3d_landmark_1785089227156.jpg",
      destinationId: "jeddah",
      badgeAr: "رواشين 3D تراثية",
      badgeEn: "3D Roshan Heritage"
    },
    {
      id: "soudah",
      nameAr: "قمم جبال السودة الخضراء (مجسم 3D)",
      nameEn: "Soudah Mountain Peaks 3D",
      locationAr: "أبها - عسير",
      locationEn: "Abha, Asir",
      image: "/src/assets/images/soudah_3d_landmark_1785089254175.jpg",
      destinationId: "abha",
      badgeAr: "طبيعة جبلية 3D",
      badgeEn: "3D Mountain Nature"
    },
    {
      id: "riyadh-skyline",
      nameAr: "أبراج عاصمة المستقبل الرياض (مجسم 3D)",
      nameEn: "Riyadh Towers & Skyline 3D",
      locationAr: "العاصمة - الرياض",
      locationEn: "Capital City, Riyadh",
      image: "/src/assets/images/riyadh_3d_landmark_1785089216043.jpg",
      destinationId: "riyadh",
      badgeAr: "أبراج الرياض 3D",
      badgeEn: "3D Riyadh Skyline"
    },
    {
      id: "neom-line",
      nameAr: "نيوم وذا لاين المستقبلية (مجسم 3D)",
      nameEn: "NEOM The Line Vision 3D",
      locationAr: "نيوم - تبوك",
      locationEn: "NEOM, KSA",
      image: "/src/assets/images/neom_3d_landmark_1785089241501.jpg",
      destinationId: "tabuk",
      badgeAr: "رؤية المستقبل 3D",
      badgeEn: "3D Futuristic NEOM"
    },
    {
      id: "maraya",
      nameAr: "مسرح مرايا العاكس بالعُلا (مجسم 3D)",
      nameEn: "Maraya Concert Hall 3D",
      locationAr: "العُلا - صحراء العشار",
      locationEn: "AlUla Desert",
      image: "/src/assets/images/alula_3d_landmark_1785089188749.jpg",
      destinationId: "alula",
      badgeAr: "مبنى المرايا 3D",
      badgeEn: "3D Mirrored Hall"
    },
    {
      id: "diriyah-palace",
      nameAr: "قصور الدرعية التاريخية (مجسم 3D)",
      nameEn: "Diriyah Historic Palaces 3D",
      locationAr: "الدرعية - العاصمة",
      locationEn: "Diriyah, Capital Region",
      image: "/src/assets/images/diriyah_3d_landmark_1785089203376.jpg",
      destinationId: "riyadh",
      badgeAr: "تراث نجدي 3D",
      badgeEn: "3D Najdi Palace"
    }
  ];

  return (
    <section className="py-12 bg-stone-900 text-white relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/60 via-stone-900 to-black/90 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold mb-2">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === "ar" ? "معالم المملكة الأيقونية" : "Iconic Saudi Landmarks"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              {language === "ar" ? "أبرز معالم المناطق بالصور والأسماء" : "Prominent Regional Landmarks"}
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl">
              {language === "ar"
                ? "تصفح معالم كل منطقة بصورها الدقيقة، وقم بالضغط على أي معلم للذهاب مباشرة إلى تفاصيل المنطقة."
                : "Browse iconic landmarks with exact visuals and names. Click any landmark to view regional details."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-300 font-bold bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === "ar" ? "8 معالم رئيسية" : "8 Key Landmarks"}</span>
            </span>
          </div>
        </div>

        {/* Landmarks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {landmarks.map((landmark) => {
            const name = language === "ar" ? landmark.nameAr : landmark.nameEn;
            const location = language === "ar" ? landmark.locationAr : landmark.locationEn;
            const badge = language === "ar" ? landmark.badgeAr : landmark.badgeEn;

            return (
              <div
                key={landmark.id}
                onClick={() => onSelectDestination(landmark.destinationId)}
                className="group relative h-72 rounded-3xl overflow-hidden border border-stone-800/80 bg-stone-800 shadow-md hover:shadow-2xl hover:border-amber-400/60 transition-all duration-300 cursor-pointer flex flex-col justify-between p-5"
              >
                {/* Background Image */}
                <img
                  src={landmark.image}
                  alt={name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-stone-900/80 backdrop-blur-md text-amber-300 border border-amber-400/30">
                    {badge}
                  </span>
                  <div className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white group-hover:bg-amber-400 group-hover:text-stone-950 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Title & Location */}
                <div className="relative z-10">
                  <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                    {name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
