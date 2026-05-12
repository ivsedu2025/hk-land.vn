import { useEffect, useState } from 'react';
import { FacebookApiResponse, FacebookPost, NewsArticle } from './types';
import { PostCard } from './components/PostCard';
import { MapPin, Plane, Building2, Facebook, Phone, Search, Loader2, Newspaper, ChevronRight, Menu, X, Mail, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function App() {
  const [data, setData] = useState<FacebookApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/facebook-posts').then(res => res.json()).catch(err => {
        console.error(err);
        return null;
      }),
      fetch('/api/real-estate-news').then(res => res.json()).catch(err => {
        console.error(err);
        return { data: [] };
      })
    ]).then(([fbData, newsData]) => {
      setData(fbData);
      if (newsData?.data) {
        setNews(newsData.data);
      }
      setLoading(false);
      setLoadingNews(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <img 
                src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/468266327_548978241181118_5104344232924769026_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeEpw0oGSq18Org_MAuc0wVFrJ8JUA0adoysnwlQDRp2jGHIvGb5hEl9cOaUQ7nl3km-eTVOQkzybOpJSK9iDxlr&_nc_ohc=wlzzHdSaMqwQ7kNvwEh5Y_i&_nc_oc=AdoOP950qYZbF2CA1chbyF1YBUU1fUyAtldPYaR6SydY53hPRfNP2nDIL7LdMZRiUKOwuGaQiD7K5xO_j3COXWPP&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=sZjwC4zn3bY--ma4Ek03YQ&_nc_ss=7b2a8&oh=00_Af6XzVV-Xyuyxc53qBE2SJilmF-6G3eAlPsIvIkrc2AIOw&oe=6A088EF0" 
                alt="HK Land Logo" 
                className="w-12 h-12 rounded-lg object-cover" 
              />
              <span className="font-bold text-2xl text-gray-900 tracking-tight ml-1">HK Land<span className="text-blue-600">.</span></span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
              <a href="#trang-chu" className="text-blue-600 hover:text-blue-700 transition-colors">Trang chủ</a>
              <a href="#dich-vu" className="hover:text-blue-600 transition-colors">Dịch vụ</a>
              <a href="#tin-tuc" className="hover:text-blue-600 transition-colors">Tin tức</a>
              <a href="#lien-he" className="hover:text-blue-600 transition-colors">Liên hệ</a>
            </nav>

            <div className="flex items-center gap-4">
              <a 
                href="https://www.facebook.com/bdshkland/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
               >
                <Facebook className="w-4 h-4" />
                <span>Theo dõi Fanpage</span>
              </a>
              <a href="tel:0902262595" className="hidden sm:flex bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors items-center gap-2 shadow-sm shadow-blue-200">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>090 226 25 95</span>
              </a>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-white border-b border-gray-100"
            >
              <div className="px-4 pt-2 pb-6 flex flex-col gap-4">
                <a href="#trang-chu" onClick={() => setIsMobileMenuOpen(false)} className="text-blue-600 font-medium py-2 hover:text-blue-700 transition-colors">Trang chủ</a>
                <a href="#dich-vu" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-blue-600 font-medium py-2 transition-colors">Dịch vụ</a>
                <a href="#tin-tuc" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-blue-600 font-medium py-2 transition-colors">Tin tức</a>
                <a href="#lien-he" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-blue-600 font-medium py-2 transition-colors">Liên hệ</a>
                <div className="h-px bg-gray-100 my-2"></div>
                <a href="tel:0902262595" className="bg-blue-600 text-white px-4 py-3 rounded-xl text-center font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Gọi ngay: 090 226 25 95</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="trang-chu" className="relative pt-24 pb-28 md:pt-32 md:pb-40 overflow-hidden bg-gray-900 scroll-mt-20">
        <div className="absolute inset-0 bg-[url('https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/468395273_549561181122824_5170333103994744273_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=2a1932&_nc_eui2=AeGUz5NqerOfJcKAkPj4sc9EPq4faYgQsHs-rh9piBCwe1Bah72vW46oLDTe0l7mk0GNK7D0B2ZSz8QVYKeZSSkW&_nc_ohc=IMPfye127oMQ7kNvwEyyZlo&_nc_oc=Ado4OUFhmahQ8c6O4cjcYEmQdmJChtgHqcVsMtPvFaD4lDP6IjlMmtSASjd2XmkiTnRsOjfwXCD3SsAuhbnmVf_C&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=84e_12PeSiyIxPIc6KHjLw&_nc_ss=7b2a8&oh=00_Af65Ei0BJu-VTpRXaiOAoWb7CCWB32V_jMmjJCKd1QL5_g&oe=6A08973A')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/20 to-gray-900/80" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium mb-6"
          >
            <Plane className="w-4 h-4 text-blue-400" />
            <span>Khu vực Sân bay Quốc Tế Long Thành</span>
          </motion.div>
          
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }}
             className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 max-w-5xl mx-auto leading-tight"
          >
            Đón Đầu Cơ Hội Vàng <br className="hidden md:block"/> Tại <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">Thành Phố Sân Bay</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 font-light"
          >
            Tin tức thời sự & Bảng giá độc quyền các quỹ đất nền, nhà phố, biệt thự đẹp nhất khu vực quanh Cảng Hàng không Quốc tế.
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section id="dich-vu" className="py-20 bg-gray-50 border-t border-gray-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-blue-600 font-semibold tracking-wide uppercase text-sm"
            >
              Lợi thế cốt lõi
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4"
            >
              Giải pháp Bất động sản toàn diện
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg"
            >
              HK Land tự hào mang đến các dịch vụ bất động sản uy tín, minh bạch và cam kết sinh lời cao dọc tuyến huyết mạch Sân bay Quốc tế Long Thành.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤝",
                title: "Ký Gửi & Mua Bán",
                desc: "Hỗ trợ khách hàng ký gửi, mua bán nhanh chóng các quỹ đất nền, nhà phố, xào mẫu với mức giá tốt nhất thị trường."
              },
              {
                icon: "⚖️",
                title: "Tư Vấn Pháp Lý",
                desc: "Đội ngũ chuyên nghiệp hỗ trợ kiểm tra quy hoạch trích lục đỏ, sang tên đổi chủ, làm sổ nhanh gọn, bảo đảm an toàn 100%."
              },
              {
                icon: "📈",
                title: "Phân Phối Dự Án",
                desc: "Đối tác chiến lược phân phối các dự án đô thị vệ tinh lớn nhất bao quanh khu vực Cảng hàng không Quốc tế."
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section: 2 Columns */}
      <section id="tin-tuc" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-20 scroll-mt-20">
        
        {/* Notice Message */}
        {data?._notice && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex items-start gap-3">
             <div className="text-amber-500 mt-0.5">⚠️</div>
             <p className="text-sm text-amber-800 leading-relaxed font-medium">
               {data._notice}
             </p>
          </div>
        )}

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
          
          {/* Main Feed: Facebook Posts (Appears on the left taking 8 cols) */}
          <div className="lg:col-span-8 flex flex-col order-2 lg:order-1">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Facebook className="w-6 h-6 text-blue-600" />
                Dự Án & Cơ Hội Đầu Tư
              </h2>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-600" />
                <p>Đang tải bài viết...</p>
              </div>
            ) : data?.data && data.data.length > 0 ? (
              <div className="flex flex-col gap-8">
                {/* Top Magazine Section */}
                <div className="flex flex-col xl:flex-row gap-6">
                  <motion.div 
                    className="w-full xl:w-2/3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <PostCard post={data.data[0]} variant="featured" />
                  </motion.div>
                  
                  <div className="w-full xl:w-1/3 flex flex-col gap-6">
                    {data.data.slice(1, 3).map((post: FacebookPost, index: number) => (
                      <motion.div
                        key={post.id}
                        className="h-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                      >
                        <PostCard post={post} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom Grid Section */}
                {data.data.length > 3 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    {data.data.slice(3).map((post: FacebookPost, index: number) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="h-full"
                      >
                        <PostCard post={post} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm mt-4">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có bài viết nào</h3>
                <p className="text-gray-500">Tin tức bất động sản sẽ được cập nhật sớm nhất.</p>
              </div>
            )}
          </div>

          {/* Right Sidebar: Real Estate News (4 cols) - Hiển thị trên top mobile */}
          <div className="lg:col-span-4 flex flex-col order-1 lg:order-2 mb-8 lg:mb-0">
             <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Newspaper className="w-6 h-6 text-emerald-600" />
                Tin Tức Thị Trường
              </h2>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-24">
              {loadingNews ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <Loader2 className="w-8 h-8 animate-spin mb-4 text-emerald-600" />
                  <p className="text-sm">Đang tải tin tức báo chí...</p>
                </div>
              ) : news && news.length > 0 ? (
                <div className="flex flex-col divide-y divide-gray-100">
                  {news.map((article) => {
                    const timeAgo = article.pubDate ? formatDistanceToNow(new Date(article.pubDate), { addSuffix: true, locale: vi }) : '';
                    return (
                      <motion.a 
                        key={article.id}
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-4 flex gap-4 group hover:bg-gray-50 -mx-5 px-5 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                         <img 
                           src={article.image} 
                           alt={article.title} 
                           className="w-20 h-16 sm:w-24 sm:h-20 rounded-lg object-cover flex-shrink-0 group-hover:opacity-80 transition-opacity" 
                         />
                         <div className="flex flex-col justify-center flex-1 min-w-0">
                           <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors mb-2">
                             {article.title}
                           </h3>
                           <div className="flex items-center justify-between text-xs text-gray-500 gap-2">
                             {article.source && (
                               <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium whitespace-nowrap">
                                 {article.source}
                               </span>
                             )}
                             {timeAgo && (
                               <span className="text-gray-400 whitespace-nowrap">{timeAgo}</span>
                             )}
                           </div>
                         </div>
                      </motion.a>
                    );
                  })}
                  <a href="https://vnexpress.net/bat-dong-san" target="_blank" rel="noopener noreferrer" className="pt-4 pb-2 text-center text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1">
                    Xem tất cả tin tức <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-12">Không màng tìm thấy tin tức.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="lien-he" className="relative py-16 md:py-24 overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-blue-900/80" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6"
          >
            Sẵn sàng sở hữu <br className="hidden md:block"/>Bất động sản sinh lời vượt trội?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            Liên hệ ngay với đội ngũ chuyên gia của HK Land để nhận báo giá chi tiết và cập nhật các quỹ đất đẹp nhất, tiềm năng nhất khu vực Sân bay Long Thành.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="tel:0902262595" 
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-blue-600 font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-50 transition-colors shadow-xl group"
            >
              <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Gọi Ngay: 090 226 25 95
            </a>
            <a 
              href="https://www.facebook.com/bdshkland/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-700/50 backdrop-blur text-white font-bold px-8 py-4 rounded-full text-lg border border-blue-400/50 hover:bg-blue-700 transition-colors"
            >
              <Facebook className="w-5 h-5 mr-2" />
              Nhắn tin qua Fanpage
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-16 relative border-t border-gray-900 mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Col */}
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/468266327_548978241181118_5104344232924769026_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeEpw0oGSq18Org_MAuc0wVFrJ8JUA0adoysnwlQDRp2jGHIvGb5hEl9cOaUQ7nl3km-eTVOQkzybOpJSK9iDxlr&_nc_ohc=wlzzHdSaMqwQ7kNvwEh5Y_i&_nc_oc=AdoOP950qYZbF2CA1chbyF1YBUU1fUyAtldPYaR6SydY53hPRfNP2nDIL7LdMZRiUKOwuGaQiD7K5xO_j3COXWPP&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=sZjwC4zn3bY--ma4Ek03YQ&_nc_ss=7b2a8&oh=00_Af6XzVV-Xyuyxc53qBE2SJilmF-6G3eAlPsIvIkrc2AIOw&oe=6A088EF0" 
                  alt="HK Land Logo" 
                  className="w-12 h-12 rounded-lg object-cover" 
                />
                <span className="font-bold text-2xl text-white tracking-tight">HK Land<span className="text-blue-500">.</span></span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Đơn vị tiên phong cung cấp giải pháp bất động sản, nhà phố, và đất nền tiềm năng quanh khu vực Sân bay Quốc tế Long Thành.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://www.facebook.com/bdshkland/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://hk-land.vn" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Liên Kết Nhanh</h3>
              <ul className="space-y-4 text-sm">
                <li><a href="#trang-chu" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-blue-500" /> Trang chủ</a></li>
                <li><a href="#dich-vu" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-blue-500" /> Dịch vụ</a></li>
                <li><a href="#tin-tuc" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-blue-500" /> Tin tức thị trường</a></li>
                <li><a href="#lien-he" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-blue-500" /> Liên hệ tư vấn</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-span-1 lg:col-span-2">
              <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Thông Tin Liên Hệ</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="pt-2">
                    <span className="block text-white font-medium mb-1">Địa chỉ văn phòng</span>
                    <a href="https://www.bing.com/maps/search?v=2&pc=FACEBK&mid=8100&mkt=en-US&fbclid=IwY2xjawRvoKxleHRuA2FlbQIxMABicmlkETFkOVBzT3duREt2ZUVWV1Uzc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHkulEXGHdN_88i9agSs1HB14yVTFw4GqTx6hMIvTI29ruYtGzJfooqFi1VZu_aem_Y3ENmh81bkw8YOFcxa-_1w&FORM=FBKPL1&q=769%2C+Long+Th%C3%A0nh%2C+Vietnam&cp=10.777542%7E106.942425&lvl=14.6&style=r" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors leading-relaxed">
                      769, Long Thành, Đồng Nai, Vietnam
                    </a>
                  </div>
                </li>
                <li className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="pt-2">
                      <span className="block text-white font-medium mb-1">Hotline tư vấn</span>
                      <a href="tel:0902262595" className="hover:text-blue-400 transition-colors">090 226 25 95</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="pt-2 overflow-hidden">
                      <span className="block text-white font-medium mb-1">Email hỗ trợ</span>
                      <a href="mailto:bdshkland@gmail.com" className="hover:text-blue-400 transition-colors block truncate">bdshkland@gmail.com</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© {new Date().getFullYear()} <span className="text-white font-medium">HK-land.vn</span> - Cổng Thông Tin BĐS. Tất cả quyền được bảo lưu.</p>
            <p>
              Đơn vị phát triển website:{' '}
              <a 
                href="https://ivsacademy.edu.vn/Pages/webdesign.html" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:text-blue-400 hover:underline font-medium ml-1"
              >
                IVS
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

