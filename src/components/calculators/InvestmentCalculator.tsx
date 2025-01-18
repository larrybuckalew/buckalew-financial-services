'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface InvestmentResult {
  initialInvestment: number;
  annualContribution: number;
  years: number;
  interestRate: number;
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
}

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<number>(0);
  const [annualContribution, setAnnualContribution] = useState<number>(0);
  const [years, setYears] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [result, setResult] = useState<InvestmentResult | null>(null);

  const calculateInvestment = () => {
    const principal = initialInvestment;
    const contribution = annualContribution;
    const rate = interestRate / 100;
    const periods = years;

    let finalBalance = principal;
    let totalContributions = principal;

    for (let year = 1; year <= periods; year++) {
      finalBalance = (finalBalance + contribution) * (1 + rate);
    }

    totalContributions += contribution * periods;
    const totalInterest = finalBalance - totalContributions;

    setResult({
      initialInvestment: principal,
      annualContribution: contribution,
      years: periods,
      interestRate: rate * 100,
      finalBalance: Math.round(finalBalance),
      totalContributions: Math.round(totalContributions),
      totalInterest: Math.round(totalInterest)
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Investment Calculator</h2>
      <div className="space-y-4">
        <Input
          type="number"
          label="Initial Investment ($)"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(Number(e.target.value))}
        />
        <Input
          type="number"
          label="Annual Contribution ($)"
          value={annualContribution}
          onChange={(e) => setAnnualContribution(Number(e.target.value))}
        />
        <Input
          type="number"
          label="Investment Period (Years)"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
        />
        <Input
          type="number"
          label="Annual Interest Rate (%)"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
        />
        <Button onClick={calculateInvestment} className="w-full">
          Calculate
        </Button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Investment Projection</h3>
          <p>Final Balance: ${result.finalBalance.toLocaleString()}</p>
          <p>Total Contributions: ${result.totalContributions.toLocaleString()}</p>
          <p>Total Interest Earned: ${result.totalInterest.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
