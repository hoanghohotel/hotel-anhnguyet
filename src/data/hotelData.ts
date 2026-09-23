export interface Room {
  id: string;
  name: string;
  category: string;
  pricePerNight: number;
  area: string;
  capacity: string;
  bedType: string;
  image: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'crab' | 'seafood' | 'local' | 'banquet';
  price: string;
  unit: string;
  image: string;
  highlight: string;
  description: string;
  badge?: string;
}

export interface HighlightFeature {
  number: string;
  title: string;
  tagline: string;
  description: string;
  metric: string;
  metricLabel: string;
}

export interface Testimonial {
  name: string;
  title: string;
  stayType: string;
  comment: string;
  rating: number;
  date: string;
}

export const HOTEL_INFO = {
  name: "Nhà hàng & Khách sạn Ánh Nguyệt Cà Mau",
  shortName: "Ánh Nguyệt Hotel & Restaurant",
  tagline: "Đẳng Cấp Nghỉ Dưỡng & Tinh Hoa Ẩm Thực Đất Mũi",
  address: "207 Phan Ngọc Hiển, Phường Tân Thành, Tỉnh Cà Mau",
  hotline: "0290 3831 886",
  phoneMobile: "0918 831 886",
  email: "anhnguyethotel@gmail.com",
  website: "https://anhnguyethotel.com.vn",
  googleMapsUrl: "https://maps.google.com/?q=207+Phan+Ng%E1%BB%8Dc+Hi%E1%BB%83n+Ph%C6%B0%E1%BB%9Dng+T%C3%A2n+Th%C3%A0nh+T%E1%BB%89nh+C%C3%A0+Mau",
  checkInTime: "14:00",
  checkOutTime: "12:00",
  coordinates: {
    lat: 9.176882,
    lng: 105.152431,
  },
};

export const ROOMS_DATA: Room[] = [
  {
    id: "presidential-suite",
    name: "Suite Tổng Thống Ánh Nguyệt",
    category: "VIP Suite",
    pricePerNight: 2850000,
    area: "85 m²",
    capacity: "2 Người lớn + 1 Trẻ em",
    bedType: "King Bed 2.2m x 2.0m",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    description: "Tuyệt tác nghỉ dưỡng cao cấp nhất tại TP. Cà Mau với tầm nhìn panorama ôm trọn đường Phan Ngọc Hiển, phòng khách vách kính tách biệt và bồn sục Jacuzzi thư giãn.",
    features: [
      "Bồn tắm Jacuzzi thủy lực view toàn cảnh phố",
      "Phòng khách riêng biệt với sofa da nhập khẩu",
      "Bữa sáng đặc sản Cà Mau & Rượu vang chào đón",
      "Quản gia riêng phục vụ 24/7",
      "Hệ thống điều hòa lọc khí ion âm",
    ],
    isPopular: true,
  },
  {
    id: "deluxe-city-view",
    name: "Deluxe King Hướng Phố",
    category: "Phòng Sang Trọng",
    pricePerNight: 1250000,
    area: "42 m²",
    capacity: "2 Người lớn",
    bedType: "King Bed 1.8m x 2.0m",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80",
    description: "Thiết kế hiện đại thanh lịch kết hợp sàn gỗ cao cấp và ánh sáng tự nhiên ngập tràn, tối ưu trọn vẹn cho kỳ nghỉ của doanh nhân và các cặp đôi.",
    features: [
      "Cửa kính cách âm hai lớp chạm sàn",
      "Bàn làm việc doanh nhân & Wi-Fi chuyên dụng",
      "Buồng tắm đứng vòi sen mưa nóng lạnh",
      "Bữa sáng Buffet tự chọn hàng ngày",
      "Nước suối, trà thảo mộc & cà phê miễn phí",
    ],
    isPopular: false,
  },
  {
    id: "grand-premium-twin",
    name: "Grand Premium 2 Giường Đơn",
    category: "Phòng Cao Cấp",
    pricePerNight: 1350000,
    area: "46 m²",
    capacity: "2 - 3 Khách",
    bedType: "2 Giường Twin 1.4m x 2.0m",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    description: "Không gian rộng rãi với hai giường lớn tiêu chuẩn nệm lò xo túi êm ái, phù hợp hoàn hảo cho đối tác công tác hoặc bạn bè du lịch khám phá miền Tây.",
    features: [
      "2 giường đơn rộng rãi tiêu chuẩn 4 sao",
      "Ban công ngắm nhìn khuôn viên sân vườn",
      "Smart TV 55 inch truyền hình 4K đa kênh",
      "Két sắt an toàn & Minibar cao cấp",
      "Dịch vụ dọn phòng 2 lần mỗi ngày",
    ],
    isPopular: false,
  },
  {
    id: "family-executive",
    name: "Executive Gia Đình Kết Nối",
    category: "Phòng Gia Đình",
    pricePerNight: 1950000,
    area: "68 m²",
    capacity: "4 - 5 Thành viên",
    bedType: "1 King Bed + 2 Twin Bed",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
    description: "Căn hộ nghỉ dưỡng gia đình ấm cúng với 2 không gian ngủ thông nhau, khu bàn trà sinh hoạt chung và tiện nghi chăm sóc trẻ em chu đáo.",
    features: [
      "Cửa thông phòng riêng tư, an toàn cho trẻ nhỏ",
      "Hai phòng tắm riêng biệt không cần chờ đợi",
      "Miễn phí vé bơi hồ bơi ngoài trời cho cả nhà",
      "Ưu đãi 15% khi dùng bữa tại Nhà hàng Ánh Nguyệt",
      "Hỗ trợ nôi em bé theo yêu cầu",
    ],
    isPopular: false,
  },
];

