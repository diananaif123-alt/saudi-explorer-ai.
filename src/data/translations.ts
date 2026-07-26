export interface TranslationDictionary {
  appName: string;
  tagline: string;
  mvpBadgeTitle: string;
  mvpBadgeDesc: string;
  navHome: string;
  navAiAssistant: string;
  navDestinations: string;
  navServices: string;
  navMap: string;
  navVisa: string;
  navProfile: string;
  heroTitle: string;
  heroSub: string;
  searchPlaceholder: string;
  searchBtn: string;
  aiQuickPrompt: string;
  trendingDestinations: string;
  unifiedServices: string;
  hotels: string;
  restaurants: string;
  transport: string;
  events: string;
  mapTitle: string;
  mapSub: string;
  exploreBtn: string;
  bookNowBtn: string;
  bookDemoTitle: string;
  aiChatTitle: string;
  aiChatWelcome: string;
  visaTitle: string;
  visaSub: string;
  checkVisaBtn: string;
  savedTripsTitle: string;
  footerRights: string;
  footerMvpNotice: string;
  languageName: string;
}

export const LANGUAGES_LIST = [
  { code: "ar", name: "العربية (Arabic)", dir: "rtl", flag: "🇸🇦" },
  { code: "en", name: "English", dir: "ltr", flag: "🇬🇧" },
  { code: "fr", name: "Français (French)", dir: "ltr", flag: "🇫🇷" },
  { code: "zh", name: "中文 (Chinese)", dir: "ltr", flag: "🇨🇳" },
  { code: "de", name: "Deutsch (German)", dir: "ltr", flag: "🇩🇪" },
  { code: "es", name: "Español (Spanish)", dir: "ltr", flag: "🇪🇸" },
  { code: "ru", name: "Русский (Russian)", dir: "ltr", flag: "🇷🇺" },
  { code: "ja", name: "日本語 (Japanese)", dir: "ltr", flag: "🇯🇵" },
  { code: "tr", name: "Türkçe (Turkish)", dir: "ltr", flag: "🇹🇷" },
  { code: "ur", name: "اردو (Urdu)", dir: "rtl", flag: "🇵🇰" }
];

