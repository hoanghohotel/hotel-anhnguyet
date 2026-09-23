'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  ChevronRight, 
  Star, 
  Maximize2, 
  Bed, 
  Utensils, 
  ShieldCheck, 
  Waves, 
  Wine, 
  Compass, 
  ArrowUpRight, 
  Check, 
  Clock, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { 
  HOTEL_INFO, 
  ROOMS_DATA, 
  MENU_SPECIALTIES, 
  HIGHLIGHTS_DATA, 
  TESTIMONIALS,
  Room,
  MenuItem 
} from '../data/hotelData';
import { BookingModal } from '../components/BookingModal';
import { NewsSection } from '../components/NewsSection';

interface HomePageProps {
  onOpenBookingModal?: (type?: 'room' | 'table') => void;
}

export default function HomePage({
  onOpenBookingModal,
}: HomePageProps) {
  // Booking modal internal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'room' | 'table'>('room');
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>(undefined);
  const [selectedDishName, setSelectedDishName] = useState<string | undefined>(undefined);

  // Quick reservation bar state
  const [quickService, setQuickService] = useState<'room' | 'table'>('room');
  const [quickDate, setQuickDate] = useState('2026-09-25');
  const [quickGuests, setQuickGuests] = useState('2');

  // Menu category filter
  const [menuFilter, setMenuFilter] = useState<'all' | 'crab' | 'seafood' | 'local' | 'banquet'>('all');

  // Active room preview
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);

  const handleOpenBooking = (type: 'room' | 'table' = 'room', roomId?: string, dishName?: string) => {
    setBookingType(type);
    setSelectedRoomId(roomId);
    setSelectedDishName(dishName);
    if (onOpenBookingModal) {
      onOpenBookingModal(type);
    } else {
      setIsBookingOpen(true);
    }
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleOpenBooking(quickService);
  };

  const filteredMenu = menuFilter === 'all' 
    ? MENU_SPECIALTIES 
    : MENU_SPECIALTIES.filter(item => item.category === menuFilter);

  return (
    <div className="min-h-screen bg-[#0b0f14] text-[#e8ecf1] selection:bg-[#d4af37]/30 selection:text-white">
      {/* ==========================================================
          HERO SECTION (Apple Liquid Glass Luxury)
          ========================================================== */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Ambience & Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(212,175,55,0.18),rgba(11,15,20,0))]" />
        
        {/* Subtle Decorative Architectural Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Ambient Glowing Blobs */}
        <div className="ambient-champagne-glow top-1/4 left-1/4 w-96 h-96 -translate-x-1/2 -translate-y-1/2" />
        <div className="ambient-champagne-glow bottom-1/4 right-1/4 w-[30rem] h-[30rem] opacity-70" />

        <div className="relative max-w-7xl mx-auto w-full z-10">
          {/* Main Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Value Proposition & Hero CTAs */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Unboxed Metadata (Zero-Pill Discipline) */}
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#d4af37] font-medium tracking-wide">
                <span>Khách sạn & Nhà hàng Trung Tâm Cà Mau</span>
                <span aria-hidden="true" className="text-neutral-500">·</span>
                <span>207 Phan Ngọc Hiển</span>
                <span aria-hidden="true" className="text-neutral-500">·</span>
                <span>Tiêu Chuẩn VIP 4 Sao</span>
              </div>

              {/* Marquee Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.15] text-balance">
                Đẳng Cấp Nghỉ Dưỡng & <br className="hidden sm:inline" />
                <span className="text-gradient-champagne">
                  Tinh Hoa Ẩm Thực Cà Mau
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="text-neutral-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Tọa lạc tại tâm điểm phồn hoa nhất thành phố, Khách sạn & Nhà hàng Ánh Nguyệt kiến tạo không gian phòng Suite thanh lịch cùng thế giới ẩm thực Cua Năm Căn và hải sản ngập mặn trứ danh Đất Mũi.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => handleOpenBooking('room')}
                  className="w-full sm:w-auto liquid-btn-champagne px-8 py-3.5 rounded-2xl text-sm sm:text-base font-semibold flex items-center justify-center gap-2.5 shadow-xl shadow-[#d4af37]/20 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Đặt Phòng VIP Trực Tiếp</span>
                </button>

                <button
                  onClick={() => handleOpenBooking('table')}
                  className="w-full sm:w-auto liquid-btn-ghost px-7 py-3.5 rounded-2xl text-sm sm:text-base font-medium flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Utensils className="w-4 h-4 text-[#d4af37]" />
                  <span>Đặt Bàn Thưởng Thức Cua</span>
                </button>
              </div>

              {/* Quick Trust Markers (No pills, clean unboxed typography) */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <span>Giá gốc trực tiếp không phụ phí</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
                  <span>4.9/5 điểm hài lòng từ hơn 1,200 khách</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#d4af37]" />
                  <span>Phục vụ phòng & đón tiễn 24/7</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Liquid Glass Card */}
            <div className="lg:col-span-5 relative">
              <div className="liquid-glass-hero p-3 sm:p-4 rounded-3xl relative overflow-hidden border border-white/20 shadow-2xl">
                {/* Visual Glass Overlay & Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                    alt="Không gian phòng Suite Ánh Nguyệt Cà Mau"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Corner Badge */}
                  <div className="absolute top-4 left-4 py-1 px-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-[11px] text-[#f4e8d0] font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Không Gian VIP Ánh Nguyệt</span>
                  </div>

                  {/* Bottom Text Over Image */}
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold">
                      Phòng Suite Tổng Thống
                    </span>
                    <h3 className="text-lg font-bold text-white font-display">
                      Tầm Nhìn Ôm Trọn Trung Tâm Cà Mau
                    </h3>
                    <div className="mt-2 flex items-center justify-between text-xs text-neutral-300">
                      <span>Bồn tắm sục Jacuzzi · King Bed 2.2m</span>
                      <span className="font-semibold text-[#d4af37]">Từ 2.850.000đ/đêm</span>
                    </div>
                  </div>
                </div>

                {/* Sub Features Strip inside Glass */}
                <div className="grid grid-cols-2 gap-2 mt-3 text-left">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#d4af37]/30 transition-colors">
                    <span className="text-[11px] text-neutral-400 block">Ẩm Thực Đặc Sản</span>
                    <span className="text-xs font-semibold text-white mt-0.5 block">Cua Năm Căn Tươi Sống</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#d4af37]/30 transition-colors">
                    <span className="text-[11px] text-neutral-400 block">Tiện Ích Nghỉ Dưỡng</span>
                    <span className="text-xs font-semibold text-white mt-0.5 block">Hồ Bơi & Phòng Hội Nghị</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Liquid Reservation Floating Bar */}
          <div className="mt-10 lg:mt-14">
            <div className="liquid-glass p-4 sm:p-6 rounded-3xl border border-white/15 shadow-2xl">
              <form onSubmit={handleQuickSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                {/* Service Type Switch */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Nhu Cầu Của Bạn
                  </label>
                  <select
                    value={quickService}
                    onChange={(e) => setQuickService(e.target.value as 'room' | 'table')}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="room">Nghỉ Dưỡng (Đặt Phòng)</option>
                    <option value="table">Ăn Uống (Đặt Bàn Cua/Tiệc)</option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#d4af37]" />
                    <span>Ngày Check-in / Đến</span>
                  </label>
                  <input
                    type="date"
                    value={quickDate}
                    onChange={(e) => setQuickDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#d4af37]" />
                    <span>Số Lượng Khách</span>
                  </label>
                  <select
                    value={quickGuests}
                    onChange={(e) => setQuickGuests(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="1">1 Khách</option>
                    <option value="2">2 Khách (Cặp đôi/Doanh nhân)</option>
                    <option value="4">3 - 4 Khách (Gia đình)</option>
                    <option value="group">Đoàn công tác / Tiệc đông</option>
                  </select>
                </div>

                {/* Submit Action */}
                <div className="pt-2 sm:pt-0">
                  <label className="hidden lg:block text-[11px] text-transparent mb-1.5">
                    Hành động
                  </label>
                  <button
                    type="submit"
                    className="w-full liquid-btn-champagne py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Kiểm Tra Tình Trạng</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
          GIỚI THIỆU & ĐIỂM NỔI BẬT (Strategic Position & Service)
          ========================================================== */}
      <section id="gioi-thieu" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
              Vị Thế Khác Biệt Tại Thành Phố Cà Mau
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-white text-balance">
              Điểm Dừng Chân Lý Tưởng Giữa Lòng Trung Tâm
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              So với các cơ sở lưu trú và nhà hàng đơn thuần tại Cà Mau, Ánh Nguyệt tự hào mang đến tổ hợp nghỉ dưỡng 4 sao trọn gói với vị trí đắc địa và tiêu chuẩn dịch vụ vượt trội.
            </p>
          </div>

          {/* Highlights Bento-grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIGHLIGHTS_DATA.map((item) => (
              <div
                key={item.number}
                className="liquid-glass-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                    <span className="font-display text-2xl font-bold text-gradient-gold">
                      {item.number}
                    </span>
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Ưu Thế
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#d4af37] font-medium mb-3">
                    {item.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <div className="text-lg font-bold font-display text-white tabular-nums">
                    {item.metric}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    {item.metricLabel}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Strategic Comparison Banner */}
          <div className="mt-12 liquid-glass p-6 sm:p-8 rounded-3xl border border-white/15">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                  Trải Nghiệm Chuẩn Mực
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  Tại Sao Khách Doanh Nghiệp & Gia Đình Luôn Chọn Ánh Nguyệt?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Cách bến xe và sân bay chỉ 5 phút di chuyển. Xe ô tô 16-45 chỗ đỗ xe thoải mái tại bãi riêng có bảo vệ 24/24. Tận hưởng bữa sáng buffet địa phương và ăn tối cua Cà Mau ngay trong khách sạn mà không cần di chuyển tìm quán xa.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <button
                  onClick={() => handleOpenBooking('room')}
                  className="liquid-btn-champagne py-3 px-5 rounded-2xl text-xs sm:text-sm font-semibold text-center cursor-pointer"
                >
                  Đặt Phòng Trực Tiếp
                </button>
                <a
                  href={`tel:${HOTEL_INFO.hotline.replace(/\s+/g, '')}`}
                  className="liquid-btn-ghost py-3 px-5 rounded-2xl text-xs sm:text-sm font-medium text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Tư Vấn Hotline: {HOTEL_INFO.hotline}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
          BẢNG PHÒNG & SUITES VIP
          ========================================================== */}
      <section id="phong-nghi" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative bg-[#0d1219]/60">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-2">
                Không Gian Lưu Trú Thượng Lưu
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
                Hệ Thống Phòng Nghỉ & Suites VIP
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
              Mỗi căn phòng tại Ánh Nguyệt đều được trang bị hệ thống kính cách âm hai lớp, nệm cao su non êm ái và phòng tắm kính phong cách hiện đại.
            </p>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ROOMS_DATA.map((room) => (
              <div
                key={room.id}
                className="liquid-glass-card rounded-3xl overflow-hidden border border-white/10 group flex flex-col justify-between"
              >
                <div>
                  {/* Room Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {room.isPopular && (
                      <div className="absolute top-4 left-4 py-1 px-3 rounded-xl bg-[#d4af37] text-black text-xs font-semibold shadow-md">
                        Hạng Phòng Được Yêu Thích Nhất
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-200">
                      <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15">
                        {room.area}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15">
                        {room.capacity}
                      </span>
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors">
                        {room.name}
                      </h3>
                      <div className="text-right whitespace-nowrap">
                        <span className="text-lg sm:text-xl font-bold text-[#d4af37] font-display tabular-nums">
                          {room.pricePerNight.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="text-[11px] text-neutral-400 block">/ đêm</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 mb-4 leading-relaxed font-light">
                      {room.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      {room.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Room Card Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleOpenBooking('room', room.id)}
                    className="w-full liquid-btn-champagne py-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Đặt Phòng {room.name}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================
          ẨM THỰC ĐẶC SẢN CÀ MAU (Cua Năm Căn, Cá Thòi Lòi...)
          ========================================================== */}
      <section id="dac-san" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
              Mỹ Vị Đất Mũi Tại Nhà Hàng Ánh Nguyệt
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-white text-balance">
              Thực Đơn Cua Cà Mau & Đặc Sản Đầm Ngập Mặn
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Cua Năm Căn chính gốc được vớt trực tiếp từ bể nuôi nước lợ, kết hợp cùng tài hoa của đầu bếp hơn 20 năm gắn bó với hương vị Nam Bộ.
            </p>
          </div>

          {/* Interactive Filter Tabs (Functional Segmented Button Bar) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {[
              { id: 'all', label: 'Tất Cả Món Ngon' },
              { id: 'crab', label: 'Cua Cà Mau Trứ Danh' },
              { id: 'seafood', label: 'Hải Sản Đất Mũi' },
              { id: 'local', label: 'Món Đồng & Lẩu Mắm' },
              { id: 'banquet', label: 'Set Yến Tiệc VIP' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMenuFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  menuFilter === tab.id
                    ? 'bg-[#d4af37] text-black font-semibold shadow-lg shadow-[#d4af37]/20'
                    : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className="liquid-glass-card rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group"
              >
                <div>
                  {/* Dish Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {item.badge && (
                      <div className="absolute top-3 left-3 py-1 px-2.5 rounded-lg bg-[#d4af37] text-black text-[11px] font-semibold shadow-sm">
                        {item.badge}
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-200">
                      <span className="text-[11px] text-[#f4e8d0] font-medium">
                        {item.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Dish Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-display text-base font-bold text-white group-hover:text-[#d4af37] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <div className="text-right whitespace-nowrap">
                        <span className="text-sm font-bold text-[#d4af37] font-display tabular-nums">
                          {item.price}
                        </span>
                        <span className="text-[10px] text-neutral-400 block">{item.unit}</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed font-light line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleOpenBooking('table', undefined, item.name)}
                    className="w-full liquid-btn-ghost py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer hover:border-[#d4af37]/40"
                  >
                    <Utensils className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Đặt Bàn Thưởng Thức Món Này</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Restaurant Booking Banner */}
          <div className="mt-12 liquid-glass p-6 sm:p-8 rounded-3xl border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
                Phục Vụ Cơm Đoàn & Tiệc Gia Đình
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                Quý Khách Cần Đặt Phòng Lạnh VIP Hoặc Tiệc Cua Số Lượng Lớn?
              </h3>
              <p className="text-xs text-neutral-300">
                Nhà hàng Ánh Nguyệt có 8 phòng ăn riêng tư từ 8 đến 40 khách, trang bị máy lạnh và karaoke âm thanh chuẩn.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleOpenBooking('table')}
                className="liquid-btn-champagne px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer"
              >
                Đặt Phòng VIP Ngay
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
          TIỆN ÍCH KHÁCH SẠN & SỰ KIỆN (Bento Glass Grid)
          ========================================================== */}
      <section id="tien-ich" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative bg-[#0c1016]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
              Dịch Vụ Khép Kín 4 Sao
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
              Tiện Nghi Hoàn Hảo Cho Kỳ Nghỉ Đáng Nhớ
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Mọi nhu cầu từ thư giãn bên làn nước mát, tổ chức sự kiện trọng đại đến khám phá các danh thắng Cà Mau đều được phục vụ tận tâm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: Hồ bơi ngoài trời */}
            <div className="liquid-glass-card p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#d4af37] mb-5">
                  <Waves className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">
                  Hồ Bơi Sân Vườn Ngoài Trời
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                  Làn nước trong xanh giữa không gian cây xanh miền nhiệt đới. Nơi thư giãn lý tưởng sau chuyến đi dài hoặc sau ngày làm việc căng thẳng tại Cà Mau.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs text-[#d4af37] font-medium">
                Mở cửa: 06:00 - 21:00 hàng ngày (Miễn phí cho khách lưu trú)
              </div>
            </div>

            {/* Bento Card 2: Trung tâm hội nghị & Tiệc cưới */}
            <div className="liquid-glass-card p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#d4af37] mb-5">
                  <Wine className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">
                  Trung Tâm Hội Nghị & Sảnh Tiệc 500 Khách
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                  Hệ thống màn hình LED cỡ lớn, âm thanh ánh sáng hiện đại cùng thực đơn yến tiệc sang trọng. Địa điểm tin cậy cho đại hội, hội thảo và tiệc cưới hàng đầu.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs text-[#d4af37] font-medium">
                Sức chứa linh hoạt từ 50 đến 500 khách
              </div>
            </div>

            {/* Bento Card 3: Xe đưa đón & Tour Mũi Cà Mau */}
            <div className="liquid-glass-card p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#d4af37] mb-5">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">
                  Đưa Đón Sân Bay & Tour Đất Mũi
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                  Hỗ trợ xe đưa đón riêng từ Sân bay Cà Mau hoặc Bến xe về khách sạn. Tư vấn và kết nối tour ca nô lướt sóng xuyên rừng ngập mặn tới Cột mốc tọa độ Quốc gia.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs text-[#d4af37] font-medium">
                Xe đời mới 7 - 16 - 29 chỗ phục vụ theo yêu cầu
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
          TIN TỨC & CẨM NANG DU LỊCH CÀ MAU (TỰ ĐỘNG CÀO RSS & SEO)
          ========================================================== */}
      <NewsSection onNavigateToNews={() => { window.location.hash = '/tin-tuc'; }} />

      {/* ==========================================================
          ĐÁNH GIÁ KHÁCH HÀNG (Claim-to-Proof Adjacency)
          ========================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
              Cảm Nhận Thực Tế
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Sự Hài Lòng Của Quý Thực Khách & Du Khách
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, index) => (
              <div
                key={index}
                className="liquid-glass p-6 rounded-3xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-[#d4af37]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed italic mb-6">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-[11px] text-neutral-400">{t.title}</div>
                  </div>
                  <span className="text-[11px] text-neutral-500">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================
          VỊ TRÍ CHIẾN LƯỢC & BẢN ĐỒ GOOGLE MAPS
          ========================================================== */}
      <section id="vi-tri" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative bg-[#0b0e13]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Info details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
                  Tọa Độ Trung Tâm TP. Cà Mau
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold font-display text-white mt-1">
                  Địa Chỉ Thuận Tiện Bậc Nhất
                </h2>
                <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
                  Nằm ngay trên mặt tiền đại lộ Phan Ngọc Hiển - trục đường chính sầm uất quy tụ các cơ quan ban ngành, ngân hàng, điểm mua sắm tấp nập của TP. Cà Mau.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-white">Địa chỉ chính xác</div>
                    <div className="text-xs sm:text-sm text-neutral-300 mt-0.5">
                      {HOTEL_INFO.address}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <Phone className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-white">Điện thoại đặt phòng & bàn tiệc</div>
                    <div className="text-xs sm:text-sm text-[#d4af37] font-semibold mt-0.5 flex gap-3">
                      <a href={`tel:${HOTEL_INFO.hotline.replace(/\s+/g, '')}`} className="hover:underline">
                        {HOTEL_INFO.hotline}
                      </a>
                      <span>·</span>
                      <a href={`tel:${HOTEL_INFO.phoneMobile.replace(/\s+/g, '')}`} className="hover:underline">
                        {HOTEL_INFO.phoneMobile}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <Mail className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-white">Email liên hệ công việc & sự kiện</div>
                    <div className="text-xs sm:text-sm text-neutral-300 mt-0.5">
                      {HOTEL_INFO.email}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={HOTEL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-btn-champagne px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Mở Chỉ Đường Google Maps</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Interactive Map Visual */}
            <div className="lg:col-span-7">
              <div className="liquid-glass p-3 rounded-3xl border border-white/15 overflow-hidden shadow-2xl relative">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">
                  {/* Google Maps Embed iframe for Ca Mau location */}
                  <iframe
                    title="Bản đồ chỉ đường Khách sạn Ánh Nguyệt Cà Mau"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.5684534571936!2d105.15024227495574!3d9.176881990890693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a1490218b0c2e3%3A0x6b8f322ea1ba70cf!2zMjA3IFBoYW4gTmfhu41jIEhp4buDbiwgUGjGsOG7nW5nIDYsIFRow6BuaCBwaOG7kSBDw6AgTWF1LCBDw6AgTWF1!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'contrast(1.05) brightness(0.95)' }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                  {/* Floating Marker Badge */}
                  <div className="absolute top-4 left-4 p-3 rounded-2xl bg-[#0b0f14]/90 backdrop-blur-xl border border-[#d4af37]/40 shadow-xl max-w-xs pointer-events-none">
                    <div className="flex items-center gap-2 text-[#d4af37] font-semibold text-xs">
                      <MapPin className="w-4 h-4" />
                      <span>Ánh Nguyệt Hotel & Dining</span>
                    </div>
                    <p className="text-[11px] text-neutral-300 mt-1">
                      207 Phan Ngọc Hiển, Phường Tân Thành, Tỉnh Cà Mau
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
          FOOTER & SCHEMA LOCALBUSINESS
          ========================================================== */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#07090d] text-neutral-400 text-xs">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Col 1: Brand Wordmark & Intro */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#8a6814] p-0.5 flex items-center justify-center">
                  <div className="w-full h-full bg-[#0b0f14] rounded-[10px] flex items-center justify-center">
                    <span className="font-display font-bold text-sm text-[#d4af37]">AN</span>
                  </div>
                </div>
                <div className="font-display font-bold text-base text-white tracking-wide">
                  ÁNH NGUYỆT CÀ MAU
                </div>
              </div>
              <p className="text-xs leading-relaxed text-neutral-400">
                Tổ hợp Khách sạn tiêu chuẩn 4 sao & Nhà hàng ẩm thực đặc sản Cua Cà Mau số một tại trung tâm thành phố.
              </p>
              <div className="text-[11px] text-neutral-500">
                Giờ mở cửa: Phục vụ 24/7 (Phòng nghỉ) · 06:00 - 23:00 (Nhà hàng)
              </div>
            </div>

            {/* Col 2: Navigation Mirror */}
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-white">
                Khám Phá Nhanh
              </div>
              <ul className="space-y-2 text-xs">
                <li><a href="#gioi-thieu" className="hover:text-[#d4af37] transition-colors">Về Ánh Nguyệt</a></li>
                <li><a href="#phong-nghi" className="hover:text-[#d4af37] transition-colors">Bảng Phòng & Giá Suites</a></li>
                <li><a href="#dac-san" className="hover:text-[#d4af37] transition-colors">Thực Đơn Cua Cà Mau Tươi Sống</a></li>
                <li><a href="#tien-ich" className="hover:text-[#d4af37] transition-colors">Hồ Bơi & Hội Nghị 500 Khách</a></li>
                <li><a href="#vi-tri" className="hover:text-[#d4af37] transition-colors">Vị Trí & Bản Đồ Google Maps</a></li>
              </ul>
            </div>

            {/* Col 3: Specialties */}
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-white">
                Món Ngon Không Thể Bỏ Lỡ
              </div>
              <ul className="space-y-2 text-xs">
                <li>Cua Năm Căn Cà Mau gạch son hấp bia</li>
                <li>Cua rang me cốt dừa béo bùi ăn kèm bánh mì</li>
                <li>Cá thòi lòi nướng than hồng muối ớt xiêm</li>
                <li>Lẩu mắm U Minh 16 loại rau rừng ngập mặn</li>
                <li>Tôm đất nướng mọi chấm muối tiêu chanh</li>
              </ul>
            </div>

            {/* Col 4: Liên hệ & Hỗ trợ đặt chỗ */}
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-white">
                Hỗ Trợ Trực Tiếp
              </div>
              <p className="text-xs text-neutral-300">
                Hotline Lễ Tân: <span className="text-[#d4af37] font-semibold">{HOTEL_INFO.hotline}</span>
              </p>
              <p className="text-xs text-neutral-300">
                Hotline Quản Lý: <span className="text-[#d4af37] font-semibold">{HOTEL_INFO.phoneMobile}</span>
              </p>
              <p className="text-xs text-neutral-300">
                Email: <a href="mailto:anhnguyethotel@gmail.com" className="text-[#d4af37] hover:underline font-semibold">anhnguyethotel@gmail.com</a>
              </p>
              <p className="text-xs text-neutral-300">
                Địa chỉ: 207 Phan Ngọc Hiển, Phường Tân Thành, Tỉnh Cà Mau
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleOpenBooking('room')}
                  className="w-full liquid-btn-champagne py-2.5 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Đặt Phòng Trực Tuyến
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <div>
              © 2026 Nhà hàng & Khách sạn Ánh Nguyệt. Bảo lưu mọi quyền.
            </div>
            <div className="flex items-center gap-4">
              <span>Chính sách bảo mật</span>
              <span>·</span>
              <span>Điều khoản đặt phòng</span>
              <span>·</span>
              <span>Hotline 24/7: {HOTEL_INFO.hotline}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialTab={bookingType}
        selectedRoomId={selectedRoomId}
        selectedDishName={selectedDishName}
      />
    </div>
  );
}
