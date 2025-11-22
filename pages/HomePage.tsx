import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Book, Code, Zap, Box, Activity, CheckSquare, Map, 
  Database, Server, Layout, Globe, AlertTriangle, ArrowRight, Flame, Layers,
  Hash
} from 'lucide-react';
import AdUnit from '../components/AdUnit';
import { CATEGORIES } from '../data/articles';

const HomePage: React.FC = () => {
  
  const trending = [
    { title: "useEffect Guide", slug: "hooks/use-effect-works" },
    { title: "Custom useFetch", slug: "hooks/custom-use-fetch" },
    { title: "Zustand Setup", slug: "state/zustand" },
    { title: "React 19", slug: "hooks/use-optimistic" },
  ];

  const getCategory = (slug: string) => CATEGORIES.find(c => c.slug === slug);

  const CategoryCard = ({ 
    slug, 
    className = '', 
    compact = false 
  }: { 
    slug: string, 
    className?: string, 
    compact?: boolean
  }) => {
    const cat = getCategory(slug);
    if (!cat) return null;

    const Icon = () => {
        const size = compact ? 20 : 24;
        const className = "text-brand-600";
        
        switch(cat.icon) {
            case 'zap': return <Zap size={size} className="text-amber-500" />;
            case 'box': return <Box size={size} className="text-blue-500" />;
            case 'activity': return <Activity size={size} className="text-emerald-500" />;
            case 'map': return <Map size={size} className="text-indigo-500" />;
            case 'database': return <Database size={size} className="text-cyan-500" />;
            case 'check-square': return <CheckSquare size={size} className="text-rose-500" />;
            case 'server': return <Server size={size} className="text-violet-500" />;
            case 'layout': return <Layout size={size} className="text-fuchsia-500" />;
            case 'globe': return <Globe size={size} className="text-sky-500" />;
            case 'alert-triangle': return <AlertTriangle size={size} className="text-orange-500" />;
            default: return <Code size={size} className="text-slate-500" />;
        }
    }

    // Flatten articles to get preview topics
    const allArticles = cat.groups 
        ? cat.groups.flatMap(g => g.articles) 
        : (cat.articles || []);
    
    const previewTopics = allArticles.slice(0, compact ? 0 : 4);
    const totalCount = allArticles.length;

    // Determine link target
    const targetLink = cat.groups 
        ? `/${cat.groups[0].articles[0].slug}` 
        : (cat.articles?.[0]?.slug ? `/${cat.articles[0].slug}` : '#');

    return (
        <Link 
            to={targetLink}
            className={`
                group flex flex-col bg-white border border-slate-200 rounded-xl transition-all duration-200
                hover:border-brand-300 hover:shadow-lg hover:shadow-brand-500/5 hover:-translate-y-0.5
                ${className}
            `}
        >
            <div className={`flex flex-col h-full ${compact ? 'p-4' : 'p-6'}`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 group-hover:bg-white group-hover:border-brand-100 transition-colors">
                        <Icon />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                        {totalCount} Articles
                    </span>
                </div>
                
                {/* Title */}
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {cat.name}
                </h3>
                
                {/* Description */}
                {!compact && (
                    <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-2">
                        {cat.description || `Deep dive into ${cat.name} with practical examples.`}
                    </p>
                )}

                {/* Topic Pills (The "Content Density" Fix) */}
                {!compact && previewTopics.length > 0 && (
                    <div className="mt-auto space-y-3">
                        <div className="h-px bg-slate-100 w-full"></div>
                        <div className="flex flex-wrap gap-2">
                            {previewTopics.map((topic, idx) => (
                                <span key={idx} className="inline-flex items-center px-2 py-1 rounded-md bg-slate-50 text-[11px] font-medium text-slate-600 border border-slate-100 truncate max-w-full">
                                    <Hash size={10} className="mr-1 text-slate-400" />
                                    {topic.title.replace('Explained', '').replace('Guide', '').trim()}
                                </span>
                            ))}
                             {totalCount > 4 && (
                                <span className="inline-flex items-center px-2 py-1 text-[11px] text-brand-600 font-medium">
                                    +{totalCount - 4} more
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Link>
    )
  }

  return (
    <div className="max-w-[1400px] mx-auto pb-20 bg-white">
      
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 text-center px-4">
        <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
             <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
             Updated for React 19
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
            The <span className="text-brand-600">Structured</span> React Wiki.
        </h1>
        
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            No fluff. Just clear, copy-paste ready patterns for professional developers.
        </p>

        {/* Trending Chips */}
        <div className="flex flex-wrap justify-center gap-2">
            {trending.map(t => (
                <Link 
                    key={t.slug} 
                    to={`/${t.slug}`}
                    className="group flex items-center gap-1.5 bg-white border border-slate-200 hover:border-brand-300 hover:text-brand-700 text-slate-600 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                >
                    <Flame size={12} className="text-orange-500" />
                    {t.title}
                </Link>
            ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 -mt-4 mb-12">
        <AdUnit slot="header" className="shadow-none border-none bg-slate-50" />
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-16">
        
        {/* Section 1: Core Essentials (3 Columns - Balanced) */}
        <div className="animate-in slide-in-from-bottom-4 fade-in duration-700">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Zap className="text-amber-500" />
                    Core Essentials
                </h2>
                <p className="text-slate-500 mt-1">The fundamental building blocks of React.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <CategoryCard slug="hooks" />
                <CategoryCard slug="components" />
                <CategoryCard slug="state" />
            </div>
        </div>

        {/* Section 2: Advanced Architecture */}
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="text-indigo-500" />
                    Architecture & Performance
                </h2>
                <p className="text-slate-500 mt-1">Scaling your application correctly.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <CategoryCard slug="performance" />
                <CategoryCard slug="router" />
                <CategoryCard slug="api" />
            </div>
        </div>

        {/* Section 3: Ecosystem & Tools */}
        <div>
             <div className="flex items-center mb-6 pt-8 border-t border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mr-4">Ecosystem & Reference</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <CategoryCard slug="patterns" compact={true} />
                <CategoryCard slug="forms" compact={true} />
                <CategoryCard slug="ecosystem" compact={true} />
                <CategoryCard slug="typescript" compact={true} />
            </div>
        </div>

      </div>

      <div className="mt-20 mb-10 max-w-4xl mx-auto px-4">
         <AdUnit slot="footer" />
      </div>

    </div>
  );
};

export default HomePage;