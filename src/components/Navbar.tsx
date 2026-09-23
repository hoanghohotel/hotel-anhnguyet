import React, { useState, useEffect } from 'react';
import { Phone, CalendarCheck, Menu, X } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-[#0b0f14]/85 backdrop-blur-2xl border-b border-white/10 shadow-lg' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single element wordmark (Top Bar Contract) */}
        <button 
          onClick={() => onNavigate ? onNavigate('home') : window.location.href = '/'}
          className="flex items-center gap-3 group focus-visible:outline-none cursor-pointer text-left"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#c59b27] to-[#8a6814] p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-[#0b0f14] rounded-[14px] flex items-center justify-center">
              <span className="font-display font-bold text-lg text-gradient-gold">AN</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-[#d4af37] transition-colors whitespace-nowrap">
              ÁNH NGUYỆT
            </span>
            <span className="text-[10px] tracking-[0.2em] text-[#d4af37] uppercase font-medium">
              Cà Mau · Hotel & Dining
            </span>
          </div>
        </button>

        {/* Zone 2: Clean text navigation links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <a href="#gioi-thieu" className="hover:text-[#d4af37] transition-colors">
            Về Ánh Nguyệt
          </a>
          <a href="#phong-nghi" className="hover:text-[#d4af37] transition-colors">
            Phòng VIP
          </a>
          <a href="#dac-san" className="hover:text-[#d4af37] transition-colors">
            Ẩm Thực Cà Mau
          </a>
          <button 
            onClick={() => onNavigate && onNavigate('tin-tuc')}
            className="hover:text-[#d4af37] transition-colors flex items-center gap-1 text-[#d4af37] cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Tin Tức Du Lịch
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('dat-phong')}
            className="hover:text-emerald-300 transition-colors flex items-center gap-1 text-emerald-400 font-semibold cursor-pointer"
          >
            Google Ads LP
          </button>
          <a href="#vi-tri" className="hover:text-[#d4af37] transition-colors">
            Vị Trí & Liên Hệ
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${HOTEL_INFO.hotline.replace(/\s+/g, '')}`}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#d4af37] bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-xl transition-all whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{HOTEL_INFO.hotline}</span>
          </a>

          <button
            onClick={() => onOpenBooking('room')}
            className="liquid-btn-champagne px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Đặt Phòng & Bàn</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Mở menu điều hướng"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-[#0b0f14]/95 backdrop-blur-2xl border-b border-white/15 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3 text-sm font-medium text-neutral-200">
            <a 
              href="#gioi-thieu" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-[#d4af37]"
            >
              Về Ánh Nguyệt
            </a>
            <a 
              href="#phong-nghi" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-[#d4af37]"
            >
              Phòng & Suites VIP
            </a>
            <a 
              href="#dac-san" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-[#d4af37]"
            >
              Thực Đơn Cua & Đặc Sản Cà Mau
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigate) onNavigate('tin-tuc');
              }}
              className="px-3 py-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37] font-semibold border border-[#d4af37]/20 text-left flex items-center justify-between cursor-pointer"
            >
              <span>Tin Tức & Cẩm Nang Cà Mau</span>
              <span className="text-[10px] bg-[#d4af37] text-black px-1.5 py-0.5 rounded font-bold">SEO</span>
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigate) onNavigate('dat-phong');
              }}
              className="px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20 text-left flex items-center justify-between cursor-pointer"
            >
              <span>Đặt Phòng Nhanh (Google Ads LP)</span>
              <span className="text-[10px] bg-emerald-400 text-black px-1.5 py-0.5 rounded font-bold">-15%</span>
            </button>
            <a 
              href="#tien-ich" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-[#d4af37]"
            >
              Tiện Ích & Hội Nghị
            </a>
            <a 
              href="#vi-tri" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-[#d4af37]"
            >
              Vị Trí & Bản Đồ
            </a>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href={`tel:${HOTEL_INFO.hotline.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#d4af37] bg-[#d4af37]/10 rounded-xl border border-[#d4af37]/30"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Gọi Hotline: {HOTEL_INFO.hotline}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
