export const calculateTotals = (gains) => {
  if (!gains) return { netStcg: 0, netLtcg: 0, realizedGains: 0 };
  
  const netStcg = gains.stcg.profits - gains.stcg.losses;
  const netLtcg = gains.ltcg.profits - gains.ltcg.losses;
  const realizedGains = netStcg + netLtcg;

  return { netStcg, netLtcg, realizedGains };
};

export const formatCurrency = (value) => {
  if (!value || value === 0) return "$0.00";
  
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  // EXACT KOINX LOGIC: Values 1 Million or higher get 'M'
  if (absValue >= 1000000) {
    return `${isNegative ? '-' : ''}$${(absValue / 1000000).toFixed(2)}M`;
  }
  // EXACT KOINX LOGIC: Values 100k or higher get 'K'
  else if (absValue >= 100000) {
    return `${isNegative ? '-' : ''}$${(absValue / 1000).toFixed(2)}K`;
  }
  // Everything else gets standard comma formatting (e.g. $4,049.48)
  else {
    return `${isNegative ? '-' : ''}$${absValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
};