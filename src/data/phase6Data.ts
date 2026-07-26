import { InvestmentOpportunity } from "../types";

export interface DetailedInvestmentOpportunity extends InvestmentOpportunity {
  cityAr: string;
  cityEn: string;
  projectTypeAr: string;
  projectTypeEn: string;
  executionMonths: number;
  expectedOccupancyPercent: number;
  level: "VIP" | "High" | "Medium";
  descriptionAr: string;
  descriptionEn: string;
  gallery: string[];
  lat: number;
  lng: number;
  kpis: { labelAr: string; valueAr: string }[];
  feasibilitySummaryAr: string;
}

export interface InvestorApplicationRequest {
  id: string;
  opportunityId: string;
  opportunityTitleAr: string;
  cityAr: string;
  investorName: string;
  proposedBudgetSAR: string;
  submittedDate: string;
  status: "under_review" | "approved" | "initial_approval" | "completed";
  reviewNotesAr: string;
}

export interface EstablishmentProfileData {
  id: string;
  nameAr: string;
  nameEn: string;
  categoryAr: string;
  cityAr: string;
  licenseNumber: string;
  addressAr: string;
  phone: string;
  email: string;
  descriptionAr: string;
  workingHoursAr: string;
  coverImage: string;
  gallery: string[];
  servicesListAr: string[];
  basePriceSAR: number;
  occupancyRatePercent: number;
  monthlyRevenueSAR: number;
  totalVisitors: number;
  averageRating: number;
}

export interface EstablishmentBooking {
  id: string;
  customerNameAr: string;
  serviceOrRoomAr: string;
  date: string;
  time: string;
  guestsCount: number;
  amountSAR: number;
  status: "new" | "upcoming" | "completed" | "cancelled";
  phone: string;
}

export interface EstablishmentOffer {
  id: string;
  titleAr: string;
  discountPercent: number;
  validUntil: string;
  code: string;
  descriptionAr: string;
  status: "active" | "expired";
}

export interface EstablishmentReview {
  id: string;
  authorNameAr: string;
  rating: number;
  date: string;
  commentAr: string;
  replyAr?: string;
  isReplied: boolean;
}

export interface ServiceProviderService {
  id: string;
  nameAr: string;
  categoryAr: string;
  sectorType: "transport" | "car_rental" | "tour_operator" | "events" | "translation" | "insurance" | "logistics";
  priceSAR: number;
  unitAr: string;
  descriptionAr: string;
  isAvailable: boolean;
  activeOrdersCount: number;
  image: string;
}

export interface ServiceProviderOrder {
  id: string;
  clientNameAr: string;
  serviceNameAr: string;
  date: string;
  amountSAR: number;
  status: "new" | "in_progress" | "completed" | "cancelled";
  notesAr: string;
}

export interface PortalNotification {
  id: string;
  titleAr: string;
  bodyAr: string;
  date: string;
  time: string;
  type: "alert" | "request" | "message" | "approval";
  isRead: boolean;
}

// MOCK DATASETS FOR PHASE 6