export const MENU_SPECIALTIES: MenuItem[] = [
  {
    id: "cua-nam-can-hap-bia",
    name: "Cua Năm Căn Hấp Bia Gừng Tươi",
    category: "crab",
    price: "Theo thời giá",
    unit: "Kg (tươi sống)",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    highlight: "Đặc sản số 1 Cà Mau",
    description: "Tuyển chọn cua Năm Căn gạch son đọng đầy, vỏ mỏng thịt chắc ngọt đậm đà, hấp cùng bia và gừng lát tươi giữ trọn vị biển phù sa trứ danh.",
    badge: "Món Bán Chạy Nhất",
  },
  {
    id: "cua-rang-me-cot-dua",
    name: "Cua Cà Mau Rang Me Cốt Dừa Ánh Nguyệt",
    category: "crab",
    price: "Theo thời giá",
    unit: "Kg",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    highlight: "Công thức gia truyền 20 năm",
    description: "Cua thịt đẫy đà đảo chảo nóng cùng sốt me ngào cốt dừa béo bùi, chua ngọt thanh mát, ăn kèm bánh mì giòn rụm khó quên.",
    badge: "Bếp Trưởng Khuyên Dùng",
  },
  {
    id: "ca-thoi-loi-nuong-muoi-ot",
    name: "Cá Thòi Lòi Nướng Muối Ớt Rừng Đước",
    category: "seafood",
    price: "245.000",
    unit: "Phần (5-6 con)",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    highlight: "Kỳ quan rừng ngập mặn",
    description: "Loài cá kỳ lạ leo cây của Đất Mũi, nướng trên than đước đỏ rực với muối ớt xiêm cay xè, thịt trắng nõn, dai ngọt như thịt gà tơ.",
    badge: "Độc Bản Cà Mau",
  },
  {
    id: "lau-mam-u-minh",
    name: "Lẩu Mắm U Minh Đậm Đà Đồng Quê",
    category: "local",
    price: "380.000",
    unit: "Nồi lẩu lớn (3-4 người)",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    highlight: "Nước lẩu nấu cá đồng ủ men",
    description: "Nấu từ mắm cá sặc bướm U Minh thơm dịu không tanh, nhúng cùng tôm càng xanh, cá bớp, thịt ba chỉ và 16 loại rau rừng Nam Bộ thanh mát.",
    badge: "Hương Vị Nam Bộ",
  },
  {
    id: "tom-dat-nuong-than",
    name: "Tôm Đất Cà Mau Nướng Mọi",
    category: "seafood",
    price: "290.000",
    unit: "Đĩa 400g",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80",
    highlight: "Tôm tự nhiên vùng đầm sinh thái",
    description: "Tôm đất thiên nhiên vỏ mỏng giòn rụm, ngọt lịm từ đầu đến đuôi, nướng vừa tới chấm muối tiêu chanh ớt hiểm.",
  },
  {
    id: "vop-nuong-mo-hanh",
    name: "Vọp Rừng Ngập Mặn Nướng Mỡ Hành",
    category: "seafood",
    price: "195.000",
    unit: "Đĩa (10 con lớn)",
    image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=800&q=80",
    highlight: "Hải sản hiếm có tại Cà Mau",
    description: "Vọp to bằng bàn tay con nít nướng trên than hồng, rưới mỡ hành phi thơm lừng cùng đậu phộng rang giòn, vị ngọt mọng nước.",
  },
  {
    id: "bon-bon-xao-tom",
    name: "Bồn Bồn Tươi Xào Tôm Đất Nõn",
    category: "local",
    price: "165.000",
    unit: "Đĩa lớn",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    highlight: "Rau đặc sản xứ Cái Nước",
    description: "Cọng bồn bồn trắng giòn tươi non xào nhanh lửa lớn với tôm đất nõn ngọt béo, món ăn đưa cơm nức tiếng miền sông nước.",
  },
  {
    id: "set-tiec-vip-anh-nguyet",
    name: "Set Thực Đơn Yến Tiệc Hoàng Gia Ánh Nguyệt",
    category: "banquet",
    price: "4.500.000",
    unit: "Bàn tiệc 10 khách",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    highlight: "Thực đơn tiệc 7 món cao cấp",
    description: "Bao gồm Khai vị 3 món Đất Mũi, Cua Năm Căn hấp dừa xiêm, Cá chẽm sốt hoa quả, Bồ câu quay da giòn, Lẩu hải sản Ánh Nguyệt và tráng miệng tổ yến.",
    badge: "Dành Cho Sự Kiện & Hội Nghị",
  },
];

