import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { calculateMA, calculateRSI, calculateMACD, detectPatterns } from '@/lib/monitoring/analysis/technical';

export default function TechnicalDashboard({ marketData }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [technicalData, setTechnicalData] = useState(null);

  useEffect(() => {
    const calculateIndicators = () => {
      const ma50 = calculateMA(marketData, 50);
      const ma200 = calculateMA(marketData, 200);
      const rsi = calculateRSI(marketData, 14);
      const macd = calculateMACD(marketData);
      const patterns = detectPatterns(marketData);

      setTechnicalData({
        movingAverages: { ma50, ma200 },
        rsi,
        macd,
        patterns
      });
    };

    calculateIndicators();
  }, [marketData, selectedTimeframe]);

  if (!technicalData) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-2 gap-6">
      <Card className="col-span-2 p-6">
        <h2 className="text-2xl font-bold mb-4">Price Action & Moving Averages</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="close" stroke="#2563eb" name="Price" />
              <Line type="monotone" dataKey="ma50" stroke="#10b981" name="50 MA" />
              <Line type="monotone" dataKey="ma200" stroke="#ef4444" name="200 MA" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">RSI</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="rsi" stroke="#8b5cf6" />
              {/* Overbought/Oversold lines */}
              <Line type="monotone" dataKey="overbought" stroke="#ef4444" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="oversold" stroke="#10b981" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">MACD</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="macdLine" stroke="#2563eb" name="MACD" />
              <Line type="monotone" dataKey="signalLine" stroke="#ef4444" name="Signal" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="col-span-2 p-6">
        <h2 className="text-2xl font-bold mb-4">Technical Patterns & Signals</h2>
        <div className="grid grid-cols-3 gap-4">
          {technicalData.patterns.map((pattern, index) => (
            <div key={index} className="p-4 border rounded">
              <h3 className="font-semibold">{pattern.name}</h3>
              <p className={`text-sm ${pattern.type === 'bullish' ? 'text-green-600' : 'text-red-600'}`}>
                {pattern.type}
              </p>
              <p className="text-sm text-gray-600">Reliability: {pattern.reliability}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
