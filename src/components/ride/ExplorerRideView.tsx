import React, { useState, useEffect } from "react";
import { LanguageCode, VehicleCategory, RideDriver, ViewMode, RideBookingState } from "../../types";
import { EXPLORER_VEHICLES, MOCK_DRIVERS, AI_TOUR_POINTS_OF_INTEREST } from "../../data/phase5Data";
import {
  Car,
  MapPin,
  Navigation,
  Clock,
  Shield,
  PhoneCall,
  MessageSquare,
  Share2,
  Sparkles,
  Bot,
  Volume2,
  VolumeX,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Users,
  ChevronRight,
  Zap,
  Star,
  Award,
  Lock,
  X
} from "lucide-react";

interface ExplorerRideViewProps {
  language: LanguageCode;
  onNavigateView: (view: ViewMode) => void;
  initialDestinationName?: string;
  onSaveBookingToWallet?: (bookingData: any) => void;
}

export const ExplorerRideView: React.FC<ExplorerRideViewProps> = ({
  language,
  onNavigateView,
  initialDestinationName,
  onSaveBookingToWallet
}) => {
  // Step flow: 'selection' -> 'driver_assigned' -> 'tracking' -> 'completed'
  const [currentStep, setCurrentStep] = useState<"selection" | "driver_assigned" | "tracking" | "completed">("selection");
  
  // Trip Settings
  const [pickup, setPickup] = useState("موقعك الحالي (الرياض - حي العقيق)");
  const [dropoff, setDropoff] = useState(initialDestinationName || "حي الطريف التاريخي - الدرعية");
  const [bookingType, setBookingType] = useState<"instant" | "scheduled">("instant");
  const [tripType, setTripType] = useState<"one_way" | "round_trip" | "multi_stop">("one_way");
  const [scheduledDate, setScheduledDate] = useState("2026-08-10");
  const [scheduledTime, setScheduledTime] = useState("18:30");

  // Selected Vehicle & Driver State
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCategory>(EXPLORER_VEHICLES[1]); // Default Comfort
  const [assignedDriver, setAssignedDriver] = useState<RideDriver>(MOCK_DRIVERS[0]);

  // Ride Distance & Price Calculation
  const distanceKm = 24.5;
  const durationMins = 22;
  const estimatedFareSAR = Math.round(selectedVehicle.basePriceSAR + distanceKm * selectedVehicle.perKmSAR);

  // Live Tracking Progress Simulation
  const [trackingProgress, setTrackingProgress] = useState(30);
  const [rideStatusText, setRideStatusText] = useState("السائق في الطريق إليك");

  // AI Tour Mode State
  const [aiTourEnabled, setAiTourEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activePoiIndex, setActivePoiIndex] = useState(0);

  // Rating & Feedback State upon completion
  const [driverRating, setDriverRating] = useState(5);
  const [vehicleRating, setVehicleRating] = useState(5);
  const [tripRating, setTripRating] = useState(5);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);

  // Issue Reporting Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [isReportSubmitted, setIsReportSubmitted] = useState(false);

  // Past Trips History Dataset
  const [pastTripsHistory] = useState([
    { id: "EX-7710", date: "2026-07-24", destination: "مطار الملك خالد الدولي - الصالة 5", vehicle: "Explorer Premium", fare: 145, driver: "فهد العتيبي", status: "مكتملة" },
    { id: "EX-6623", date: "2026-07-20", destination: "المملكة سنتر - برج الفيصلية", vehicle: "Explorer Comfort", fare: 48, driver: "سلمان المطيري", status: "مكتملة" },
    { id: "EX-5541", date: "2026-07-15", destination: "حي الطريف التاريخي - الدرعية", vehicle: "Explorer Green", fare: 65, driver: "عبدالله الشمري", status: "مكتملة" }
  ]);

  // Modals
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "driver"; text: string }>>([
    { sender: "driver", text: "أهلاً بك! أنا في الطريق إليك وسأصل خلال 3 دقائق." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isCallSimulated, setIsCallSimulated] = useState(false);
  const [isSharedSuccess, setIsSharedSuccess] = useState(false);
  const [isSosTriggered, setIsSosTriggered] = useState(false);

  // Speech synthesis toggle
  const toggleSpeech = (textToSpeak: string) => {
    if (!("speechSynthesis" in window)) {
      alert("خاصية القراءة الصوتية غير مدعومة مباشرة في متصفحك، تم تقديم النص بصرياً.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "ar-SA";
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Simulate progress in live tracking mode
  useEffect(() => {
    let interval: any;
    if (currentStep === "tracking") {
      interval = setInterval(() => {
        setTrackingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setCurrentStep("completed");
            setRideStatusText("تم الوصول إلى وجهتك بنجاح!");
            return 100;
          }
          if (prev > 60) setRideStatusText("في الطريق إلى الوجهة");
          return prev + 10;
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [currentStep]);

  const handleConfirmRideBooking = () => {
    setCurrentStep("driver_assigned");
    // Assign random driver
    const randomDrv = MOCK_DRIVERS[Math.floor(Math.random() * MOCK_DRIVERS.length)];
    setAssignedDriver(randomDrv);

    // If callback provided, pass to wallet
    if (onSaveBookingToWallet) {
      onSaveBookingToWallet({
        id: `bk-ride-${Math.floor(1000 + Math.random() * 9000)}`,
        type: "ride",
        titleAr: `Explorer ${selectedVehicle.nameAr} - إلى ${dropoff}`,
        titleEn: `Explorer ${selectedVehicle.nameEn} to ${dropoff}`,
        locationAr: dropoff,
        locationEn: dropoff,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        costSAR: estimatedFareSAR,
        status: "confirmed",
        bookingNumber: `SE-EX-${Math.floor(100000 + Math.random() * 900000)}`,
        image: selectedVehicle.image,
        rewardPointsEarned: Math.round(estimatedFareSAR * 0.1),
        canCancel: true,
        canModify: true
      });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: "driver", text: "تم الاستلام يا غالي، أنا بانتظارك عند النقطة المحددة بالضبط." }
      ]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-stone-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-right">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-emerald-950 font-black text-xs px-3 py-1 rounded-full">
            <Car className="w-3.5 h-3.5" />
            <span>خدمة التنقل السياحي الذكية Explorer Ride</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            تنقل بفخامة وأمان في جميع مدن المملكة
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            احجز سيارتك المثالية مع سائق معتمد واستمتع بمرشد سياحي صوتي ذكي (AI Tour Mode) يشرح لك الأماكن والمعالم أثناء الرحلة.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSafetyModalOpen(true)}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Shield className="w-4 h-4" />
            <span>مركز الأمان و الطوارئ</span>
          </button>
        </div>
      </div>

      {/* Main Flow Container */}
      {currentStep === "selection" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Pickup & Ride Settings Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-5">
              <h2 className="text-base font-black text-emerald-950 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-amber-500" />
                <span>تحديد مسار وقواعد الرحلة</span>
              </h2>

              {/* Trip Type Selector */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-stone-100 rounded-2xl">
                <button
                  onClick={() => setTripType("one_way")}
                  className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    tripType === "one_way" ? "bg-emerald-900 text-white shadow-xs" : "text-stone-700"
                  }`}
                >
                  ذهاب فقط
                </button>
                <button
                  onClick={() => setTripType("round_trip")}
                  className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    tripType === "round_trip" ? "bg-emerald-900 text-white shadow-xs" : "text-stone-700"
                  }`}
                >
                  ذهاب وعودة
                </button>
                <button
                  onClick={() => setTripType("multi_stop")}
                  className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    tripType === "multi_stop" ? "bg-emerald-900 text-white shadow-xs" : "text-stone-700"
                  }`}
                >
                  عدة وجهات
                </button>
              </div>

              {/* Pickup Point Input */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  نقطة الانطلاق (الموقع الحالي):
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                  <MapPin className="w-4 h-4 text-emerald-700 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Dropoff Point Input */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  الوجهة السياحية المطلوبة:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                  <Navigation className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Instant or Scheduled Option */}
              <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setBookingType("instant")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    bookingType === "instant"
                      ? "bg-amber-400 text-emerald-950 border-amber-500 font-black shadow-xs"
                      : "bg-stone-50 text-stone-600 border-stone-200"
                  }`}
                >
                  حجز فوري الان
                </button>
                <button
                  type="button"
                  onClick={() => setBookingType("scheduled")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    bookingType === "scheduled"
                      ? "bg-amber-400 text-emerald-950 border-amber-500 font-black shadow-xs"
                      : "bg-stone-50 text-stone-600 border-stone-200"
                  }`}
                >
                  حجز مجدول لاحقاً
                </button>
              </div>

              {bookingType === "scheduled" && (
                <div className="grid grid-cols-2 gap-3 p-3 bg-amber-50/80 rounded-2xl border border-amber-200 animate-in fade-in">
                  <div>
                    <label className="block text-[10px] font-bold text-amber-900 mb-1">
                      تاريخ الرحلة:
                    </label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full bg-white border border-amber-200 rounded-xl px-2.5 py-1.5 text-xs text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-amber-900 mb-1">
                      وقت الانطلاق:
                    </label>
                    <input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full bg-white border border-amber-200 rounded-xl px-2.5 py-1.5 text-xs text-stone-900"
                    />
                  </div>
                </div>
              )}

              {/* Trip Summary Stats */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-emerald-800">المسافة والوقت المتوقع</div>
                  <div className="text-sm font-black text-emerald-950 mt-0.5">
                    {distanceKm} كم • {durationMins} دقيقة
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-stone-500">التكلفة المقدرة:</div>
                  <div className="text-base font-black text-emerald-900">
                    {estimatedFareSAR} SAR
                  </div>
                </div>
              </div>

              <button
                onClick={handleConfirmRideBooking}
                className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-5 h-5 text-amber-300" />
                <span>احجز رحلتك الان ({estimatedFareSAR} SAR)</span>
              </button>
            </div>

            {/* AI Route & Destination Recommendations Box */}
            <div className="bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-emerald-900/10 p-5 rounded-3xl border border-amber-300/50 space-y-3">
              <div className="flex items-center gap-2 text-emerald-950 font-black text-xs">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                <span>توصيات الذكاء الاصطناعي للمسار والوجهة:</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-white/90 rounded-2xl border border-stone-200 flex items-start gap-2">
                  <Navigation className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900">أفضل طريق مقترح: </span>
                    <span className="text-stone-600">طريق الملك فهد ➔ الدائري الشمالي (أقل ازدحاماً بنسبة 30%)</span>
                  </div>
                </div>

                <div className="p-2.5 bg-white/90 rounded-2xl border border-stone-200 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900">أقرب معلم مجاور: </span>
                    <span className="text-stone-600">حي الطريف التاريخي المفتوح للتجول التراثي (على بعد 3 دقائق)</span>
                  </div>
                </div>

                <div className="p-2.5 bg-white/90 rounded-2xl border border-stone-200 flex items-start gap-2">
                  <Bot className="w-4 h-4 text-emerald-800 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900">أقرب مطعم وفعالية: </span>
                    <span className="text-stone-600">مطعم المجلس الخليجي الأصيل + أسبوع العرضة النجدية</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Vehicle Selection Cards List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-emerald-950 flex items-center gap-2">
                <Car className="w-5 h-5 text-amber-500" />
                <span>اختر نوع المركبة المناسبة لك ({EXPLORER_VEHICLES.length} فئات)</span>
              </h2>
              <span className="text-xs text-stone-500 font-bold">كل مركبة شاملة التأمين والخدمات</span>
            </div>

            <div className="space-y-3">
              {EXPLORER_VEHICLES.map((v) => {
                const isSelected = selectedVehicle.id === v.id;
                const priceSAR = Math.round(v.basePriceSAR + distanceKm * v.perKmSAR);

                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVehicle(v)}
                    className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-amber-50/90 border-amber-400 shadow-md ring-2 ring-amber-400/50"
                        : "bg-white border-stone-200 hover:border-emerald-700 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={v.image}
                        alt=""
                        className="w-20 h-16 rounded-2xl object-cover shadow-xs flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-sm text-emerald-950">{v.nameAr}</h3>
                          {v.badgeAr && (
                            <span className="bg-amber-400 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                              {v.badgeAr}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-600 mt-1 max-w-sm">
                          {v.descriptionAr}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-stone-500 font-bold mt-1.5">
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-emerald-700" />
                            {v.seats} مقاعد
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            وصول خلال {v.etaMins} دقائق
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right sm:text-left w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-200">
                      <div>
                        <span className="text-[10px] text-stone-500">السعر التقديري</span>
                        <div className="text-lg font-black text-emerald-900">
                          {priceSAR} SAR
                        </div>
                      </div>

                      <button
                        className={`mt-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-900 text-white"
                            : "bg-stone-100 text-stone-700 group-hover:bg-emerald-800"
                        }`}
                      >
                        {isSelected ? "محدد" : "اختيار"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* Driver Assigned & Live Tracking Flow */}
      {(currentStep === "driver_assigned" || currentStep === "tracking" || currentStep === "completed") && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Driver Card & Action Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Driver Card Info */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-stone-200 space-y-5">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div>
                  <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2.5 py-1 rounded-full">
                    تم تأكيد السائق • رحلة رقم #EX-88902
                  </span>
                  <h2 className="text-lg font-black text-emerald-950 mt-1">
                    {assignedDriver.nameAr}
                  </h2>
                </div>
                <img
                  src={assignedDriver.avatar}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow-sm"
                />
              </div>

              {/* Driver & Vehicle Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                  <div className="text-stone-500 font-bold">نوع السيارة واللون:</div>
                  <div className="font-black text-stone-900 mt-0.5">
                    {assignedDriver.carModelAr} ({assignedDriver.carColorAr})
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                  <div className="text-amber-900 font-bold">رقم اللوحة:</div>
                  <div className="font-black text-emerald-950 mt-0.5 font-mono text-sm">
                    {assignedDriver.plateNumber}
                  </div>
                </div>
              </div>

              {/* Driver Stats */}
              <div className="flex items-center justify-between text-xs text-stone-600 bg-emerald-50/60 p-3 rounded-2xl">
                <span className="flex items-center gap-1 font-extrabold text-amber-600">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {assignedDriver.rating} (تقييم ممتاز)
                </span>
                <span>{assignedDriver.tripsCount}+ رحلة موثوقة</span>
              </div>

              {/* Simulated Call & Chat Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCallSimulated(true)}
                  className="flex-1 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <PhoneCall className="w-4 h-4 text-amber-300" />
                  <span>اتصال بالسائق</span>
                </button>

                <button
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>المحادثة المباشرة</span>
                </button>

                <button
                  onClick={() => setIsSharedSuccess(true)}
                  className="p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl cursor-pointer"
                  title="مشاركة الرحلة"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Interactive Chat Box Drawer */}
              {isChatOpen && (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 animate-in fade-in">
                  <div className="text-xs font-bold text-stone-600 border-b border-stone-200 pb-2">
                    محادثة السائق المباشرة:
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-2 py-1">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`text-xs p-2.5 rounded-xl max-w-[85%] ${
                          msg.sender === "user"
                            ? "bg-emerald-900 text-white ml-auto"
                            : "bg-white text-stone-800 border border-stone-200 mr-auto"
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="اكتب رسالتك..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-emerald-900 text-white font-bold rounded-xl text-xs"
                    >
                      إرسال
                    </button>
                  </form>
                </div>
              )}

              {/* Call Simulation Popup */}
              {isCallSimulated && (
                <div className="p-4 bg-emerald-950 text-white rounded-2xl border border-amber-400 space-y-2 text-center animate-in zoom-in-95">
                  <div className="text-xs text-amber-300 font-bold">محاكاة اتصال هاتفي...</div>
                  <div className="text-sm font-black">{assignedDriver.nameAr}</div>
                  <div className="text-[11px] opacity-80">{assignedDriver.phone}</div>
                  <button
                    onClick={() => setIsCallSimulated(false)}
                    className="px-4 py-1.5 bg-rose-600 text-white font-bold rounded-xl text-xs mt-2"
                  >
                    إنهاء المكالمة
                  </button>
                </div>
              )}

              {/* Share Ride Confirmation Banner */}
              {isSharedSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center justify-between">
                  <span>تم نسخ رابط مشاركة تتبع الرحلة العائلي بنجاح!</span>
                  <button onClick={() => setIsSharedSuccess(false)} className="text-emerald-950 font-bold">✕</button>
                </div>
              )}

            </div>

            {/* AI Tour Mode Activation Box */}
            <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white p-5 rounded-3xl shadow-lg border border-amber-400/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400 animate-spin-slow" />
                  <h3 className="font-extrabold text-sm text-amber-300">
                    نمط المرشد السياحي المباشر (AI Tour Mode)
                  </h3>
                </div>
                <button
                  onClick={() => setAiTourEnabled(!aiTourEnabled)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    aiTourEnabled ? "bg-amber-400 text-emerald-950" : "bg-stone-800 text-stone-400"
                  }`}
                >
                  {aiTourEnabled ? "مفعل" : "معطل"}
                </button>
              </div>

              {aiTourEnabled && (
                <div className="p-3.5 bg-emerald-900/80 rounded-2xl border border-emerald-700/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-200">
                      {AI_TOUR_POINTS_OF_INTEREST[activePoiIndex].titleAr}
                    </span>
                    <button
                      onClick={() =>
                        toggleSpeech(
                          `${AI_TOUR_POINTS_OF_INTEREST[activePoiIndex].titleAr}. ${AI_TOUR_POINTS_OF_INTEREST[activePoiIndex].detailsAr}`
                        )
                      }
                      className="p-1.5 bg-amber-400 text-emerald-950 rounded-xl hover:bg-amber-300 cursor-pointer"
                      title="استمع للشرح الصوتي"
                    >
                      {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    {AI_TOUR_POINTS_OF_INTEREST[activePoiIndex].detailsAr}
                  </p>

                  <div className="flex justify-between items-center pt-2 text-[10px] text-amber-300">
                    <button
                      onClick={() =>
                        setActivePoiIndex(
                          (prev) => (prev + 1) % AI_TOUR_POINTS_OF_INTEREST.length
                        )
                      }
                      className="hover:underline font-bold cursor-pointer"
                    >
                      التالي من المرشد ➔
                    </button>
                    <span>معلم 1 من 3</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Live Map & Status Timeline Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Map Simulation Box */}
            <div className="relative bg-emerald-950 rounded-3xl overflow-hidden shadow-xl border border-stone-300 min-h-[380px] p-6 text-white flex flex-col justify-between">
              
              <div
                className="absolute inset-0 opacity-30 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/50 to-emerald-950/30" />

              {/* Status Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="bg-emerald-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-amber-400/40 text-xs font-black text-amber-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                  <span>حالة الرحلة المباشرة: {rideStatusText}</span>
                </div>

                <div className="bg-stone-900/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-mono font-bold text-white">
                  {trackingProgress}%
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="relative z-10 my-auto space-y-4 py-8">
                <div className="p-4 bg-black/50 backdrop-blur-md rounded-2xl border border-emerald-700/80 space-y-3">
                  <div className="flex justify-between text-xs font-bold">
                    <span>الانطلاق: {pickup}</span>
                    <span className="text-amber-300">الوصول: {dropoff}</span>
                  </div>

                  {/* Progress Line Bar */}
                  <div className="w-full bg-emerald-950 h-3 rounded-full overflow-hidden border border-emerald-800 relative">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-700"
                      style={{ width: `${trackingProgress}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-stone-300">
                    <span>الوقت المتبقي: ~12 دقيقة</span>
                    <span>المسافة المتبقية: 14.2 كم</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="relative z-10 flex items-center justify-between">
                {currentStep === "driver_assigned" && (
                  <button
                    onClick={() => setCurrentStep("tracking")}
                    className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black rounded-2xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    بدء تتبع حركة السيارة المباشرة ➔
                  </button>
                )}

                {currentStep === "completed" && (
                  <div className="w-full p-5 bg-stone-900 border border-amber-400/50 text-white rounded-3xl text-right space-y-4 shadow-2xl animate-in zoom-in-95">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 text-amber-400" />
                        <h3 className="text-base font-black text-amber-300">وصلت إلى وجهتك بسلام بحمد الله!</h3>
                      </div>
                      <span className="bg-amber-400 text-emerald-950 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        +35 نقطة مكافأة
                      </span>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed">
                      تم حفظ الفاتورة الإلكترونية المعتمدة تلقائياً داخل محفظتك الرقمية في منصة SAUDI EXPLORER AI.
                    </p>

                    {/* Interactive Ratings Section */}
                    <div className="p-4 bg-stone-950/80 rounded-2xl border border-stone-800 space-y-3 text-xs">
                      <div className="font-bold text-amber-200">قيم تجربتك وسائقك لتطوير الخدمات:</div>
                      
                      <div className="flex items-center justify-between">
                        <span>تقييم الكابتن ({assignedDriver.nameAr}):</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setDriverRating(s)}
                              className="cursor-pointer"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  s <= driverRating ? "fill-amber-400 text-amber-400" : "text-stone-600"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>نظافة وراحة السيارة:</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setVehicleRating(s)}
                              className="cursor-pointer"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  s <= vehicleRating ? "fill-amber-400 text-amber-400" : "text-stone-600"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {isRatingSubmitted ? (
                        <div className="p-2 bg-emerald-900/60 text-emerald-200 font-bold rounded-xl text-center text-[11px]">
                          شكرًا لتقييمك! تم تسجيل رأيك في المنظومة الوطنية.
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsRatingSubmitted(true)}
                          className="w-full py-2 bg-amber-400 text-emerald-950 font-black rounded-xl text-xs hover:bg-amber-300 transition-colors cursor-pointer"
                        >
                          إرسال التقييم والدعم
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                      <button
                        onClick={() => onNavigateView("bookings")}
                        className="flex-1 w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs cursor-pointer shadow-sm text-center"
                      >
                        عرض الفاتورة بالمحفظة الرقمية ➔
                      </button>

                      <button
                        onClick={() => setIsReportModalOpen(true)}
                        className="w-full sm:w-auto px-4 py-3 bg-stone-800 hover:bg-stone-700 text-rose-300 font-bold rounded-2xl text-xs cursor-pointer text-center"
                      >
                        الإبلاغ عن مشكلة
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Safety & Emergency SOS Modal */}
      {isSafetyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
            
            <div className="p-5 bg-rose-950 text-white flex items-center justify-between border-b border-rose-900">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-rose-400" />
                <h3 className="font-bold text-base">مركز الأمان والطوارئ - Explorer Ride</h3>
              </div>
              <button
                onClick={() => setIsSafetyModalOpen(false)}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-right">
              {/* Emergency SOS Button */}
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-center space-y-3">
                <div className="w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <h4 className="font-black text-rose-950 text-sm">زر الطوارئ المباشر (SOS)</h4>
                <p className="text-xs text-stone-600">
                  عند الضغط يتم إرسال تنبيه فورى لمركز عمليات الأمن والجهة المختصة وتزويدهم بالموقع الحالي المباشر.
                </p>
                <button
                  onClick={() => setIsSosTriggered(true)}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
                >
                  {isSosTriggered ? "تم إرسال إشارة الطوارئ بنجاح!" : "تفعيل بلاغ الطوارئ SOS الان"}
                </button>
              </div>

              {/* Safety Features List */}
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl flex items-center gap-2 border border-stone-200">
                  <Shield className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>جميع السائقين محقق في هوياتهم وسجلاتهم الجنائية.</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl flex items-center gap-2 border border-stone-200">
                  <Share2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>خاصية مشاركة مسار الرحلة مباشرة مع أفراد العائلة.</span>
                </div>
              </div>

              {/* Past Trips Log History */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <div className="text-xs font-black text-stone-900">سجل رحلات Explorer Ride السابقة:</div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {pastTripsHistory.map((trip) => (
                    <div key={trip.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex justify-between items-center text-xs">
                      <div>
                        <div className="font-bold text-emerald-950">{trip.destination}</div>
                        <div className="text-[10px] text-stone-500">{trip.date} • {trip.vehicle} ({trip.driver})</div>
                      </div>
                      <div className="text-left font-black text-emerald-900">
                        {trip.fare} SAR
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setIsSafetyModalOpen(false)}
                className="px-5 py-2 bg-stone-200 text-stone-800 font-bold rounded-xl text-xs cursor-pointer"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Issue Reporting Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-stone-200 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2 text-rose-700 font-black text-base">
                <AlertTriangle className="w-5 h-5" />
                <h3>الإبلاغ عن مشكلة بالرحلة</h3>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            {isReportSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                <h4 className="font-black text-emerald-950 text-sm">تم تقديم البلاغ بنجاح!</h4>
                <p className="text-xs text-stone-600">
                  سيتواصل معك فريق العناية بالضيوف والسياح خلال 15 دقيقة لمتابعة تفاصيل البلاغ.
                </p>
                <button
                  onClick={() => {
                    setIsReportSubmitted(false);
                    setIsReportModalOpen(false);
                  }}
                  className="px-4 py-2 bg-emerald-900 text-white font-bold text-xs rounded-xl mt-2 cursor-pointer"
                >
                  حسناً
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <p className="text-stone-600">
                  نأسف لأي إزعاج واجهك. يرجى اختيار سبب المشكلة أو كتابة التفاصيل:
                </p>

                <div className="space-y-1.5">
                  {[
                    "تأخر السائق عن الموعد المحدد",
                    "عدم مطابقة نظافة المركبة مع المعايير",
                    "سلوك غير لائق من السائق",
                    "اختلاف المسار أو زيادة التعرفة",
                    "مشكلة في التكييف أو الأغراض المفقودة"
                  ].map((reason, idx) => (
                    <button
                      key={idx}
                      onClick={() => setReportReason(reason)}
                      className={`w-full text-right p-2.5 rounded-xl border font-bold transition-all cursor-pointer ${
                        reportReason === reason
                          ? "bg-rose-50 border-rose-400 text-rose-950"
                          : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                      }`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={3}
                  placeholder="ملاحظات إضافية..."
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none text-xs"
                />

                <button
                  onClick={() => setIsReportSubmitted(true)}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
                >
                  إرسال البلاغ لفريق الدعم
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
