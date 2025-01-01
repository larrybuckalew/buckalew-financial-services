import React from 'react';
import { Card } from '@/components/ui/card';

export default function ClientList() {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Recent Client Activity</h2>
        <button className="text-blue-600 text-sm">View All</button>
      </div>

      <div className="space-y-4">
        {clientActivities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                {activity.client.initials}
              </div>
              <div className="ml-3">
                <p className="font-medium">{activity.client.name}</p>
                <p className="text-sm text-gray-500">{activity.type}</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

const clientActivities = [
  {
    client: { name: 'John Doe', initials: 'JD' },
    type: 'Portfolio Review',
    time: '10m ago'
  },
  {
    client: { name: 'Sarah Smith', initials: 'SS' },
    type: 'Document Upload',
    time: '1h ago'
  },
  // Add more activities
];
