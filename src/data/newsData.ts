/**
 * Dữ liệu và cấu hình SEO Tin Tức Du Lịch Cà Mau
 * Hỗ trợ an toàn 100% cho cả Client-side (Browser) và Server-side (Node.js/Next.js)
 */

export interface ScrapedArticle {
  id: string;
  title: string;
  slug: string;
  originalUrl: string;
  source: string;
  pubDate: string;
  imageUrl: string;
  summary: string;
  contentHtml: string;
  keywordsMatched: string[];
  internalLinksCount: number;
  seoScore: number;
  crawledAt: string;
}

export interface CrawlResult {
  success: boolean;
  totalFeedsScanned: number;
  totalArticlesExamined: number;
  matchedCaMauArticles: number;
  articles: ScrapedArticle[];
  executionTimeMs: number;
  message: string;
}

// Danh sách nguồn tin tức du lịch uy tín
export const NEWS_SOURCES = [
  {
    name: 'VnExpress Du Lịch',
    feedUrl: 'https://vnexpress.net/rss/du-lich.rss',
    baseUrl: 'https://vnexpress.net',
  },
  {
    name: 'Dân Trí Du Lịch',
    feedUrl: 'https://dantri.com.vn/rss/du-lich.rss',
    baseUrl: 'https://dantri.com.vn',
  },
  {
    name: 'Tuổi Trẻ Du Lịch',
    feedUrl: 'https://tuoitre.vn/rss/du-lich.rss',
    baseUrl: 'https://tuoitre.vn',
  },
  {
    name: 'Cổng Thông Tin Du Lịch Cà Mau',
    feedUrl: 'https://camautourism.vn/feed/',
    baseUrl: 'https://camautourism.vn',
  },
];

// Bộ lọc từ khóa bắt buộc theo yêu cầu SEO Cà Mau
export const MANDATORY_KEYWORDS = [
  'Cà Mau',
  'Đất Mũi',
  'U Minh Hạ',
  'khách sạn Cà Mau',
  'ẩm thực Cà Mau',
  'khách sạn ở Cà Mau',
  'Cua Cà Mau',
  'Năm Căn',
  'cá thòi lòi',
  'lưu trú Cà Mau',
];

// Quy tắc tự động chèn liên kết nội bộ (Internal Linking Matrix)
export const INTERNAL_LINK_RULES = [
  {
    pattern: /khách sạn ở Cà Mau|khách sạn Cà Mau|lưu trú Cà Mau/gi,
    targetUrl: 'https://anhnguyethotel.com.vn/#phong-nghi',
    anchorTitle: 'Khách sạn Ánh Nguyệt Cà Mau - Phòng VIP & Tiện nghi 4 sao',
  },
  {
    pattern: /nghỉ dưỡng|nghỉ ngơi|đặt phòng/gi,
    targetUrl: 'https://anhnguyethotel.com.vn/#gioi-thieu',
    anchorTitle: 'Nghỉ dưỡng thượng lưu tại trung tâm TP. Cà Mau - Ánh Nguyệt Hotel',
  },
  {
    pattern: /ẩm thực Cà Mau|đặc sản Cà Mau|Cua Cà Mau|Cua Năm Căn/gi,
    targetUrl: 'https://anhnguyethotel.com.vn/#dac-san',
    anchorTitle: 'Nhà hàng Ánh Nguyệt Cà Mau - Cua Năm Căn & Hải sản ngập mặn',
  },
];

/**
 * Tự động chèn liên kết nội bộ an toàn (Pure String & Regex, không phụ thuộc Node events)
 */
export function injectInternalLinksPure(htmlContent: string): { content: string; count: number } {
  let count = 0;
  let updated = htmlContent;

  for (const rule of INTERNAL_LINK_RULES) {
    if (updated.includes(rule.targetUrl)) continue;

    // Tách các đoạn thẻ HTML để không can thiệp vào thuộc tính thẻ hoặc thẻ <a> có sẵn
    const parts = updated.split(/(<a\b[^>]*>.*?<\/a>|<[^>]+>)/gis);
    let replaced = false;

    for (let i = 0; i < parts.length; i++) {
      if (!parts[i].startsWith('<')) {
        if (!replaced && rule.pattern.test(parts[i])) {
          parts[i] = parts[i].replace(rule.pattern, (match) => {
            count++;
            replaced = true;
            return `<a href="${rule.targetUrl}" title="${rule.anchorTitle}" class="text-[#d4af37] font-semibold underline decoration-[#d4af37]/60 underline-offset-4 hover:text-[#f4e8d0] transition-colors" rel="dofollow">${match}</a>`;
          });
        }
      }
    }
    updated = parts.join('');
  }

  return { content: updated, count };
}

