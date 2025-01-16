import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

export default function NotificationSettings({ initialSettings }) {
  const [settings, setSettings] = useState(initialSettings);

  const handleToggle = async (key) => {
    try {
      const newSettings = {
        ...settings,
        [key]: !settings[key]
      };

      const response = await fetch('/api/user/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });

      if (response.ok) {
        setSettings(newSettings);
      }
    } catch (error) {
      console.error('Failed to update notification settings:', error);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>

      <div className="space-y-6">
        {/* Email Notifications */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
          <div className="space-y-4">
            {notificationTypes.email.map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <button
                  onClick={() => handleToggle(`email_${item.key}`)}
                  className={`
                    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
                    transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${settings[`email_${item.key}`] ? 'bg-blue-600' : 'bg-gray-200'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                      transition duration-200 ease-in-out
                      ${settings[`email_${item.key}`] ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SMS Notifications */}
        <div>
          <h3 className="text-lg font-semibold mb-4">SMS Notifications</h3>
          <div className="space-y-4">
            {notificationTypes.sms.map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <button
                  onClick={() => handleToggle(`sms_${item.key}`)}
                  className={`
                    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
                    transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${settings[`sms_${item.key}`] ? 'bg-blue-600' : 'bg-gray-200'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                      transition duration-200 ease-in-out
                      ${settings[`sms_${item.key}`] ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Push Notifications */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
          <div className="space-y-4">
            {notificationTypes.push.map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <button
                  onClick={() => handleToggle(`push_${item.key}`)}
                  className={`
                    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
                    transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${settings[`push_${item.key}`] ? 'bg-blue-600' : 'bg-gray-200'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                      transition duration-200 ease-in-out
                      ${settings[`push_${item.key}`] ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

const notificationTypes = {
  email: [
    {
      key: 'portfolio_updates',
      title: 'Portfolio Updates',
      description: 'Receive updates about your portfolio performance'
    },
    {
      key: 'market_alerts',
      title: 'Market Alerts',
      description: 'Get notified about significant market changes'
    },
    {
      key: 'document_uploads',
      title: 'Document Uploads',
      description: 'Notifications when new documents are available'
    }
  ],
  sms: [
    {
      key: 'security_alerts',
      title: 'Security Alerts',
      description: 'Receive SMS alerts for account security'
    },
    {
      key: 'trade_confirmations',
      title: 'Trade Confirmations',
      description: 'Get SMS notifications for trade executions'
    }
  ],
  push: [
    {
      key: 'price_alerts',
      title: 'Price Alerts',
      description: 'Push notifications for price movement alerts'
    },
    {
      key: 'meeting_reminders',
      title: 'Meeting Reminders',
      description: 'Reminders for upcoming meetings'
    }
  ]
};
