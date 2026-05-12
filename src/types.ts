export interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  full_picture?: string;
  permalink_url: string;
}

export interface FacebookApiResponse {
  data: FacebookPost[];
  _notice?: string;
  error?: string;
  details?: any;
  fallback?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  image: string;
  source?: string;
}