export const TRANSLATIONS: Record<string, TranslationDictionary> = {
  ar: {
    appName: "SAUDI EXPLORER AI",
    tagline: "اكتشف السعودية بذكاء",
    mvpBadgeTitle: "النموذج الأولي الوطني (MVP)",
    mvpBadgeDesc: "البيانات المعروضة تجريبية للعرض والمحاكاة، والبنية جاهزة للتكامل المستقبلي مع القطاعات والجهات السياحية.",
    navHome: "الرئيسية",
    navAiAssistant: "مساعد السفر AI",
    navDestinations: "الوجهات والمناطق",
    navServices: "الخدمات الموحدة",
    navMap: "الخريطة التفاعلية",
    navVisa: "التأشيرات والتصاريح",
    navProfile: "رحلاتي المحفوظة",
    heroTitle: "مرحباً بكم في أرض الحضارات والأنغام والأحلام",
    heroSub: "المنصة السياحية الذكية الموحدة لاكتشاف معالم المملكة وتخطيط رحلتك المثالية بنقرة واحدة.",
    searchPlaceholder: "أين تريد أن تذهب في السعودية؟ (مثال: خطط لرحلة 3 أيام إلى العُلا)",
    searchBtn: "ابحث بالذكاء الاصطناعي",
    aiQuickPrompt: "اطلب من AI تخطيط رحلتك",
    trendingDestinations: "أبرز الوجهات والمناطق السياحية",
    unifiedServices: "الخدمات السياحية الموحدة",
    hotels: "الإقامة والفنادق",
    restaurants: "المطاعم والطهي الأصيل",
    transport: "النقل والرحلات",
    events: "الفعاليات والمواسم",
    mapTitle: "استكشف المملكة عبر الخريطة التفاعلية",
    mapSub: "اضغط على أي منطقة للاطلاع على أهم الآثار والمنتجعات والفعاليات في الوقت الفعلي",
    exploreBtn: "استكشف التفاصيل",
    bookNowBtn: "حجز تجريبي مباشر",
    bookDemoTitle: "محاكاة الحجز السياحي الموحد",
    aiChatTitle: "مستشار SAUDI EXPLORER AI الذكي",
    aiChatWelcome: "أهلاً بك! أنا مستشارك الذكي للسفر في المملكة العربية السعودية. كيف يمكنني مساعدتك في تخطيط رحلتك اليوم؟",
    visaTitle: "بوابة التأشيرات والتصاريح السياحية (eVisa)",
    visaSub: "استعلم عن إمكانية الحصول على التأشيرة الإلكترونية الفورية وخطوات الدخول السريعة.",
    checkVisaBtn: "استعلام فوري عن التأشيرة",
    savedTripsTitle: "مسارات رحلاتي وجداولي المحفوظة",
    footerRights: "جميع الحقوق محفوظة منصة SAUDI EXPLORER AI © 2026",
    footerMvpNotice: "منصة سياحية وطنية ذكية - جميع البيانات والأنظمة المعروضة هي نموذج أولي (MVP) جاهز للربط المستقبلي مع بوابات الخدمات الحكومية والخاصة.",
    languageName: "العربية"
  },
  en: {
    appName: "SAUDI EXPLORER AI",
    tagline: "Explore KSA Intelligently",
    mvpBadgeTitle: "National MVP Platform",
    mvpBadgeDesc: "All data displayed is demo data for preview purposes. Architecture is ready for real-time integration.",
    navHome: "Home",
    navAiAssistant: "AI Travel Concierge",
    navDestinations: "Destinations",
    navServices: "Unified Services",
    navMap: "Interactive Map",
    navVisa: "Visas & Permits",
    navProfile: "My Trips",
    heroTitle: "Welcome to the Land of Ancient Wonders & Modern Dreams",
    heroSub: "The unified intelligent tourism platform to explore Saudi Arabia and construct personalized trips in seconds.",
    searchPlaceholder: "Where do you want to go in Saudi Arabia? (e.g. Plan 3 days in AlUla)",
    searchBtn: "AI Search",
    aiQuickPrompt: "Ask AI to plan your journey",
    trendingDestinations: "Featured Saudi Destinations",
    unifiedServices: "Unified Tourism Services",
    hotels: "Hotels & Resorts",
    restaurants: "Culinary & Fine Dining",
    transport: "Transport & Trains",
    events: "Events & Seasons",
    mapTitle: "Interactive Saudi Arabia Explorer Map",
    mapSub: "Click on any region to discover heritage sites, luxury stays, and upcoming events.",
    exploreBtn: "Explore Destination",
    bookNowBtn: "Simulated Direct Booking",
    bookDemoTitle: "Unified Tourism Booking Simulation",
    aiChatTitle: "SAUDI EXPLORER AI Concierge",
    aiChatWelcome: "Welcome! I am your AI travel advisor for Saudi Arabia. How can I help customize your journey today?",
    visaTitle: "Saudi Tourist Visa & Permits Portal (eVisa)",
    visaSub: "Check your instant eVisa eligibility and entry guidelines.",
    checkVisaBtn: "Check Visa Eligibility",
    savedTripsTitle: "My Saved Itineraries & Trips",
    footerRights: "All Rights Reserved SAUDI EXPLORER AI Platform © 2026",
    footerMvpNotice: "National AI Tourism Platform - MVP release. Built ready for seamless live integration with government and private tourism APIs.",
    languageName: "English"
  }
};

export const getTranslation = (langCode: string): TranslationDictionary => {
  return TRANSLATIONS[langCode] || TRANSLATIONS["en"];
};
