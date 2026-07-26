import { LanguageCode } from "../types";

export interface MinistryKPI {
  labelAr: string;
  valueAr: string;
  changeAr: string;
  isPositive: boolean;
  category: string;
}

export interface ManagedCity {
  id: string;
  nameAr: string;
  nameEn: string;
  regionAr: string;
  visitorsCount: string;
  establishmentsCount: number;
  landmarksCount: number;
  eventsCount: number;
  descriptionAr: string;
  image: string;
  status: "active" | "draft" | "featured";
}

export interface ManagedLandmark {
  id: string;
  nameAr: string;
  cityAr: string;
  categoryAr: "تاريخي" | "متحف" | "شاطئ" | "جبلي" | "حديقة" | "طبيعي";
  rating: number;
  annualVisitors: string;
  displayOrder: number;
  image: string;
  status: "published" | "maintenance" | "hidden";
}

export interface ManagedEvent {
  id: string;
  titleAr: string;
  cityAr: string;
  startDate: string;
  endDate: string;
  categoryAr: "مهرجان" | "ثقافي" | "رياضي" | "موسيقي" | "مغامرة";
  attendeesCount: string;
  status: "upcoming" | "ongoing" | "ended" | "cancelled";
  image: string;
}

export interface SystemUser {
  id: string;
  nameAr: string;
  email: string;
  phone: string;
  role: "tourist" | "citizen" | "investor" | "tour_guide" | "establishment" | "service_provider" | "ministry" | "admin";
  cityAr: string;
  registeredDate: string;
  status: "active" | "suspended" | "pending";
}

export interface CMSContentItem {
  id: string;
  titleAr: string;
  category: "news" | "announcement" | "banner" | "faq" | "page";
  publishedDate: string;
  authorAr: string;
  status: "published" | "draft";
  viewsCount: number;
}

export interface SystemLogEntry {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  operationType: string;
  ipAddress: string;
  status: "success" | "warning" | "error";
  detailsAr: string;
}

export interface SystemSecurityAlert {
  id: string;
  severity: "critical" | "high" | "medium" | "low";
  titleAr: string;
  timestamp: string;
  ipAddress: string;
  status: "resolved" | "active" | "investigating";
  detailsAr: string;
}

export interface SystemBackupItem {
  id: string;
  filename: string;
  createdAt: string;
  sizeMB: number;
  type: "full" | "incremental";
  status: "ready" | "restoring" | "archived";
}

export interface PlatformPortalConfig {
  id: string;
  nameAr: string;
  roleKey: string;
  isEnabled: boolean;
  activeUsersCount: number;
  menuItemsCount: number;
  lastUpdated: string;
}

export interface PlatformServiceConfig {
  id: string;
  nameAr: string;
  codeKey: string;
  isEnabled: boolean;
  monthlyCalls: string;
  status: "operational" | "degraded" | "maintenance";
}

// DEMO DATASETS FOR PHASE 7

export const MINISTRY_KPIS: MinistryKPI[] = [
  { labelAr: "إجمالي الزوار والسياح", valueAr: "14,850,200", changeAr: "+18.4% هذا العام", isPositive: true, category: "visitors" },
  { labelAr: "عدد المدن السياحية", valueAr: "24 مدينة", changeAr: "مغطاة بالكامل", isPositive: true, category: "cities" },
  { labelAr: "المنشآت المرخصة", valueAr: "3,420 منشأة", changeAr: "+310 منشأة جديدة", isPositive: true, category: "establishments" },
  { labelAr: "المرشدون المعتمدون", valueAr: "1,250 مرشد", changeAr: "نسبة توطين 98%", isPositive: true, category: "guides" },
  { labelAr: "المستثمرون المسجلون", valueAr: "480 مستثمر", changeAr: "+24% نمو الفرص", isPositive: true, category: "investors" },
  { labelAr: "حجوزات Explorer Ride", valueAr: "342,000 رحلة", changeAr: "تقييم 4.9/5", isPositive: true, category: "rides" },
  { labelAr: "الفعاليات الموثقة", valueAr: "185 فعالية", changeAr: "في 13 منطقة", isPositive: true, category: "events" },
  { labelAr: "معدل الرضا العام", valueAr: "94.2%", changeAr: "بناءً على 120k تقييم", isPositive: true, category: "satisfaction" }
];

