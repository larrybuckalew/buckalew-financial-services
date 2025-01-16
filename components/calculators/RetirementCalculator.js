import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Slider } from '@/components/ui/slider';

export default function RetirementCalculator() {
  const [inputs, setInputs] = useState({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 50000,
    monthlyContribution: 1000,
    expectedReturn: 7,
    inflationRate: 2,
    salary: 75000,
    salaryIncrease: 3,
    desiredIncome: 60000
  });

  const [results, setResults] = useState(null);

  useEffect(() => {
    calculateRetirement();
  }, [inputs]);

  const calculateRetirement = () => {
    const years = inputs.retirementAge - inputs.currentAge;
    const monthlyRate = inputs.expectedReturn / 100 / 12;
    const inflationFactor = Math.pow(1 + inputs.inflationRate / 100, years);
    
    let projections = [];
    let currentValue = inputs.currentSavings;
    let currentSalary = inputs.salary;

    for (let year = 0; year <= years; year++) {
      let yearlyContribution = inputs.monthlyContribution * 12;
      let yearlyReturn = currentValue * (inputs.expectedReturn / 100);
      
      currentValue = currentValue * (1 + inputs.expectedReturn / 100) + yearlyContribution;
      currentSalary = currentSalary * (1 + inputs.salaryIncrease / 100);

      projections.push({
        age: inputs.currentAge + year,
        portfolioValue: Math.round(currentValue),
        contributions: Math.round(yearlyContribution),
        returns: Math.round(yearlyReturn),
        salary: Math.round(currentSalary)
      });
    }

    const monthlyIncome = (currentValue * 0.04) / 12;
    const incomeRatio = monthlyIncome / (inputs.desiredIncome / 12) * 100;

    setResults({
      projections,
      finalAmount: currentValue,
      monthlyIncome,
      incomeRatio,
      needsGap: Math.max(0, inputs.desiredIncome - (monthlyIncome * 12))
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Retirement Calculator</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Current Age: {inputs.currentAge}</label>
            <Slider
              min={18}
              max={80}
              step={1}
              value={inputs.currentAge}
              onChange={(value) => setInputs({ ...inputs, currentAge: value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Retirement Age: {inputs.retirementAge}</label>
            <Slider
              min={inputs.currentAge + 1}
              max={90}
              step={1}
              value={inputs.retirementAge}
              onChange={(value) => setInputs({ ...inputs, retirementAge: value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Current Savings: ${inputs.currentSavings.toLocaleString()}
            </label>
            <Slider
              min={0}
              max={1000000}
              step={1000}
              value={inputs.currentSavings}
              onChange={(value) => setInputs({ ...inputs, currentSavings: value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Monthly Contribution: ${inputs.monthlyContribution.toLocaleString()}
            </label>
            <Slider
              min={0}
              max={5000}
              step={100}
              value={inputs.monthlyContribution}
              onChange={(value) => setInputs({ ...inputs, monthlyContribution: value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Expected Return: {inputs.expectedReturn}%
            </label>
            <Slider
              min={1}
              max={12}
              step={0.5}
              value={inputs.expectedReturn}
              onChange={(value) => setInputs({ ...inputs, expectedReturn: value })}
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {results && (
            <>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.projections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="portfolioValue"
                      stroke="#2563eb"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-900">At Retirement</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    ${Math.round(results.finalAmount).toLocaleString()}
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-green-900">Monthly Income</h3>
                  <p className="text-2xl font-bold text-green-600">
                    ${Math.round(results.monthlyIncome).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium">Income Replacement</h3>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        {Math.round(results.incomeRatio)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                    <div
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                      style={{ width: `${Math.min(100, results.incomeRatio)}%` }}
                    />
                  </div>
                </div>
              </div>

              {results.needsGap > 0 && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-yellow-900">Savings Gap</h3>
                  <p className="text-lg text-yellow-800">
                    You may need to save an additional ${Math.round(results.needsGap).toLocaleString()}
                    per year to reach your desired retirement income.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