export const MOCK_INVESTMENT_OPPORTUNITIES: DetailedInvestmentOpportunity[] = [
  {
    id: "inv-01",
    titleAr: "منتجع صخري فاخر وفاخر بيئي في العُلا",
    titleEn: "AlUla Eco Luxury Rock Resort",
    regionAr: "منطقة المدينة المنورة (العُلا)",
    sectorAr: "الضيافة والمنتجعات الفاخرة",
    estimatedValueSAR: "145,000,000 ر.س",
    expectedRoiPercent: 19.4,
    statusAr: "فرصة مجهزة للطرح",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800",
    cityAr: "العُلا",
    cityEn: "AlUla",
    projectTypeAr: "منتجع فاخر 5 نجوم",
    projectTypeEn: "5-Star Eco Resort",
    executionMonths: 24,
    expectedOccupancyPercent: 82,
    level: "VIP",
    descriptionAr: "مشروع استثماري يهدف لبناء 60 أجنحة وفلل صخرية مستدامة تحاكي طبيعة جبال العُلا الخلابة وتوفر تجارب ضيافة ملكية مع مراكز استرخاء ومطاعم فاخرة.",
    descriptionEn: "Luxury eco-resort development in AlUla sandstone cliffs with 60 eco-villas.",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800"
    ],
    lat: 26.618,
    lng: 37.92,
    kpis: [
      { labelAr: "معدل التدفق الاستثماري الداخلي IRR", valueAr: "21.5%" },
      { labelAr: "فترة استرداد رأس المال", valueAr: "4.8 سنوات" },
      { labelAr: "الوظائف المباشرة المتوقعة", valueAr: "180 وظيفة" }
    ],
    feasibilitySummaryAr: "تم إنهاء دراسة الجدوى الاقتصادية والأثر البيئي مع موافقات أولية من الهيئة الملكية لمحافظة العُلا."
  },
  {
    id: "inv-02",
    titleAr: "مارينا ونادي يخوت ساحلي في جدة عروس البحر",
    titleEn: "Jeddah Waterfront Marina & Yacht Club",
    regionAr: "منطقة مكة المكرمة (جدة)",
    sectorAr: "السياحة الشاطئية والرياضات البحرية",
    estimatedValueSAR: "280,000,000 ر.س",
    expectedRoiPercent: 22.1,
    statusAr: "قيد استقبال عروض الاستثمار",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=800",
    cityAr: "جدة",
    cityEn: "Jeddah",
    projectTypeAr: "نادي يخوت ومرفأ ترفيهي",
    projectTypeEn: "Yacht Club & Marina",
    executionMonths: 30,
    expectedOccupancyPercent: 88,
    level: "VIP",
    descriptionAr: "تطوير مرسى يخوت عالمي يتسع لـ 150 يخت مع مطاعم عالمية ومتاجر فاخرة وأكاديمية للرياضات المباشرة على الكورنيش الشمالي.",
    descriptionEn: "World-class marina accommodating 150 luxury yachts on Jeddah Corniche.",
    gallery: [
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
    ],
    lat: 21.5433,
    lng: 39.1728,
    kpis: [
      { labelAr: "العائد الداخلي IRR", valueAr: "23.8%" },
      { labelAr: "فترة الاسترداد", valueAr: "5.2 سنوات" },
      { labelAr: "التدفق السنوي المتوقع", valueAr: "420,000 زائر" }
    ],
    feasibilitySummaryAr: "مساحة مخصصة ومطورة بالكامل على واجهة الكورنيش جاهزة للتنفيذ المباشر."
  },
  {
    id: "inv-03",
    titleAr: "مجمع المغامرات والتلفريك الجبلي بالسودة - أبها",
    titleEn: "Soudah Mountain Cable Car & Adventure Park",
    regionAr: "منطقة عسير (أبها والسودة)",
    sectorAr: "السياحة الجبلية والترفيه المغامر",
    estimatedValueSAR: "95,000,000 ر.س",
    expectedRoiPercent: 16.8,
    statusAr: "فرصة متاحة",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    cityAr: "أبها",
    cityEn: "Abha",
    projectTypeAr: "متنزه مغامرات وتلفريك",
    projectTypeEn: "Adventure Cable Car Park",
    executionMonths: 18,
    expectedOccupancyPercent: 75,
    level: "High",
    descriptionAr: "مشروع تلفريك معلق بمسار بانورامي سياحي بطول 3.5 كم يشمل مسارات الانزلاق الحبلية ومطلات زجاجية على قمم السودة.",
    descriptionEn: "Cable car lines and zipline adventure park across Soudah mountain peaks.",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
    ],
    lat: 18.2711,
    lng: 42.3653,
    kpis: [
      { labelAr: "العائد IRR", valueAr: "18.1%" },
      { labelAr: "فترة الاسترداد", valueAr: "4.2 سنوات" }
    ],
    feasibilitySummaryAr: "دراسات المناخ والسلامة مكتملة مع هيئة تطوير منطقة عسير."
  },
  {
    id: "inv-04",
    titleAr: "فندق بوتيك تراثي في قلب حي الطريف - الدرعية",
    titleEn: "Diriyah Heritage Boutique Hotel",
    regionAr: "منطقة الرياض (الدرعية)",
    sectorAr: "الفنادق التراثية والضيافة الثقافية",
    estimatedValueSAR: "110,000,000 ر.س",
    expectedRoiPercent: 18.0,
    statusAr: "فرصة مجهزة للطرح",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=800",
    cityAr: "الرياض",
    cityEn: "Riyadh",
    projectTypeAr: "فندق بوتيك نجدى تراثي",
    projectTypeEn: "Najdi Heritage Boutique Hotel",
    executionMonths: 20,
    expectedOccupancyPercent: 86,
    level: "VIP",
    descriptionAr: "إعادة تحويل مباني طينية نجدية تاريخية بلمسات معمارية حديثة إلى فندق بوتيك فاخر يمنح الزوار تجربة العيش في مهد الدولة السعودية.",
    descriptionEn: "Authentic Najdi heritage mud-brick architecture turned luxury boutique hotel in Diriyah.",
    gallery: [
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=800"
    ],
    lat: 24.734,
    lng: 46.577,
    kpis: [
      { labelAr: "معدل الإشغال المتوقع", valueAr: "86%" },
      { labelAr: "متوسط سعر الغرفة ADR", valueAr: "2,200 ر.س" }
    ],
    feasibilitySummaryAr: "ضمن المخطط الشامل لتطوير بوابة الدرعية مع كامل التسهيلات التراخيصية."
  }
];

