import type { Metadata } from 'next';
import '../globals.css';

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
      <body className="font-sf font-sans bg-[#0b0f14] text-[#e8ecf1] antialiased">
        {children}
      </body>
    </html>
  );
}
