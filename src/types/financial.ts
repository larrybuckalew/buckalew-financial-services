export interface MarketData {
  indices: {
    name: string;
    value: number;
    change: number;
    percentChange: number;
  }[];
  timestamp: string;
}

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  percentChange: number;
  volume: number;
  marketCap: number;
  timestamp: string;
}

export interface AssetAllocation {
  stocks: number;
  bonds: number;
  cash: number;
  other: number;
  recommendations: {
    symbol: string;
    allocation: number;
    reason: string;
  }[];
}