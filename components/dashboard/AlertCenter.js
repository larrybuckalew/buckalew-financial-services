import React from 'react';
import { Card } from '@/components/ui/card';

export default function AlertCenter() {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Alerts & Notifications</h2>
        <div className="flex space-x-2">
          <button className="text-sm text-blue-600">Filter</button>
          <button className="text-sm text-blue-600">Mark All Read</button>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${getAlertStyle(alert.priority)}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{alert.title}</h3>
                <p className="text-sm">{alert.description}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded ${getAlertBadgeStyle(alert.priority)}`}>
                {alert.priority}
              </span>
            </div>
            <div className="mt-2 flex justify-between items-center text-sm">
              <span className="text-gray-500">{alert.time}</span>
              <button className="text-blue-600">Take Action</button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

const alerts = [
  {
    title: 'Portfolio Rebalance Required',
    description: 'Portfolio ABC123 has deviated from target allocation by 15%',
    priority: 'High',
    time: '5m ago'
  },
  {
    title: 'New Document Available',
    description: 'Q4 Performance Report ready for review',
    priority: 'Medium',
    time: '1h ago'
  },
  // Add more alerts
];

function getAlertStyle(priority) {
  const styles = {
    High: 'bg-red-50',
    Medium: 'bg-yellow-50',
    Low: 'bg-blue-50'
  };
  return styles[priority] || styles.Low;
}

function getAlertBadgeStyle(priority) {
  const styles = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-blue-100 text-blue-800'
  };
  return styles[priority] || styles.Low;
}
