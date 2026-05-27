import React from 'react';
import { formatCurrency } from '../utils/calculations';

const PostHarvestingCard = ({ postHarvestingGains, postTotals, savings }) => {
  return (
    <div className="bg-primary text-white rounded-xl shadow relative overflow-hidden transition-all duration-300 h-full flex flex-col">
      
      {/* CSS FIX: We add dynamic bottom padding (pb-12) when savings > 0. This creates physical empty space at the bottom of the card so the banner doesn't cover your numbers! */}
      <div className={`p-4 sm:p-5 flex-1 flex flex-col justify-between transition-all ${savings > 0 ? 'pb-12 sm:pb-12' : ''}`}>
        <div>
            <div className="flex justify-between mb-4">
            <h2 className="font-bold text-sm">After Harvesting</h2>
            <div className="flex gap-4 sm:gap-12 text-[11px] text-blue-200">
                <span>Short-term</span>
                <span>Long-term</span>
            </div>
            </div>
            
            <div className="space-y-2.5 border-b border-blue-400/50 pb-4 text-sm">
            <div className="flex justify-between items-center">
                <span className="text-blue-100">Profits</span>
                <div className="flex gap-4 sm:gap-8 font-semibold">
                    <span className="w-16 sm:w-20 text-right transition-all duration-300">{formatCurrency(postHarvestingGains.stcg.profits)}</span>
                    <span className="w-16 sm:w-20 text-right transition-all duration-300">{formatCurrency(postHarvestingGains.ltcg.profits)}</span>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-blue-100">Losses</span>
                <div className="flex gap-4 sm:gap-8 font-semibold">
                    <span className="w-16 sm:w-20 text-right transition-all duration-300">{formatCurrency(postHarvestingGains.stcg.losses)}</span>
                    <span className="w-16 sm:w-20 text-right transition-all duration-300">{formatCurrency(postHarvestingGains.ltcg.losses)}</span>
                </div>
            </div>
            <div className="flex justify-between items-center pt-1">
                <span className="text-blue-100">Net Capital Gains</span>
                <div className="flex gap-4 sm:gap-8 font-semibold">
                    <span className="w-16 sm:w-20 text-right transition-all duration-300">{formatCurrency(postTotals.netStcg)}</span>
                    <span className="w-16 sm:w-20 text-right transition-all duration-300">{formatCurrency(postTotals.netLtcg)}</span>
                </div>
            </div>
            </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2 justify-between items-center">
          <p className="font-bold text-sm">Effective Capital Gains:</p>
          <p className="text-lg font-bold transition-all duration-300">{formatCurrency(postTotals.realizedGains)}</p>
        </div>
      </div>
      
      {/* CSS FIX: Absolute positioning anchors the banner directly to the bottom corner, bypassing the Grid height traps entirely. */}
      {savings > 0 && (
        <div className="absolute bottom-0 left-0 w-full bg-accent text-white px-4 py-2 text-[11px] sm:text-xs font-bold shadow-md text-center break-words z-20">
          🎉 Your taxable capital gains are reduced by: {formatCurrency(savings)}
        </div>
      )}
    </div>
  );
};

export default PostHarvestingCard;