export const MOCK_MANAGED_CITIES: ManagedCity[] = [
  {
    id: "city-1",
    nameAr: "الرياض والدرعية",
    nameEn: "Riyadh & Diriyah",
    regionAr: "منطقة الرياض",
    visitorsCount: "4.2M زائر",
    establishmentsCount: 840,
    landmarksCount: 38,
    eventsCount: 45,
    descriptionAr: "عاصمة المملكة ومهد الدولة السعودية مع حي الطريف التاريخي ومطل البجيري وأرقى المهرجانات.",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=800",
    status: "featured"
  },
  {
    id: "city-2",
    nameAr: "العُلا التاريخية",
    nameEn: "AlUla",
    regionAr: "منطقة المدينة المنورة",
    visitorsCount: "1.8M زائر",
    establishmentsCount: 220,
    landmarksCount: 24,
    eventsCount: 22,
    descriptionAr: "متحف مفتوح يضم الحِجر أول موقع سعودي مسجل في اليونسكو والبلدة القديمة والمنتجعات الصخرية.",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800",
    status: "featured"
  },
  {
    id: "city-3",
    nameAr: "جدة عروس البحر الأحياء",
    nameEn: "Jeddah",
    regionAr: "منطقة مكة المكرمة",
    visitorsCount: "3.9M زائر",
    establishmentsCount: 750,
    landmarksCount: 32,
    eventsCount: 38,
    descriptionAr: "الواجهة البحرية الكورنيش وجدة التاريخية (البلد) ومرسى اليخوت العالمي.",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=800",
    status: "active"
  },
  {
    id: "city-4",
    nameAr: "أبها والسودة العالية",
    nameEn: "Abha & Soudah",
    regionAr: "منطقة عسير",
    visitorsCount: "2.1M زائر",
    establishmentsCount: 310,
    landmarksCount: 28,
    eventsCount: 18,
    descriptionAr: "عروس الجبل وأعلى قمم المملكة مع أجواء باردة طوال العام ومتنزهات السودة والتلفريك.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    status: "active"
  }
];

export const MOCK_MANAGED_LANDMARKS: ManagedLandmark[] = [
  {
    id: "lm-101",
    nameAr: "حي الطريف التاريخي - الدرعية",
    cityAr: "الرياض والدرعية",
    categoryAr: "تاريخي",
    rating: 4.9,
    annualVisitors: "1,200,000",
    displayOrder: 1,
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=600",
    status: "published"
  },
  {
    id: "lm-102",
    nameAr: "موقع الحِجر الأثري (مدائن صالح)",
    cityAr: "العُلا التاريخية",
    categoryAr: "تاريخي",
    rating: 5.0,
    annualVisitors: "850,000",
    displayOrder: 2,
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600",
    status: "published"
  },
  {
    id: "lm-103",
    nameAr: "منطقة جدة التاريخية (البلد)",
    cityAr: "جدة عروس البحر الأحياء",
    categoryAr: "تاريخي",
    rating: 4.8,
    annualVisitors: "1,100,000",
    displayOrder: 3,
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=600",
    status: "published"
  },
  {
    id: "lm-104",
    nameAr: "قمم قمم السودة ومتنزه السحاب",
    cityAr: "أبها والسودة العالية",
    categoryAr: "جبلي",
    rating: 4.9,
    annualVisitors: "780,000",
    displayOrder: 4,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
    status: "published"
  }
];

export const MOCK_MANAGED_EVENTS: ManagedEvent[] = [
  {
    id: "ev-1",
    titleAr: "مهرجان شتاء طنطورة العُلا 2026",
    cityAr: "العُلا التاريخية",
    startDate: "2026-11-15",
    endDate: "2027-01-20",
    categoryAr: "مهرجان",
    attendeesCount: "250,000",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "ev-2",
    titleAr: "موسم موسم صيف عسير وجبال أبها",
    cityAr: "أبها والسودة العالية",
    startDate: "2026-07-01",
    endDate: "2026-08-30",
    categoryAr: "ثقافي",
    attendeesCount: "420,000",
    status: "ongoing",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "ev-3",
    titleAr: "مهرجان فورمولا 1 وفعاليات كورنيش جدة",
    cityAr: "جدة عروس البحر الأحياء",
    startDate: "2026-03-10",
    endDate: "2026-03-18",
    categoryAr: "رياضي",
    attendeesCount: "180,000",
    status: "ended",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=600"
  }
];

