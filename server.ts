import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import Parser from 'rss-parser';

// Mock data for BĐS Long Thành when API token is not available
const MOCK_POSTS = {
  data: [
    {
      id: "1",
      message: "🌟 ĐẦU TƯ ĐẤT VÀNG GẦN SÂN BAY LONG THÀNH - CƠ HỘI SINH LỜI VƯỢT TRỘI\n\n- Vị trí chiến lược gần sân bay quốc tế Long Thành\n- Pháp lý minh bạch, sổ hồng riêng\n- Tiềm năng tăng giá cao trong tương lai\n\nLiên hệ ngay để được tư vấn đầu tư hiệu quả!",
      created_time: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
      full_picture: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      permalink_url: "https://www.facebook.com/bdshkland/"
    },
    {
      id: "2",
      message: "🏗️ TIẾN ĐỘ XÂY DỰNG SÂN BAY LONG THÀNH THÁNG NÀY\n\nCác hạng mục chính của sân bay Long Thành đang được triển khai thần tốc. Đây là thời điểm VÀNG để đầu tư vào bất động sản khu vực lân cận.\n\n✅ Giao thông kết nối thuận tiện\n✅ Quy hoạch đồng bộ hiện đại\n✅ Tiềm năng tăng giá rõ rệt\n\nTheo dõi Fanpage để cập nhật thông tin mới nhất!",
      created_time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      full_picture: "https://images.unsplash.com/photo-1603166163200-8ec11da5ecc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      permalink_url: "https://www.facebook.com/bdshkland/"
    },
    {
      id: "3",
      message: "🏡 ĐẤT NỀN BIỆT THỰ LONG THÀNH - SỞ HỮU VỊ TRÍ ĐẮC ĐỊA\n\n- Diện tích: 500m2 (10x50m)\n- Vị trí: Gần cổng chính sân bay, mặt tiền đường lớn\n- Pháp lý: Sổ hồng riêng, hoàn công đầy đủ\n- Tiện ích: Gần trường học, bệnh viện, trung tâm thương mại\n\nCơ hội đầu tư hiếm có, sinh lời nhanh chóng!",
      created_time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      full_picture: "https://images.unsplash.com/photo-1599619351208-a3cbd34a733f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      permalink_url: "https://www.facebook.com/bdshkland/"
    },
    {
      id: "4",
      message: "🏢 DỰ ÁN ĐÔ THỊ MỚI LONG THÀNH - HỨA HẸN MỌI TIỆN ÍCH\n\n- Tổng diện tích: 150 hecta\n- Loại hình: Đất nền, nhà phố, biệt thự\n- Chủ đầu tư: Tập đoàn uy tín, pháp lý rõ ràng\n- Tiến độ: Đang hoàn thiện hạ tầng, sẵn sàng mở bán\n\nĐặt chỗ ngay hôm nay để chọn vị trí đẹp nhất!",
      created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      full_picture: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      permalink_url: "https://www.facebook.com/bdshkland/"
    },
    {
      id: "5",
      message: "💰 ĐẦU TƯ LINH HOẠT THEO GIAI ĐOẠN - TỐI ƯU HIỆU QUẢ\n\nChúng tôi cung cấp nhiều phương án đầu tư phù hợp:\n• Giai đoạn 1: Mua đất nền giá gốc\n• Giai đoạn 2: Xây dựng theo thiết kế\n• Giai đoạn 3: Quản lý vận hành cho thuê\n\nLiên hệ để được tư vấn phương án phù hợp!",
      created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      full_picture: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      permalink_url: "https://www.facebook.com/bdshkland/"
    },
    {
      id: "6",
      message: "🛣️ HẠ TẦNG GIAO THÔNG ĐỒNG BỘ - KẾT NỐI LIỀN KỀ\n\n- Cao tốc TP.HCM - Long Thành - Dầu Giây\n- Tuyến đường Vành đai 3, 4\n- Tuyến Metro số 1\n- Cảng hàng không quốc tế Long Thành\n\nTất cả tạo nên hệ thống giao thông hoàn hảo cho khu vực!",
      created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), // 4 days ago
      full_picture: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      permalink_url: "https://www.facebook.com/bdshkland/"
    },
    {
      id: "7",
      message: "🎯 TOP 5 LÝ DO NÊN ĐẦU TƯ VÀO LONG THÀNH NGAY HÔM NAY\n\n1️⃣ Vị trí trung tâm vùng kinh tế trọng điểm\n2️⃣ Sân bay quốc tế lớn thứ 3 cả nước\n3️⃣ Hạ tầng giao thông phát triển mạnh mẽ\n4️⃣ Quy hoạch đồng bộ hiện đại\n5️⃣ Tiềm năng tăng giá cao trong 3-5 năm tới\n\nCòn chần chờ gì nữa? Hãy hành động ngay!",
      created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
      full_picture: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
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
      
      // Lấy tin tức từ nhiều báo lớn
      const newsSources = [
        { name: 'VnExpress', url: 'https://vnexpress.net/rss/bat-dong-san.rss' },
        { name: 'Thanh Niên', url: 'https://thanhnien.vn/rss/bat-dong-san.rss' },
        { name: 'Tuổi Trẻ', url: 'https://tuoitre.vn/rss/bat-dong-san.rss' },
        { name: 'Công an Nhân dân', url: 'https://cand.com.vn/rss/kinh-te.rss' },
        { name: 'Đầu tư', url: 'https://baodautu.vn/rss/bat-dong-san.rss' }
      ];

      let allItems = [];

      // Fetch từ tất cả các nguồn
      for (const source of newsSources) {
        try {
          const feed = await parser.parseURL(source.url);
          const items = feed.items.map(item => {
            const imgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/) || 
                           item.contentSnippet?.match(/<img[^>]+src="([^">]+)"/) ||
                           item['content:encoded']?.match(/<img[^>]+src="([^">]+)"/);
            
            return {
              id: `${source.name}-${item.guid || item.link}`,
              title: item.title,
              link: item.link,
              pubDate: item.pubDate,
              contentSnippet: item.contentSnippet?.replace(/<[^>]*>?/gm, '').trim() || 
                             item.content?.replace(/<[^>]*>?/gm, '').trim(),
              image: imgMatch?.[1] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              source: source.name
            };
          });
          allItems = allItems.concat(items);
        } catch (error) {
          console.error(`Error fetching from ${source.name}:`, error);
        }
      }

      // Lọc tin tức về Long Thành và Đồng Nai
      const longThanhKeywords = [
        'long thành', 'sân bay long thành', 'cảng hàng không quốc tế long thành',
        'đồng nai', 'biên hòa', 'nhơn trạch', 'long thành đồng nai',
        'thành phố sân bay', 'sân bay quốc tế', 'đất nền long thành',
        'bất động sản long thành', 'đất nền đồng nai'
      ];

      // Lọc và ưu tiên tin về Long Thành
      const longThanhNews = allItems.filter(item => {
        const title = item.title?.toLowerCase() || '';
        const content = item.contentSnippet?.toLowerCase() || '';
        
        return longThanhKeywords.some(keyword => 
          title.includes(keyword) || content.includes(keyword)
        );
      });

      // Tin bất động sản khác
      const otherNews = allItems.filter(item => !longThanhNews.includes(item));

      // Sắp xếp theo thời gian mới nhất
      longThanhNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
      otherNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

      // Ghép kết quả: ưu tiên tin Long Thành trước, sau đó đến tin khác
      const finalNews = [...longThanhNews.slice(0, 6), ...otherNews.slice(0, 4)];

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
