import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import Parser from 'rss-parser';

// Mock data for BĐS Long Thành when API token is not available
const MOCK_POSTS = {
  data: [
    {
      id: "1",
      message: "🚀 BÁN LÔ ĐẤT 500M2 GẦN CỔNG SỐ 1 SÂN BAY LONG THÀNH\n\n- Diện tích: 500m2 (10x50)\n- Vị trí: Xã Bình Sơn, ngay sát cổng số 1 sân bay quốc tế Long Thành.\n- Pháp lý: Sổ hồng riêng, công chứng sang tên ngay trong ngày.\n- Giá cũ 5 tỷ, chủ ngộp bank hạ giá thu hồi vốn cực shock.\n\n☎️ Liên hệ ngay Hotline BĐS HK Land: 0909.xxx.xxx để đi xem đất thực tế!",
      created_time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      full_picture: "https://images.unsplash.com/photo-1582407947304-fd86f1f09c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      permalink_url: "https://www.facebook.com/bdshkland/"
    },
    {
      id: "2",
      message: "🛫 TIẾN ĐỘ THI CÔNG SÂN BAY QUỐC TẾ LONG THÀNH THÁNG NÀY\n\nNhà ga hành khách sân bay Long Thành mang hình dáng hoa sen đang được đẩy nhanh tiến độ thi công thần tốc. Các hạng mục đường băng, sân đỗ đã bắt đầu thành hình.\n\nĐây là thời điểm VÀNG để các nhà đầu tư sở hữu những vị trí đắc địa xung quanh khu vực sân bay trước khi sân bay đi vào hoạt động giai đoạn 1 (Dự kiến 2026).\n\n👇 Xem thêm các dự án cực HOT dưới comment!",
      created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
      full_picture: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      permalink_url: "https://www.facebook.com/bdshkland/"
    },
    {
      id: "3",
      message: "🔥 CHÍNH CHỦ GỬI BÁN GẤP ĐẤT SÀO TẠI XÃ LỘC AN, LONG THÀNH\n\n- Mặt tiền đường rải đá 6m, ô tô vào tới đất.\n- Diện tích: 1000m2 (1 xào vuông vức siêu đẹp).\n- Cách cao tốc HCM - Long Thành chỉ 5 phút di chuyển.\n- Thích hợp xây nhà vườn nghỉ dưỡng hoặc đầu tư trung hạn.\n\nĐừng bỏ lỡ cơ hội! Gọi ngay BĐS HK Land.",
      created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      full_picture: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      permalink_url: "https://www.facebook.com/bdshkland/"
    },
    {
      id: "4",
      message: "🌟 TẠI SAO NÊN ĐẦU TƯ BẤT ĐỘNG SẢN VEN SÂN BAY LONG THÀNH?\n\n1️⃣ Hạ tầng giao thông kết nối đồng bộ: Cao tốc, Đường sắt nhẹ, Vành đai 3, 4...\n2️⃣ Thành phố sân bay 50.000ha mang lại hàng trăm ngàn cơ hội việc làm, kéo theo nhu cầu nhà ở khổng lồ.\n3️⃣ Giá đất vẫn còn dư địa tăng trưởng lớn so với các khu vực đã phát triển lõi trung tâm.\n\nHãy là nhà đầu tư thông thái! Liên hệ HK Land để nhận bảng giá các quỹ đất đẹp nhất khu vực.",
      created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
      full_picture: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      permalink_url: "https://www.facebook.com/bdshkland/"
    },
    {
      id: "5",
      message: "🏙️ QUY HOẠCH CHI TIẾT KHU ĐÔ THỊ VỆ TINH LONG THÀNH\n\n- Vùng lõi trung tâm sân bay\n- Khu đô thị dịch vụ, thương mại\n- Khu công nghiệp phụ trợ\nTheo quyết định mới nhất, các khu vực ranh giới đã được xác định rõ ràng...",
      created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
      full_picture: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      permalink_url: "https://www.facebook.com/bdshkland/"
    },
    {
      id: "6",
      message: "💡 KINH NGHIỆM ĐẦU TƯ ĐẤT NỀN AN TOÀN TRÁNH DỰ ÁN MA\n\n1. Kiểm tra quy hoạch tại UBND xã/huyện.\n2. Yêu cầu xem Sổ hồng ranh mốc rõ ràng.\n3. Xem hình ảnh thực tế và ra tận nơi đối chiếu...",
      created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      full_picture: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      permalink_url: "https://www.facebook.com/bdshkland/"
    },
    {
      id: "7",
      message: "✅ CẬP NHẬT RỔ HÀNG GIÁ TỐT TUẦN NÀY\n\n- Lô Lộc An 120m2 full thổ cư: Giá x.xx tỷ\n- Lô Bàu Cạn 500m2 CLN quy hoạch ONT: Giá x.xx tỷ\n- Lô Cẩm Đường 1000m2: Giá x.xx tỷ\nInbox ngay để nhận thông tin chi tiết!",
      created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
      full_picture: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      permalink_url: "https://www.facebook.com/bdshkland/"
    }
  ]
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route
  app.get('/api/facebook-posts', async (req, res) => {
    const accessToken = process.env.FB_PAGE_TOKEN;
    const pageId = process.env.FB_PAGE_ID || '100063715694857'; // Need actual Page ID, or fallback

    if (!accessToken) {
      // If no token is provided, return mock data explicitly explaining why
      return res.json({
        ...MOCK_POSTS,
        _notice: "Đây là dữ liệu mẫu. Vui lòng cấu hình FB_PAGE_TOKEN và FB_PAGE_ID trong phần cài đặt biến môi trường (Secrets) để lấy bài viết thực tế."
      });
    }

    try {
      // Use Graph API v19.0
      // Requesting: message, created_time, full_picture (large image attach), permalink
      const fbUrl = `https://graph.facebook.com/v19.0/${pageId}/posts?fields=message,created_time,full_picture,permalink_url&access_token=${accessToken}&limit=10`;
      
      const response = await fetch(fbUrl);
      const data = await response.json();

      if (data.error) {
        console.error("Facebook API Error:", data.error);
         return res.status(500).json({ 
            error: "Lỗi kết nối Facebook API", 
            details: data.error,
            fallback: true,
            ...MOCK_POSTS
        });
      }

      res.json(data);
    } catch (error) {
      console.error("Server Error fetching FB posts:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // News RSS API Route
  app.get('/api/real-estate-news', async (req, res) => {
    try {
      const parser = new Parser();
      const feed = await parser.parseURL('https://vnexpress.net/rss/bat-dong-san.rss');
      
      let items = feed.items.map(item => {
        const imgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/) || item.contentSnippet?.match(/<img[^>]+src="([^">]+)"/);
        return {
          id: item.guid || item.link,
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          contentSnippet: item.contentSnippet?.replace(/<[^>]*>?/gm, '').trim(),
          image: imgMatch?.[1] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        };
      });

      // Boost Long Thanh / Dong Nai news
      const localNews = items.filter(i => 
        i.title?.toLowerCase().includes('long thành') || 
        i.title?.toLowerCase().includes('sân bay') || 
        i.title?.toLowerCase().includes('đồng nai')
      );
      
      const otherNews = items.filter(i => !localNews.includes(i));
      const finalNews = [...localNews, ...otherNews].slice(0, 8);

      res.json({ data: finalNews });
    } catch (error) {
      console.error("Server Error fetching RSS:", error);
      res.status(500).json({ error: "Thất bại khi lấy tin tức" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
