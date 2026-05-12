import { FacebookPost } from '../types';
import { ExternalLinkIcon, Clock } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

interface PostCardProps {
  post: FacebookPost;
  variant?: 'featured' | 'standard';
}

export function PostCard({ post, variant = 'standard' }: PostCardProps) {
  const timeAgo = formatDistanceToNow(parseISO(post.created_time), { addSuffix: true, locale: vi });

  const isFeatured = variant === 'featured';

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300 h-full ${isFeatured ? 'md:flex-row' : ''}`}>
      {post.full_picture && (
        <a href={post.permalink_url} target="_blank" rel="noopener noreferrer" className={`overflow-hidden block ${isFeatured ? 'md:w-3/5 h-64 md:h-auto' : 'h-64'}`}>
          <img 
            src={post.full_picture} 
            alt="Facebook post" 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </a>
      )}
      
      <div className={`flex flex-col flex-grow ${isFeatured ? 'md:w-2/5 p-6 md:p-8' : 'p-5'}`}>
        <div className="flex items-center text-sm text-gray-500 mb-3 gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{timeAgo}</span>
        </div>
        
        <p className={`text-gray-800 flex-grow mb-6 whitespace-pre-wrap ${isFeatured ? 'line-clamp-none text-base md:text-lg leading-relaxed' : 'line-clamp-6 text-sm/relaxed'}`}>
          {post.message}
        </p>

        <a 
          href={post.permalink_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center w-full py-2.5 px-4 bg-sky-50 text-blue-700 font-medium rounded-xl hover:bg-sky-100 transition-colors gap-2 text-sm"
        >
          <ExternalLinkIcon className="w-4 h-4" />
          Xem bài viết gốc
        </a>
      </div>
    </div>
  );
}
