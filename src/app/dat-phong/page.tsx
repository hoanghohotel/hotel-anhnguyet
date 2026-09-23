'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  Check, 
  X as XIcon, 
  Calendar, 
  Users, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  Percent, 
  Car, 
  UtensilsCrossed, 
  HelpCircle,
  Building,
  ChevronDown,
  Award
} from 'lucide-react';
import { HOTEL_INFO, ROOMS_DATA } from '../../data/hotelData';
import { BookingLoadingOverlay } from '../../components/BookingLoadingOverlay';

/**
 * Hàm tracking sự kiện Google Ads Conversion chuẩn
 * Hỗ trợ cả Google Tag (gtag.js) và DataLayer cho Google Tag Manager
 */
function trackGoogleAdsConversion(conversionData: {
  bookingId: string;
  serviceType: string;
  customerName: string;
  phone: string;
  estimatedTotal: number;
}) {
  if (typeof window !== 'undefined') {
    const win = window as any;
    
    // 1. Gửi qua dataLayer cho GTM / GA4
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push({
      event: 'gtag_report_conversion',
      conversion_type: 'lead_booking',
      transaction_id: conversionData.bookingId,
      value: conversionData.estimatedTotal,
      currency: 'VND',
      service_type: conversionData.serviceType,
      phone_hashed: conversionData.phone ? 'true' : 'false',
    });

    // 2. Gửi trực tiếp nếu có Google Ads Global Tag (gtag)
    if (typeof win.gtag === 'function') {
      win.gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
        value: conversionData.estimatedTotal,
        currency: 'VND',
        transaction_id: conversionData.bookingId,
      });
    }

    console.log('[Google Ads Tracking]: gtag_report_conversion triggered for', conversionData.bookingId);
  }
}

interface DatPhongPageProps {
  onBackToHome?: () => void;
}

