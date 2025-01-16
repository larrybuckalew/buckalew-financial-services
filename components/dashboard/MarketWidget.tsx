import React, { useState, useEffect } from 'react'
import { MarketDataService, MarketData } from '../../lib/integrations/market-data'

const MarketWidget: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const service = MarketDataService.getInstance()
        const [stockData, indicesData] = await Promise.all([
          service.getStockPrices(['AAPL', 'GOOGL', 'MSFT']),
          service.getMarketIndices()
        ])

        setMarketData([...stockData, ...indicesData])
        setLoading(false)
      } catch (err) {
        setError('Failed to load market data')
        setLoading(false)
      }
    }

    fetchMarketData()
    const intervalId = setInterval(fetchMarketData, 60000) // Refresh every minute

    return () => clearInterval(intervalId)
  }, [])

  if (loading) return <div>Loading market data...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="market-widget bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Market Overview</h2>
      {marketData.map((data) => (
        <div 
          key={data.symbol} 
          className="flex justify-between items-center mb-2"
        >
          <span className="font-medium">{data.symbol}</span>
          <div>
            <span className="mr-2">${data.price.toFixed(2)}</span>
            <span 
              className={`
                ${data.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}
              `}
            >
              {data.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MarketWidget