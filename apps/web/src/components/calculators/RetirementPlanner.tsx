import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { calculateRetirementNeeds } from '@/lib/finance/retirementPlanning';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function RetirementPlanner() {
  const [formData, setFormData] = useState({
    currentAge: 30,
    retirementAge: 65,
    lifeExpectancy: 90,
    currentSavings: 50000,
    monthlyContribution: 1000,
    expectedReturn: 0.07,
    expectedInflation: 0.02,
    socialSecurityBenefit: 2000,
    desiredRetirementIncome: 5000
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleCalculate = () => {
    const calculationResults = calculateRetirementNeeds(formData);
    setResults(calculationResults);
  };

  const generateProjectionData = () => {
    if (!results) return [];

    const data = [];
    let currentSavings = formData.currentSavings;

    for (let year = 0; year <= formData.retirementAge - formData.currentAge; year++) {
      const age = formData.currentAge + year;
      currentSavings = currentSavings * (1 + formData.expectedReturn) + 
        (formData.monthlyContribution * 12);

      data.push({
        age,
        projectedSavings: Math.round(currentSavings),
        targetSavings: Math.round(results.totalSavingsNeeded * 
          (year / (formData.retirementAge - formData.currentAge)))
      });
    }

    return data;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Retirement Planning Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Age</label>
              <Input
                type="number"
                name="currentAge"
                value={formData.currentAge}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            {/* Add similar input fields for other parameters */}
          </div>

          <Button
            onClick={handleCalculate}
            className="mt-6"
          >
            Calculate Retirement Needs
          </Button>

          {results && (
            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">Projected Savings</h3>
                    <p className="text-2xl font-bold">
                      ${Math.round(results.projectedSavings).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
                {/* Add similar cards for other results */}
              </div>

              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={generateProjectionData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="projectedSavings" 
                      stroke="#2563eb" 
                      name="Projected Savings"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="targetSavings" 
                      stroke="#dc2626" 
                      name="Target Savings"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}