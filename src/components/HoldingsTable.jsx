import React from 'react';
import { formatCurrency } from '../utils/calculations';
import { ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const HoldingsTable = ({ 
  visibleHoldings, 
  selectedCoins, 
  toggleSelection, 
  toggleAll, 
  handleSort, 
  sortConfig, 
  showAll, 
  setShowAll 
}) => {
  const [animationParent] = useAutoAnimate();

  const SortableHeader = ({ label, sortKey, className = "" }) => (
    <th 
      className={`px-3 py-2.5 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors select-none ${className}`}
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        <span>{label}</span>
        <div className="w-4 flex items-center justify-center">
          {sortConfig.key === sortKey ? (
            sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
          ) : (
            <ArrowUpDown size={14} className="text-gray-400 opacity-50" />
          )}
        </div>
      </div>
    </th>
  );

  return (
    // RESPONSIVE FIX: Minimum height of 500px on mobile guarantees the table renders correctly when stacked below the cards.
    <div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0 bg-card-light dark:bg-card-dark rounded-xl shadow border border-gray-200 dark:border-gray-800 relative overflow-hidden pb-4 lg:pb-0">
      
      {/* Scrollable Area */}
      <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[850px] table-fixed">
          <thead className="sticky top-0 z-20 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
              <tr className="text-gray-500 dark:text-gray-400 text-[11px] uppercase tracking-wider">
              <th className="px-3 sm:px-4 py-2.5 w-[5%] bg-gray-50 dark:bg-gray-900">
                  <input 
                  type="checkbox" 
                  className="w-3.5 h-3.5 rounded border-gray-300 text-accent focus:ring-accent bg-transparent cursor-pointer"
                  checked={selectedCoins.size === visibleHoldings.length && visibleHoldings.length > 0} 
                  onChange={toggleAll} 
                  />
              </th>
              <th className="px-3 py-2.5 w-[25%] font-semibold whitespace-nowrap bg-gray-50 dark:bg-gray-900">Asset</th>
              <th className="px-3 py-2.5 w-[15%] font-semibold bg-gray-50 dark:bg-gray-900">
                  <div>Holdings</div>
                  <div className="text-[9px] font-normal text-gray-400 mt-0.5 capitalize whitespace-nowrap">Avg Buy Price</div>
              </th>
              <th className="px-3 py-2.5 w-[15%] font-semibold bg-gray-50 dark:bg-gray-900">Current Price</th>
              <SortableHeader label="Short-Term" sortKey="stcg.gain" className="w-[15%] font-semibold bg-gray-50 dark:bg-gray-900" />
              <SortableHeader label="Long-Term" sortKey="ltcg.gain" className="w-[15%] font-semibold bg-gray-50 dark:bg-gray-900" />
              <th className="px-4 py-2.5 w-[10%] text-right font-semibold whitespace-nowrap bg-gray-50 dark:bg-gray-900">Amount to Sell</th>
              </tr>
          </thead>
          <tbody ref={animationParent}>
              {visibleHoldings.map((asset) => {
                  const coinId = asset.coin + asset.coinName;
                  const isSelected = selectedCoins.has(coinId);
                  
                  return (
                    <tr 
                      key={coinId} 
                      onClick={() => toggleSelection(coinId)} 
                      className={`border-b border-gray-100 dark:border-gray-800/80 last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors cursor-pointer ${isSelected ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}
                    >
                      <td className="px-3 sm:px-4 py-1.5 align-middle">
                        <input 
                          type="checkbox" 
                          className="w-3.5 h-3.5 rounded border-gray-300 text-accent focus:ring-accent bg-transparent cursor-pointer pointer-events-none"
                          checked={isSelected} 
                          readOnly
                        />
                      </td>
                      
                      <td className="px-3 py-1.5 flex items-center gap-2 align-middle min-w-[140px]">
                          <img src={asset.logo} alt={asset.coin} className="w-6 h-6 rounded-full bg-white border border-gray-100 dark:border-gray-700 flex-shrink-0" />
                          <div className="min-w-0">
                              <p className="font-bold text-xs truncate text-gray-900 dark:text-gray-100 max-w-[100px] sm:max-w-[120px]">{asset.coinName}</p>
                              <p className="text-[10px] text-gray-500 dark:text-gray-400">{asset.coin}</p>
                          </div>
                      </td>

                      <td className="px-3 py-1.5 align-middle">
                          <p className="font-semibold text-xs text-gray-900 dark:text-gray-100 whitespace-nowrap">
                              {asset.totalHolding.toLocaleString('en-US', {maximumFractionDigits: 2})} <span className="text-[10px]">{asset.coin}</span>
                          </p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              {formatCurrency(asset.averageBuyPrice)}/{asset.coin}
                          </p>
                      </td>

                      <td className="px-3 py-1.5 align-middle font-semibold text-xs text-gray-900 dark:text-gray-100 relative group">
                          {formatCurrency(asset.currentPrice)}
                          <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block w-max bg-gray-900 dark:bg-slate-700 text-white text-[10px] px-2 py-1 rounded shadow-lg z-50">
                              {asset.currentPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}
                          </div>
                      </td>

                      <td className="px-3 py-1.5 align-middle">
                          <p className={`font-semibold text-xs whitespace-nowrap ${asset.stcg.gain >= 0 ? 'text-accent' : 'text-loss'}`}>
                              {asset.stcg.gain >= 0 ? '+' : ''}{formatCurrency(asset.stcg.gain)}
                          </p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              {asset.stcg.balance.toLocaleString('en-US', {maximumFractionDigits: 2})} {asset.coin}
                          </p>
                      </td>

                      <td className="px-3 py-1.5 align-middle">
                          <p className={`font-semibold text-xs whitespace-nowrap ${asset.ltcg.gain >= 0 ? 'text-accent' : 'text-loss'}`}>
                              {asset.ltcg.gain >= 0 ? '+' : ''}{formatCurrency(asset.ltcg.gain)}
                          </p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              {asset.ltcg.balance.toLocaleString('en-US', {maximumFractionDigits: 2})} {asset.coin}
                          </p>
                      </td>

                      <td className="px-4 py-1.5 align-middle text-right font-semibold text-xs">
                          {isSelected ? (
                             <span className="text-gray-900 dark:text-gray-100 whitespace-nowrap">{asset.totalHolding.toLocaleString('en-US', {maximumFractionDigits: 2})} {asset.coin}</span>
                          ) : (
                             <span className="text-gray-400 dark:text-gray-500">-</span>
                          )}
                      </td>
                    </tr>
                  )
              })}
          </tbody>
          </table>
      </div>
      
      {/* Sticky Footer */}
      <div className="flex-shrink-0 px-4 py-2 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-center z-20">
          <button 
              onClick={() => setShowAll(!showAll)}
              className="text-primary dark:text-blue-400 font-semibold text-xs hover:underline transition-all"
          >
              {showAll ? 'View Less' : 'View All'}
          </button>
      </div>
    </div>
  );
};

export default HoldingsTable;