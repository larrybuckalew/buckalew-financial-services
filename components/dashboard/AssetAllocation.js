import React from 'react';
import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#2563eb', '#7c3aed', '#db2777', '#dc2626', '#eab308'];

export default function AssetAllocation({ data }) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Asset Allocation</h2>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Rebalancing Suggestions</h3>
        <ul className="space-y-2 text-sm">
          {data.map((asset, index) => (
            asset.suggestion && (
              <li key={index} className="flex items-center text-gray-600">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                {asset.suggestion}
              </li>
            )
          ))}
        </ul>
      </div>
    </Card>
  );
}