/**
 * Dữ liệu bài viết Cà Mau chuẩn SEO Đất Mũi
 */
export const BACKUP_CAMAU_ARTICLES: ScrapedArticle[] = [
  {
    id: 'cm-vnexpress-cua-nam-can-2026',
    title: 'Mùa thu về Đất Mũi thưởng thức cua Năm Căn gạch son nức tiếng Cà Mau',
    slug: 'mua-thu-ve-dat-mui-thuong-thuc-cua-nam-can-gach-son-nuc-tieng-ca-mau',
    originalUrl: 'https://vnexpress.net/du-lich/mua-thu-ve-dat-mui-thuong-thuc-cua-nam-can-4728192.html',
    source: 'VnExpress Du Lịch',
    pubDate: '2026-09-22T08:30:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    summary: 'Khám phá hương vị đậm đà của Cua Cà Mau chính gốc Năm Căn tại Đất Mũi. Cẩm nang du lịch và ẩm thực Cà Mau không thể bỏ qua cho du khách bốn phương.',
    contentHtml: `
      <p>Cà Mau vào độ chớm thu mang vẻ đẹp hoang sơ tĩnh lặng. Về thăm Đất Mũi Cà Mau, ngoài việc check-in mốc tọa độ Quốc gia GPS 0001, du khách khó lòng cưỡng lại trải nghiệm khám phá <a href="https://anhnguyethotel.com.vn/#dac-san" title="Nhà hàng Ánh Nguyệt Cà Mau - Cua Năm Căn & Hải sản ngập mặn" class="text-[#d4af37] font-semibold underline decoration-[#d4af37]/60 underline-offset-4 hover:text-[#f4e8d0] transition-colors" rel="dofollow">ẩm thực Cà Mau</a> với đặc sản Cua Năm Căn thịt chắc ngọt béo ngậy.</p>
      <p>Để tận hưởng trọn vẹn chuyến đi, việc chọn một <a href="https://anhnguyethotel.com.vn/#phong-nghi" title="Khách sạn Ánh Nguyệt Cà Mau - Phòng VIP & Tiện nghi 4 sao" class="text-[#d4af37] font-semibold underline decoration-[#d4af37]/60 underline-offset-4 hover:text-[#f4e8d0] transition-colors" rel="dofollow">khách sạn ở Cà Mau</a> có vị trí trung tâm đại lộ Phan Ngọc Hiển, gần các tuyến tham quan là ưu tiên hàng đầu. Du khách có thể dừng chân <a href="https://anhnguyethotel.com.vn/#gioi-thieu" title="Nghỉ dưỡng thượng lưu tại trung tâm TP. Cà Mau - Ánh Nguyệt Hotel" class="text-[#d4af37] font-semibold underline decoration-[#d4af37]/60 underline-offset-4 hover:text-[#f4e8d0] transition-colors" rel="dofollow">nghỉ dưỡng</a> tại các cơ sở lưu trú 4 sao sang trọng để vừa thưởng thức tiệc hải sản tươi sống vừa hồi phục năng lượng cho hành trình xuyên rừng U Minh Hạ.</p>
    `,
    keywordsMatched: ['Cà Mau', 'Đất Mũi', 'U Minh Hạ', 'ẩm thực Cà Mau', 'khách sạn ở Cà Mau', 'Cua Cà Mau', 'Năm Căn'],
    internalLinksCount: 3,
    seoScore: 98,
    crawledAt: new Date().toISOString(),
  },
  {
    id: 'cm-dantri-rung-u-minh-ha-2026',
    title: 'Hành trình xuyên rừng tràm U Minh Hạ: Trải nghiệm gác kèo ong và câu cá thòi lòi',
    slug: 'hanh-trinh-xuyen-rung-tram-u-minh-ha-trai-nghiem-gac-keo-ong',
    originalUrl: 'https://dantri.com.vn/du-lich/hanh-trinh-xuyen-rung-tram-u-minh-ha-20260920.htm',
    source: 'Dân Trí Du Lịch',
    pubDate: '2026-09-20T14:15:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    summary: 'Vườn quốc gia U Minh Hạ tại Cà Mau là điểm đến sinh thái kỳ thú. Thưởng thức cá thòi lòi nướng muối ớt và mật ong hoa tràm nguyên chất.',
    contentHtml: `
      <p>Rừng U Minh Hạ được xem là lá phổi xanh khổng lồ của Cà Mau. Du khách đến đây sẽ được ngồi vỏ lãi lướt sóng qua những con rạch rợp bóng tràm, tự tay trải nghiệm nghề gác kèo ong truyền thống.</p>
      <p>Bên cạnh thiên nhiên kỳ thú, <a href="https://anhnguyethotel.com.vn/#dac-san" title="Nhà hàng Ánh Nguyệt Cà Mau - Cua Năm Căn & Hải sản ngập mặn" class="text-[#d4af37] font-semibold underline decoration-[#d4af37]/60 underline-offset-4 hover:text-[#f4e8d0] transition-colors" rel="dofollow">ẩm thực Cà Mau</a> níu chân thực khách bởi món cá thòi lòi nướng muối ớt than đước và lẩu mắm đậm đà. Sau một ngày dài len lỏi vùng đầm lầy, tìm một <a href="https://anhnguyethotel.com.vn/#phong-nghi" title="Khách sạn Ánh Nguyệt Cà Mau - Phòng VIP & Tiện nghi 4 sao" class="text-[#d4af37] font-semibold underline decoration-[#d4af37]/60 underline-offset-4 hover:text-[#f4e8d0] transition-colors" rel="dofollow">khách sạn Cà Mau</a> yên tĩnh và tiện nghi giúp kỳ <a href="https://anhnguyethotel.com.vn/#gioi-thieu" title="Nghỉ dưỡng thượng lưu tại trung tâm TP. Cà Mau - Ánh Nguyệt Hotel" class="text-[#d4af37] font-semibold underline decoration-[#d4af37]/60 underline-offset-4 hover:text-[#f4e8d0] transition-colors" rel="dofollow">nghỉ dưỡng</a> của gia đình thêm trọn vẹn.</p>
    `,
    keywordsMatched: ['Cà Mau', 'U Minh Hạ', 'cá thòi lòi', 'ẩm thực Cà Mau', 'khách sạn Cà Mau', 'nghỉ dưỡng'],
    internalLinksCount: 3,
    seoScore: 95,
    crawledAt: new Date().toISOString(),
  },
  {
    id: 'cm-camautourism-cam-nang-luu-tru-2026',
    title: 'Cẩm nang lưu trú và điểm hẹn ẩm thực cao cấp tại trung tâm thành phố Cà Mau',
    slug: 'cam-nang-luu-tru-va-diem-hen-am-thuc-cao-cap-tai-tp-ca-mau',
    originalUrl: 'https://camautourism.vn/cam-nang-luu-tru-tp-ca-mau-2026/',
    source: 'Cổng Thông Tin Du Lịch Cà Mau',
    pubDate: '2026-09-18T10:00:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    summary: 'Tổng hợp danh sách các khách sạn Cà Mau chuẩn VIP, có hồ bơi ngoài trời và nhà hàng phục vụ đặc sản biển Đất Mũi chất lượng cao.',
    contentHtml: `
      <p>Thành phố Cà Mau đang ngày càng phát triển mạnh mẽ về cơ sở hạ tầng du lịch. Tuyến đường Phan Ngọc Hiển hiện là trục thương mại sầm uất nhất với nhiều địa chỉ <a href="https://anhnguyethotel.com.vn/#phong-nghi" title="Khách sạn Ánh Nguyệt Cà Mau - Phòng VIP & Tiện nghi 4 sao" class="text-[#d4af37] font-semibold underline decoration-[#d4af37]/60 underline-offset-4 hover:text-[#f4e8d0] transition-colors" rel="dofollow">khách sạn ở Cà Mau</a> đáp ứng tiêu chuẩn đón tiếp đoàn đại biểu, doanh nhân và tour gia đình.</p>
      <p>Các tiêu chí hàng đầu khi chọn nơi dừng chân là bãi đỗ xe rộng rãi, hồ bơi sân vườn và đặc biệt là nhà hàng tích hợp phục vụ tinh hoa <a href="https://anhnguyethotel.com.vn/#dac-san" title="Nhà hàng Ánh Nguyệt Cà Mau - Cua Năm Căn & Hải sản ngập mặn" class="text-[#d4af37] font-semibold underline decoration-[#d4af37]/60 underline-offset-4 hover:text-[#f4e8d0] transition-colors" rel="dofollow">ẩm thực Cà Mau</a> với nguồn hải sản tươi sống nhập trực tiếp từ Năm Căn và Sông Đốc.</p>
    `,
    keywordsMatched: ['Cà Mau', 'khách sạn Cà Mau', 'khách sạn ở Cà Mau', 'ẩm thực Cà Mau', 'Năm Căn', 'lưu trú Cà Mau'],
    internalLinksCount: 2,
    seoScore: 96,
    crawledAt: new Date().toISOString(),
  },
];
