import { calculateCompoundInterest, calculateMortgage, calculateRetirement } from '@/lib/financialCalculations'

describe('Financial Calculations', () => {
  describe('calculateCompoundInterest', () => {
    it('calculates compound interest correctly', () => {
      const result = calculateCompoundInterest({
        principal: 10000,
        rate: 0.05,
        time: 5,
        compoundingFrequency: 12
      })
      expect(result).toBeCloseTo(12833.59, 2)
    })
  })

  describe('calculateMortgage', () => {
    it('calculates monthly mortgage payments correctly', () => {
      const result = calculateMortgage({
        principal: 300000,
        annualRate: 0.035,
        years: 30
      })
      expect(result.monthlyPayment).toBeCloseTo(1347.13, 2)
    })
  })

  describe('calculateRetirement', () => {
    it('projects retirement savings correctly', () => {
      const result = calculateRetirement({
        currentAge: 30,
        retirementAge: 65,
        currentSavings: 50000,
        monthlyContribution: 1000,
        expectedReturn: 0.07
      })
      expect(result.projectedSavings).toBeGreaterThan(50000)
      expect(result.monthlyRetirementIncome).toBeDefined()
    })
  })
})