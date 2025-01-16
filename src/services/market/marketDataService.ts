import { formatDistance } from 'date-fns';

// Interfaces for market data
export interface StockQuote {
  symbol: string;
  companyName: string;
  latestPrice: number;
  changePercent: number;
  previousClose: number;
  marketCap?: number;
  peRatio?: number;
}

export interface MarketIndex {
  name: string;
  value: number;
  changePercent: number;
}

export interface CryptoData {
  name: string;
  symbol: string;
  price: number;
  dailyChange: number;
}

class MarketDataService {
  private readonly API_BASE_URL = 'https://api.example.com/market';
  private readonly API_KEY = process.env.MARKET_DATA_API_KEY;

  // Fetch real-time stock quotes
  async getStockQuotes(symbols: string[]): Promise<StockQuote[]> {
    try {
      // Simulated data for development
      return symbols.map(symbol => ({
        symbol,
        companyName: this.getCompanyName(symbol),
        latestPrice: Math.random() * 1000,
        changePercent: (Math.random() - 0.5) * 10,
        previousClose: Math.random() * 1000,
        marketCap: Math.random() * 1000000000,
        peRatio: Math.random() * 50
      }));
    } catch (error) {
      console.error('Market data fetch error:', error);
      return [];
    }
  }

  // Fetch market indices
  async getMarketIndices(): Promise<MarketIndex[]> {
    return [
      { 
        name: 'S&P 500', 
        value: 4500.50, 
        changePercent: 0.75 
      },
      { 
        name: 'Dow Jones', 
        value: 35000.25, 
        changePercent: 0.45 
      },
      { 
        name: 'NASDAQ', 
        value: 15000.75, 
        changePercent: 1.2 
      }
    ];
  }

  // Fetch cryptocurrency data
  async getCryptoData(): Promise<CryptoData[]> {
    return [
      { 
        name: 'Bitcoin', 
        symbol: 'BTC', 
        price: 50000, 
        dailyChange: 2.5 
      },
      { 
        name: 'Ethereum', 
        symbol: 'ETH', 
        price: 3000, 
        dailyChange: 1.8 
      }
    ];
  }

  // Helper to get company names (mock implementation)
  private getCompanyName(symbol: string): string {
    const companies: { [key: string]: string } = {
      'AAPL': 'Apple Inc.',
      'GOOGL': 'Alphabet Inc.',
      'MSFT': 'Microsoft Corporation',
      'AMZN': 'Amazon.com Inc.'
    };
    return companies[symbol] || symbol;
  }

  // Calculate market sentiment
  calculateMarketSentiment(changePercent: number): string {
    if (changePercent > 2) return 'Bullish';
    if (changePercent < -2) return 'Bearish';
    return 'Neutral';
  }

  // Format last updated time
  formatLastUpdated(date: Date): string {
    return formatDistance(date, new Date(), { addSuffix: true });
  }
}

export default new MarketDataService();
