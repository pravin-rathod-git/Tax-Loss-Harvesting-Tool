import React, { useState } from 'react';
import { useTaxHarvesting } from './hooks/useTaxHarvesting';
import { calculateTotals } from './utils/calculations';
import { useDarkMode } from './hooks/useDarkMode';
import { Sun, Moon, Zap, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useAutoAnimate } from '@formkit/auto-animate/react'; 

import PreHarvestingCard from './components/PreHarvestingCard';
import PostHarvestingCard from './components/PostHarvestingCard';
import HoldingsTable from './components/HoldingsTable';

function App() {
  const { 
    visibleHoldings,
    initialGains, 
    postHarvestingGains, 
    selectedCoins, 
    toggleSelection, 
    toggleAll,
    isLoading,
    handleSort,
    sortConfig,
    showAll,
    setShowAll
  } = useTaxHarvesting();
  
  const [colorTheme, setTheme] = useDarkMode();
  const [showNotes, setShowNotes] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const [dropdownParent] = useAutoAnimate();
  const [accordionParent] = useAutoAnimate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        <Zap className="w-8 h-8 mr-3 animate-pulse text-accent" />
        Loading Dashboard...
      </div>
    );
  }

  const initialTotals = calculateTotals(initialGains);
  const postTotals = calculateTotals(postHarvestingGains);
  const savings = initialTotals.realizedGains - postTotals.realizedGains;

  return (
    // RESPONSIVE FIX: Mobile scrolls normally (min-h-screen), Desktop locks (lg:h-screen lg:overflow-hidden)
    <div className="flex flex-col min-h-screen lg:h-screen lg:overflow-hidden p-2 md:p-4 max-w-[1400px] mx-auto relative">
      
      {/* Header */}
      <header className="flex-shrink-0 flex justify-between items-center mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-accent fill-accent flex-shrink-0" /> 
          <div className="relative" ref={dropdownParent}>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">Tax Optimisation</h1>
            <button 
              onClick={() => setShowHowItWorks(!showHowItWorks)} 
              className="text-[11px] text-primary dark:text-blue-400 hover:underline focus:outline-none"
            >
              How it works?
            </button>
            {showHowItWorks && (
              <div className="absolute top-full left-0 mt-2 w-[85vw] max-w-[320px] p-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl z-50 text-xs origin-top">
                <ul className="list-disc pl-4 space-y-2 text-gray-700 dark:text-slate-300">
                  <li>See your capital gains for FY 2024-25 in the left card</li>
                  <li>Check boxes for assets you plan on selling to reduce your tax liability</li>
                  <li>Instantly see your updated tax liability in the right card</li>
                </ul>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700 text-gray-700 dark:text-slate-300">
                  <strong className="text-gray-900 dark:text-white">Pro tip:</strong> Experiment with different combinations of your holdings to optimize your tax liability.
                </div>
              </div>
            )}
          </div>
        </div>
        
        <button 
          onClick={() => setTheme(colorTheme)}
          className="p-1.5 bg-card-light dark:bg-card-dark rounded-md shadow-sm border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex-shrink-0"
        >
          {colorTheme === 'light' ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-gray-200" />}
        </button>
      </header>

      {/* Accordion */}
      <div className="mb-4 flex-shrink-0" ref={accordionParent}>
        <button 
          onClick={() => setShowNotes(!showNotes)}
          className="w-full flex justify-between items-center bg-slate-800 text-white px-4 py-2.5 rounded-lg shadow-sm border border-slate-700 text-sm font-semibold transition-colors hover:bg-slate-700"
        >
          <span className="flex items-center gap-2"><Info size={16} className="text-blue-400 flex-shrink-0"/> <span className="text-left">Important Notes And Disclaimers</span></span>
          {showNotes ? <ChevronUp size={16} className="text-blue-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-blue-400 flex-shrink-0" />}
        </button>
        {showNotes && (
          <div className="bg-slate-800 text-slate-300 px-4 py-3 rounded-b-lg border border-t-0 border-slate-700 text-xs">
            <ul className="list-disc pl-5 space-y-1">
              <li>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor.</li>
              <li>Price and market value data is fetched from CoinGecko, not from individual exchanges.</li>
              <li>Only realized losses are considered for harvesting. Unrealized losses are not counted.</li>
            </ul>
          </div>
        )}
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 flex-shrink-0 items-stretch">
        <PreHarvestingCard 
          initialGains={initialGains} 
          initialTotals={initialTotals} 
        />
        <PostHarvestingCard 
          postHarvestingGains={postHarvestingGains} 
          postTotals={postTotals} 
          savings={savings} 
        />
      </div>

      {/* Holdings Table */}
      <HoldingsTable 
        visibleHoldings={visibleHoldings}
        selectedCoins={selectedCoins}
        toggleSelection={toggleSelection}
        toggleAll={toggleAll}
        handleSort={handleSort}
        sortConfig={sortConfig}
        showAll={showAll}
        setShowAll={setShowAll}
      />
    </div>
  );
}

export default App;