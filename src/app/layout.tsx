import type { Metadata } from 'next';
import { Cinzel, Plus_Jakarta_Sans } from 'next/font/google';
import '../globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nhà Hàng & Khách Sạn Ánh Nguyệt - Cà Mau | Đẳng Cấp Sang Trọng',
  description: 'Tổ hợp Khách sạn VIP 4 sao và Nhà hàng ẩm thực đặc sản Cua Cà Mau số 1 tại 207 Phan Ngọc Hiển, TP. Cà Mau.',
  openGraph: {
    title: 'Nhà Hàng & Khách Sạn Ánh Nguyệt - Cà Mau',
    description: 'Khám phá phòng nghỉ chuẩn VIP và ẩm thực đặc sản trứ danh Đất Mũi tại Ánh Nguyệt Cà Mau.',
    type: 'website',
    locale: 'vi_VN',
    url: 'https://anhnguyethotel.com.vn',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${cinzel.variable} ${plusJakartaSans.variable} font-sans bg-[#0b0f14] text-[#e8ecf1] antialiased`}>
        {children}
      </body>
    </html>
  );
}
