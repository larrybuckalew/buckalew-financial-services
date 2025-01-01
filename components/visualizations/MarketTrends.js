import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MarketTrends({ data }) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Market Trends Analysis</h2>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="marketValue" 
              stroke="#2563eb" 
              name="Market Value"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="volatility" 
              stroke="#dc2626" 
              name="Volatility"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded">
          <h3 className="text-sm font-semibold text-blue-900">Market Trend</h3>
          <p className="text-2xl font-bold text-blue-600">
            {data.trend >= 0 ? '+' : ''}{data.trend}%
          </p>
        </div>
        <div className="p-4 bg-red-50 rounded">
          <h3 className="text-sm font-semibold text-red-900">Risk Level</h3>
          <p className="text-2xl font-bold text-red-600">
            {data.riskLevel}
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded">
          <h3 className="text-sm font-semibold text-green-900">Opportunity Score</h3>
          <p className="text-2xl font-bold text-green-600">
            {data.opportunityScore}/100
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Market Insights</h3>
        <ul className="space-y-2">
          {data.insights.map((insight, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className={`mt-1 w-2 h-2 rounded-full ${insight.type === 'positive' ? 'bg-green-500' : 'bg-red-500'}`} />
              <span>{insight.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
