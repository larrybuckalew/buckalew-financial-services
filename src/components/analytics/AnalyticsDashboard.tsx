import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

import financialTrendsService from '@/services/analytics/financialTrendsService';
import userBehaviorService from '@/services/analytics/userBehaviorService';
import performanceMetricsService from '@/services/analytics/performanceMetricsService';

const AnalyticsDashboard: React.FC = () => {
  // State for different analytics
  const [financialTrends, setFinancialTrends] = useState([]);
  const [userEngagement, setUserEngagement] = useState(null);
  const [performanceReport, setPerformanceReport] = useState(null);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      // Simulated data fetching - replace with actual API calls
      const mockTransactions = [
        { date: '2024-01-15', amount: 1000 },
        { date: '2024-01-16', amount: 1200 },
        { date: '2024-01-17', amount: 950 }
      ];

      const mockUserData = [
        { 
          userId: 'user1', 
          isActive: true, 
          signupDate: '2023-12-01',
          lastLoginDate: '2024-01-20',
          totalTransactionValue: 5000
        }
      ];

      const mockInvestments = [
        { 
          initialInvestment: 10000, 
          currentValue: 11500,
          type: 'Stock'
        }
      ];

      // Analyze financial trends
      const trends = financialTrendsService.analyzeFinancialPerformance(mockTransactions);
      setFinancialTrends(trends);

      // Calculate user engagement
      const engagement = userBehaviorService.calculateUserEngagement('user1');
      setUserEngagement(engagement);

      // Generate performance report
      const performanceReport = performanceMetricsService.generatePerformanceReport(
        mockUserData, 
        mockInvestments
      );
      setPerformanceReport(performanceReport);
    };

    fetchAnalyticsData();
  }, []);

  // Financial Trends Chart
  const FinancialTrendsChart = () => (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Financial Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={financialTrends}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="totalRevenue" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
          />
          <Line 
            type="monotone" 
            dataKey="growthRate" 
            stroke="#82ca9d" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  // User Engagement Metrics
  const UserEngagementMetrics = () => (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">User Engagement</h3>
      {userEngagement && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Total Page Views</p>
            <p className="font-bold text-xl">{userEngagement.totalPageViews}</p>
          </div>
          <div>
            <p className="text-gray-600">Avg. Session Duration</p>
            <p className="font-bold text-xl">
              {(userEngagement.averageSessionDuration / 1000).toFixed(2)} sec
            </p>
          </div>
          <div>
            <p className="text-gray-600">Most Visited Pages</p>
            <ul>
              {userEngagement.mostVisitedPages.map((page, index) => (
                <li key={index} className="text-sm">
                  {page.page}: {page.views} views
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  // Performance Metrics Visualization
  const PerformanceMetricsChart = () => (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
      {performanceReport && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-md font-semibold">User Metrics</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart 
                data={[
                  { name: 'Signup Rate', value: performanceReport.userMetrics.signupConversionRate },
                  { name: 'Active Users', value: performanceReport.userMetrics.activeUserRate },
                  { name: 'Retention', value: performanceReport.userMetrics.retentionRate }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h4 className="text-md font-semibold">System Performance</h4>
            <div className="space-y-2">
              <div>
                <p>Response Time: {performanceReport.systemPerformance.responseTime}ms</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{
                      width: `${Math.min(performanceReport.systemPerformance.responseTime / 2, 100)}%`
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <p>CPU Usage: {performanceReport.systemPerformance.cpuUsage}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{
                      width: `${performanceReport.systemPerformance.cpuUsage}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FinancialTrendsChart />
        <UserEngagementMetrics />
        <PerformanceMetricsChart />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
