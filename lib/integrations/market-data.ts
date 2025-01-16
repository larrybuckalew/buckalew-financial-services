import axios from 'axios'

// Market data provider interface
export interface MarketData {
  symbol: string
  price: number
  changePercent: number
  lastUpdated: string
}

// Market data service
export class MarketDataService {
  private static instance: MarketDataService
  private apiKey: string

  private constructor() {
    this.apiKey = process.env.MARKET_DATA_API_KEY || ''
  }

  public static getInstance(): MarketDataService {
    if (!MarketDataService.instance) {
      MarketDataService.instance = new MarketDataService()
    }
    return MarketDataService.instance
  }

  // Fetch real-time stock prices
  public async getStockPrices(symbols: string[]): Promise<MarketData[]> {
    try {
      const response = await axios.get('https://financialdataprovider.com/v1/stocks', {
        params: {
          symbols: symbols.join(','),
          apikey: this.apiKey
        }
      })

      return response.data.map((stock: any) => ({
        symbol: stock.symbol,
        price: stock.price,
        changePercent: stock.changePercent,
        lastUpdated: new Date().toISOString()
      }))
    } catch (error) {
      console.error('Market data fetch failed', error)
      return symbols.map(symbol => ({
        symbol,
        price: 0,
        changePercent: 0,
        lastUpdated: new Date().toISOString()
      }))
    }
  }

  // Fetch market indices
  public async getMarketIndices(): Promise<MarketData[]> {
    const defaultIndices = ['SPX', 'DJIA', 'IXIC']
    
    try {
      const response = await axios.get('https://financialdataprovider.com/v1/indices', {
        params: {
          symbols: defaultIndices.join(','),
          apikey: this.apiKey
        }
      })

      return response.data.map((index: any) => ({
        symbol: index.symbol,
        price: index.value,
        changePercent: index.changePercent,
        lastUpdated: new Date().toISOString()
      }))
    } catch (error) {
      console.error('Market indices fetch failed', error)
      return defaultIndices.map(symbol => ({
        symbol,
        price: 0,
        changePercent: 0,
        lastUpdated: new Date().toISOString()
      }))
    }
  }

  // Fetch economic indicators
  public async getEconomicIndicators(): Promise<any[]> {
    try {
      const response = await axios.get('https://financialdataprovider.com/v1/economic-indicators', {
        params: { apikey: this.apiKey }
      })

      return response.data
    } catch (error) {
      console.error('Economic indicators fetch failed', error)
      return []
    }
  }
}