import React from 'react';
import { Card } from '@/components/ui/card';
import { TreeMap, ResponsiveContainer, Tooltip } from 'recharts';

export default function SectorAnalysis({ data }) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sector Analysis</h2>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <TreeMap
            data={data.sectors}
            dataKey="value"
            aspectRatio={4/3}
            stroke="#fff"
            fill="#8884d8"
          >
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length > 0) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 shadow rounded border">
                      <p className="font-medium">{data.name}</p>
                      <p className="text-sm text-gray-600">
                        Allocation: {data.value}%
                      </p>
                      <p className="text-sm text-gray-600">
                        Performance: {data.performance}%
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </TreeMap>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Top Performing Sectors</h3>
          <ul className="space-y-2">
            {data.topPerformers.map((sector, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{sector.name}</span>
                <span className="text-green-600">+{sector.performance}%</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Sector Opportunities</h3>
          <ul className="space-y-2">
            {data.opportunities.map((opportunity, index) => (
              <li key={index} className="p-2 bg-blue-50 rounded">
                <div className="font-medium text-blue-900">{opportunity.sector}</div>
                <p className="text-sm text-blue-700">{opportunity.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Sector Allocation Strategy</h3>
        <div className="space-y-4">
          {data.strategy.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`w-2 h-2 rounded-full ${getActionColor(item.action)}`} />
              <div>
                <p className="font-medium">{item.sector}</p>
                <p className="text-sm text-gray-600">{item.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function getActionColor(action) {
  const colors = {
    Increase: 'bg-green-500',
    Maintain: 'bg-blue-500',
    Decrease: 'bg-red-500',
    Monitor: 'bg-yellow-500'
  };
  return colors[action] || colors.Monitor;
}
