import React, { useState } from "react";
import { UserRole } from "../../types";
import {
  Mail,
  Lock,
  User,
  CheckCircle2,
  X,
  Compass,
  UserCheck,
  Briefcase,
  Shield,
  Building,
  Layers,
  Sparkles,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight
} from "lucide-react";

interface PortalAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  portalRole: UserRole;
  onAuthSuccess: (userName: string, userEmail: string, role: UserRole) => void;
}

export const PortalAuthModal: React.FC<PortalAuthModalProps> = ({
  isOpen,
  onClose,
  portalRole,
  onAuthSuccess
}) => {
  const [mode, setMode] = useState<"login" | "register" | "forgot" | "otp">("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  const PORTAL_META: Record<UserRole, { titleAr: string; icon: React.ElementType; badgeBg: string }> = {
    tourist: { titleAr: "بوابة السائح الزائر", icon: Compass, badgeBg: "bg-emerald-900 text-amber-300" },
    citizen: { titleAr: "بوابة المواطن والمقيم", icon: UserCheck, badgeBg: "bg-blue-900 text-white" },
    investor: { titleAr: "بوابة المستثمر السياحي", icon: Briefcase, badgeBg: "bg-amber-600 text-white" },
    "tour-guide": { titleAr: "بوابة المرشد السياحي", icon: Shield, badgeBg: "bg-purple-900 text-white" },
    establishment: { titleAr: "بوابة المنشأة السياحية", icon: Building, badgeBg: "bg-teal-900 text-white" },
    "service-provider": { titleAr: "بوابة مزود الخدمات والتنقل", icon: Layers, badgeBg: "bg-indigo-900 text-white" },
    "tourism-ministry": { titleAr: "بوابة وزارة السياحة والرقابة", icon: Sparkles, badgeBg: "bg-emerald-950 text-amber-400" },
    "super-admin": { titleAr: "بوابة مدير النظام والأمن", icon: KeyRound, badgeBg: "bg-rose-950 text-white" }
  };

  const meta = PORTAL_META[portalRole] || PORTAL_META["tourist"];
  const PortalIcon = meta.icon;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(`تم تسجيل الدخول بنجاح بصفة (${meta.titleAr})!`);
    setTimeout(() => {
      onAuthSuccess(fullName || "مستخدم البوابة", email, portalRole);
      onClose();
      setSuccessMessage("");
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(`تم إنشاء حساب جديد بنجاح في (${meta.titleAr})!`);
    setTimeout(() => {
      onAuthSuccess(fullName || "عضو جديد", email, portalRole);
      onClose();
      setSuccessMessage("");
    }, 1000);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(`تم إرسال رمز التحقق OTP إلى البريد (${email})`);
    setTimeout(() => {
      setMode("otp");
      setSuccessMessage("");
    }, 1000);
  };

  const handleOtpReset = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("تمت إعادة تعيين كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول.");
    setTimeout(() => {
      setMode("login");
      setSuccessMessage("");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl overflow-hidden border border-stone-200 relative">
        
        {/* Header */}
        <div className={`p-6 text-white relative ${meta.badgeBg.includes("bg-") ? meta.badgeBg.split(" ")[0] : "bg-emerald-950"}`}>
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <PortalIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">نظام الدخول الموحد</span>
              <h3 className="text-lg font-black leading-tight">{meta.titleAr}</h3>
            </div>
          </div>
          <p className="text-xs text-white/80">أدخل بياناتك للوصول إلى لوحة الخدمات والبيانات المخصصة</p>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {successMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Mode 1: Login */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@saudiexplorer.sa"
                    className="w-full py-2.5 pr-9 pl-3 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-stone-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">كلمة المرور</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full py-2.5 pr-9 pl-9 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-stone-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-1.5 font-medium text-stone-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-emerald-800 focus:ring-emerald-700"
                  />
                  <span>تذكرني على هذا الجهاز</span>
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
                className="w-full py-3 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>تسجيل الدخول إلى {meta.titleAr}</span>
              </button>

              <div className="text-center pt-3 border-t border-stone-100 text-xs">
                <span className="text-stone-500">ليس لديك حساب على هذه البوابة؟ </span>
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

          {/* Mode 2: Register */}
          {mode === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">الاسم الكامل / اسم الجهة</label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: سارة الحارثي"
                    className="w-full py-2.5 pr-9 pl-3 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-stone-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">البريد الإلكتروني الرسمي</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full py-2.5 pr-9 pl-3 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-stone-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">كلمة المرور</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="كلمة مرور قوية"
                    className="w-full py-2.5 pr-9 pl-3 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-stone-50/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                إنشاء وتأكيد الحساب للبوابة
              </button>

              <div className="text-center pt-3 border-t border-stone-100 text-xs">
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

          {/* Mode 3: Forgot Password */}
          {mode === "forgot" && (
            <form onSubmit={handleForgot} className="space-y-4">
              <div className="text-xs text-stone-600 leading-relaxed mb-2">
                أدخل بريدك الإلكتروني المسجل في البوابة لإرسال رمز التحقق OTP لإعادة تعيين كلمة المرور:
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">البريد الإلكتروني المسجل</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full py-2.5 pr-9 pl-3 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-stone-50/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                إرسال رمز التحقق (OTP)
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-xs font-bold text-stone-600 hover:text-stone-900 cursor-pointer flex items-center justify-center gap-1 mx-auto"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>العودة لشاشة الدخول</span>
                </button>
              </div>
            </form>
          )}

          {/* Mode 4: Verification Code (OTP) & New Password */}
          {mode === "otp" && (
            <form onSubmit={handleOtpReset} className="space-y-4">
              <div className="text-xs text-stone-600 mb-2">
                تم إرسال رمز التحقق إلى <span className="font-bold text-emerald-950">{email}</span>. أدخل الرمز وكلمة المرور الجديدة:
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
                  className="w-full py-2.5 px-3 text-center font-mono font-bold tracking-widest text-base rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-stone-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">كلمة المرور الجديدة</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full py-2.5 pr-9 pl-3 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 bg-stone-50/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                تحديث كلمة المرور والدخول
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
