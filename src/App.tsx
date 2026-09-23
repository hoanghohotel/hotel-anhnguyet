/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import HomePage from './app/page';
import TinTucPage from './app/tin-tuc/page';
import DatPhongPage from './app/dat-phong/page';
import { BookingModal } from './components/BookingModal';
import { CalendarCheck, Phone } from 'lucide-react';
import { HOTEL_INFO } from './data/hotelData';

export type AppRoute = 'home' | 'tin-tuc' | 'dat-phong';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTab, setBookingTab] = useState<'room' | 'table'>('room');

  // Sync hash if present
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/tin-tuc') || hash === '#tin-tuc-page') {
        setCurrentRoute('tin-tuc');
      } else if (hash.startsWith('#/dat-phong') || hash === '#dat-phong-page') {
        setCurrentRoute('dat-phong');
      } else if (hash === '#/' || hash === '#home') {
        setCurrentRoute('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (route: AppRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (route === 'home') window.location.hash = '';
    else if (route === 'tin-tuc') window.location.hash = '/tin-tuc';
    else if (route === 'dat-phong') window.location.hash = '/dat-phong';
  };

  const handleOpenBooking = (tab: 'room' | 'table' = 'room') => {
    setBookingTab(tab);
    setIsBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0b0f14] text-[#e8ecf1]">
      {/* Top Bar Navigation */}
      {currentRoute === 'home' && (
        <Navbar 
          onOpenBooking={handleOpenBooking}
          onNavigate={navigateTo}
          currentRoute={currentRoute}
        />
      )}

      {/* Main View Router */}
      <main>
        {currentRoute === 'home' && (
          <HomePage 
            onOpenBookingModal={handleOpenBooking}
          />
        )}

        {currentRoute === 'tin-tuc' && (
          <TinTucPage 
            onBackToHome={() => navigateTo('home')}
            onOpenBooking={(tab) => {
              handleOpenBooking(tab);
            }}
          />
        )}

        {currentRoute === 'dat-phong' && (
          <DatPhongPage 
            onBackToHome={() => navigateTo('home')}
          />
        )}
      </main>

      {/* Booking Dialog Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialTab={bookingTab}
      />

      {/* Floating Speed Dial for Quick Customer Hotline & Direct Booking */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
        <a
          href={`tel:${HOTEL_INFO.hotline.replace(/\s+/g, '')}`}
          className="liquid-glass w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 shadow-xl hover:scale-105 transition-all"
          title="Gọi Hotline Ánh Nguyệt 24/7"
          aria-label="Gọi Hotline"
        >
          <Phone className="w-5 h-5" />
        </a>

        <button
          onClick={() => handleOpenBooking('room')}
          className="liquid-btn-champagne w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl shadow-[#d4af37]/30 hover:scale-105 transition-all cursor-pointer"
          title="Đặt phòng & Đặt bàn nhanh"
          aria-label="Đặt phòng nhanh"
        >
          <CalendarCheck className="w-6 h-6 text-[#0b0f14]" />
        </button>
      </div>
    </div>
  );
}
