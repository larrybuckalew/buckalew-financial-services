import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function PortfolioComparison({ data }) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Portfolio Performance Comparison</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="portfolio" name="Your Portfolio" fill="#3B82F6" />
            <Bar dataKey="benchmark" name="Benchmark" fill="#9CA3AF" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Performance Metrics</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Alpha:</span>
              <span className="font-medium">{data.metrics?.alpha}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Beta:</span>
              <span className="font-medium">{data.metrics?.beta}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sharpe Ratio:</span>
              <span className="font-medium">{data.metrics?.sharpeRatio}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Risk Analysis</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Standard Deviation:</span>
              <span className="font-medium">{data.metrics?.standardDeviation}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Max Drawdown:</span>
              <span className="font-medium">{data.metrics?.maxDrawdown}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tracking Error:</span>
              <span className="font-medium">{data.metrics?.trackingError}%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
