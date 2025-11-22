import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ChevronRight, Clock, Share2, Loader2 } from 'lucide-react';
import { getArticleMetadata } from '../data/articles';
import { fetchArticleContent } from '../utils/markdownLoader';
import MarkdownRenderer from '../components/MarkdownRenderer';
import AdUnit from '../components/AdUnit';
import { Article } from '../types';

const ArticlePage: React.FC = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const fullSlug = `${category}/${slug}`;
  
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // FIX: Use useMemo to ensure the object reference stays stable across renders
  // unless the slug actually changes. This prevents the infinite useEffect loop.
  const meta = useMemo(() => getArticleMetadata(fullSlug), [fullSlug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(false);

    const loadContent = async () => {
      // Artificial delay to prevent flickering on fast transitions, optional
      // await new Promise(resolve => setTimeout(resolve, 100));

      const fetchedArticle = await fetchArticleContent(fullSlug);
      if (fetchedArticle) {
        setArticle(fetchedArticle);
      } else {
        // If local file fetch fails (e.g. file doesn't exist yet), 
        // we create a placeholder article so the user sees the page structure
        // This is helpful for the "Stub" pages in your 300-article list
        if (meta) {
          setArticle({
            id: fullSlug,
            slug: fullSlug,
            title: meta.title,
            category: meta.category,
            description: 'Content for this section is currently being drafted.',
            lastUpdated: new Date().toLocaleDateString(),
            content: `## Coming Soon\n\nThe article **${meta.title}** is currently under review by our editorial team. \n\nCheck back shortly for a comprehensive guide.`
          });
        } else {
          setError(true);
        }
      }
      setLoading(false);
    };

    loadContent();
  }, [fullSlug, meta]);

  if (error) {
    return <Navigate to="/" replace />;
  }

  // Loading State
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-400">
        <Loader2 size={40} className="animate-spin mb-4 text-brand-500" />
        <p>Loading knowledge base...</p>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Main Article Content */}
      <article className="flex-1 min-w-0">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-900 cursor-pointer">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="hover:text-slate-900 cursor-pointer">{article.category}</span>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-slate-900 font-medium truncate">{article.title}</span>
        </nav>

        {/* AdSense Leaderboard */}
        <AdUnit slot="header" />

        {/* Title Header */}
        <header className="mb-8 border-b border-slate-100 pb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            {article.title}
          </h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center text-slate-500 text-sm">
              <Clock size={16} className="mr-2" />
              Last updated: {article.lastUpdated}
            </div>
            <button className="flex items-center text-brand-600 text-sm font-medium hover:text-brand-700">
              <Share2 size={16} className="mr-2" />
              Share
            </button>
          </div>
        </header>

        {/* Description / Lead */}
        {article.description && (
          <p className="text-xl text-slate-600 leading-relaxed mb-10 border-l-4 border-brand-200 pl-6 italic">
            {article.description}
          </p>
        )}

        {/* Content */}
        <div className="relative min-h-[200px]">
          <MarkdownRenderer content={article.content} />
          
          <div className="my-12">
             <AdUnit slot="content" />
          </div>
        </div>

        {/* Bottom Ad */}
        <AdUnit slot="footer" className="mt-12" />
        
        {/* Related Links */}
        {article.relatedSlugs && article.relatedSlugs.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Read Next</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {article.relatedSlugs.map(relatedSlug => {
                const relatedMeta = getArticleMetadata(relatedSlug);
                const title = relatedMeta ? relatedMeta.title : relatedSlug.split('/').pop()?.replace(/-/g, ' ');
                
                return (
                  <Link 
                    key={relatedSlug} 
                    to={`/${relatedSlug}`} 
                    className="block p-4 rounded-lg border border-slate-200 hover:border-brand-300 hover:shadow-sm transition-all group"
                  >
                    <div className="text-sm text-brand-600 mb-1">Related</div>
                    <div className="font-medium text-slate-900 group-hover:text-brand-600 capitalize">
                        {title}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </article>

      {/* Right Side Table of Contents (Desktop Only) */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24">
          <div className="mb-8">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Quick Nav
            </h4>
             <div className="bg-slate-50 p-4 rounded text-sm text-slate-600 border border-slate-100">
                <p className="mb-2"><strong>Content Source:</strong></p>
                <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">/content/{slug}.md</code>
                <p className="mt-2 text-xs text-slate-500">Add your markdown file to this path to update this page.</p>
             </div>
          </div>
          
          {/* Sidebar Skyscraper Ad */}
          <AdUnit slot="sidebar" />
        </div>
      </aside>
    </div>
  );
};

export default ArticlePage;