export const HIGHLIGHTS_DATA: HighlightFeature[] = [
  {
    number: "01",
    title: "Tọa Độ Kim Cương Trung Tâm Cà Mau",
    tagline: "207 Phan Ngọc Hiển - Trục lộ phồn hoa nhất thành phố",
    description: "Chỉ cách Tượng đài Cà Mau, Trung tâm hội nghị tỉnh và bến xe trung tâm chưa đầy 3-5 phút. Dễ dàng di chuyển tới Sân bay Cà Mau và điểm xuất phát tour khám phá Đất Mũi.",
    metric: "03 Phút",
    metricLabel: "Đến Trung Tâm Hành Chính & Quảng Trường",
  },
  {
    number: "02",
    title: "Ẩm Thực Đặc Sản Đạt Chuẩn Nghệ Nhân",
    tagline: "Cua Năm Căn và hải sản ngập mặn tuyển chọn tươi sống",
    description: "Nhà hàng Ánh Nguyệt sở hữu bể hải sản tươi sống trực tiếp từ các vựa lớn nhất Đất Mũi. Không đông lạnh, chế biến ngay khi thực khách gọi món theo tiêu chuẩn vệ sinh khắt khe.",
    metric: "100%",
    metricLabel: "Hải Sản Tươi Sống Tuyển Chọn Hàng Ngày",
  },
  {
    number: "03",
    title: "Không Gian Kính Sang Trọng Chuẩn Boutique",
    tagline: "Hồ bơi sân vườn, sảnh tiệc & phòng nghỉ tiện nghi VIP",
    description: "Khác biệt hoàn toàn với các nhà nghỉ truyền thống, Ánh Nguyệt mang đến quần thể dịch vụ khép kín: hồ bơi ngoài trời xanh mát, phòng nghỉ cách âm tuyệt đối và phòng hội nghị 500 khách.",
    metric: "500+",
    metricLabel: "Sức Chứa Trung Tâm Sự Kiện & Hội Nghị",
  },
  {
    number: "04",
    title: "Lòng Hiếu Khách & Phục Vụ 24/7 Chu Đáo",
    tagline: "Tận tâm như người nhà, chuyên nghiệp chuẩn dịch vụ",
    description: "Đội ngũ nhân sự người bản địa Cà Mau thân thiện, hiếu khách, luôn sẵn sàng hỗ trợ đặt xe, tư vấn lịch trình tham quan U Minh Hạ - Mũi Cà Mau và phục vụ ẩm thực phòng đêm.",
    metric: "24/7",
    metricLabel: "Dịch Vụ Lễ Tân & Phục Vụ Ẩm Thực Tận Phòng",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ông Trần Đăng Khoa",
    title: "Giám đốc Dự án Xây dựng Vinaseed",
    stayType: "Công tác 4 ngày tại Cà Mau",
    comment: "Tôi đi công tác Cà Mau thường xuyên, Ánh Nguyệt là khách sạn ưng ý nhất tại đường Phan Ngọc Hiển. Phòng Suite cực kỳ yên tĩnh, giường nệm cao cấp, ăn sáng có món lẩu cua và bún nước lèo rất ngon.",
    rating: 5,
    date: "Tháng 8/2026",
  },
  {
    name: "Bà Nguyễn Mai Phương",
    title: "Khách Du Lịch Hà Nội",
    stayType: "Kỳ nghỉ gia đình 3 thế hệ",
    comment: "Gia đình tôi 6 người ở phòng Family rất rộng rãi và sạch bong. Cua Cà Mau ở nhà hàng tươi rói, gạch son đầy ắp mà giá niêm yết cực kỳ rõ ràng, không bị chém như các quán ngoài.",
    rating: 5,
    date: "Tháng 9/2026",
  },
  {
    name: "Lê Minh Trí",
    title: "Food & Travel Blogger",
    stayType: "Chuyến trải nghiệm ẩm thực Đất Mũi",
    comment: "Món cá thòi lòi nướng muối ớt và cua rang me ở Ánh Nguyệt xứng đáng điểm 10/10. Kiến trúc kính ánh sáng ban ngày chụp ảnh cực kỳ sang trọng.",
    rating: 5,
    date: "Tháng 9/2026",
  },
];
