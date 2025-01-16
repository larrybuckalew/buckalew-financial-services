import axios from 'axios';

class MarketDataService {
  constructor() {
    this.baseURL = process.env.MARKET_DATA_API_URL;
    this.apiKey = process.env.MARKET_DATA_API_KEY;
  }

  async getStockQuote(symbol) {
    try {
      const response = await axios.get(`${this.baseURL}/quote/${symbol}`, {
        headers: { 'X-API-KEY': this.apiKey }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching stock quote:', error);
      throw error;
    }
  }

  async getMarketSummary() {
    try {
      const response = await axios.get(`${this.baseURL}/market/summary`, {
        headers: { 'X-API-KEY': this.apiKey }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching market summary:', error);
      throw error;
    }
  }

  async getHistoricalData(symbol, timeframe) {
    try {
      const response = await axios.get(
        `${this.baseURL}/historical/${symbol}`, {
          params: { timeframe },
          headers: { 'X-API-KEY': this.apiKey }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  }
}