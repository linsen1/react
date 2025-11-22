import React from 'react';

interface AdUnitProps {
  slot: 'header' | 'content' | 'sidebar' | 'footer';
  className?: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ slot, className = '' }) => {
  const getLabel = () => {
    switch(slot) {
      case 'header': return 'AdSense Leaderboard';
      case 'content': return 'Sponsored Content';
      case 'sidebar': return 'Ad';
      case 'footer': return 'Sponsored';
      default: return 'Advertisement';
    }
  };

  const getHeight = () => {
    switch(slot) {
      case 'header': return 'h-[90px]';
      case 'content': return 'h-[250px]';
      case 'sidebar': return 'h-[600px]';
      case 'footer': return 'h-[250px]';
      default: return 'h-[250px]';
    }
  };

  return (
    <div className={`w-full bg-slate-100 border border-slate-200 flex flex-col items-center justify-center my-8 relative overflow-hidden ${getHeight()} ${className}`}>
       <div className="absolute top-0 left-0 bg-slate-200 text-[10px] px-2 py-1 text-slate-500 font-medium tracking-widest uppercase">
         {getLabel()}
       </div>
       <p className="text-slate-400 text-sm font-medium">Google AdSense Placeholder</p>
       <p className="text-slate-300 text-xs mt-1">{slot.toUpperCase()} SLOT</p>
    </div>
  );
};

export default AdUnit;