export const MOCK_INVESTOR_APPLICATIONS: InvestorApplicationRequest[] = [
  {
    id: "req-101",
    opportunityId: "inv-01",
    opportunityTitleAr: "منتجع صخري فاخر وفاخر بيئي في العُلا",
    cityAr: "العُلا",
    investorName: "شركة الاستثمارات الفندقية الخليجية",
    proposedBudgetSAR: "145,000,000 ر.س",
    submittedDate: "2026-07-10",
    status: "initial_approval",
    reviewNotesAr: "تمت الموافقة المبدئية من لجنة الاستثمار بانتهاء تقييم الضمانات المباشرة."
  },
  {
    id: "req-102",
    opportunityId: "inv-02",
    opportunityTitleAr: "مارينا ونادي يخوت ساحلي في جدة عروس البحر",
    cityAr: "جدة",
    investorName: "مجموعة البحر الأحمر القابضة",
    proposedBudgetSAR: "280,000,000 ر.س",
    submittedDate: "2026-07-18",
    status: "under_review",
    reviewNotesAr: "طلب الاهتمام الاستثماري قيد الدراسة الفنية والدراسة البيئية للساحل."
  }
];

export const MOCK_ESTABLISHMENT_PROFILE: EstablishmentProfileData = {
  id: "est-01",
  nameAr: "فندق ونادي قصر الدرعية التراثي",
  nameEn: "Diriyah Royal Heritage Palace & Hotel",
  categoryAr: "فندق ومنتجع 5 نجوم",
  cityAr: "الرياض (الدرعية)",
  licenseNumber: "LIC-EST-2026-9921",
  addressAr: "شارع الطريف - بوابة الدرعية - الرياض",
  phone: "+966 11 482 9000",
  email: "info@diriyahroyalhotel.sa",
  descriptionAr: "فندق تراثي نجدي فاخر يوفر 85 جناحاً أثرياً مع إطلالة مباشرة على وادي حنيفة ومطل البجيري التاريخي، مع مطاعم راقية ومسابح حرارية.",
  workingHoursAr: "24 ساعة / 7 أيام",
  coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
  gallery: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800"
  ],
  servicesListAr: ["خدمة الغرف 24/7", "مطعم فطور نجدي أصيل", "مسبح مع فتحة سقف", "سبا ملكي واسترخاء", "خدمة توصيل المطار VIP", "واي فاي مجاني عالي السرعة"],
  basePriceSAR: 1450,
  occupancyRatePercent: 88,
  monthlyRevenueSAR: 680000,
  totalVisitors: 1240,
  averageRating: 4.9
};

