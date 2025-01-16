import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AlertCircle, TrendingUp, DollarSign, Briefcase, PieChart as PieChartIcon, Activity, Target } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function FinancialDashboard() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulated data - would come from API in production
    setPortfolioData({
      totalValue: 250000,
      monthlyChange: 2.5,
      yearlyReturn: 15.3,
      riskScore: 7.2,
      allocation: [
        { name: 'Stocks', value: 60 },
        { name: 'Bonds', value: 25 },
        { name: 'Cash', value: 10 },
        { name: 'Alternative', value: 5 }
      ],
      performance: [
        { month: 'Jan', value: 230000 },
        { month: 'Feb', value: 235000 },
        { month: 'Mar', value: 238000 },
        { month: 'Apr', value: 242000 },
        { month: 'May', value: 245000 },
        { month: 'Jun', value: 250000 }
      ],
      goals: [
        { name: 'Retirement', target: 1000000, current: 180000 },
        { name: 'Emergency Fund', target: 30000, current: 25000 },
        { name: 'Home Purchase', target: 100000, current: 45000 }
      ]
    });
  }, []);

  if (!portfolioData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Portfolio Value</p>
                <h3 className="text-2xl font-bold">
                  ${portfolioData.totalValue.toLocaleString()}
                </h3>
                <p className="text-sm text-green-600">+${(portfolioData.totalValue * portfolioData.monthlyChange / 100).toLocaleString()} (${portfolioData.monthlyChange}%)</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Annual Return</p>
                <h3 className="text-2xl font-bold">{portfolioData.yearlyReturn}%</h3>
                <p className="text-sm text-blue-600">vs. 12.5% Benchmark</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Risk Score</p>
                <h3 className="text-2xl font-bold">{portfolioData.riskScore}</h3>
                <p className="text-sm text-gray-600">Moderate</p>
              </div>
              <Activity className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Goal Progress</p>
                <h3 className="text-2xl font-bold">68%</h3>
                <p className="text-sm text-gray-600">On Track</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Value Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={portfolioData.performance}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#0088FE" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#0088FE" fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={portfolioData.allocation}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {portfolioData.allocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Goals Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.goals.map((goal, index) => {
                  const progress = (goal.current / goal.target) * 100;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{goal.name}</span>
                        <span>${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation">
          {/* Add detailed allocation content */}
        </TabsContent>

        <TabsContent value="performance">
          {/* Add detailed performance content */}
        </TabsContent>

        <TabsContent value="goals">
          {/* Add detailed goals content */}
        </TabsContent>
      </Tabs>
    </div>
  );
}