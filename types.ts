
export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  lastUpdated: string;
  content: string; // Full Markdown content string
  relatedSlugs?: string[];
}

export interface ArticleLink {
  title: string;
  slug: string;
}

export interface CategoryGroup {
  name: string;
  articles: ArticleLink[];
}

export interface CategoryNode {
  name: string;
  slug: string;
  icon: string; // key for icon component lookup
  description?: string;
  // A category can either have direct articles OR groups of articles
  groups?: CategoryGroup[]; 
  articles?: ArticleLink[];
}
