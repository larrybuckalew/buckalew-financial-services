import React from 'react';
import { Card } from '@/components/ui/card';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

export default function RiskAnalytics({ data }) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Portfolio Risk Analytics</h2>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data.riskMetrics}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <Tooltip />
            <Radar
              name="Current Portfolio"
              dataKey="value"
              stroke="#2563eb"
              fill="#2563eb"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Risk Factors</h3>
          <ul className="space-y-2">
            {data.riskFactors.map((factor, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{factor.name}</span>
                <span className={`px-2 py-1 rounded ${getRiskColor(factor.level)}`}>
                  {factor.level}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Key Metrics</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Value at Risk (VaR)</span>
              <span className="font-medium">{data.keyMetrics.var}%</span>
            </div>
            <div className="flex justify-between">
              <span>Volatility</span>
              <span className="font-medium">{data.keyMetrics.volatility}%</span>
            </div>
            <div className="flex justify-between">
              <span>Sharpe Ratio</span>
              <span className="font-medium">{data.keyMetrics.sharpeRatio}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Risk Assessment Summary</h3>
        <p className="text-gray-600">{data.summary}</p>
        {data.recommendations && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Recommendations</h4>
            <ul className="list-disc pl-4 space-y-1">
              {data.recommendations.map((rec, index) => (
                <li key={index} className="text-gray-600">{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}

function getRiskColor(level) {
  const colors = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800'
  };
  return colors[level] || colors.Medium;
}
