import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MarketInsights({ insights }) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Market Insights</h2>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="border-b pb-4 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{insight.title}</h3>
              <span className={`flex items-center ${insight.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {insight.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {insight.percentage}%
              </span>
            </div>
            <p className="text-gray-600">{insight.description}</p>
            <div className="mt-2 text-sm text-gray-500">
              Impact: {insight.impact}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