export const MOCK_ESTABLISHMENT_BOOKINGS: EstablishmentBooking[] = [
  {
    id: "ebk-1",
    customerNameAr: "د. عبد الله بن خالد الشمري",
    serviceOrRoomAr: "الجناح الملكي التراثي رقم 302",
    date: "2026-08-12",
    time: "14:00 (دخول)",
    guestsCount: 2,
    amountSAR: 2900,
    status: "upcoming",
    phone: "+966 50 123 4567"
  },
  {
    id: "ebk-2",
    customerNameAr: "سارة الفايز",
    serviceOrRoomAr: "غرفة ديلوكس مطلة على الوادي",
    date: "2026-08-05",
    time: "15:00",
    guestsCount: 1,
    amountSAR: 1450,
    status: "new",
    phone: "+966 55 987 6543"
  },
  {
    id: "ebk-3",
    customerNameAr: "جون ميكائيل (سائح دبي)",
    serviceOrRoomAr: "فيلا الدرعية الخاصة",
    date: "2026-07-20",
    time: "مكتمل",
    guestsCount: 4,
    amountSAR: 5800,
    status: "completed",
    phone: "+971 50 555 1234"
  }
];

export const MOCK_ESTABLISHMENT_OFFERS: EstablishmentOffer[] = [
  {
    id: "off-1",
    titleAr: "باقة عطلة نهاية الأسبوع النجدي - خصم 20%",
    discountPercent: 20,
    validUntil: "2026-09-30",
    code: "DIRIYAH20",
    descriptionAr: "شاملة وجبة الإفطار الملكية في البجيري مع جولة مجانية بالمرشد في حي الطريف.",
    status: "active"
  },
  {
    id: "off-2",
    titleAr: "خصم الحجز المبكر لشتاء الرياض",
    discountPercent: 15,
    validUntil: "2026-11-15",
    code: "WINTER15",
    descriptionAr: "احجز غرفتك قبل 30 يوماً واستمتع بترقية مجانية للجناح وحسم إضافي.",
    status: "active"
  }
];

export const MOCK_ESTABLISHMENT_REVIEWS: EstablishmentReview[] = [
  {
    id: "rev-1",
    authorNameAr: "م. طارق العتيبي",
    rating: 5,
    date: "2026-07-22",
    commentAr: "تجربة إقامة تفوق التوقعات، الاستقبال حرص على أدق التفاصيل النجدي والمطعم يقدم أكلات تراثية نادرة بطريقة عالمية.",
    replyAr: "أهلاً بك م. طارق، يسعدنا جداً أن التجربة نالت استحسانك ونتشرف باستضافتك دائماً!",
    isReplied: true
  },
  {
    id: "rev-2",
    authorNameAr: "إيما وودبريدج (زائرة من المملكة المتحدة)",
    rating: 4.8,
    date: "2026-07-19",
    commentAr: "A breathtaking hotel with unmatched Saudi hospitality! Staff went above and beyond.",
    replyAr: "Thank you Emma! We look forward to welcoming you back to Diriyah soon.",
    isReplied: true
  }
];

