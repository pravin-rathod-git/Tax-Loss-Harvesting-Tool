import { useState, useMemo, useEffect } from 'react';
import { holdingsData, gainsData } from '../utils/data'; 
import { fetchHoldings, fetchCapitalGains } from '../utils/api';

export const useTaxHarvesting = () => {
  const [holdings, setHoldings] = useState([]);
  const [initialGains, setInitialGains] = useState(null);
  const [selectedCoins, setSelectedCoins] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showAll, setShowAll] = useState(false);

useEffect(() => {
    const loadData = async () => {
      try {
        // Promise.all fetches both APIs simultaneously for better performance
        const [holdingsResponse, gainsResponse] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains()
        ]);
        
        setHoldings(holdingsResponse);
        setInitialGains(gainsResponse.capitalGains);
      } catch (error) {
        console.error("Error fetching mock data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const postHarvestingGains = useMemo(() => {
    if (!initialGains) return null;
    let stcgProfits = initialGains.stcg.profits;
    let stcgLosses = initialGains.stcg.losses;
    let ltcgProfits = initialGains.ltcg.profits;
    let ltcgLosses = initialGains.ltcg.losses;

    selectedCoins.forEach((coinId) => {
      const asset = holdings.find((h) => h.coin + h.coinName === coinId);
      if (!asset) return;

      if (asset.stcg.gain > 0) stcgProfits += asset.stcg.gain;
      else stcgLosses += Math.abs(asset.stcg.gain);

      if (asset.ltcg.gain > 0) ltcgProfits += asset.ltcg.gain;
      else ltcgLosses += Math.abs(asset.ltcg.gain);
    });

    return {
      stcg: { profits: stcgProfits, losses: stcgLosses },
      ltcg: { profits: ltcgProfits, losses: ltcgLosses },
    };
  }, [selectedCoins, holdings, initialGains]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const sortedHoldings = useMemo(() => {
    let sortableItems = [...holdings];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const getVal = (obj, path) => path.split('.').reduce((acc, part) => acc && acc[part], obj);
        const aVal = getVal(a, sortConfig.key);
        const bVal = getVal(b, sortConfig.key);

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [holdings, sortConfig]);

  const visibleHoldings = showAll ? sortedHoldings : sortedHoldings.slice(0, 4);

  const toggleSelection = (coinId) => {
    setSelectedCoins((prev) => {
      const next = new Set(prev);
      if (next.has(coinId)) next.delete(coinId);
      else next.add(coinId);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedCoins.size === visibleHoldings.length) {
      setSelectedCoins(new Set());
    } else {
      setSelectedCoins(new Set(visibleHoldings.map((h) => h.coin + h.coinName)));
    }
  };

  return {
    holdings,
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
  };
};