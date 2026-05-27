import { holdingsData, gainsData } from './data';

// Mock API 1: Fetch Holdings
export const fetchHoldings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(holdingsData);
    }, 800); // Simulates 800ms network delay
  });
};

// Mock API 2: Fetch Capital Gains
export const fetchCapitalGains = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(gainsData);
    }, 800); // Simulates 800ms network delay
  });
};