export const MOCK_PROVIDER_SERVICES: ServiceProviderService[] = [
  {
    id: "srv-01",
    nameAr: "تأمين حافلات فاخرة VIP للوفود والمجموعات",
    categoryAr: "شركات النقل السياحي",
    sectorType: "transport",
    priceSAR: 1200,
    unitAr: "اليوم",
    descriptionAr: "حافلات حديثة موديل 2026 مع شاشات ترفيهية، واي فاي، وسائقين محترفين متحدثين بثلاث لغات.",
    isAvailable: true,
    activeOrdersCount: 8,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "srv-02",
    nameAr: "تأجير سيارات فارهة مع سائق خاص (Explorer Chauffeur)",
    categoryAr: "شركات تأجير السيارات",
    sectorType: "car_rental",
    priceSAR: 850,
    unitAr: "اليوم",
    descriptionAr: "مرسيدس S-Class ورينج روفر للرحلات والتنقلات الرسمية بجميع مدن المملكة.",
    isAvailable: true,
    activeOrdersCount: 14,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "srv-03",
    nameAr: "خدمات الترجمة الفورية والإرشاد السياحي المتعدد اللغات",
    categoryAr: "شركات الترجمة والإرشاد",
    sectorType: "translation",
    priceSAR: 500,
    unitAr: "الجولة",
    descriptionAr: "مترجمون معتمدون للغات (الإنجليزية، الفرنسية، الصينية، الروسية، الألمانية، اليابانية).",
    isAvailable: true,
    activeOrdersCount: 5,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "srv-04",
    nameAr: "تغطية التأمين الطبي والسياحي الشامل للزوار",
    categoryAr: "شركات التأمين السياحي",
    sectorType: "insurance",
    priceSAR: 150,
    unitAr: "السائح / الرحلة",
    descriptionAr: "وثيقة تأمين معتمدة فورية تغطي كافة الحالات العلاجية والإلغاء وتأخير الأمتعة.",
    isAvailable: true,
    activeOrdersCount: 42,
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600"
  }
];

export const MOCK_PROVIDER_ORDERS: ServiceProviderOrder[] = [
  {
    id: "pord-101",
    clientNameAr: "وزارة السياحة - مهرجان شتاء العُلا",
    serviceNameAr: "تأمين حافلات فاخرة VIP للوفود والمجموعات",
    date: "2026-08-15",
    amountSAR: 14400,
    status: "in_progress",
    notesAr: "تأمين 12 حافلة لنقل الشخصيات الهامة من مطار العُلا إلى الفنادق."
  },
  {
    id: "pord-102",
    clientNameAr: "شركة آفاق السياحة الدولية",
    serviceNameAr: "تأجير سيارات فارهة مع سائق خاص",
    date: "2026-08-01",
    amountSAR: 5100,
    status: "new",
    notesAr: "طلبية 3 سيارات مرسيدس لموقع مطل البجيري بالدرعية."
  }
];

export const MOCK_NOTIFICATIONS: Record<string, PortalNotification[]> = {
  investor: [
    {
      id: "notif-inv-1",
      titleAr: "تحديث جديد على طلب الفرصة الاستثمارية",
      bodyAr: "تمت الموافقة المبدئية على طلب الاستثمار الخاص بك في منتجع العُلا الصخري.",
      date: "2026-07-25",
      time: "10:30 ص",
      type: "approval",
      isRead: false
    },
    {
      id: "notif-inv-2",
      titleAr: "طرح فرصة استثمارية جديدة في جدة",
      bodyAr: "تم إضافة مشروع مارينا ونادي يخوت جديد بالواجهة البحرية للفرص المتاحة.",
      date: "2026-07-22",
      time: "04:15 م",
      type: "alert",
      isRead: true
    }
  ],
  establishment: [
    {
      id: "notif-est-1",
      titleAr: "حجز جديد مؤكد من العميل",
      bodyAr: "تم حجز الجناح الملكي رقم 302 بتاريخ 12 أغسطس 2026.",
      date: "2026-07-26",
      time: "08:45 ص",
      type: "request",
      isRead: false
    },
    {
      id: "notif-est-2",
      titleAr: "تقييم جديد 5 نجوم من نادِ زائر",
      bodyAr: "قام م. طارق العتيبي بنشر تقييم ممتاز لإقامته في الفندق.",
      date: "2026-07-22",
      time: "02:20 م",
      type: "message",
      isRead: true
    }
  ],
  provider: [
    {
      id: "notif-prv-1",
      titleAr: "طلب توريد جديد منتظر التأكيد",
      bodyAr: "استلمت طلبية تأجير حافلات VIP لمهرجان العُلا بمبلغ 14,400 ر.س.",
      date: "2026-07-26",
      time: "09:10 ص",
      type: "request",
      isRead: false
    }
  ]
};
