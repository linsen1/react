
import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Book, Code, Zap, Box, Activity, CheckSquare, Map, 
  Database, Server, Layout, Globe, AlertTriangle, Search, X
} from 'lucide-react';
import { CATEGORIES } from '../data/articles';
import { CategoryNode, CategoryGroup, ArticleLink } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [filterText, setFilterText] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['hooks']));

  const isActive = (path: string) => location.pathname === `/${path}`;

  // Toggle category expansion
  const toggleCategory = (slug: string) => {
    const next = new Set(expandedCategories);
    if (next.has(slug)) {
      next.delete(slug);
    } else {
      next.add(slug);
    }
    setExpandedCategories(next);
  };

  // Icon mapping
  const getIcon = (iconKey: string) => {
    const props = { size: 16, className: "shrink-0" };
    switch (iconKey) {
      case 'zap': return <Zap {...props} />;
      case 'box': return <Box {...props} />;
      case 'activity': return <Activity {...props} />;
      case 'check-square': return <CheckSquare {...props} />;
      case 'map': return <Map {...props} />;
      case 'database': return <Database {...props} />;
      case 'server': return <Server {...props} />;
      case 'layout': return <Layout {...props} />;
      case 'globe': return <Globe {...props} />;
      case 'alert-triangle': return <AlertTriangle {...props} />;
      case 'code': return <Code {...props} />;
      default: return <Book {...props} />;
    }
  };

  // --- Filter Logic ---
  // Returns true if the article matches, or if a group matches, or if the category name matches
  const filteredCategories = useMemo(() => {
    if (!filterText.trim()) return CATEGORIES;

    const lowerFilter = filterText.toLowerCase();

    return CATEGORIES.map(cat => {
      // Check direct articles
      const matchingArticles = cat.articles?.filter(a => 
        a.title.toLowerCase().includes(lowerFilter)
      ) || [];

      // Check groups
      const matchingGroups = cat.groups?.map(group => {
        const groupMatches = group.name.toLowerCase().includes(lowerFilter);
        const matchingGroupArticles = group.articles.filter(a => 
          a.title.toLowerCase().includes(lowerFilter)
        );
        
        if (groupMatches || matchingGroupArticles.length > 0) {
          return {
            ...group,
            articles: groupMatches ? group.articles : matchingGroupArticles
          };
        }
        return null;
      }).filter(Boolean) as CategoryGroup[];

      const catMatches = cat.name.toLowerCase().includes(lowerFilter);
      
      if (catMatches || matchingArticles.length > 0 || (matchingGroups && matchingGroups.length > 0)) {
        return {
          ...cat,
          articles: catMatches ? cat.articles : matchingArticles,
          groups: catMatches ? cat.groups : matchingGroups
        };
      }
      return null;
    }).filter(Boolean) as CategoryNode[];
  }, [filterText]);

  // Auto-expand categories when filtering
  useMemo(() => {
    if (filterText.trim()) {
      const allSlugs = filteredCategories.map(c => c.slug);
      setExpandedCategories(new Set(allSlugs));
    }
  }, [filteredCategories, filterText]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 h-full w-80 bg-slate-50/80 border-r border-slate-200 z-50 flex flex-col
        transform transition-transform duration-200 ease-in-out backdrop-blur-xl md:backdrop-blur-none md:bg-slate-50
        md:translate-x-0 md:static md:h-[calc(100vh-64px)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Search / Filter Header */}
        <div className="p-4 border-b border-slate-200 bg-white/50 md:bg-transparent sticky top-0 z-10">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter documentation..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full bg-white border border-slate-200 pl-9 pr-8 py-1.5 text-sm rounded-md text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
            />
            {filterText && (
              <button 
                onClick={() => setFilterText('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
          <div className="space-y-6">
            {filteredCategories.length === 0 ? (
               <div className="text-center py-8 text-slate-400 text-sm">
                 No results found for "{filterText}"
               </div>
            ) : (
              filteredCategories.map((category) => {
                const isExpanded = expandedCategories.has(category.slug);
                const hasActiveChild = category.groups?.some(g => g.articles.some(a => isActive(a.slug))) || 
                                       category.articles?.some(a => isActive(a.slug));

                return (
                  <div key={category.slug} className="select-none">
                    {/* Category Title */}
                    <button
                      onClick={() => toggleCategory(category.slug)}
                      className={`
                        w-full flex items-center justify-between py-1.5 px-2 text-sm font-semibold rounded-md transition-colors mb-1 group
                        ${hasActiveChild ? 'text-brand-700' : 'text-slate-700 hover:bg-slate-100'}
                      `}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`p-1 rounded-md ${hasActiveChild ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-700'}`}>
                           {getIcon(category.icon)}
                        </span>
                        <span>{category.name}</span>
                      </div>
                      {/* Indicator for number of matches if filtered */}
                      {filterText && (
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 rounded-full">
                          { (category.articles?.length || 0) + (category.groups?.reduce((acc, g) => acc + g.articles.length, 0) || 0) }
                        </span>
                      )}
                    </button>

                    {/* Children (Groups & Articles) */}
                    {isExpanded && (
                      <div className="ml-3 pl-3 border-l border-slate-200 space-y-4 mt-1 animate-in slide-in-from-left-1 fade-in duration-200">
                        
                        {/* 1. Render Groups */}
                        {category.groups?.map(group => (
                          <div key={group.name}>
                            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2 pt-1">
                              {group.name.split('(')[0]}
                            </h4>
                            <ul className="space-y-0.5">
                              {group.articles.map(article => (
                                <li key={article.slug}>
                                  <Link
                                    to={`/${article.slug}`}
                                    onClick={onClose}
                                    className={`
                                      block py-1.5 px-2 text-[13px] rounded border-l-2 border-transparent transition-colors
                                      ${isActive(article.slug)
                                        ? 'text-brand-600 font-medium border-brand-500 bg-brand-50/50'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}
                                    `}
                                  >
                                    {article.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        {/* 2. Render Direct Articles */}
                        {category.articles && category.articles.length > 0 && (
                          <ul className="space-y-0.5">
                            {category.articles.map(article => (
                              <li key={article.slug}>
                                <Link
                                  to={`/${article.slug}`}
                                  onClick={onClose}
                                  className={`
                                    block py-1.5 px-2 text-[13px] rounded border-l-2 border-transparent transition-colors
                                    ${isActive(article.slug)
                                      ? 'text-brand-600 font-medium border-brand-500 bg-brand-50/50'
                                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}
                                  `}
                                >
                                  {article.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
          
          {/* Bottom Spacer */}
          <div className="h-20"></div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
