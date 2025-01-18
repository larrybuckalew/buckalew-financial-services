'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface InsuranceRecommendation {
  annualIncome: number;
  debts: number;
  futureExpenses: number;
  recommendedCoverage: number;
  coverageFactor: number;
}

export default function InsuranceCalculator() {
  const [annualIncome, setAnnualIncome] = useState<number>(0);
  const [debts, setDebts] = useState<number>(0);
  const [futureExpenses, setFutureExpenses] = useState<number>(0);
  const [recommendation, setRecommendation] = useState<InsuranceRecommendation | null>(null);

  const calculateInsuranceNeeds = () => {
    // Basic insurance need calculation
    const coverageFactor = 10; // Typical multiple of annual income
    const baseRecommendation = annualIncome * coverageFactor;
    const recommendedCoverage = Math.max(
      baseRecommendation + debts + futureExpenses, 
      baseRecommendation
    );

    setRecommendation({
      annualIncome,
      debts,
      futureExpenses,
      recommendedCoverage,
      coverageFactor
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Life Insurance Needs Calculator</h2>
      <div className="space-y-4">
        <Input
          type="number"
          label="Annual Income ($)"
          value={annualIncome}
          onChange={(e) => setAnnualIncome(Number(e.target.value))}
        />
        <Input
          type="number"
          label="Total Debts ($)"
          value={debts}
          onChange={(e) => setDebts(Number(e.target.value))}
        />
        <Input
          type="number"
          label="Future Expenses ($)"
          placeholder="e.g., children's education"
          value={futureExpenses}
          onChange={(e) => setFutureExpenses(Number(e.target.value))}
        />
        <Button onClick={calculateInsuranceNeeds} className="w-full">
          Calculate Insurance Needs
        </Button>
      </div>

      {recommendation && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Insurance Recommendation</h3>
          <p>Recommended Coverage: ${recommendation.recommendedCoverage.toLocaleString()}</p>
          <p>Coverage Calculation: {recommendation.coverageFactor}x Annual Income</p>
          <div className="text-sm text-gray-600 mt-2">
            <strong>Note:</strong> This is a basic estimate. Consult a financial advisor for personalized advice.
          </div>
        </div>
      )}
    </div>
  );
}