export const MOCK_SYSTEM_USERS: SystemUser[] = [
  {
    id: "usr-01",
    nameAr: "د. عبد الله الشمري",
    email: "a.shammari@saudiexplorer.sa",
    phone: "+966 50 123 4567",
    role: "tourist",
    cityAr: "الرياض والدرعية",
    registeredDate: "2026-01-10",
    status: "active"
  },
  {
    id: "usr-02",
    nameAr: "م. طارق العتيبي",
    email: "t.otaibi@investor.sa",
    phone: "+966 55 987 6543",
    role: "investor",
    cityAr: "جدة",
    registeredDate: "2026-02-14",
    status: "active"
  },
  {
    id: "usr-03",
    nameAr: "أحمد بن سالم الرشيدي",
    email: "ahmed.guide@saudiguides.sa",
    phone: "+966 54 321 0000",
    role: "tour_guide",
    cityAr: "العُلا التاريخية",
    registeredDate: "2026-03-01",
    status: "active"
  },
  {
    id: "usr-04",
    nameAr: "شركة قصر الدرعية الفندقية",
    email: "admin@diriyahroyalhotel.sa",
    phone: "+966 11 482 9000",
    role: "establishment",
    cityAr: "الرياض والدرعية",
    registeredDate: "2026-01-05",
    status: "active"
  },
  {
    id: "usr-05",
    nameAr: "شركة النقل السياحي المتقدم",
    email: "info@sauditransport.sa",
    phone: "+966 12 600 1122",
    role: "service_provider",
    cityAr: "جدة",
    registeredDate: "2026-02-20",
    status: "active"
  },
  {
    id: "usr-06",
    nameAr: "سارة الفايز (مواطن محلل)",
    email: "sara.fayez@citizen.sa",
    phone: "+966 56 444 3322",
    role: "citizen",
    cityAr: "أبها والسودة العالية",
    registeredDate: "2026-04-12",
    status: "active"
  }
];

export const MOCK_CMS_ARTICLES: CMSContentItem[] = [
  {
    id: "cms-1",
    titleAr: "إطلاق المرحلة السابعة لخدمات الذكاء الاصطناعي التفاعلي في كافة مناطق المملكة",
    category: "news",
    publishedDate: "2026-07-24",
    authorAr: "وزارة السياحة - المركز الإعلامي",
    status: "published",
    viewsCount: 14200
  },
  {
    id: "cms-2",
    titleAr: "إعلان حزم التسهيلات الاستثمارية للمنشآت السياحية للعام 2026",
    category: "announcement",
    publishedDate: "2026-07-18",
    authorAr: "وكالة التمكين الاستثماري",
    status: "published",
    viewsCount: 9800
  },
  {
    id: "cms-3",
    titleAr: "الأسئلة الشائعة حول كيفية اصدار الفيزا الإلكترونية وتجربة Explorer Ride",
    category: "faq",
    publishedDate: "2026-06-10",
    authorAr: "دعم منصة SAUDI EXPLORER AI",
    status: "published",
    viewsCount: 32000
  }
];

export const MOCK_SYSTEM_LOGS: SystemLogEntry[] = [
  {
    id: "log-1001",
    timestamp: "2026-07-26 10:14:22",
    userName: "Super Admin (المشرف الرئيسي)",
    userRole: "admin",
    operationType: "تحديث صلاحيات بوابة المستثمرين",
    ipAddress: "10.240.12.88",
    status: "success",
    detailsAr: "تم تفعيل حزمة التحليلات المتقدمة للفرص الاستثمارية الكبرى."
  },
  {
    id: "log-1002",
    timestamp: "2026-07-26 09:45:10",
    userName: "م. طارق العتيبي",
    userRole: "investor",
    operationType: "تقديم طلب اهتمام استثماري",
    ipAddress: "192.168.1.104",
    status: "success",
    detailsAr: "تقديم طلب استثمار بمبلغ 145,000,000 ر.س لمنتجع العُلا الصخري."
  },
  {
    id: "log-1003",
    timestamp: "2026-07-26 08:30:00",
    userName: "نظام الأمان التلقائي SecurityGuard",
    userRole: "system",
    operationType: "فحص جدار الحماية والنسخ الاحتياطي",
    ipAddress: "127.0.0.1",
    status: "success",
    detailsAr: "تم إنشاء نسخة احتياطية بنجاح بحجم 485 MB."
  }
];

