import React, { useState } from 'react';
import { X, Calendar, Users, Utensils, BedDouble, CheckCircle2, Phone, Clock, MessageSquare } from 'lucide-react';
import { ROOMS_DATA, HOTEL_INFO } from '../data/hotelData';
import { BookingLoadingOverlay } from './BookingLoadingOverlay';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'room' | 'table';
  selectedRoomId?: string;
  selectedDishName?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'room',
  selectedRoomId,
  selectedDishName,
}) => {
  const [activeTab, setActiveTab] = useState<'room' | 'table'>(initialTab);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dateIn, setDateIn] = useState('2026-09-25');
  const [dateOut, setDateOut] = useState('2026-09-27');
  const [timeSlot, setTimeSlot] = useState('18:30');
  const [guests, setGuests] = useState('2');
  const [roomType, setRoomType] = useState(selectedRoomId || ROOMS_DATA[0].id);
  const [tableType, setTableType] = useState('VIP Room');
  const [notes, setNotes] = useState(selectedDishName ? `Yêu cầu chuẩn bị món: ${selectedDishName}` : '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleReset = () => {
    setIsSubmitting(false);
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Liquid Glass Dialog Container */}
      <div className="relative w-full max-w-2xl bg-[#121820]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 z-10 text-neutral-100 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-32 bg-[#d4af37]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Loading Overlay Sang Trọng Liquid Glass */}
        <BookingLoadingOverlay
          isVisible={isSubmitting}
          serviceName={activeTab === 'room' ? 'Phòng Nghỉ Ánh Nguyệt Hotel' : 'Bàn Tiệc Ẩm Thực Cà Mau'}
          customerName={fullName}
          phone={phoneNumber}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Đóng cửa sổ"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white font-display">
              Tiếp Nhận Đặt Chỗ Thành Công!
            </h3>
            <p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed">
              Cảm ơn quý khách <span className="font-semibold text-white">{fullName}</span>. Lễ tân Nhà hàng & Khách sạn Ánh Nguyệt sẽ gọi điện xác nhận chi tiết qua số <span className="text-[#d4af37] font-semibold">{phoneNumber}</span> trong vòng 10 phút.
            </p>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-neutral-400 max-w-md mx-auto space-y-1">
              <div><span className="text-neutral-300 font-medium">Dịch vụ:</span> {activeTab === 'room' ? 'Đặt phòng nghỉ VIP' : 'Đặt bàn tiệc ẩm thực'}</div>
              <div><span className="text-neutral-300 font-medium">Thời gian:</span> {dateIn} {activeTab === 'table' ? `lúc ${timeSlot}` : `đến ${dateOut}`}</div>
              <div><span className="text-neutral-300 font-medium">Hotline hỗ trợ tức thì:</span> <a href={`tel:${HOTEL_INFO.hotline.replace(/\s+/g, '')}`} className="text-[#d4af37] font-semibold underline">{HOTEL_INFO.hotline}</a></div>
            </div>
            <button
              onClick={handleReset}
              className="liquid-btn-champagne px-8 py-3 rounded-2xl text-sm font-semibold inline-block cursor-pointer mt-2"
            >
              Hoàn Tất
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
                Đặt Chỗ Trực Tiếp Không Qua Trung Gian
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
                Yêu Cầu Đặt Chỗ Tại Ánh Nguyệt
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                Cam kết giá ưu đãi nhất cùng chính sách đón tiễn và quà chào đón đặc sản.
              </p>
            </div>

            {/* Segmented Switcher (Functional Button Tabs) */}
            <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('room')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'room'
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b89325] text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <BedDouble className="w-4 h-4" />
                <span>Đặt Phòng Khách Sạn</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('table')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'table'
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b89325] text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>Đặt Bàn Ẩm Thực Cà Mau</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Họ và Tên Quý Khách *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Số Điện Thoại Nhận Xác Nhận *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0918 xxx xxx"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                  />
                </div>
              </div>

              {activeTab === 'room' ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Ngày nhận phòng</span>
                      </label>
                      <input
                        type="date"
                        value={dateIn}
                        onChange={(e) => setDateIn(e.target.value)}
                        className="w-full px-3 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Ngày trả phòng</span>
                      </label>
                      <input
                        type="date"
                        value={dateOut}
                        onChange={(e) => setDateOut(e.target.value)}
                        className="w-full px-3 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Số lượng khách</span>
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-3 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="1">1 Khách</option>
                        <option value="2">2 Khách</option>
                        <option value="3">3 Khách</option>
                        <option value="4">4 - 5 Khách (Gia đình)</option>
                        <option value="group">Đoàn công tác (&gt;5 khách)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Hạng Phòng Nghỉ Yêu Thích
                    </label>
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full px-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      {ROOMS_DATA.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name} — {r.pricePerNight.toLocaleString('vi-VN')} VNĐ/đêm ({r.bedType})
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Ngày dùng tiệc</span>
                      </label>
                      <input
                        type="date"
                        value={dateIn}
                        onChange={(e) => setDateIn(e.target.value)}
                        className="w-full px-3 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Khung giờ đến</span>
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-3 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="11:00">11:00 (Trưa)</option>
                        <option value="12:00">12:00 (Trưa)</option>
                        <option value="17:30">17:30 (Chiều)</option>
                        <option value="18:30">18:30 (Tối)</option>
                        <option value="19:30">19:30 (Tối)</option>
                        <option value="20:30">20:30 (Đêm)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Số lượng người</span>
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-3 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="2">Bàn 2 người</option>
                        <option value="4">Bàn 4 - 6 người</option>
                        <option value="10">Bàn tiệc tròn 10 người</option>
                        <option value="20">Tiệc đoàn 20 - 50 người</option>
                        <option value="100">Sảnh tiệc hội nghị (&gt;100 người)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Khu vực bàn mong muốn
                    </label>
                    <select
                      value={tableType}
                      onChange={(e) => setTableType(e.target.value)}
                      className="w-full px-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="VIP Room">Phòng lạnh VIP riêng tư (tiếp khách doanh nghiệp)</option>
                      <option value="Poolside">Bàn cạnh hồ bơi sân vườn thoáng đãng</option>
                      <option value="Main Hall">Sảnh chính nhà hàng Ánh Nguyệt</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Ghi chú thêm (Món đặc sản ưu tiên, đưa đón sân bay...)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Giữ trước 2 con cua Năm Căn gạch son, phòng tầng cao yên tĩnh..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37] resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] text-neutral-400 text-center sm:text-left">
                  Không cần đặt cọc trước cho bàn dưới 6 khách hoặc phòng tiêu chuẩn.
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto liquid-btn-champagne px-8 py-3 rounded-2xl text-sm font-semibold cursor-pointer shadow-lg"
                >
                  Xác Nhận Đặt Ngay
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
