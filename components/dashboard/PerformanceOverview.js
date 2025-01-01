import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PerformanceOverview({ data }) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Portfolio Performance</h2>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#2563eb" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <p className="text-sm text-gray-600">Total Return</p>
          <p className="text-2xl font-bold text-green-600">+12.4%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">YTD Return</p>
          <p className="text-2xl font-bold text-green-600">+8.2%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Risk Score</p>
          <p className="text-2xl font-bold">65/100</p>
        </div>
      </div>
    </Card>
  );
}
