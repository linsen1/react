import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'typescript' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-slate-800 bg-[#1e1e1e] shadow-lg group">
      {/* Mac-style Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#333]">
        <div className="flex items-center gap-2">
           <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
           <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
           <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
           <span className="ml-3 text-xs font-medium text-slate-400 font-mono">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label="Copy code"
        >
          {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
        </button>
      </div>
      
      {/* Syntax Highlighter Area */}
      <div className="text-sm font-mono">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'transparent', // Let container bg show through
            fontSize: '0.9rem',
            lineHeight: '1.6',
          }}
          wrapLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;