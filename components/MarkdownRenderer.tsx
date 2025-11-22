import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Override header styles
          h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-slate-900 mt-8 mb-4" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 pb-2 border-b border-slate-100" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3" {...props} />,
          
          // Override paragraph styles
          p: ({node, ...props}) => <p className="mb-6 leading-7 text-lg" {...props} />,
          
          // Override list styles
          ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 mb-6 space-y-2" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-6 mb-6 space-y-2" {...props} />,
          li: ({node, ...props}) => <li className="pl-1" {...props} />,
          
          // Override blockquote
          blockquote: ({node, ...props}) => (
            <blockquote className="border-l-4 border-brand-500 bg-slate-50 pl-4 py-2 my-6 italic text-slate-700 rounded-r" {...props} />
          ),

          // Override code blocks
          code: ({node, inline, className, children, ...props}: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            
            if (!inline && match) {
              return (
                <CodeBlock 
                  code={codeString} 
                  language={match[1]} 
                />
              );
            }
            return (
              <code className="bg-brand-50 text-brand-700 px-1.5 py-0.5 rounded text-sm font-mono font-semibold" {...props}>
                {children}
              </code>
            );
          },
          
          // Override links
          a: ({node, ...props}) => (
            <a className="text-brand-600 hover:text-brand-800 underline underline-offset-2 font-medium transition-colors" {...props} />
          ),
          
          // Override tables
          table: ({node, ...props}) => (
            <div className="overflow-x-auto my-8 border border-slate-200 rounded-lg">
              <table className="min-w-full divide-y divide-slate-200" {...props} />
            </div>
          ),
          th: ({node, ...props}) => (
            <th className="bg-slate-50 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider" {...props} />
          ),
          td: ({node, ...props}) => (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 border-t border-slate-100" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;