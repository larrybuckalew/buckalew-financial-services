import React from 'react';
import { Card } from '@/components/ui/card';

export default function InvestmentRecommendations({ recommendations }) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Investment Recommendations</h2>
      
      <div className="space-y-6">
        {recommendations.map((rec, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold mb-2">{rec.title}</h3>
            <p className="text-gray-600 mb-2">{rec.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Risk Level</p>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full ${i < rec.riskLevel ? 'bg-blue-500' : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Timeline</p>
                <p className="font-medium">{rec.timeline}</p>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              {rec.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
