import React, { useState, useEffect, useRef } from "react";
import { LanguageCode, ViewMode } from "../../types";
import {
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Send,
  Navigation,
  Compass,
  MapPin,
  Building2,
  Calendar,
  Search
} from "lucide-react";

interface VoiceAssistantModalProps {
  isOpen: boolean;
  language: LanguageCode;
  onClose: () => void;
  onNavigateView: (view: ViewMode, targetId?: string) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  language,
  onClose,
  onNavigateView
}) => {
  if (!isOpen) return null;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState(
    language === "ar"
      ? "مرحباً بك في المساعد الصوتي الذكي! اضغط على الميكروفون وقل أمراً مثل: 'افتح الرياض'، 'اعرض الفنادق'، 'ابدأ التخطيط'، أو 'افتح الخريطة'."
      : "Welcome to the Smart Voice Assistant! Tap the mic and say 'Open Riyadh', 'Show Hotels', 'Start Planning', or 'Open Map'."
  );
  const [inputText, setInputText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = language === "ar" ? "ar-SA" : "en-US";

      rec.onresult = (event: any) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [language]);

  // Voice Command Processing Logic
  const processVoiceCommand = (commandText: string) => {
    const text = commandText.toLowerCase().trim();

    if (text.includes("رياض") || text.includes("riyadh")) {
      speakAndRespond(
        language === "ar" ? "جاري فتح وجهة الرياض..." : "Opening Riyadh destination...",
        () => onNavigateView("destinations", "riyadh")
      );
    } else if (text.includes("فنادق") || text.includes("فندق") || text.includes("hotel")) {
      speakAndRespond(
        language === "ar" ? "جاري عرض الفنادق والمنتجعات الفاخرة..." : "Showing luxury hotels & resorts...",
        () => onNavigateView("services")
      );
    } else if (text.includes("تخطيط") || text.includes("خطط") || text.includes("plan")) {
      speakAndRespond(
        language === "ar" ? "جاري فتح مخطّط الرحلات بالذكاء الاصطناعي..." : "Opening AI Trip Planner...",
        () => onNavigateView("ai-hub")
      );
    } else if (text.includes("مطاعم") || text.includes("مطعم") || text.includes("restaurant")) {
      speakAndRespond(
        language === "ar" ? "جاري البحث عن المطاعم والمقاهي الأصيلة..." : "Searching top restaurants & cafes...",
        () => onNavigateView("services")
      );
    } else if (text.includes("خريطة") || text.includes("map")) {
      speakAndRespond(
        language === "ar" ? "جاري فتح الخريطة التفاعلية للمملكة..." : "Opening KSA Interactive Map...",
        () => onNavigateView("map-explorer")
      );
    } else if (text.includes("عُلا") || text.includes("alula")) {
      speakAndRespond(
        language === "ar" ? "جاري فتح محافظة العُلا الأثرية..." : "Opening AlUla heritage destination...",
        () => onNavigateView("destinations", "alula")
      );
    } else if (text.includes("جدة") || text.includes("jeddah")) {
      speakAndRespond(
        language === "ar" ? "جاري فتح عروس البحر الأحمر جدة..." : "Opening Jeddah Red Sea destination...",
        () => onNavigateView("destinations", "jeddah")
      );
    } else {
      speakAndRespond(
        language === "ar"
          ? `تم استقبال الأمر: "${commandText}". جاري تنفيذه عبر المساعد الذكي...`
          : `Received command: "${commandText}". Executing via Smart Assistant...`
      );
    }
  };

  const speakAndRespond = (replyText: string, callback?: () => void) => {
    setResponse(replyText);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(replyText);
      utterance.lang = language === "ar" ? "ar-SA" : "en-US";

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        if (callback) callback();
      };
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else if (callback) {
      setTimeout(callback, 1200);
    }
  };

  const handleToggleListening = () => {
    if (!recognitionRef.current) {
      alert(
        language === "ar"
          ? "متصفحك لا يدعم التعرف الصوتي المباشر، يمكنك استخدام الإدخال الكتابي أدناه لتشغيل المساعد."
          : "Voice recognition is not supported in this browser. You can type commands below."
      );
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      if (transcript) processVoiceCommand(transcript);
    } else {
      setTranscript("");
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSubmitText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setTranscript(inputText);
    processVoiceCommand(inputText);
    setInputText("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-stone-900 text-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/30 flex flex-col my-auto max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-stone-950 to-emerald-950 border-b border-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black shadow-md">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-amber-300 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === "ar" ? "المساعد الصوتي المباشر الذكي" : "Smart Real-time Voice Assistant"}</span>
              </div>
              <h2 className="text-lg font-black text-white">
                {language === "ar" ? "تفاعل صوتي وتحكم بالأوامر" : "Interactive Voice Control"}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              if ("speechSynthesis" in window) window.speechSynthesis.cancel();
              onClose();
            }}
            className="p-2 bg-stone-800 hover:bg-stone-700 rounded-full text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voice Visualizer Area */}
        <div className="p-8 flex flex-col items-center justify-center text-center space-y-6 bg-gradient-to-b from-stone-950 to-stone-900 flex-1">
          
          {/* Glowing Microphone Circle Button */}
          <div className="relative">
            {isListening && (
              <div className="absolute -inset-4 bg-amber-400/30 rounded-full animate-ping pointer-events-none" />
            )}
            <button
              onClick={handleToggleListening}
              className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl relative z-10 border-4 ${
                isListening
                  ? "bg-rose-600 border-rose-400 scale-105 shadow-rose-900/50"
                  : "bg-emerald-700 hover:bg-emerald-600 border-amber-400 hover:scale-105 shadow-emerald-950/80"
              }`}
            >
              {isListening ? (
                <MicOff className="w-12 h-12 text-white animate-pulse" />
              ) : (
                <Mic className="w-12 h-12 text-white" />
              )}
            </button>
          </div>

          {/* Status Label */}
          <div>
            <div className="text-xs font-black text-amber-300 uppercase tracking-wider mb-1">
              {isListening
                ? language === "ar" ? "أنصت إليك الآن..." : "Listening now..."
                : isSpeaking
                ? language === "ar" ? "يتحدث المساعد..." : "Assistant speaking..."
                : language === "ar" ? "اضغط على الميكروفون للتحدث" : "Tap microphone to speak"}
            </div>
            {transcript && (
              <p className="text-sm font-semibold text-stone-300 bg-stone-800/80 px-4 py-2 rounded-2xl border border-stone-700 inline-block max-w-md">
                "{transcript}"
              </p>
            )}
          </div>

          {/* Assistant Response Box */}
          <div className="w-full bg-stone-950/90 p-5 rounded-2xl border border-stone-800 text-stone-200 text-sm leading-relaxed shadow-inner">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-2">
              <Sparkles className="w-4 h-4" />
              <span>رد المساعد الصوتي:</span>
            </div>
            <p className="text-stone-100 font-medium">{response}</p>
          </div>

          {/* Quick Voice Command Shortcuts */}
          <div className="w-full">
            <div className="text-xs text-stone-400 font-bold mb-2 text-right">
              {language === "ar" ? "أوامر صوتية سريعة للتجربة:" : "Quick Voice Commands:"}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { text: "افتح الرياض", icon: MapPin },
                { text: "اعرض الفنادق", icon: Building2 },
                { text: "ابدأ التخطيط", icon: Calendar },
                { text: "ابحث عن مطاعم", icon: Search },
                { text: "افتح الخريطة", icon: Compass }
              ].map((cmd, idx) => {
                const CmdIcon = cmd.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setTranscript(cmd.text);
                      processVoiceCommand(cmd.text);
                    }}
                    className="px-3.5 py-1.5 bg-stone-800 hover:bg-emerald-900 text-amber-300 border border-stone-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <CmdIcon className="w-3.5 h-3.5 text-amber-400" />
                    <span>"{cmd.text}"</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Fallback Text Input Form */}
        <div className="p-4 bg-stone-950 border-t border-stone-800">
          <form onSubmit={handleSubmitText} className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                language === "ar"
                  ? "أو اكتب أمراً هنا (مثل: افتح الرياض، اعرض الفنادق)..."
                  : "Or type a command here..."
              }
              className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-4 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black rounded-xl text-xs flex items-center gap-1 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>إرسال</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
