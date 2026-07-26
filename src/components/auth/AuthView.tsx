import React, { useState } from "react";
import { ViewMode, UserRole } from "../../types";
import {
  Compass,
  Mail,
  Lock,
  User,
  Check,
  ArrowRight,
  Sparkles,
  Shield,
  Briefcase,
  Building,
  UserCheck,
  Layers,
  KeyRound,
  CheckCircle2,
  HelpCircle,
  Eye,
  EyeOff
} from "lucide-react";

interface AuthViewProps {
  onSelectView: (view: ViewMode) => void;
  onLoginSuccess: (role: UserRole) => void;
  initialMode?: "login" | "register" | "forgot";
}

export const AuthView: React.FC<AuthViewProps> = ({
  onSelectView,
  onLoginSuccess,
  initialMode = "login"
}) => {
  const [mode, setMode] = useState<"login" | "register" | "forgot" | "reset-otp">(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>("tourist");
  
  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const ROLES_LIST: { id: UserRole; titleAr: string; descAr: string; icon: React.ElementType }[] = [
    {
      id: "tourist",
      titleAr: "بوابة السائح الزائر",
      descAr: "للزوار والسيّاح لاستكشاف المعالم، التخطيط بالذكاء الاصطناعي والحجوزات.",
      icon: Compass
    },
    {
      id: "citizen",
      titleAr: "بوابة المواطن والمقيم",
      descAr: "للمواطنين لاستكشاف الفعاليات المحلية والمشاركة والمقترحات الوطنية.",
      icon: UserCheck
    },
    {
      id: "investor",
      titleAr: "بوابة المستثمر السياحي",
      descAr: "لاستكشاف الفرص الاستثمارية الكبرى ومؤشرات العائد على الاستثمار ROI.",
      icon: Briefcase
    },
    {
      id: "tour-guide",
      titleAr: "بوابة المرشد السياحي",
      descAr: "للمرشدين المعتمدين لإدارة الجولات وحجوزات السيّاح المباشرة.",
      icon: Shield
    },
    {
      id: "establishment",
      titleAr: "بوابة المنشأة السياحية",
      descAr: "للفنادق والمنتجعات والمطاعم لإدارة الخدمات والعروض.",
      icon: Building
    },
    {
      id: "service-provider",
      titleAr: "بوابة مزود الخدمات ذو العلاقة",
      descAr: "لشركات النقل والسيارات والترجمة والفعاليات والخدمات المساندة.",
      icon: Layers
    },
    {
      id: "tourism-ministry",
      titleAr: "بوابة وزارة السياحة",
      descAr: "للجهات الحكومية والرقابية لمتابعة المؤشرات الوطنية والتراخيص.",
      icon: Sparkles
    },
    {
      id: "super-admin",
      titleAr: "بوابة مدير النظام (Super Admin)",
      descAr: "لإدارة الصلاحيات والمستخدمين والأنظمة والأمن السيبراني.",
      icon: KeyRound
    }
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(`تم تسجيل الدخول بنجاح! جاري تحويلك إلى ${selectedRole}...`);
    setTimeout(() => {
      onLoginSuccess(selectedRole);
    }, 1200);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(`تم إنشاء حسابك بنجاح بصفة (${selectedRole})! جاري نقلك للبوابة...`);
    setTimeout(() => {
      onLoginSuccess(selectedRole);
    }, 1200);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMode("reset-otp");
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("تم إعادة تعيين كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول.");
    setTimeout(() => {
      setMode("login");
      setSuccessMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50/70 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Header Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 p-8 text-center text-white relative">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 font-black text-xl flex items-center justify-center mx-auto mb-3 shadow-md">
            S
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">SAUDI EXPLORER AI</h2>
          <p className="text-xs text-amber-300 font-medium mt-1">بوابة الدخول الوطنية الموحدة</p>
        </div>

        {/* Dynamic Content */}
        <div className="p-6 sm:p-8">

          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-sm font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* 1. LOGIN MODE */}
          {mode === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-stone-900">تسجيل الدخول إلى حسابك</h3>
                <p className="text-xs text-stone-500 mt-1">أدخل بريدك الإلكتروني وكلمة المرور للوصول للبوابة الخاصة بك</p>
              </div>

              {/* Quick Role Selection Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  اختر البوابة المطلوب الدخول إليها مباشرة (MVP Selector):
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="w-full py-3 px-4 rounded-xl border border-stone-300 text-sm font-bold bg-stone-50 text-emerald-950 focus:outline-none focus:border-emerald-700"
                >
                  {ROLES_LIST.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.titleAr} ({r.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full py-2.5 pr-10 pl-4 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">كلمة المرور</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full py-2.5 pr-10 pl-10 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-emerald-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3.5 top-3.5 text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 font-medium text-stone-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-emerald-800 focus:ring-emerald-700"
                  />
                  <span>تذكر بياناتي على هذا الجهاز</span>
                </label>

                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
              >
                تسجيل الدخول للبوابة
              </button>

              <div className="text-center pt-4 border-t border-stone-100 text-xs">
                <span className="text-stone-500">ليس لديك حساب على المنصة؟ </span>
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="font-bold text-emerald-950 underline hover:text-emerald-800 cursor-pointer"
                >
                  إنشاء حساب جديد
                </button>
              </div>
            </form>
          )}

          {/* 2. REGISTER MODE */}
          {mode === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-stone-900">إنشاء حساب جديد بالمنصة</h3>
                <p className="text-xs text-stone-500 mt-1">حدد صفة حسابك للوصول للخدمات المخصصة</p>
              </div>

              {/* Role Card Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">اختر نوع الحساب المطلوب:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto p-1 border border-stone-200 rounded-2xl bg-stone-50/50">
                  {ROLES_LIST.map((r) => {
                    const Icon = r.icon;
                    const isSelected = selectedRole === r.id;
                    return (
                      <button
                        type="button"
                        key={r.id}
                        onClick={() => setSelectedRole(r.id)}
                        className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex items-start gap-2.5 ${
                          isSelected
                            ? "bg-emerald-900 text-white border-emerald-900 shadow-xs"
                            : "bg-white text-stone-800 border-stone-200 hover:bg-emerald-50/50"
                        }`}
                      >
                        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? "text-amber-300" : "text-emerald-700"}`} />
                        <div>
                          <div className="font-bold text-xs">{r.titleAr}</div>
                          <div className={`text-[10px] mt-0.5 ${isSelected ? "text-stone-200" : "text-stone-500"}`}>
                            {r.descAr}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">الاسم الكامل / اسم الجهة</label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: عبدالله الشمري"
                    className="w-full py-2.5 pr-10 pl-4 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">البريد الإلكتروني الرسمي</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full py-2.5 pr-10 pl-4 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">كلمة المرور</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="8 أرقام وحروف على الأقل"
                    className="w-full py-2.5 pr-10 pl-4 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
              >
                تأكيد وإنشاء الحساب
              </button>

              <div className="text-center pt-4 border-t border-stone-100 text-xs">
                <span className="text-stone-500">لديك حساب بالفعل؟ </span>
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-bold text-emerald-950 underline hover:text-emerald-800 cursor-pointer"
                >
                  تسجيل الدخول
                </button>
              </div>
            </form>
          )}

          {/* 3. FORGOT PASSWORD MODE */}
          {mode === "forgot" && (
            <form onSubmit={handleForgotSubmit} className="space-y-5">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-stone-900">استعادة كلمة المرور</h3>
                <p className="text-xs text-stone-500 mt-1">
                  أدخل بريدك الإلكتروني المسجل وسنرسل لك رمز التحقق (OTP) لإعادة الضبط
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">البريد الإلكتروني المسجل</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full py-2.5 pr-10 pl-4 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
              >
                إرسال رمز التحقق OTP
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-xs font-bold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  الرجوع لتسجيل الدخول
                </button>
              </div>
            </form>
          )}

          {/* 4. RESET OTP MODE */}
          {mode === "reset-otp" && (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-5">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-stone-900">أدخل رمز التحقق كلمة المرور الجديدة</h3>
                <p className="text-xs text-stone-500 mt-1">تم إرسال رمز افتراضي محاكي إلى بريدك</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">رمز التحقق (OTP Code)</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="123456"
                  className="w-full py-2.5 px-4 text-center font-mono font-bold tracking-widest text-lg rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">كلمة المرور الجديدة</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full py-2.5 pr-10 pl-4 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
              >
                تحديث كلمة المرور
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
