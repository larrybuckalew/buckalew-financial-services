import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function MonitoringDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [metricsData, alertsData] = await Promise.all([
        fetch('/api/monitoring/metrics').then(res => res.json()),
        fetch('/api/monitoring/alerts').then(res => res.json())
      ]);

      setMetrics(metricsData);
      setAlerts(alertsData);
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  if (!metrics) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">System Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metrics.performance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cpu" stroke="#8884d8" />
            <Line type="monotone" dataKey="memory" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Active Users</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={metrics.users}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 md:col-span-2">
        <h2 className="text-xl font-bold mb-4">Recent Alerts</h2>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded ${{
                'critical': 'bg-red-100 border-red-500',
                'error': 'bg-orange-100 border-orange-500',
                'warning': 'bg-yellow-100 border-yellow-500',
                'info': 'bg-blue-100 border-blue-500'
              }[alert.severity]}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{alert.message}</h3>
                  <p className="text-sm text-gray-600">{alert.details}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(alert.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
