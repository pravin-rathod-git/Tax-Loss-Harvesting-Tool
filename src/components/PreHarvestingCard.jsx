import React from 'react';
import { formatCurrency } from '../utils/calculations';

const PreHarvestingCard = ({ initialGains, initialTotals }) => {
  return (
    <div className="bg-slate-800 text-white p-4 sm:p-5 rounded-xl shadow border border-slate-700 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-sm">Pre Harvesting</h2>
          <div className="flex gap-4 sm:gap-12 text-[11px] text-slate-400">
              <span>Short-term</span>
              <span>Long-term</span>
          </div>
        </div>
        
        <div className="space-y-2.5 border-b border-slate-600 pb-4 text-sm">
           <div className="flex justify-between items-center">
              <span className="text-slate-300">Profits</span>
              <div className="flex gap-4 sm:gap-8 font-semibold">
                  <span className="w-16 sm:w-20 text-right">{formatCurrency(initialGains.stcg.profits)}</span>
                  <span className="w-16 sm:w-20 text-right">{formatCurrency(initialGains.ltcg.profits)}</span>
              </div>
           </div>
           <div className="flex justify-between items-center">
              <span className="text-slate-300">Losses</span>
              <div className="flex gap-4 sm:gap-8 font-semibold">
                  <span className="w-16 sm:w-20 text-right">{formatCurrency(initialGains.stcg.losses)}</span>
                  <span className="w-16 sm:w-20 text-right">{formatCurrency(initialGains.ltcg.losses)}</span>
              </div>
           </div>
           <div className="flex justify-between items-center pt-1">
              <span className="text-slate-300">Net Capital Gains</span>
              <div className="flex gap-4 sm:gap-8 font-semibold">
                  <span className="w-16 sm:w-20 text-right">{formatCurrency(initialTotals.netStcg)}</span>
                  <span className="w-16 sm:w-20 text-right">{formatCurrency(initialTotals.netLtcg)}</span>
              </div>
           </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 justify-between items-center">
        <p className="font-bold text-sm">Realised Capital Gains:</p>
        <p className="text-lg font-bold">{formatCurrency(initialTotals.realizedGains)}</p>
      </div>
    </div>
  );
};

export default PreHarvestingCard;