export default function DatPhongPage({ onBackToHome }: DatPhongPageProps) {
  const [serviceType, setServiceType] = useState<'suite' | 'deluxe' | 'twin' | 'dining' | 'banquet'>('suite');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState('2026-09-25');
  const [checkOutDate, setCheckOutDate] = useState('2026-09-26');
  const [guestCount, setGuestCount] = useState('2');
  const [specialNote, setSpecialNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Giá tính toán nhanh
  const priceMap: Record<string, { name: string; price: number; originalPrice: number }> = {
    suite: { name: 'Suite Tổng Thống Hoàng Gia', price: 1850000, originalPrice: 2200000 },
    deluxe: { name: 'Deluxe King Hướng Phố', price: 890000, originalPrice: 1100000 },
    twin: { name: 'Grand Premium Twin (2 Giường)', price: 990000, originalPrice: 1250000 },
    dining: { name: 'Bàn Tiệc Đặc Sản Cua Năm Căn Cà Mau', price: 1200000, originalPrice: 1450000 },
    banquet: { name: 'Sảnh Hội Nghị & Tiệc Cưới VIP', price: 5000000, originalPrice: 6000000 },
  };

  const currentSelection = priceMap[serviceType];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitting(true);

    const generatedId = `AN-${Date.now().toString().slice(-6)}`;
    setBookingCode(generatedId);

    // Kích hoạt Google Ads Conversion Event
    trackGoogleAdsConversion({
      bookingId: generatedId,
      serviceType: currentSelection.name,
      customerName: fullName,
      phone: phone,
      estimatedTotal: currentSelection.price,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2100);
  };

  return (
    <div className="min-h-screen bg-[#0b0f14] text-[#e8ecf1]">
      {/* Thanh Header Slimline siêu nhanh tối ưu Quality Score */}
      <header className="sticky top-0 z-40 bg-[#0e131a]/95 backdrop-blur-xl border-b border-white/10 py-3 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Trang chủ</span>
            </button>
            <div className="flex flex-col">
              <span className="font-display font-bold text-white text-base tracking-wide">
                ÁNH NGUYỆT HOTEL & RESTAURANT
              </span>
              <span className="text-[10px] text-[#d4af37]">207 Phan Ngọc Hiển, Phường Tân Thành, Tỉnh Cà Mau</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Ưu Đãi Trực Tiếp -15% Hôm Nay
            </div>

            <a
              href={`tel:${HOTEL_INFO.hotline.replace(/\s+/g, '')}`}
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'phone_call_click', { event_category: 'Google_Ads_Contact' });
                }
              }}
              className="liquid-btn-champagne px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#d4af37]/25"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Gọi {HOTEL_INFO.hotline}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Hero Section: Google Ads Search Intent Matching */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/15 text-[#d4af37] text-xs font-bold uppercase tracking-wider border border-[#d4af37]/30">
            <Sparkles className="w-3.5 h-3.5" />
            Trang Đặt Chỗ Độc Quyền Google Ads
          </div>

          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Đặt Phòng Khách Sạn & Tiệc Cà Mau <br />
            <span className="text-gradient-gold">Giá Tốt Nhất Tại 207 Phan Ngọc Hiển</span>
          </h1>

          <p className="text-neutral-300 text-sm sm:text-base font-light">
            Không cần thanh toán trước · Cam kết giữ phòng 100% · Nhận phòng nhanh dưới 2 phút · Miễn phí hủy trước 24 giờ.
          </p>

          {/* 4 Cam Kết Vàng */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Giảm 15% giá niêm yết</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
              <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>Không cần cọc thẻ tín dụng</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
              <Car className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Hỗ trợ xe đón sân bay</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
              <UtensilsCrossed className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Cua Năm Căn tươi sống</span>
            </div>
          </div>
        </div>

        {/* ==========================================================
            FORM ĐẶT PHÒNG KÍNH MỜ CHUYỂN ĐỔI CAO (High-Conversion Form)
            ========================================================== */}
        <div className="liquid-glass-hero rounded-3xl p-6 sm:p-10 border border-[#d4af37]/40 shadow-2xl mb-16 relative overflow-hidden">
          <div className="ambient-champagne-glow -top-20 -right-20 w-80 h-80 opacity-20" />

          {/* Thành phần Loading Overlay Sang Trọng Liquid Glass */}
          <BookingLoadingOverlay
            isVisible={isSubmitting}
            serviceName={currentSelection.name}
            customerName={fullName}
            phone={phone}
          />

          {isSuccess ? (
            <div className="py-12 text-center max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-in zoom-in-75 duration-300">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Đặt Chỗ Thành Công!
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Cảm ơn Quý khách <strong className="text-white">{fullName}</strong>. Hệ thống đã kích hoạt ưu đãi giảm 15% cho dịch vụ <strong className="text-[#d4af37]">{currentSelection.name}</strong>.
              </p>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Mã đặt phòng:</span>
                  <span className="font-mono font-bold text-[#d4af37]">{bookingCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Số điện thoại:</span>
                  <span className="text-white">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Ngày nhận phòng:</span>
                  <span className="text-white">{checkInDate}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span className="text-neutral-400">Giá ưu đãi trực tiếp:</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    {currentSelection.price.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>

              <p className="text-xs text-neutral-400">
                Lễ tân Ánh Nguyệt sẽ gọi lại xác nhận và giữ phòng trong vòng 3 phút tới.
              </p>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white border border-white/15 cursor-pointer"
                >
                  Đặt thêm phòng khác
                </button>
                <a
                  href={`tel:${HOTEL_INFO.hotline.replace(/\s+/g, '')}`}
                  className="liquid-btn-champagne px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Gọi Lễ Tân Ngay</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Bước 1: Chọn dịch vụ & Xem giá trực tiếp */}
              <div>
                <label className="block text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-3">
                  1. Chọn Loại Phòng / Dịch Vụ Cần Đặt
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { id: 'suite', label: 'Suite Tổng Thống', sub: '1.850.000đ' },
                    { id: 'deluxe', label: 'Deluxe Hướng Phố', sub: '890.000đ' },
                    { id: 'twin', label: 'Grand Twin 2 Giường', sub: '990.000đ' },
                    { id: 'dining', label: 'Tiệc Cua Năm Căn', sub: 'Từ 1.200.000đ' },
                    { id: 'banquet', label: 'Hội Nghị / Tiệc Cưới', sub: 'Tư vấn riêng' },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setServiceType(item.id as any)}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                        serviceType === item.id
                          ? 'bg-[#d4af37]/20 border-[#d4af37] shadow-md shadow-[#d4af37]/20 text-white'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 text-neutral-300'
                      }`}
                    >
                      <div className="text-xs font-bold truncate">{item.label}</div>
                      <div className="text-[11px] text-[#d4af37] mt-0.5">{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bước 2: Thời gian & Số khách */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Ngày nhận phòng / Đặt tiệc</span>
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Ngày trả phòng</span>
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Số lượng khách</span>
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121820] border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="1">1 Khách (Doanh nhân)</option>
                    <option value="2">2 Khách (Cặp đôi / Đối tác)</option>
                    <option value="4">3 - 4 Khách (Gia đình)</option>
                    <option value="10">Đoàn công tác (5 - 15 khách)</option>
                    <option value="50">Đoàn sự kiện / Tiệc (Trên 20 khách)</option>
                  </select>
                </div>
              </div>

              {/* Bước 3: Thông tin liên hệ khách hàng */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Họ và tên Quý khách <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Số điện thoại nhận xác nhận & mã giảm giá <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ví dụ: 0912 345 678"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Ghi chú thêm */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Yêu cầu đặc biệt (Đón sân bay Cà Mau, hóa đơn VAT công ty, ăn chay, phòng tầng cao...)
                </label>
                <input
                  type="text"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="Ghi chú thêm nếu có..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Thanh chốt giá & Nút Submit chuyển đổi */}
              <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left w-full sm:w-auto">
                  <div className="text-xs text-neutral-400">
                    Giá gốc: <span className="line-through">{currentSelection.originalPrice.toLocaleString('vi-VN')} đ</span>
                    <span className="ml-2 text-emerald-400 font-semibold">(Tiết kiệm 15%)</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-display text-gradient-gold">
                    {currentSelection.price.toLocaleString('vi-VN')} VNĐ / Đêm
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto liquid-btn-champagne px-8 py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-[#d4af37]/30 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Đang gửi thông tin...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Xác Nhận Giữ Chỗ & Nhận Giảm 15%</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-[11px] text-neutral-400">
                🔒 Cam kết bảo mật thông tin. Khách sạn không yêu cầu thanh toán thẻ tín dụng trực tuyến.
              </div>
            </form>
          )}

          {/* Floating 'Certified Luxury 4-Star' Badge */}
          <div 
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-5 z-20 pointer-events-none animate-subtle-bounce"
            title="Certified Luxury 4-Star"
          >
            <div className="liquid-glass px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl border border-[#d4af37]/50 bg-[#070a0e]/85 backdrop-blur-xl shadow-xl shadow-black/60 flex items-center gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-xl bg-gradient-to-br from-[#d4af37]/30 to-[#b89325]/10 border border-[#d4af37]/60 flex items-center justify-center text-[#d4af37] shrink-0 shadow-sm">
                <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#d4af37]" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-white font-display">
                    Certified Luxury 4-Star
                  </span>
                  <span className="text-[#d4af37] text-[9px] tracking-tighter">★★★★</span>
                </div>
                <span className="text-[8px] sm:text-[9px] text-[#d4af37]/90 font-medium">
                  Ánh Nguyệt Hotel & Dining Cà Mau
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================
            MỤC SO SÁNH TIỆN ÍCH ĐỘC QUYỀN (COMPARISON MATRIX)
            Ánh Nguyệt Hotel vs. Nhà nghỉ/Khách sạn thường tại Cà Mau
            ========================================================== */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
              Minh Bạch Tiêu Chuẩn Chất Lượng
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Vì Sao Du Khách & Doanh Nhân Chọn Ánh Nguyệt?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Bảng so sánh chi tiết giữa tổ hợp Ánh Nguyệt Hotel & Restaurant với các nhà nghỉ, khách sạn thông thường tại Cà Mau:
            </p>
          </div>

          <div className="liquid-glass rounded-3xl overflow-hidden border border-white/15">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-4 sm:p-5 font-semibold text-neutral-300 w-1/3">Tiêu Chí Đánh Giá</th>
                    <th className="p-4 sm:p-5 font-bold text-[#d4af37] bg-[#d4af37]/10 w-1/3 border-x border-[#d4af37]/30">
                      ⭐ KHÁCH SẠN ÁNH NGUYỆT (VIP 4 SAO)
                    </th>
                    <th className="p-4 sm:p-5 font-medium text-neutral-400 w-1/3">
                      Nhà Nghỉ / Khách Sạn Thường Cà Mau
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="p-4 sm:p-5 font-medium text-white">
                      1. Vị trí & Mặt tiền giao thông
                    </td>
                    <td className="p-4 sm:p-5 bg-[#d4af37]/5 font-semibold text-emerald-400 border-x border-[#d4af37]/20">
                      Mặt tiền số 207 Phan Ngọc Hiển, Phường Tân Thành, Tỉnh Cà Mau, ô tô 45 chỗ đỗ tận cửa
                    </td>
                    <td className="p-4 sm:p-5 text-neutral-400">
                      Nằm trong hẻm nhỏ hoặc xa trung tâm, khó đón taxi, đường chật hẹp
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 sm:p-5 font-medium text-white">
                      2. Ẩm thực Cua Cà Mau & Bể hải sản tại chỗ
                    </td>
                    <td className="p-4 sm:p-5 bg-[#d4af37]/5 font-semibold text-emerald-400 border-x border-[#d4af37]/20">
                      Nhà hàng chuyên Cua Năm Căn tươi sống tại hồ, cá thòi lòi nướng muối ớt, lẩu mắm U Minh
                    </td>
                    <td className="p-4 sm:p-5 text-neutral-400">
                      Không có nhà hàng, phải di chuyển xa tìm quán ăn bên ngoài
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 sm:p-5 font-medium text-white">
                      3. Tiện nghi phòng & Giường nệm cao cấp
                    </td>
                    <td className="p-4 sm:p-5 bg-[#d4af37]/5 font-semibold text-emerald-400 border-x border-[#d4af37]/20">
                      Nệm lò xo túi êm ái chuẩn khách sạn 4 sao, bồn tắm nằm massage, cách âm tốt
                    </td>
                    <td className="p-4 sm:p-5 text-neutral-400">
                      Nệm cứng mỏng, phòng ẩm mốc, cách âm kém, tiện nghi tối thiểu
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 sm:p-5 font-medium text-white">
                      4. Hồ bơi sân vườn & Thư giãn
                    </td>
                    <td className="p-4 sm:p-5 bg-[#d4af37]/5 font-semibold text-emerald-400 border-x border-[#d4af37]/20">
                      Hồ bơi ngoài trời xanh mát, quầy bar sân vườn thư giãn cho cả gia đình
                    </td>
                    <td className="p-4 sm:p-5 text-neutral-400">
                      Hoàn toàn không có hồ bơi hoặc không gian sân vườn
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 sm:p-5 font-medium text-white">
                      5. Xe đưa đón & Tour Mũi Cà Mau
                    </td>
                    <td className="p-4 sm:p-5 bg-[#d4af37]/5 font-semibold text-emerald-400 border-x border-[#d4af37]/20">
                      Hỗ trợ xe riêng đón Sân bay Cà Mau, kết nối cano cao tốc lướt sóng Đất Mũi
                    </td>
                    <td className="p-4 sm:p-5 text-neutral-400">
                      Khách tự túc bắt xe ôm/taxi, không hỗ trợ lịch trình du lịch
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 sm:p-5 font-medium text-white">
                      6. Hóa đơn VAT & Thanh toán công ty
                    </td>
                    <td className="p-4 sm:p-5 bg-[#d4af37]/5 font-semibold text-emerald-400 border-x border-[#d4af37]/20">
                      Xuất hóa đơn điện tử VAT hợp lệ ngay trong ngày cho cơ quan, doanh nghiệp
                    </td>
                    <td className="p-4 sm:p-5 text-neutral-400">
                      Thường không có hóa đơn đỏ hoặc thủ tục rườm rà
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ==========================================================
            CÂU HỎI THƯỜNG GẶP (FAQ - Tối ưu Google Ads Quality Score)
            ========================================================== */}
        <div className="max-w-3xl mx-auto space-y-4 mb-12">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white text-center mb-6">
            Câu Hỏi Thường Gặp Khi Đặt Phòng
          </h3>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="font-semibold text-white text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#d4af37]" />
              <span>Giờ nhận phòng (Check-in) và trả phòng (Check-out) như thế nào?</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed pl-6">
              Giờ nhận phòng tiêu chuẩn là từ 14:00 và trả phòng trước 12:00 trưa hôm sau. Khách sạn có chính sách hỗ trợ nhận phòng sớm miễn phí nếu có phòng trống sẵn sàng.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="font-semibold text-white text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#d4af37]" />
              <span>Khách sạn có bãi đỗ xe ô tô 16 - 45 chỗ không?</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed pl-6">
              Có. Khách sạn Ánh Nguyệt sở hữu khuôn viên đỗ xe rộng rãi có bảo vệ 24/24, đỗ được nhiều xe ô tô 4 chỗ, 7 chỗ, 16 chỗ và xe du lịch 45 chỗ hoàn toàn miễn phí.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="font-semibold text-white text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#d4af37]" />
              <span>Tôi đi công tác có thể xuất hóa đơn VAT công ty không?</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed pl-6">
              Chắc chắn có. Khách sạn xuất hóa đơn giá trị gia tăng (VAT) điện tử hợp pháp cho tiền phòng và dịch vụ ăn uống tiệc theo đúng thông tin doanh nghiệp Quý khách cung cấp.
            </p>
          </div>
        </div>

      </main>

      {/* Footer Slimline */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-xs text-neutral-400 bg-[#0e131a]">
        <div className="max-w-4xl mx-auto space-y-1.5">
          <p className="font-semibold text-white text-sm">Khách Sạn & Nhà Hàng Ánh Nguyệt Cà Mau</p>
          <p className="text-neutral-300">Địa chỉ: 207 Phan Ngọc Hiển, Phường Tân Thành, Tỉnh Cà Mau</p>
          <p className="text-neutral-400">
            Hotline: <a href={`tel:${HOTEL_INFO.hotline.replace(/\s+/g, '')}`} className="text-[#d4af37] font-semibold">{HOTEL_INFO.hotline}</a> · 
            Email: <a href="mailto:anhnguyethotel@gmail.com" className="text-[#d4af37] font-semibold">anhnguyethotel@gmail.com</a>
          </p>
          <p className="pt-2 text-neutral-500 text-[11px]">© 2026 Ánh Nguyệt Hotel & Dining. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
