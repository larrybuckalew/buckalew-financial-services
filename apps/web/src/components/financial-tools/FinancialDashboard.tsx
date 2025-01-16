import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

import marketDataService from '@/services/market/marketDataService';
import portfolioService from '@/services/portfolio/portfolioService';
import retirementCalculator from '@/services/retirement/retirementCalculator';

// Interfaces for component props and state
interface MarketWidget {
  title: string;
  value: number;
  change: number;
}

const FinancialDashboard: React.FC = () => {
  // Market Data State
  const [marketIndices, setMarketIndices] = useState<MarketWidget[]>([]);
  const [cryptoData, setCryptoData] = useState<MarketWidget[]>([]);

  // Portfolio State
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [portfolioPerformance, setPortfolioPerformance] = useState(0);

  // Retirement Projection State
  const [retirementProjection, setRetirementProjection] = useState<any>(null);

  // Fetch market data on component mount
  React.useEffect(() => {
    const fetchMarketData = async () => {
      const indices = await marketDataService.getMarketIndices();
      const crypto = await marketDataService.getCryptoData();

      setMarketIndices(
        indices.map(index => ({
          title: index.name,
          value: index.value,
          change: index.changePercent
        }))
      );

      setCryptoData(
        crypto.map(coin => ({
          title: coin.name,
          value: coin.price,
          change: coin.dailyChange
        }))
      );
    };

    fetchMarketData();
  }, []);

  // Calculate Retirement Projection
  const calculateRetirementProjection = () => {
    const projection = retirementCalculator.calculateRetirementProjection({
      currentAge: 35,
      retirementAge: 65,
      currentAnnualIncome: 75000,
      currentSavings: 50000,
      monthlyContribution: 500,
      expectedAnnualReturn: 0.07,
      expectedInflationRate: 0.03
    });

    setRetirementProjection(projection);
  };

  // Market Performance Widget
  const MarketPerformanceWidget: React.FC<{ data: MarketWidget[] }> = ({ data }) => (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Market Performance</h3>
      {data.map((item, index) => (
        <div key={index} className="flex justify-between mb-2">
          <span>{item.title}</span>
          <span 
            className={`font-bold ${
              item.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {item.value.toLocaleString()} ({item.change.toFixed(2)}%)
          </span>
        </div>
      ))}
    </div>
  );

  // Retirement Projection Widget
  const RetirementProjectionWidget = () => {
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Retirement Projection</h3>
        {retirementProjection ? (
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Total Retirement Savings</p>
                <p className="font-bold text-xl">
                  ${retirementProjection.totalRetirementSavings.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Monthly Income Needed</p>
                <p className="font-bold text-xl">
                  ${retirementProjection.monthlyIncomeNeeded.toLocaleString()}
                </p>
              </div>
            </div>
            <button 
              onClick={calculateRetirementProjection}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Recalculate Projection
            </button>
          </div>
        ) : (
          <button 
            onClick={calculateRetirementProjection}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Calculate Retirement Projection
          </button>
        )}
      </div>
    );
  };

  // Portfolio Performance Chart
  const PortfolioPerformanceChart = () => {
    const portfolioData = [
      { month: 'Jan', value: 50000 },
      { month: 'Feb', value: 52000 },
      { month: 'Mar', value: 53000 },
      { month: 'Apr', value: 55000 },
      { month: 'May', value: 57000 },
      { month: 'Jun', value: 60000 }
    ];

    return (
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Portfolio Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={portfolioData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Financial Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MarketPerformanceWidget data={[...marketIndices, ...cryptoData]} />
        <RetirementProjectionWidget />
        <PortfolioPerformanceChart />
      </div>
    </div>
  );
};

export default FinancialDashboard;
