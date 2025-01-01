import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CashFlowAnalysis() {
  const [income, setIncome] = useState({
    salary: 0,
    investments: 0,
    rental: 0,
    other: 0
  });

  const [expenses, setExpenses] = useState({
    housing: 0,
    transportation: 0,
    utilities: 0,
    food: 0,
    insurance: 0,
    entertainment: 0,
    savings: 0
  });

  const calculateMonthlyFlow = () => {
    const totalIncome = Object.values(income).reduce((a, b) => a + b, 0);
    const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
    const netFlow = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      netFlow,
      savingsRate: (expenses.savings / totalIncome) * 100
    };
  };

  const results = calculateMonthlyFlow();

  const pieData = [
    ...Object.entries(expenses).map(([category, amount]) => ({
      name: category,
      value: amount
    }))
  ];

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Cash Flow Analysis</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-4">Monthly Income</h3>
          {Object.entries(income).map(([source, amount]) => (
            <div key={source} className="mb-4">
              <label className="block text-sm mb-1 capitalize">{source}</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setIncome({ ...income, [source]: Number(e.target.value) })}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-semibold mb-4">Monthly Expenses</h3>
          {Object.entries(expenses).map(([category, amount]) => (
            <div key={category} className="mb-4">
              <label className="block text-sm mb-1 capitalize">{category}</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setExpenses({ ...expenses, [category]: Number(e.target.value) })}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-4">Monthly Summary</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Total Income</p>
              <p className="text-2xl font-bold text-green-600">
                ${results.totalIncome.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">
                ${results.totalExpenses.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Net Cash Flow</p>
              <p className={`text-2xl font-bold ${results.netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${results.netFlow.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Savings Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                {results.savingsRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[results]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Income" stroke="#10B981" />
              <Line type="monotone" dataKey="Expenses" stroke="#EF4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
