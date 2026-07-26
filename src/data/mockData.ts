import { Destination, TourismService } from "../types";

export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: "alula",
    nameAr: "العُلا ومسرح مرايا (مجسم 3D)",
    nameEn: "AlUla & Hegra 3D",
    regionAr: "منطقة المدينة المنورة",
    regionEn: "Al Madinah Region",
    taglineAr: "متحف مفتوح من العجائب التراثية والصخور المنحوتة بنمذجة 3D",
    taglineEn: "A living museum of ancient heritage & 3D sandstone art",
    descriptionAr: "تعد العُلا من أقدم وأجمل الوجهات الحضارية والتاريخية في العالم، حيث تضم موقع الحِجر (مدائن صالح) أول موقع مسجل في التراث العالمي لليونسكو بالمملكة، إلى جانب قاعة مرايا الأيقونية وأودية الحجر الرملي الساحرة.",
    descriptionEn: "AlUla is a historic masterpiece featuring Hegra, Saudi Arabia’s first UNESCO World Heritage site, Maraya mirror concert hall, and breathtaking sandstone canyons.",
    heroImage: "/src/assets/images/alula_3d_landmark_1785089188749.jpg",
    gallery: [
      "/src/assets/images/alula_3d_landmark_1785089188749.jpg",
      "/src/assets/images/diriyah_3d_landmark_1785089203376.jpg",
      "/src/assets/images/riyadh_3d_landmark_1785089216043.jpg"
    ],
    climateAr: "معتدل ولطيف شتاءً (10-22°م) ودافئ جاف صيفاً",
    climateEn: "Pleasantly mild in winter (10-22°C), warm & dry in summer",
    bestTimeAr: "أكتوبر إلى أبريل (موسم شتاء طنطورة والفعاليات)",
    bestTimeEn: "October to April (Winter at Tantora Festival season)",
    highlightsAr: [
      "موقع الحِجر (مدائن صالح والتوابيت النبطية)",
      "صخرة جبل الفيل العملاقة",
      "مسرح مرايا العاكس الأكبر عالمياً",
      "البلدة القديمة ومقاهي واحة العُلا",
      "منطاد العُلا ومراقبة النجوم في الغراميل"
    ],
    highlightsEn: [
      "Hegra Nabataean Tombs (UNESCO)",
      "Elephant Rock sandstone formation",
      "Maraya Concert Hall",
      "AlUla Old Town & Oasis Promenade",
      "Stargazing at Gharameel & Hot Air Ballooning"
    ],
    category: "heritage",
    rating: 4.95,
    coordinates: { lat: 26.6171, lng: 37.9197 },
    mapRegionId: "alula"
  },
  {
    id: "riyadh-diriyah",
    nameAr: "الرياض والدرعية التاريخية (مجسم 3D)",
    nameEn: "Riyadh & Diriyah 3D",
    regionAr: "منطقة الرياض",
    regionEn: "Riyadh Region",
    taglineAr: "عاصمة المستقبل ومهد الدولة السعودية الأولى في إخراج 3D",
    taglineEn: "Capital of the future and birthplace of the Saudi State",
    descriptionAr: "تجمع الرياض بين عظمة التاريخ الأصيل في حي الطريف بالدرعية التاريخية مع الفخامة الحديثة ونطاقات موسم الرياض ومطل جبل الفهرين (حافة العالم).",
    descriptionEn: "Riyadh seamlessly blends deep royal heritage at At-Turaif in Diriyah with ultra-modern skyscrapers, luxury dining, and world-class entertainment.",
    heroImage: "/src/assets/images/diriyah_3d_landmark_1785089203376.jpg",
    gallery: [
      "/src/assets/images/diriyah_3d_landmark_1785089203376.jpg",
      "/src/assets/images/riyadh_3d_landmark_1785089216043.jpg",
      "/src/assets/images/alula_3d_landmark_1785089188749.jpg"
    ],
    climateAr: "معتدل مشمس شتاءً (12-25°م) وجاف صيفاً",
    climateEn: "Sunny and crisp in winter (12-25°C), dry summer",
    bestTimeAr: "نوفمبر إلى مارس (موسم الرياض ومهرجان الدرعية)",
    bestTimeEn: "November to March (Riyadh Season & Diriyah Season)",
    highlightsAr: [
      "حي الطريف بالدرعية (التراث العالمي اليونسكو)",
      "مطل البجيري ومطاعمه العالمية الفاخرة",
      "برج المملكة وجسر المشاهدة السحابي",
      "حافة العالم (Edge of the World)",
      "بوليفارد وورلد والرياض سيتي"
    ],
    highlightsEn: [
      "At-Turaif UNESCO District in Diriyah",
      "Bujairi Terrace Michelin-starred dining",
      "Kingdom Centre Sky Bridge",
      "Edge of the World cliff lookout",
      "Boulevard World & City zones"
    ],
    category: "luxury",
    rating: 4.9,
    coordinates: { lat: 24.7136, lng: 46.6753 },
    mapRegionId: "riyadh"
  },
  {
    id: "jeddah-redsea",
    nameAr: "جدة التاريخية والبحر الأحمر (مجسم 3D)",
    nameEn: "Jeddah & Red Sea Coast 3D",
    regionAr: "منطقة مكة المكرمة",
    regionEn: "Makkah / Jeddah Region",
    taglineAr: "عروس البحر الأحمر ورواشين البلد التاريخية بمجسمات 3D",
    taglineEn: "The Bride of the Red Sea & Gateway to pristine coral reefs",
    descriptionAr: "تتميز جدة بنوافذ 'الروشان' الخشبية الأسطورية في حي البلد التاريخي، وكورنيش الواجهة البحرية، إضافة للوصول المباشر لجزر مشروع البحر الأحمر الفاخرة.",
    descriptionEn: "Jeddah enchants visitors with ancient carved coral architecture in Al-Balad, bustling waterfronts, and ultra-luxury eco-resorts across the Red Sea archipelago.",
    heroImage: "/src/assets/images/jeddah_3d_landmark_1785089227156.jpg",
    gallery: [
      "/src/assets/images/jeddah_3d_landmark_1785089227156.jpg",
      "/src/assets/images/neom_3d_landmark_1785090074008.jpg",
      "/src/assets/images/soudah_3d_landmark_1785089254175.jpg"
    ],
    climateAr: "دافئ ولطيف طوال العام (20-32°م) مع نسيم البحر",
    climateEn: "Warm coastal breeze year-round (20-32°C)",
    bestTimeAr: "أكتوبر إلى مايو (مناسب للغوص والرحلات البحرية)",
    bestTimeEn: "October to May (ideal for diving & marine adventures)",
    highlightsAr: [
      "حي البلد التاريخي وروشان البيوت التاريخية",
      "نافورة الملك فهد الأعلى عالمياً",
      "كورنيش جدة الواجهة البحرية واليخوت",
      "منتجعات جزيرة أمهات وسانت ريجيس البحر الأحمر",
      "مهرجان البحر الأحمر السينمائي الدولي"
    ],
    highlightsEn: [
      "Al-Balad UNESCO Historic District",
      "King Fahd's Fountain (world's tallest)",
      "Jeddah Waterfront Corniche & Marina",
      "The St. Regis & Ritz-Carlton Reserve Red Sea",
      "Red Sea International Film Festival"
    ],
    category: "coastal",
    rating: 4.88,
    coordinates: { lat: 21.5433, lng: 39.1728 },
    mapRegionId: "jeddah"
  },
  {
    id: "abha-asir",
    nameAr: "أبها وعسير الخضراء (مجسم 3D)",
    nameEn: "Abha & Asir Highlands 3D",
    regionAr: "منطقة عسير",
    regionEn: "Asir Region",
    taglineAr: "قمم السحاب والتراث المعماري الملون بمشاهد 3D",
    taglineEn: "Peaks above clouds, colorful heritage & 3D views",
    descriptionAr: "تقع أبها في أعالي جبال السروات الباردة، وتشتهر بقريةرجال ألمع التراثية ذات المعمار القط العسيري، ومطل جبل الذرة الأخضر ومتنزه السودة الطبيعي.",
    descriptionEn: "High in the cool Sarawat mountains, Abha features the striking stone palaces of Rijal Almaa, cloud-swept Soudah peaks, and rich colorful Al-Qatt Al-Asiri art.",
    heroImage: "/src/assets/images/soudah_3d_landmark_1785089254175.jpg",
    gallery: [
      "/src/assets/images/soudah_3d_landmark_1785089254175.jpg",
      "/src/assets/images/alula_3d_landmark_1785089188749.jpg",
      "/src/assets/images/diriyah_3d_landmark_1785089203376.jpg"
    ],
    climateAr: "بارد معتدل في الصيف (18-26°م) وأمطار موسمية منعشة",
    climateEn: "Cool summer weather (18-26°C) with refreshing rains",
    bestTimeAr: "يونيو إلى سبتمبر (للهروب من حرارة الصيف) وطوال العام",
    bestTimeEn: "June to September (summer mountain retreat) & year-round",
    highlightsAr: [
      "قرية رجال ألمع التراثية (اليونسكو)",
      "متنزه السودة وجبال قمم السحاب",
      "جبل الذرة (الجبل الأخضر) والتلفريك",
      "شارع الفن وأشجار الجاكارندا البنفسجية",
      "سوق الثلاثاء والمأكولات العسيرية التراثية"
    ],
    highlightsEn: [
      "Rijal Almaa UNESCO Heritage Village",
      "Soudah Peaks & Cable Car Ride",
      "Green Mountain (Jabal Al Thera)",
      "Art Street & Jacaranda Blossom Season",
      "Traditional Asiri cuisine & Honey markets"
    ],
    category: "nature",
    rating: 4.92,
    coordinates: { lat: 18.2164, lng: 42.5053 },
    mapRegionId: "asir"
  },
  {
    id: "tabuk-neom",
    nameAr: "تبوك ونيوم ووادي الديسة (مجسم 3D)",
    nameEn: "Tabuk, NEOM & Wadi Al Disah 3D",
    regionAr: "منطقة تبوك",
    regionEn: "Tabuk / NEOM Region",
    taglineAr: "واحة الجبال الحمراء وعالم المستقبل بمجسم 3D",
    taglineEn: "Canyons of red rocks & futuristic 3D horizon",
    descriptionAr: "تجمع منطقة تبوك بين وادي الديسة الشاهق بأشجار النخيل والعيون الجارية، مع شواطئ حقل وسفينة كاتالينا، وأرض المستقبليات الكبرى نيوم وسندالة وموجات الثلج بقمم تروجينا.",
    descriptionEn: "Tabuk is a wonder of red canyons, natural water springs at Wadi Al Disah, pristine Haql beaches, and the future-shaping realm of NEOM, Sindalah & Trojena.",
    heroImage: "/src/assets/images/neom_3d_landmark_1785090074008.jpg",
    gallery: [
      "/src/assets/images/neom_3d_landmark_1785090074008.jpg",
      "/src/assets/images/riyadh_3d_landmark_1785089216043.jpg",
      "/src/assets/images/jeddah_3d_landmark_1785089227156.jpg"
    ],
    climateAr: "بارد ومثلج شتاءً على القمم (2-18°م)، معتدل الشواطئ",
    climateEn: "Snowy winter on peaks (2-18°C), pleasant coastal air",
    bestTimeAr: "نوفمبر إلى أبريل",
    bestTimeEn: "November to April",
    highlightsAr: [
      "وادي الديسة والأعمدة الصخرية الحمراء",
      "شاطئ حقل وحطام سفينة كاتالينا",
      "جزيرة سندالة الفاخرة في نيوم",
      "جبل اللوز والمنحدرات الثلجية",
      "مقابر مغاير شعيب التاريخية"
    ],
    highlightsEn: [
      "Wadi Al Disah palm canyon",
      "Haql Shipwreck Beach",
      "Sindalah Island Luxury Marina",
      "Jabal Al Lawz snow peaks",
      "Magha'ir Shu'ayb ancient tombs"
    ],
    category: "adventure",
    rating: 4.91,
    coordinates: { lat: 28.3835, lng: 36.5662 },
    mapRegionId: "tabuk"
  },
  {
    id: "eastern-alahsa",
    nameAr: "الشرقية وواحة الأحساء (مجسم 3D)",
    nameEn: "Eastern Province & Al-Ahsa 3D",
    regionAr: "المنطقة الشرقية",
    regionEn: "Eastern Province",
    taglineAr: "أكبر واحة نخيل في العالم برسم ومجسم 3D",
    taglineEn: "World’s largest date palm oasis in 3D format",
    descriptionAr: "تتميز الأحساء بأكثر من 2.5 مليون نخلة وجبل القارة بمغاراته الباردة صيفاً، بينما تزدان الخبر والدمام بمركز إثراء المعرفي وشواطئ الخليج العربي.",
    descriptionEn: "Al-Ahsa holds the Guinness record for the largest self-contained oasis, paired with Al-Qarah cool limestone caves and Ithra Cultural Center in Khobar.",
    heroImage: "/src/assets/images/diriyah_3d_landmark_1785089203376.jpg",
    gallery: [
      "/src/assets/images/diriyah_3d_landmark_1785089203376.jpg",
      "/src/assets/images/alula_3d_landmark_1785089188749.jpg",
      "/src/assets/images/soudah_3d_landmark_1785089254175.jpg"
    ],
    climateAr: "معتدل مشمس شتاءً (14-26°م)",
    climateEn: "Pleasant sunny winters (14-26°C)",
    bestTimeAr: "أكتوبر إلى مارس",
    bestTimeEn: "October to March",
    highlightsAr: [
      "واحة الأحساء النخيلية (اليونسكو)",
      "جبل القارة ومغارات التبريد الطبيعية",
      "بحيرة الأصفر وشواطئ الكثبان الرملية",
      "مركز الملك عبد العزيز الثقافي (إثراء)",
      "واجهة الخبر البحرية وسوق القيصرية"
    ],
    highlightsEn: [
      "Al-Ahsa Oasis (UNESCO)",
      "Al-Qarah Mountain Caves",
      "Yellow Lake (Asfar Lake)",
      "Ithra Cultural & Innovation Center",
      "Al Khobar Corniche & Souq Al Qaysariya"
    ],
    category: "nature",
    rating: 4.87,
    coordinates: { lat: 25.3835, lng: 49.5862 },
    mapRegionId: "eastern"
  }
];

