
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Github } from 'lucide-react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="h-16 border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur-sm z-30">
        <div className="max-w-8xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-md md:hidden"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-sm shadow-brand-500/30">
                <span className="text-white font-bold text-xl font-mono">R</span>
              </div>
              <span className="font-bold text-xl text-slate-900 hidden sm:block tracking-tight">
                react.wiki
              </span>
            </Link>
          </div>

          {/* Top nav link placeholders */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
             <Link to="/hooks/use-effect-explained" className="hover:text-brand-600 transition-colors">Hooks</Link>
             <Link to="/components/props-vs-state" className="hover:text-brand-600 transition-colors">Components</Link>
             <Link to="/patterns/render-props" className="hover:text-brand-600 transition-colors">Patterns</Link>
          </nav>

          <div className="flex items-center gap-3">
             <a href="#" className="text-slate-400 hover:text-brand-600 transition-colors">
               <Github size={20} />
             </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-8xl mx-auto w-full md:flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 min-w-0 md:px-10 py-8 px-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
