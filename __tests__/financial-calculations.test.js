import { calculateRetirementNeeds, calculateLoanPayments, calculateInvestmentReturns } from '../src/utils/financial-calculations';

describe('Retirement Calculations', () => {
  test('calculates retirement needs correctly', () => {
    const input = {
      currentAge: 30,
      retirementAge: 65,
      currentIncome: 75000,
      expectedReturnRate: 0.07,
      inflationRate: 0.03,
      desiredRetirementIncome: 60000
    };
    
    const result = calculateRetirementNeeds(input);
    expect(result.totalNeeded).toBeGreaterThan(0);
    expect(result.monthlySavingsNeeded).toBeGreaterThan(0);
  });

  test('handles edge cases in retirement calculations', () => {
    const input = {
      currentAge: 64,
      retirementAge: 65,
      currentIncome: 75000,
      expectedReturnRate: 0.07,
      inflationRate: 0.03,
      desiredRetirementIncome: 60000
    };
    
    const result = calculateRetirementNeeds(input);
    expect(result.totalNeeded).toBeGreaterThan(0);
  });
});

describe('Loan Payment Calculations', () => {
  test('calculates monthly mortgage payments correctly', () => {
    const result = calculateLoanPayments({
      principal: 300000,
      annualInterestRate: 0.045,
      termYears: 30
    });
    
    expect(result.monthlyPayment).toBeCloseTo(1520.06, 2);
    expect(result.totalInterest).toBeGreaterThan(0);
  });

  test('calculates amortization schedule correctly', () => {
    const result = calculateLoanPayments({
      principal: 300000,
      annualInterestRate: 0.045,
      termYears: 30,
      includeAmortization: true
    });
    
    expect(result.amortizationSchedule).toBeDefined();
    expect(result.amortizationSchedule.length).toBe(360); // 30 years * 12 months
  });
});

describe('Investment Return Calculations', () => {
  test('calculates compound interest correctly', () => {
    const result = calculateInvestmentReturns({
      principal: 10000,
      monthlyContribution: 500,
      annualReturnRate: 0.07,
      years: 30
    });
    
    expect(result.finalBalance).toBeGreaterThan(0);
    expect(result.totalContributions).toBe(10000 + (500 * 12 * 30));
  });

  test('handles different compounding frequencies', () => {
    const monthly = calculateInvestmentReturns({
      principal: 10000,
      monthlyContribution: 500,
      annualReturnRate: 0.07,
      years: 30,
      compoundingFrequency: 'monthly'
    });

    const quarterly = calculateInvestmentReturns({
      principal: 10000,
      monthlyContribution: 500,
      annualReturnRate: 0.07,
      years: 30,
      compoundingFrequency: 'quarterly'
    });

    expect(monthly.finalBalance).toBeGreaterThan(quarterly.finalBalance);
  });
});