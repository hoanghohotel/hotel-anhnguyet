'use client';

import React, { useState } from 'react';
import { 
  Newspaper, 
  Search, 
  Tag, 
  Clock, 
  ExternalLink, 
  ChevronRight, 
  MapPin, 
  Sparkles, 
  Calendar, 
  ArrowLeft,
  Share2,
  CheckCircle2,
  PhoneCall,
  Utensils,
  Hotel
} from 'lucide-react';
import { HOTEL_INFO } from '../../data/hotelData';

interface ArticleItem {
  id: string;
  category: 'guide' | 'food' | 'hotel';
  categoryLabel: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  imageUrl: string;
  source: string;
  originalUrl: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

const ARTICLES_LIST: ArticleItem[] = [
  {
    id: 'post-1',
    category: 'hotel',
    categoryLabel: 'Khách sạn & Nhà hàng nổi bật',
    title: 'Top khách sạn VIP trung tâm Cà Mau: Vì sao Ánh Nguyệt Hotel luôn là lựa chọn số 1?',
    slug: 'top-khach-san-vip-trung-tam-ca-mau-anh-nguyet-hotel',
    summary: 'Tọa lạc trên trục đại lộ huyết mạch Phan Ngọc Hiển, Khách sạn Ánh Nguyệt ghi dấu ấn với hồ bơi sân vườn, phòng Suite chuẩn nguyên thủ và nhà hàng hải sản tươi sống.',
    content: 'Để chuyến công tác và nghỉ dưỡng tại Cà Mau đạt trải nghiệm cao nhất, các đoàn công tác và du khách luôn ưu tiên <a href="/#phong-nghi" class="text-[#d4af37] font-semibold underline" rel="dofollow">khách sạn ở Cà Mau</a> có mặt tiền lớn, bãi đỗ xe rộng và dịch vụ chu đáo 24/7. Khách sạn Ánh Nguyệt tự hào là điểm sáng lưu trú hơn một thập kỷ qua.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    source: 'Tạp Chí Du Lịch Việt Nam',
    originalUrl: 'https://anhnguyethotel.com.vn',
    date: '22/09/2026',
    readTime: '4 phút đọc',
    tags: ['Khách sạn Cà Mau', 'Ánh Nguyệt', 'Phan Ngọc Hiển', 'Lưu trú VIP'],
    featured: true,
  },
  {
    id: 'post-2',
    category: 'food',
    categoryLabel: 'Đặc sản Đất Mũi',
    title: 'Bí quyết chọn và thưởng thức Cua Năm Căn Cà Mau gạch son đúng điệu người sành ăn',
    slug: 'bi-quyet-chon-thuong-thuc-cua-nam-can-ca-mau',
    summary: 'Cua Năm Căn Cà Mau được tôn vinh là món cua ngon nhất Việt Nam nhờ thịt chắc, vị ngọt thanh tự nhiên và gạch son béo ngậy từ môi trường phù sa ngập mặn.',
    content: 'Khi đặt chân đến Đất Mũi, khám phá thế giới <a href="/#dac-san" class="text-[#d4af37] font-semibold underline" rel="dofollow">ẩm thực Cà Mau</a> là trải nghiệm không thể bỏ lỡ. Tại Nhà hàng Ánh Nguyệt, cua được tuyển chọn trực tiếp từng con từ vựa Năm Căn, chế biến nóng hổi ngay tại bàn.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    source: 'VnExpress Ẩm Thực',
    originalUrl: 'https://vnexpress.net',
    date: '20/09/2026',
    readTime: '5 phút đọc',
    tags: ['Cua Cà Mau', 'Năm Căn', 'Ẩm thực Cà Mau', 'Hải sản'],
  },
  {
    id: 'post-3',
    category: 'guide',
    categoryLabel: 'Cẩm nang du lịch Cà Mau',
    title: 'Lịch trình 3 ngày 2 đêm khám phá Đất Mũi - Rừng U Minh Hạ chi tiết từ A đến Z',
    slug: 'lich-trinh-3-ngay-2-dem-kham-pha-dat-mui-u-minh-ha',
    summary: 'Cẩm nang hoàn chỉnh giúp bạn lên kế hoạch đi cano xuyên rừng ngập mặn, check-in Mốc tọa độ Quốc gia GPS 0001 và thưởng thức đặc sản Đất Mũi trọn vẹn.',
    content: 'Cà Mau có khoảng cách khá đặc thù, vì thế việc chọn điểm lưu trú trung tâm để xuất phát đi Đất Mũi hoặc U Minh Hạ là tối quan trọng. Du khách thường chọn <a href="/#gioi-thieu" class="text-[#d4af37] font-semibold underline" rel="dofollow">nghỉ dưỡng</a> tại Ánh Nguyệt để sáng hôm sau xe đón thuận tiện.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    source: 'Cổng TT Du Lịch Cà Mau',
    originalUrl: 'https://camautourism.vn',
    date: '18/09/2026',
    readTime: '6 phút đọc',
    tags: ['Đất Mũi', 'U Minh Hạ', 'Cẩm nang du lịch', 'Lịch trình'],
  },
  {
    id: 'post-4',
    category: 'food',
    categoryLabel: 'Đặc sản Đất Mũi',
    title: 'Cá thòi lòi nướng muối ớt: Món quà ẩm thực dân dã "leo cây" độc nhất vô nhị',
    slug: 'ca-thoi-loi-nuong-muoi-ot-am-thuc-ca-mau',
    summary: 'Loài cá kỳ lạ có khả năng thở trên cạn và leo cây ở rừng đước Cà Mau, khi được nướng trên than đước hồng tỏa hương thơm ngào ngạt không thể cưỡng lại.',
    content: 'Thịt cá thòi lòi ngọt đậm, săn chắc và không hề tanh. Món ăn này khi chấm cùng muối ớt chanh cay xé lưỡi tạo nên tinh hoa ẩm thực khó quên của miền Tây sông nước.',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    source: 'Dân Trí Du Lịch',
    originalUrl: 'https://dantri.com.vn',
    date: '16/09/2026',
    readTime: '3 phút đọc',
    tags: ['Cá thòi lòi', 'Đặc sản Cà Mau', 'Rừng đước'],
  },
  {
    id: 'post-5',
    category: 'guide',
    categoryLabel: 'Cẩm nang du lịch Cà Mau',
    title: 'Thời điểm vàng du lịch Cà Mau: Mùa nước nổi hay mùa khô rừng tràm nở hoa?',
    slug: 'thoi-diem-vang-du-lich-ca-mau',
    summary: 'Mỗi mùa tại cực Nam Tổ quốc mang một màu sắc quyến rũ riêng. Khám phá kinh nghiệm chọn thời điểm phù hợp để chụp ảnh và săn hải sản tươi sống.',
    content: 'Từ tháng 9 đến tháng 11 âm lịch là mùa hội tụ sản vật sông nước trù phú nhất Cà Mau. Nước nổi về mang theo tôm cá dồi dào, cua béo tròn thịt ngọt.',
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    source: 'Tuổi Trẻ Online',
    originalUrl: 'https://tuoitre.vn',
    date: '14/09/2026',
    readTime: '4 phút đọc',
    tags: ['Mùa nước nổi', 'Kinh nghiệm du lịch', 'Cà Mau'],
  },
  {
    id: 'post-6',
    category: 'hotel',
    categoryLabel: 'Khách sạn & Nhà hàng nổi bật',
    title: 'Tổ chức sự kiện & Tiệc cưới hội nghị 500 khách chuẩn mực tại TP. Cà Mau',
    slug: 'to-chuc-su-kien-tiec-cuoi-hoi-nghi-ca-mau',
    summary: 'Tổng quan không gian sảnh tiệc hoàng gia, hệ thống màn hình LED cong và set menu tiệc hải sản Á - Âu cao cấp tại Trung tâm Ánh Nguyệt.',
    content: 'Với sức chứa linh hoạt cùng đội ngũ phục vụ chuyên nghiệp, Ánh Nguyệt là địa điểm được các tập đoàn, sở ban ngành tin tưởng lựa chọn tổ chức sự kiện trọng đại.',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    source: 'Báo Cà Mau',
    originalUrl: 'https://baocamau.vn',
    date: '10/09/2026',
    readTime: '5 phút đọc',
    tags: ['Tiệc cưới', 'Hội nghị', 'Sảnh 500 khách'],
  },
];

interface TinTucPageProps {
  onBackToHome?: () => void;
  onOpenBooking?: (tab?: 'room' | 'table') => void;
}

export default function TinTucPage({ onBackToHome, onOpenBooking }: TinTucPageProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'guide' | 'food' | 'hotel'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = ARTICLES_LIST.filter(art => {
    const matchCategory = activeCategory === 'all' || art.category === activeCategory;
    const matchSearch = searchQuery === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0b0f14] text-[#e8ecf1]">
      {/* Top Banner Navigation */}
      <div className="border-b border-white/10 bg-[#121820]/90 backdrop-blur-xl sticky top-0 z-30 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5 text-xs sm:text-sm"
              title="Quay lại Trang Chủ"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Trang Chủ Ánh Nguyệt</span>
            </button>
            <span className="text-neutral-500 hidden sm:inline">/</span>
            <span className="text-xs sm:text-sm font-semibold text-[#d4af37] flex items-center gap-1.5">
              <Newspaper className="w-4 h-4" />
              Cẩm Nang & Tin Tức Du Lịch Cà Mau
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${HOTEL_INFO.hotline.replace(/\s+/g, '')}`}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 text-xs text-neutral-300 hover:text-white border border-white/10"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Hotline: {HOTEL_INFO.hotline}</span>
            </a>

            <button
              onClick={() => onOpenBooking ? onOpenBooking('room') : window.location.href = '/dat-phong'}
              className="liquid-btn-champagne px-4 py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Đặt Phòng Trực Tuyến
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* ==========================================================
            BANNER NỔI BẬT GHIM TRÊN ĐẦU (Sticky Top Hero Banner)
            ========================================================== */}
        <div className="relative rounded-3xl overflow-hidden mb-12 liquid-glass border border-[#d4af37]/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Cột trái nội dung */}
            <div className="lg:col-span-7 p-6 sm:p-10 z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/15 text-[#d4af37] text-xs font-bold uppercase tracking-wider border border-[#d4af37]/30">
                <Sparkles className="w-3.5 h-3.5" />
                Điểm Dừng Chân Lý Tưởng Nhất Cực Nam Tổ Quốc
              </div>

              <h1 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
                Khách Sạn & Nhà Hàng Ánh Nguyệt <br />
                <span className="text-gradient-gold">Tâm Điểm Lưu Trú & Ẩm Thực Cà Mau</span>
              </h1>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light max-w-xl">
                Tọa lạc tại số 207 Phan Ngọc Hiển, Phường Tân Thành, Tỉnh Cà Mau, Ánh Nguyệt cung cấp chuỗi phòng nghỉ VIP 4 sao, hồ bơi sân vườn thư thái và nhà hàng chuyên phục vụ Cua Năm Căn tươi sống, cá thòi lòi nướng muối ớt trứ danh.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenBooking ? onOpenBooking('room') : window.location.href = '/dat-phong'}
                  className="liquid-btn-champagne px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <Hotel className="w-4 h-4" />
                  <span>Đặt Phòng Nhận Giảm 15%</span>
                </button>

                <button
                  onClick={() => onOpenBooking ? onOpenBooking('table') : window.location.href = '/#dac-san'}
                  className="liquid-btn-ghost px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 cursor-pointer"
                >
                  <Utensils className="w-4 h-4 text-[#d4af37]" />
                  <span>Đặt Bàn Tiệc Cua Cà Mau</span>
                </button>
              </div>
            </div>

            {/* Cột phải hình ảnh lớn chất lượng cao */}
            <div className="lg:col-span-5 relative h-64 lg:h-96 w-full">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                alt="Khách sạn Ánh Nguyệt Cà Mau"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0b0f14] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs text-[#d4af37] font-semibold">
                📍 207 Phan Ngọc Hiển, Phường Tân Thành, Tỉnh Cà Mau
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================================
            BỘ LỌC DANH MỤC & TÌM KIẾM TIN TỨC
            ========================================================== */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Tabs bộ lọc nhanh theo yêu cầu */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#d4af37] text-[#0b0f14] shadow-md shadow-[#d4af37]/30'
                  : 'bg-white/5 text-neutral-300 hover:text-white border border-white/10'
              }`}
            >
              Tất Cả Bài Viết ({ARTICLES_LIST.length})
            </button>

            <button
              onClick={() => setActiveCategory('guide')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'guide'
                  ? 'bg-[#d4af37] text-[#0b0f14] shadow-md shadow-[#d4af37]/30'
                  : 'bg-white/5 text-neutral-300 hover:text-white border border-white/10'
              }`}
            >
              Cẩm Nang Du Lịch Cà Mau
            </button>

            <button
              onClick={() => setActiveCategory('food')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'food'
                  ? 'bg-[#d4af37] text-[#0b0f14] shadow-md shadow-[#d4af37]/30'
                  : 'bg-white/5 text-neutral-300 hover:text-white border border-white/10'
              }`}
            >
              Đặc Sản Đất Mũi
            </button>

            <button
              onClick={() => setActiveCategory('hotel')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'hotel'
                  ? 'bg-[#d4af37] text-[#0b0f14] shadow-md shadow-[#d4af37]/30'
                  : 'bg-white/5 text-neutral-300 hover:text-white border border-white/10'
              }`}
            >
              Khách Sạn & Nhà Hàng Nổi Bật
            </button>
          </div>

          {/* Ô tìm kiếm từ khóa */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm cua, khách sạn, U Minh..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37] transition-colors"
            />
          </div>

        </div>

        {/* ==========================================================
            LƯỚI BÀI VIẾT LIQUID GLASS (Cards with Hover Glow)
            ========================================================== */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 liquid-glass rounded-3xl border border-white/10">
            <Newspaper className="w-12 h-12 mx-auto text-neutral-500 mb-3" />
            <h3 className="text-lg font-bold text-white">Không tìm thấy bài viết phù hợp</h3>
            <p className="text-xs text-neutral-400 mt-1">Vui lòng thử lại với từ khóa hoặc danh mục khác</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="liquid-glass-card rounded-3xl overflow-hidden flex flex-col group border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300"
              >
                {/* Ảnh bài viết */}
                <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14] via-transparent to-transparent opacity-75" />

                  {/* Tag danh mục */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-black/75 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/30 shadow-md">
                      {article.categoryLabel}
                    </span>
                  </div>

                  {/* Nguồn bài viết */}
                  <div className="absolute bottom-3 left-4 text-[11px] text-neutral-300 font-medium bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded-lg border border-white/10">
                    {article.source}
                  </div>
                </div>

                {/* Nội dung card */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-neutral-400 mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                        {article.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-neutral-500" />
                        {article.readTime}
                      </span>
                    </div>

                    <h2 className="font-display font-bold text-lg text-white group-hover:text-[#d4af37] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h2>

                    <p className="mt-2.5 text-xs sm:text-sm text-neutral-300 line-clamp-3 leading-relaxed font-light">
                      {article.summary}
                    </p>
                  </div>

                  {/* Chân card với Tags & CTA */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={article.originalUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-xs text-[#d4af37] hover:text-[#f4e8d0] font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>Xem tin</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Hộp đăng ký nhận ưu đãi & Tour Cà Mau */}
        <div className="mt-16 liquid-glass p-8 sm:p-10 rounded-3xl border border-white/15 text-center relative overflow-hidden">
          <div className="ambient-champagne-glow top-0 left-1/2 -translate-x-1/2 w-96 h-96 opacity-15" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-[0.2em]">
              Kỳ Nghỉ Thượng Lưu Đất Mũi
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Sẵn Sàng Cho Chuyến Du Lịch Cà Mau Của Bạn?
            </h3>
            <p className="text-neutral-300 text-sm leading-relaxed font-light">
              Đặt phòng trực tiếp tại Khách sạn Ánh Nguyệt để nhận hỗ trợ đưa đón từ sân bay Cà Mau và sắp xếp tour vỏ lãi khám phá Mũi Cà Mau với ưu đãi độc quyền.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenBooking ? onOpenBooking('room') : window.location.href = '/dat-phong'}
                className="liquid-btn-champagne px-8 py-3 rounded-2xl text-sm font-semibold cursor-pointer"
              >
                Đặt Phòng VIP Nhận Ưu Đãi
              </button>
              <a
                href={`tel:${HOTEL_INFO.hotline.replace(/\s+/g, '')}`}
                className="liquid-btn-ghost px-6 py-3 rounded-2xl text-sm font-medium flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#d4af37]" />
                <span>Gọi Lễ Tân 24/7</span>
              </a>
            </div>
          </div>
        </div>

      </main>

      {/* Footer Chính Thức */}
      <footer className="border-t border-white/10 py-10 px-4 sm:px-6 text-center text-xs text-neutral-400 bg-[#07090d]">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-display font-semibold text-white text-sm">
            Nhà Hàng & Khách Sạn Ánh Nguyệt Cà Mau
          </p>
          <p className="text-neutral-300">
            Địa chỉ: 207 Phan Ngọc Hiển, Phường Tân Thành, Tỉnh Cà Mau
          </p>
          <p className="text-neutral-400">
            Hotline: <a href={`tel:${HOTEL_INFO.hotline.replace(/\s+/g, '')}`} className="text-[#d4af37] font-semibold">{HOTEL_INFO.hotline}</a> · 
            Email: <a href="mailto:anhnguyethotel@gmail.com" className="text-[#d4af37] font-semibold">anhnguyethotel@gmail.com</a>
          </p>
          <div className="pt-4 text-[11px] text-neutral-500">
            © 2026 Ánh Nguyệt Hotel & Dining. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
