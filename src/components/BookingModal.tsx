import React, { useState } from "react";
import { X, CheckCircle2, Calendar, Users, ShieldCheck, Ticket, Printer } from "lucide-react";

interface BookingModalProps {
  serviceName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  serviceName,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [date, setDate] = useState("2026-08-15");
  const [guestsCount, setGuestsCount] = useState(2);
  const [fullName, setFullName] = useState("عبدالله العتيبي");
  const [phone, setPhone] = useState("+966 50 123 4567");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const voucherCode = `SE-KSA-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
        
        {/* Header */}
        <div className="p-5 bg-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base sm:text-lg">محاكاة الحجز الموحد</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isConfirmed ? (
          /* Booking Form */
          <form onSubmit={handleConfirm} className="p-6 space-y-4">
            
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="text-xs text-stone-500 font-semibold">الخدمة المطلوبة:</div>
              <div className="text-sm font-extrabold text-emerald-950">{serviceName}</div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                الاسم بالكامل
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  تاريخ الزيارة
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  عدد الأشخاص
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                رقم الجوال
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
              />
            </div>

            <div className="p-3 bg-amber-50 rounded-xl text-[11px] text-amber-900 flex items-start gap-2 border border-amber-200">
              <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                ملاحظة: هذا الحجز هو محاكاة تجريبيةضمن نموذج المنصة (MVP). البنية الموحدة جاهزة للربط الفعلي مع بوابات الدفع ومزودي الخدمات.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer"
            >
              تأكيد واستخراج القسيمة التجريبية
            </button>

          </form>
        ) : (
          /* Confirmation Ticket View */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                قسيمة موحدة مؤكدة (MVP Voucher)
              </span>
              <h3 className="text-xl font-black text-emerald-950 mt-2">
                تم تأكيد طلبك بنجاح
              </h3>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-dashed border-stone-300 text-right space-y-2 text-xs">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">رمز القسيمة:</span>
                <span className="font-extrabold text-emerald-900 font-mono">{voucherCode}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">اسم الخدمة:</span>
                <span className="font-bold text-stone-800">{serviceName}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">اسم المستفيد:</span>
                <span className="font-bold text-stone-800">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">التاريخ والعدد:</span>
                <span className="font-bold text-stone-800">{date} ({guestsCount} ضيوف)</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة القسيمة</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                تم
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
