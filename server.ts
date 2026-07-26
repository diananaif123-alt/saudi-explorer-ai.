import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY environment variable is not defined");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// --- API Routes ---

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "SAUDI EXPLORER AI", timestamp: new Date().toISOString() });
});

// AI Travel Chat Assistant
app.post("/api/ai-chat", async (req, res) => {
  try {
    const { message, history = [], language = "ar" } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    const systemInstruction = `
أنت "مستشار SAUDI EXPLORER AI" - المساعد السياحي الذكي التفاعلي الرسمي والرائد للمملكة العربية السعودية.
شعار المنصة: "اكتشف السعودية بذكاء".

دورك ومهامك:
1. إجابة استفسارات السياح والزوار باللغة المطلوبة (اللغة الحالية: ${language === "ar" ? "العربية" : language}).
2. تقديم معلومات دقيقة وفاخرة ومحدثة عن المعالم السياحية في المملكة (الرياض، العلا، درعية، جدة التاريخية، أبها وعسير، البحر الأحمر، تبوك ونيوم، الأحساء، حائل، جازان، نجران...).
3. اقتراح مسارات سياحية مخصصة، فنادق فاخرة ومنتجة، مطاعم سعودية تراثية وعالمية، وفعاليات موسم الرياض ومواسم السعودية والشارع الثقافي.
4. توضيح إجراءات التأشيرة السياحية (eVisa) وشروط الدخول والتعليمات الثقافية بكل ترحاب وضيافة سعودية أصيلة ("أهلاً وسهلاً بكم في أرض الحضارات").
5. نسّق الإجابة بتنسيق جميل وواضح باستخدام نقاط وقوائم وجداول بسيطة عند الحاجة مع إيموجيز معبرة ولطيفة.
    `;

    // Format chat history for Gemini
    const formattedHistory = history.map((msg: { role: string; text: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: formattedHistory,
    });

    const result = await chat.sendMessage({ message });
    const replyText = result.text || "عذرًا، حدث خطأ مؤقت في معالجة طلبك. يُرجى المحاولة مرة أخرى.";

    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Error in /api/ai-chat:", error);
    res.status(500).json({
      error: "فشل الاتصال بمساعد الذكاء الاصطناعي. يُرجى التأكد من مفتاح API والمحاولة لاحقًا.",
      details: error.message,
    });
  }
});

// AI Itinerary Generator
app.post("/api/ai-itinerary", async (req, res) => {
  try {
    const {
      destination = "العُلا والرياض",
      days = 3,
      budget = "متوسط إلى فاخر",
      interests = ["ثقافة وآثار", "طبيعة ومغامرة", "تجارب طهي"],
      travelers = "عائلة",
      language = "ar",
    } = req.body;

    const ai = getGeminiClient();

    const prompt = `
قم بإنشاء جدول رحلة سياحية متكامل ومخصص بذكاء في المملكة العربية السعودية بالبيانات التالية:
- الوجهة: ${destination}
- عدد الأيام: ${days} أيام
- مستوى الميزانية: ${budget}
- الاهتمامات الرئيسية: ${Array.isArray(interests) ? interests.join("، ") : interests}
- نوع المسافرين: ${travelers}
- اللغة المطلوبة للرد: ${language === "ar" ? "العربية" : language}

يرجى إرجاع النتيجة بتنسيق JSON حصرياً بالهيكل التالي:
{
  "title": "عنوان جذاب للرحلة",
  "summary": "ملخص شامل وتوصيات للرحلة",
  "estimatedBudgetSAR": "الميزانية التقديرية بالريال السعودي (مثال: 4,500 - 6,000 ر.س)",
  "bestTimeToVisit": "أفضل أوقات الزيارة والطقس المتوقع",
  "days": [
    {
      "dayNumber": 1,
      "title": "عنوان اليوم الأول",
      "morning": "نشاط الصباح مع الموقع وتوصيات الفطور",
      "afternoon": "نشاط الظهيرة والتسوق أو المعالم وتوصيات الغداء",
      "evening": "نشاط المساء والسهل وتوصيات العشاء والمقاهي",
      "proTip": "نصيحة ذهبية محلية لليوم"
    }
  ],
  "recommendedHotels": ["اسم الفندق 1", "اسم الفندق 2"],
  "recommendedDining": ["مطعم 1", "مطعم 2"],
  "packingList": ["ملاحظة أو غرض 1", "غرض 2"],
  "visaAndEtiquette": "نصائح إتيكيت ومعلومات مهمة"
}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const jsonText = response.text || "{}";
    const itineraryData = JSON.parse(jsonText);

    res.json({ itinerary: itineraryData });
  } catch (error: any) {
    console.error("Error in /api/ai-itinerary:", error);
    res.status(500).json({
      error: "فشل توليد جدول الرحلة الذكي. يُرجى المحاولة مرة أخرى.",
      details: error.message,
    });
  }
});

// Visa eligibility assistant endpoint
app.post("/api/visa-check", (req, res) => {
  const { nationality, residencyStatus } = req.body;
  if (!nationality) {
    return res.status(400).json({ error: "Nationality is required" });
  }

  const eligibleForInstantEVisa = [
    "US", "UK", "CA", "EU", "AU", "NZ", "JP", "KR", "SG", "CN", "MY", "AE", "KW", "QA", "BH", "OM", "CH", "NO"
  ];

  const isInstant = eligibleForInstantEVisa.includes(nationality.toUpperCase()) || residencyStatus === "GCC_RESIDENT" || residencyStatus === "US_UK_EU_VISA";

  res.json({
    eligibleForEVisa: true,
    instantApproval: isInstant,
    type: isInstant ? "تأشيرة سياحية إلكترونية فورية (eVisa)" : "تأشيرة عند الوصول / السفارة",
    validity: "سنة واحدة (دخول متعدد - إقامة حتى 90 يوماً)",
    feeSAR: 480,
    requiredDocuments: [
      "جواز سفر سارٍ لمدة لا تقل عن 6 أشهر",
      "تأمين طبي شامل (مشمول في رسوم التأشيرة)",
      "عنوان الإقامة في المملكة (حجز فندقي)",
    ],
    note: "بيانات الاستعلام تجريبية (MVP) ومطابقة للضوابط الرسمية لوزارة السياحة وتأشيرة روح السعودية."
  });
});

// --- Server Setup with Vite / Production static ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SAUDI EXPLORER AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