export const MOCK_SERVICES: TourismService[] = [
  // Hotels
  {
    id: "hotel-habitas-alula",
    type: "hotel",
    nameAr: "منتجع هابيتاس العُلا (Habitas AlUla)",
    nameEn: "Habitas AlUla Eco Resort",
    locationAr: "العُلا - وادي اشار",
    locationEn: "Ashar Valley, AlUla",
    destinationId: "alula",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    rating: 4.96,
    priceSAR: 2800,
    priceLabelAr: "ريال / ليلة",
    priceLabelEn: "SAR / Night",
    descriptionAr: "منتجع فاخر صديق للبيئة مستوحى من طبيعة الصخور الحجرية في العُلا، يوفر فيلات مع مسابح خاصة ومناظر أسطورية على الوادي.",
    descriptionEn: "An eco-luxury oasis embedded in the canyons of Ashar Valley with private pools and holistic wellness experiences.",
    featuresAr: ["مسبح بإطلالة صخرية", "تجارب يوجا وسبا", "مطعم Tama العالمي", "جولات فلكية خاصة"],
    featuresEn: ["Infinity pool", "Wellness Spa", "Tama Farm-to-table Restaurant", "Private Stargazing"],
    bookingAvailable: true,
    contactPhone: "+966 14 821 0000"
  },
  {
    id: "hotel-ritz-riyadh",
    type: "hotel",
    nameAr: "فندق الريتز-كارلتون الرياض",
    nameEn: "The Ritz-Carlton, Riyadh",
    locationAr: "الرياض - طريق الهدا",
    locationEn: "Al Hada, Riyadh",
    destinationId: "riyadh-diriyah",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    rating: 4.92,
    priceSAR: 2200,
    priceLabelAr: "ريال / ليلة",
    priceLabelEn: "SAR / Night",
    descriptionAr: "قصر ضيافة ملكي يحفه الشجر المعمر والنافورات، يمثل قمة الفخامة السعودية والخدمات الفندقية العالمية في قلب العاصمة.",
    descriptionEn: "A majestic palace hotel featuring lush gardens, opulent marble suites, and world-class fine dining.",
    featuresAr: ["مسبح داخلي ملكي", "حدائق النخيل الفاخرة", "مطعم Azzurro الإيطالي", "سبا فاخر جداً"],
    featuresEn: ["Royal indoor pool", "Palace gardens", "Azzurro Dining", "Luxury Spa"],
    bookingAvailable: true,
    contactPhone: "+966 11 802 8020"
  },
  {
    id: "hotel-stregis-redsea",
    type: "hotel",
    nameAr: "منتجع سانت ريجيس البحر الأحمر",
    nameEn: "The St. Regis Red Sea Resort",
    locationAr: "مشروع البحر الأحمر - جزيرة أمهات",
    locationEn: "Ummahat Island, Red Sea",
    destinationId: "jeddah-redsea",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    rating: 4.98,
    priceSAR: 4500,
    priceLabelAr: "ريال / ليلة",
    priceLabelEn: "SAR / Night",
    descriptionAr: "فيلات معلقة فوق مياه البحر الأحمر الفيروزية الصافية، خوادم شخصية وتجارب غوص بين الشعب المرجانية المحمية.",
    descriptionEn: "Overwater villas set on a private island with butler service, crystal waters, and pristine coral reefs.",
    featuresAr: ["فيلات عائمة على الماء", "خادم شخصي Butler", "مركز غوص معتمد", "طاقة شمسية 100%"],
    featuresEn: ["Overwater villas", "Personal Butler", "Diving center", "100% Solar powered"],
    bookingAvailable: true
  },

  // Restaurants
  {
    id: "rest-najd-village",
    type: "restaurant",
    nameAr: "قرية نجـد التراثية",
    nameEn: "Najd Village Restaurant",
    locationAr: "الرياض - التخصصي / أبو بكر",
    locationEn: "Riyadh",
    destinationId: "riyadh-diriyah",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    rating: 4.89,
    priceSAR: 180,
    priceLabelAr: "متوسط للشخص",
    priceLabelEn: "Avg / person",
    descriptionAr: "تجربة أصيلة داخل بيت طين نجدي تقليدي يقدم أشهى الأطباق السعودية التراثية مثل الكبسة، المنسوف، والمطازيز والقهوة السعودية.",
    descriptionEn: "Authentic Najdi mud-brick dining house serving traditional feasts, Kabsa, and Arabic coffee.",
    featuresAr: ["جلسات أرضية تراثية", "قهوة سعودية مع التمر", "عرض الطهي الحي", "مناسب للعائلات"],
    featuresEn: ["Floor majlis seating", "Saudi Coffee & Dates", "Live cooking", "Family friendly"],
    bookingAvailable: true
  },
  {
    id: "rest-suhail-alula",
    type: "restaurant",
    nameAr: "مطعم سهيل المطبخ السعودي المبتكر",
    nameEn: "Suhail Fine Saudi Cuisine",
    locationAr: "العُلا - البلدة القديمة",
    locationEn: "AlUla Old Town",
    destinationId: "alula",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    rating: 4.91,
    priceSAR: 320,
    priceLabelAr: "متوسط للشخص",
    priceLabelEn: "Avg / person",
    descriptionAr: "يقدم المطبخ السعودي الفاخر بلمسات حديثة مبتكرة تحيي وصفات الأجداد من جميع مناطق المملكة.",
    descriptionEn: "High-end elevated Saudi dining blending ancestral heritage recipes with modern culinary craftsmanship.",
    featuresAr: ["جلسات خارجية مطلة على الواحة", "مقبلات ومشاربات سعودية فاخرة", "حلويات التمر المبتكرة"],
    featuresEn: ["Oasis view terrace", "Gourmet Saudi appetizers", "Artisanal date desserts"],
    bookingAvailable: true
  },

  // Transport
  {
    id: "trans-haramain-train",
    type: "transport",
    nameAr: "قطار الحرمين السريع (Haramain High-Speed)",
    nameEn: "Haramain High-Speed Railway",
    locationAr: "مكة - جدة - المدينة المنورة - مدينة الملك عبدالله",
    locationEn: "Makkah - Jeddah - Madinah",
    destinationId: "jeddah-redsea",
    image: "https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    priceSAR: 150,
    priceLabelAr: "تذكرة درجة رجال الأعمال",
    priceLabelEn: "Business Class Ticket",
    descriptionAr: "قطار كهربائي فائق السرعة يصل بين جدة والمدينة المنورة بسرعة 300 كم/ساعة، بتجهيزات درجة أعمال فاخرة وخدمات واي فاي وضيافة.",
    descriptionEn: "300 km/h bullet train connecting Jeddah, KAEC, and Madinah with high luxury business lounges.",
    featuresAr: ["سرعة 300 كم/ساعة", "درجة أعمال وفاخرة", "واي فاي عالي السرعة", "ضيافة القهوة السعودية"],
    featuresEn: ["300 km/h speed", "Business class lounge", "High speed Wi-Fi", "Saudi hospitality"],
    bookingAvailable: true
  },

  // Events
  {
    id: "event-riyadh-season",
    type: "event",
    nameAr: "موسم الرياض 2026 (Riyadh Season)",
    nameEn: "Riyadh Season 2026",
    locationAr: "مناطق بوليفارد وورلد والمملكة أرينا",
    locationEn: "Boulevard World & Kingdom Arena",
    destinationId: "riyadh-diriyah",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    rating: 4.97,
    priceSAR: 50,
    priceLabelAr: "تبدأ من",
    priceLabelEn: "Starts from",
    descriptionAr: "أكبر مهرجان ترفيهي وسياحي بالمنطقة يضم مناطق ثقافة الشعوب، العروض العالمية، البطولات الرياضية، ومطاعم النجوم العالمية.",
    descriptionEn: "The region's biggest entertainment festival featuring global zones, world championship events, and Michelin dining.",
    featuresAr: ["أكثر من 12 منطقة ترفيهية", "عروض ألعاب نارية وضوئية", "حفلات عالمية ومسارح"],
    featuresEn: ["12+ Entertainment zones", "Fireworks & Light shows", "Global concerts"],
    bookingAvailable: true
  }
];

export const SAUDI_STATISTICS = {
  destinationsCount: "13 منطقة سياحية",
  heritageSitesCount: "+500 معلم وتراث",
  unescoSitesCount: "8 مواقف يونسكو",
  instantVisaCountries: "+66 دولة معتمدة",
  annualVisitorsTarget: "100 مليون زائر",
};
