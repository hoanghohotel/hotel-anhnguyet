import React, { useEffect, useState } from 'react';
import { Sparkles, ShieldCheck, Lock, CheckCircle2, Clock } from 'lucide-react';

interface BookingLoadingOverlayProps {
  isVisible: boolean;
  serviceName?: string;
  customerName?: string;
  phone?: string;
}

export const BookingLoadingOverlay: React.FC<BookingLoadingOverlayProps> = ({
  isVisible,
  serviceName = 'Phòng Nghỉ VIP 4 Sao',
  customerName,
  phone,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(18);

  const steps = [
    {
      title: 'Xác thực thông tin khách hàng & kiểm tra phòng trống',
      detail: 'Kiểm tra tình trạng thực tế tại sảnh Ánh Nguyệt 207 Phan Ngọc Hiển',
    },
    {
      title: 'Kích hoạt ưu đãi trực tiếp -15% & quà chào đón Đất Mũi',
      detail: 'Áp dụng chính sách giá tốt nhất không qua trung gian OTA',
    },
    {
      title: 'Khởi tạo mã đặt phòng & bảo mật thông tin chuẩn SSL',
      detail: 'Thông báo tự động tới đội ngũ Lễ tân trực 24/7',
    },
  ];

  useEffect(() => {
    if (!isVisible) {
      setCurrentStepIndex(0);
      setProgressPercent(18);
      return;
    }

    // Step 1 -> Step 2
    const timer1 = setTimeout(() => {
      setCurrentStepIndex(1);
      setProgressPercent(58);
    }, 600);

    // Step 2 -> Step 3
    const timer2 = setTimeout(() => {
      setCurrentStepIndex(2);
      setProgressPercent(92);
    }, 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className="absolute inset-0 z-30 rounded-3xl flex flex-col items-center justify-center p-6 sm:p-10 text-center bg-[#070a0e]/90 backdrop-blur-2xl border border-[#d4af37]/40 shadow-2xl transition-all duration-300"
      style={{
        backdropFilter: 'blur(28px) saturate(200%)',
        WebkitBackdropFilter: 'blur(28px) saturate(200%)',
      }}
      aria-live="polite"
      aria-busy="true"
    >
      {/* Ambient Champagne Halo Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-8 right-8 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Decorative Gold Badge */}
      <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37]/10 to-transparent border border-[#d4af37]/40 text-[#d4af37] text-[11px] font-semibold tracking-wider uppercase mb-6 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
        <span>Hệ Thống Concierge Đặt Chỗ Trực Tiếp</span>
      </div>

      {/* Luxurious Concentric Ring Spinner */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-6 flex items-center justify-center">
        {/* Outer dashed spinning ring */}
        <div 
          className="absolute inset-0 rounded-full border border-dashed border-[#d4af37]/40 animate-spin"
          style={{ animationDuration: '12s' }}
        />

        {/* Middle smooth counter-clockwise ring */}
        <div 
          className="absolute inset-2 rounded-full border-2 border-t-[#d4af37] border-r-transparent border-b-[#d4af37]/20 border-l-transparent animate-spin"
          style={{ animationDuration: '2s' }}
        />

        {/* Pulsing Liquid Glass Inner Emblem */}
        <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-[#d4af37]/30 via-white/10 to-[#b89325]/20 border border-[#d4af37]/60 backdrop-blur-md flex items-center justify-center shadow-lg shadow-[#d4af37]/25 animate-pulse">
          <div className="font-display font-bold text-lg sm:text-xl text-gradient-gold">
            AN
          </div>
        </div>

        {/* Floating mini status orb */}
        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-md">
          <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
      </div>

      {/* Headline & Dynamic Message */}
      <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
        Đang Xử Lý Yêu Cầu Đặt Phòng...
      </h3>
      
      <p className="text-neutral-300 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
        {customerName ? (
          <>
            Đang xác nhận dịch vụ <span className="text-[#d4af37] font-semibold">{serviceName}</span> cho Quý khách <span className="text-white font-semibold">{customerName}</span>.
          </>
        ) : (
          <>
            Hệ thống đang kết nối trực tiếp với bàn tiếp tân khách sạn Ánh Nguyệt để khóa phòng và áp dụng ưu đãi giảm 15%.
          </>
        )}
      </p>

      {/* Liquid Glass Progress Bar */}
      <div className="w-full max-w-md mb-6">
        <div className="flex justify-between items-center text-[11px] mb-2 px-1">
          <span className="text-[#d4af37] font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
            {steps[currentStepIndex].title}
          </span>
          <span className="font-mono text-neutral-400 font-semibold">{progressPercent}%</span>
        </div>

        <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden border border-white/15 p-[1px]">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-[#d4af37] via-[#f4e8d0] to-[#b89325] shadow-sm shadow-[#d4af37]/50 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-[11px] text-neutral-400 mt-2 text-left px-1 flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
          <span>{steps[currentStepIndex].detail}</span>
        </p>
      </div>

      {/* Trust & Guarantee Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2 border-t border-white/10 text-[11px] text-neutral-300 max-w-lg">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <Lock className="w-3 h-3 text-[#d4af37]" />
          Bảo mật SSL 256-bit
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          Không trừ tiền thẻ trước
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <Sparkles className="w-3 h-3 text-amber-400" />
          Giữ phòng 100%
        </span>
      </div>
    </div>
  );
};