export const MOCK_SECURITY_ALERTS: SystemSecurityAlert[] = [
  {
    id: "sec-01",
    severity: "low",
    titleAr: "محاولة تسجيل دخول متكررة بكلمة مرور خاطئة",
    timestamp: "2026-07-26 07:12:00",
    ipAddress: "185.220.101.4",
    status: "resolved",
    detailsAr: "تم حظر العنوان لمدة 30 دقيقة طبقاً للسياسات الأمني التلقائية."
  },
  {
    id: "sec-02",
    severity: "info" as any,
    titleAr: "تنسيق شهادة التشفير SSL / TLS وتجديد المفاتيح",
    timestamp: "2026-07-25 12:00:00",
    ipAddress: "النظام الداخلي",
    status: "resolved",
    detailsAr: "شهادة تشفير الاتصال سارية ومحدثة بنجاح."
  }
];

export const MOCK_SYSTEM_BACKUPS: SystemBackupItem[] = [
  {
    id: "bak-2026-07-26",
    filename: "saudi_explorer_full_db_20260726.bak",
    createdAt: "2026-07-26 03:00:00",
    sizeMB: 485,
    type: "full",
    status: "ready"
  },
  {
    id: "bak-2026-07-25",
    filename: "saudi_explorer_inc_db_20260725.bak",
    createdAt: "2026-07-25 03:00:00",
    sizeMB: 124,
    type: "incremental",
    status: "ready"
  }
];

export const MOCK_PORTAL_CONFIGS: PlatformPortalConfig[] = [
  { id: "p1", nameAr: "بوابة السائح والزائر (Tourist Portal)", roleKey: "tourist", isEnabled: true, activeUsersCount: 14200, menuItemsCount: 8, lastUpdated: "2026-07-26" },
  { id: "p2", nameAr: "بوابة المواطن والمستكشف المحلّي (Citizen Portal)", roleKey: "citizen", isEnabled: true, activeUsersCount: 6800, menuItemsCount: 6, lastUpdated: "2026-07-25" },
  { id: "p3", nameAr: "بوابة المستثمر السياحي (Investor Portal)", roleKey: "investor", isEnabled: true, activeUsersCount: 480, menuItemsCount: 7, lastUpdated: "2026-07-26" },
  { id: "p4", nameAr: "بوابة المرشد السياحي (Tour Guide Portal)", roleKey: "tour_guide", isEnabled: true, activeUsersCount: 1250, menuItemsCount: 5, lastUpdated: "2026-07-24" },
  { id: "p5", nameAr: "بوابة المنشآت السياحية (Establishment Portal)", roleKey: "establishment", isEnabled: true, activeUsersCount: 3420, menuItemsCount: 6, lastUpdated: "2026-07-26" },
  { id: "p6", nameAr: "بوابة مزودي الخدمات المساندة (Provider Portal)", roleKey: "service_provider", isEnabled: true, activeUsersCount: 890, menuItemsCount: 5, lastUpdated: "2026-07-26" },
  { id: "p7", nameAr: "بوابة وزارة السياحة (Ministry Portal)", roleKey: "ministry", isEnabled: true, activeUsersCount: 120, menuItemsCount: 9, lastUpdated: "2026-07-26" },
  { id: "p8", nameAr: "بوابة مدير النظام الرئيسي (Super Admin)", roleKey: "super_admin", isEnabled: true, activeUsersCount: 12, menuItemsCount: 10, lastUpdated: "2026-07-26" }
];

export const MOCK_PLATFORM_SERVICES: PlatformServiceConfig[] = [
  { id: "s1", nameAr: "مُحرك الذكاء الاصطناعي ومساعد تخطيط الرحلات (AI Engine)", codeKey: "ai_planner", isEnabled: true, monthlyCalls: "1,240,000", status: "operational" },
  { id: "s2", nameAr: "خدمة التنقل السياحي الذكي Explorer Ride", codeKey: "explorer_ride", isEnabled: true, monthlyCalls: "342,000", status: "operational" },
  { id: "s3", nameAr: "محرك الحجوزات والمحفظة الرقمية الموحدة", codeKey: "unified_bookings", isEnabled: true, monthlyCalls: "820,000", status: "operational" },
  { id: "s4", nameAr: "الخريطة التفاعلية والجيومكانية ثلاثية الأبعاد", codeKey: "3d_map_explorer", isEnabled: true, monthlyCalls: "2,100,000", status: "operational" },
  { id: "s5", nameAr: "خدمات الترجمة الفورية والواقع المعزز AR", codeKey: "ar_translation", isEnabled: true, monthlyCalls: "190,000", status: "operational" }
];
