import React, { useState, useEffect } from 'react';
import { Phone, CalendarCheck, Menu, X, Sparkles } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface NavbarProps {
  onOpenBooking: (initialTab?: 'room' | 'table') => void;
  onNavigate?: (route: 'home' | 'tin-tuc' | 'dat-phong') => void;
  currentRoute?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenBooking, 
  onNavigate,
  currentRoute = 'home',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-2.5 sm:py-3 bg-[#0b0f14]/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/60' 
          : 'py-3 sm:py-4 bg-[#0b0f14]/65 backdrop-blur-xl border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Zone 1: Single element wordmark (Brand Logo) */}
        <button 
          onClick={() => onNavigate ? onNavigate('home') : window.location.href = '/'}
          className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none cursor-pointer text-left shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#c59b27] to-[#8a6814] p-0.5 shadow-md flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#0b0f14] rounded-[14px] flex items-center justify-center">
              <span className="font-display font-bold text-base sm:text-lg text-gradient-gold">AN</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base sm:text-lg font-bold tracking-wider text-white group-hover:text-[#d4af37] transition-colors whitespace-nowrap leading-tight">
              ÁNH NGUYỆT
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#d4af37] uppercase font-medium leading-tight">
              Cà Mau · Hotel & Dining
            </span>
          </div>
        </button>

        {/* Zone 2: Centered Symmetrical Liquid Glass Capsule Pill Menu */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 px-3 py-1.5 rounded-full liquid-glass border border-white/15 shadow-inner backdrop-blur-xl">
          <a 
            href="#gioi-thieu" 
            className="px-3 py-1 rounded-full text-xs xl:text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
          >
            Giới Thiệu
          </a>
          <a 
            href="#phong-nghi" 
            className="px-3 py-1 rounded-full text-xs xl:text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
          >
            Phòng VIP
          </a>
          <a 
            href="#dac-san" 
            className="px-3 py-1 rounded-full text-xs xl:text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
          >
            Ẩm Thực Cà Mau
          </a>
          <button 
            onClick={() => onNavigate && onNavigate('tin-tuc')}
            className="px-3 py-1 rounded-full text-xs xl:text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>Cẩm Nang</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('dat-phong')}
            className="px-3 py-1 rounded-full text-xs xl:text-sm font-semibold text-[#d4af37] bg-[#d4af37]/15 hover:bg-[#d4af37]/25 border border-[#d4af37]/35 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-sm"
            title="Nhận ưu đãi giảm 15% khi đặt trực tiếp"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Ưu Đãi</span>
            <span className="text-[10px] bg-[#d4af37] text-black px-1.5 py-0.5 rounded-full font-bold leading-none">-15%</span>
          </button>
          <a 
            href="#vi-tri" 
            className="px-3 py-1 rounded-full text-xs xl:text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
          >
            Vị Trí & Liên Hệ
          </a>
        </nav>

        {/* Zone 3: Symmetrical Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <a
            href={`tel:${HOTEL_INFO.hotline.replace(/\s+/g, '')}`}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#d4af37] bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-xl transition-all whitespace-nowrap"
            title="Hotline lễ tân phục vụ 24/7"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{HOTEL_INFO.hotline}</span>
          </a>

          <button
            onClick={() => onOpenBooking('room')}
            className="liquid-btn-champagne px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-lg shadow-[#d4af37]/20"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Đặt Phòng & Bàn</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            aria-label="Mở menu điều hướng"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Floating Glass Card */}
      {mobileMenuOpen && (
        <div className="lg:hidden mx-4 mt-2 p-4 rounded-3xl bg-[#0e131a]/95 backdrop-blur-2xl border border-white/15 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-1.5 text-sm font-medium text-neutral-200">
            <a 
              href="#gioi-thieu" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl hover:bg-white/5 hover:text-[#d4af37] transition-colors"
            >
              Về Khách Sạn Ánh Nguyệt
            </a>
            <a 
              href="#phong-nghi" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl hover:bg-white/5 hover:text-[#d4af37] transition-colors"
            >
              Hạng Phòng VIP 4 Sao
            </a>
            <a 
              href="#dac-san" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl hover:bg-white/5 hover:text-[#d4af37] transition-colors"
            >
              Ẩm Thực & Cua Năm Căn Cà Mau
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigate) onNavigate('tin-tuc');
              }}
              className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 font-semibold border border-white/10 text-left flex items-center justify-between cursor-pointer transition-all"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                Cẩm Nang Du Lịch Cà Mau
              </span>
              <span className="text-[10px] bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40 px-2 py-0.5 rounded-full font-bold">Mới</span>
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigate) onNavigate('dat-phong');
              }}
              className="px-3.5 py-2.5 rounded-xl bg-[#d4af37]/15 text-[#d4af37] font-semibold border border-[#d4af37]/30 text-left flex items-center justify-between cursor-pointer transition-all shadow-sm"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                Đặt Phòng Nhận Giảm 15%
              </span>
              <span className="text-[10px] bg-[#d4af37] text-black px-2 py-0.5 rounded-full font-bold">-15%</span>
            </button>
            <a 
              href="#tien-ich" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl hover:bg-white/5 hover:text-[#d4af37] transition-colors"
            >
              Tiện Ích & Hồ Bơi Sân Vườn
            </a>
            <a 
              href="#vi-tri" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl hover:bg-white/5 hover:text-[#d4af37] transition-colors"
            >
              Vị Trí (207 Phan Ngọc Hiển) & Bản Đồ
            </a>

            <div className="pt-3 mt-1 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href={`tel:${HOTEL_INFO.hotline.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#d4af37] bg-[#d4af37]/10 hover:bg-[#d4af37]/20 rounded-xl border border-[#d4af37]/30 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Gọi Lễ Tân 24/7: {HOTEL_INFO.hotline}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking('room');
                }}
                className="liquid-btn-champagne w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Đặt Phòng & Bàn Tiệc Ngay</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

