import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, GeneratedItinerary, LanguageCode } from "../types";
import { getTranslation } from "../data/translations";
import {
  Sparkles,
  Send,
  Compass,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  CheckCircle2,
  Printer,
  Bookmark,
  RefreshCw,
  Bot,
  User,
  AlertCircle,
  HelpCircle,
  Clock,
  Briefcase
} from "lucide-react";

interface AIAssistantViewProps {
  language: LanguageCode;
  initialPrompt?: string;
  onSaveItinerary: (itinerary: GeneratedItinerary) => void;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  language,
  initialPrompt,
  onSaveItinerary
}) => {
  const t = getTranslation(language);
  const [activeTab, setActiveTab] = useState<"chat" | "itinerary-builder">("chat");

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: t.aiChatWelcome,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Itinerary Generator State
  const [destName, setDestName] = useState("العُلا والرياض");
  const [daysCount, setDaysCount] = useState(3);
  const [budgetLevel, setBudgetLevel] = useState("متوسط إلى فاخر");
  const [travelerType, setTravelerType] = useState("عائلة");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "ثقافة وآثار",
    "تجارب طهي أصيلة",
    "طبيعة ومغامرة"
  ]);
  const [isGeneratingItinerary, setIsGeneratingItinerary] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null);
  const [itineraryError, setItineraryError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Handle initial prompt from search bar
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatLoading]);

  // Send message to Express Gemini endpoint `/api/ai-chat`
  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");
    setIsChatLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.sender, text: m.text }));

      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history, language })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "فشل الاتصال بمساعد الذكاء الاصطناعي");
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: `عذرًا، حدث تنبيه أثناء الاتصال: ${err.message}. يُرجى التحقق والتأكد من مفتاح GEMINI_API_KEY.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Generate Itinerary via Express Gemini endpoint `/api/ai-itinerary`
  const handleGenerateItinerary = async () => {
    setIsGeneratingItinerary(true);
    setItineraryError(null);
    setIsSaved(false);

    try {
      const response = await fetch("/api/ai-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: destName,
          days: daysCount,
          budget: budgetLevel,
          interests: selectedInterests,
          travelers: travelerType,
          language
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "فشل توليد جدول الرحلة الذكي");
      }

      setGeneratedItinerary(data.itinerary);
    } catch (err: any) {
      console.error(err);
      setItineraryError(err.message || "حدث خطأ غير متوقع في معالجة الجدول");
    } finally {
      setIsGeneratingItinerary(false);
    }
  };

  const handleSaveTrip = () => {
    if (generatedItinerary) {
      onSaveItinerary(generatedItinerary);
      setIsSaved(true);
    }
  };

  const quickPrompts = [
    "خطط لي لرحلة 4 أيام في العُلا وعسير",
    "ما هي أفضل المطاعم التراثية السعودية في الرياض؟",
    "كيف أحصل على التأشيرة السياحية الإلكترونية (eVisa)؟",
    "جدول يومي لزيارة جدة التاريخية والبحر الأحمر"
  ];

  return (
    <div className="py-10 bg-stone-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-100 text-emerald-950 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
            <span>SAUDI EXPLORER AI Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-emerald-950 tracking-tight">
            المساعد والمستشار السياحي الذكي
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-2">
            مستشارك التفاعلي المدعوم بالذكاء الاصطناعي للإجابة على جميع استفساراتك وتصميم جداول سياحية مخصصة.
          </p>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1.5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-2">
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "chat"
                  ? "bg-emerald-900 text-white shadow-xs"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <Bot className="w-4 h-4 text-amber-300" />
              <span>المحادثة مع المستشار</span>
            </button>

            <button
              onClick={() => setActiveTab("itinerary-builder")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "itinerary-builder"
                  ? "bg-emerald-900 text-white shadow-xs"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>مولد جداول الرحلات الذكي</span>
            </button>
          </div>
        </div>

        {/* --- CHAT TAB --- */}
        {activeTab === "chat" && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-md overflow-hidden flex flex-col h-[650px]">
            
            {/* Chat Box Header */}
            <div className="p-4 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold">
                  <Bot className="w-6 h-6" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-emerald-950"></span>
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base">مستشار EXPLORER AI</h3>
                  <span className="text-[11px] text-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    متصل ومتوفر للاستفسارات الجغرافية والسياحية
                  </span>
                </div>
              </div>

              <div className="text-xs bg-white/10 px-3 py-1 rounded-full text-amber-300 font-semibold hidden sm:block">
                نموذج Gemini 3.6 Flash
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-stone-50/50">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                        isUser
                          ? "bg-stone-800 text-white"
                          : "bg-emerald-900 text-amber-300"
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                        isUser
                          ? "bg-emerald-900 text-white rounded-tr-none"
                          : "bg-white text-stone-900 border border-stone-200 rounded-tl-none"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                      <div
                        className={`text-[10px] mt-2 text-left opacity-60 ${
                          isUser ? "text-emerald-100" : "text-stone-400"
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isChatLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-900 text-amber-300 flex items-center justify-center">
                    <Bot className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-stone-200 text-xs text-stone-500 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                    <span>جاري صياغة التوصية السياحية بالذكاء الاصطناعي...</span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Quick Prompts Chips */}
            <div className="px-4 py-2 bg-stone-100 border-t border-stone-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-bold text-stone-500 whitespace-nowrap">
                مقترحات سريعة:
              </span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-3 py-1 bg-white hover:bg-emerald-50 text-emerald-950 font-semibold rounded-lg border border-stone-200 text-xs whitespace-nowrap transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-stone-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="اكتب استفسارك هنا (مثال: أين أذهب في العُلا مساءً؟)..."
                  className="flex-1 px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder:text-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />

                <button
                  type="submit"
                  disabled={isChatLoading || !inputMessage.trim()}
                  className="px-5 py-3 bg-emerald-900 hover:bg-emerald-950 disabled:bg-stone-300 text-white font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span>إرسال</span>
                  <Send className="w-4 h-4 text-amber-300" />
                </button>
              </form>
            </div>

          </div>
        )}

        {/* --- ITINERARY BUILDER WIZARD TAB --- */}
        {activeTab === "itinerary-builder" && (
          <div className="space-y-8">
            
            {/* Input Config Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md">
              <h3 className="text-xl font-extrabold text-emerald-950 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                <span>إعدادات الجدول السياحي المخصص</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                
                {/* Destination */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    الوجهة أو المنطقة المرغوبة
                  </label>
                  <input
                    type="text"
                    value={destName}
                    onChange={(e) => setDestName(e.target.value)}
                    placeholder="مثال: العُلا والرياض، أبها..."
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                {/* Days */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    عدد أيام الرحلة ({daysCount} أيام)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={daysCount}
                    onChange={(e) => setDaysCount(Number(e.target.value))}
                    className="w-full accent-emerald-900 cursor-pointer"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    مستوى الميزانية
                  </label>
                  <select
                    value={budgetLevel}
                    onChange={(e) => setBudgetLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  >
                    <option value="اقتصادي ومناسب">اقتصادي ومناسب</option>
                    <option value="متوسط إلى فاخر">متوسط إلى فاخر</option>
                    <option value="فخامة واستجمام ملكي VIP">فخامة واستجمام ملكي VIP</option>
                  </select>
                </div>

                {/* Travelers */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    نوع المسافرين
                  </label>
                  <select
                    value={travelerType}
                    onChange={(e) => setTravelerType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  >
                    <option value="عائلة وأطفال">عائلة وأطفال</option>
                    <option value="أزواج واستجمام">أزواج واستجمام</option>
                    <option value="مغامرون وشباب">مغامرون وشباب</option>
                    <option value="مسافر مفرد">مسافر مفرد</option>
                  </select>
                </div>

              </div>

              {/* Interests Checkboxes */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  الاهتمامات والتجارب المفضلة
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "ثقافة وآثار",
                    "تجارب طهي أصيلة",
                    "طبيعة ومغامرة",
                    "تسوق ومواسم ترفيهية",
                    "استجمام وسبا",
                    "تأمل واستكشاف النجوم"
                  ].map((interest) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedInterests((prev) => prev.filter((i) => i !== interest));
                          } else {
                            setSelectedInterests((prev) => [...prev, interest]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-900 text-white border-emerald-900 shadow-xs"
                            : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateItinerary}
                disabled={isGeneratingItinerary}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-900 to-emerald-800 hover:from-emerald-950 hover:to-emerald-900 text-white font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isGeneratingItinerary ? (
                  <>
                    <RefreshCw className="w-5 h-5 text-amber-300 animate-spin" />
                    <span>جاري توليد المسار بالذكاء الاصطناعي...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
                    <span>توليد جدول الرحلة الذكي لمصمم خصيصاً لك</span>
                  </>
                )}
              </button>
            </div>

            {/* Error Notice */}
            {itineraryError && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl flex items-center gap-3 text-xs">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span>{itineraryError}</span>
              </div>
            )}

            {/* Generated Itinerary Showcase */}
            {generatedItinerary && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-lg space-y-6 animate-in fade-in">
                
                {/* Itinerary Header */}
                <div className="p-6 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-emerald-950 rounded-full text-xs font-bold mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>جدول مخصص جاهز</span>
                    </div>
                    <h2 className="text-xl sm:text-3xl font-black">{generatedItinerary.title}</h2>
                    <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
                      {generatedItinerary.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <button
                      onClick={handleSaveTrip}
                      className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isSaved
                          ? "bg-emerald-500 text-white"
                          : "bg-amber-400 text-emerald-950 hover:bg-amber-300"
                      }`}
                    >
                      {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      <span>{isSaved ? "تم الحفظ بصفحتك" : "حفظ الرحلة"}</span>
                    </button>

                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Metadata Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl">
                    <div className="text-xs font-bold text-amber-900">الميزانية التقديرية المتوقعة</div>
                    <div className="text-base font-black text-amber-950 mt-1">
                      {generatedItinerary.estimatedBudgetSAR}
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl">
                    <div className="text-xs font-bold text-emerald-900">أفضل أوقات الزيارة والطقس</div>
                    <div className="text-xs text-stone-700 mt-1 font-semibold">
                      {generatedItinerary.bestTimeToVisit}
                    </div>
                  </div>
                </div>

                {/* Day-by-day Cards */}
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-emerald-950">تفاصيل برنامج الأيام اليومي:</h3>
                  {generatedItinerary.days.map((day) => (
                    <div
                      key={day.dayNumber}
                      className="p-5 bg-stone-50 rounded-2xl border border-stone-200/90 shadow-xs space-y-3"
                    >
                      <div className="flex items-center gap-2 font-black text-sm text-emerald-900">
                        <span className="w-7 h-7 bg-emerald-900 text-amber-300 rounded-xl flex items-center justify-center text-xs">
                          {day.dayNumber}
                        </span>
                        <span>{day.title}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-stone-700 pt-2 border-t border-stone-200/60">
                        <div className="p-3 bg-white rounded-xl border border-stone-200">
                          <span className="font-bold text-emerald-800 block mb-1">🌅 الصباح:</span>
                          <span>{day.morning}</span>
                        </div>

                        <div className="p-3 bg-white rounded-xl border border-stone-200">
                          <span className="font-bold text-amber-700 block mb-1">☀️ الظهيرة:</span>
                          <span>{day.afternoon}</span>
                        </div>

                        <div className="p-3 bg-white rounded-xl border border-stone-200">
                          <span className="font-bold text-purple-800 block mb-1">🌙 المساء:</span>
                          <span>{day.evening}</span>
                        </div>
                      </div>

                      {day.proTip && (
                        <div className="p-3 bg-amber-50 rounded-xl text-xs font-semibold text-amber-900 flex items-center gap-2 border border-amber-200/60">
                          <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                          <span>نصحية محلية: {day.proTip}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-200">
                  <div>
                    <h4 className="font-bold text-xs text-emerald-950 mb-2">الفنادق والإقامة الموصى بها:</h4>
                    <ul className="space-y-1">
                      {generatedItinerary.recommendedHotels.map((h, i) => (
                        <li key={i} className="text-xs text-stone-700 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-emerald-950 mb-2">المطاعم وتجارب الطهي المميزة:</h4>
                    <ul className="space-y-1">
                      {generatedItinerary.recommendedDining.map((d, i) => (
                        <li key={i} className="text-xs text-stone-700 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
