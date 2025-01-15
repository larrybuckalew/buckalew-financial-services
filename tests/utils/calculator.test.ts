
import { calculateRetirementSavings } from '../../app/calculators/utils';

describe('Calculator Utils', () => {
  test('calculateRetirementSavings', () => {
    const inputs = {
      retirementAge: 65,
      currentAge: 35,
      currentSavings: 100000,
      monthlySavings: 500,
      desiredRetirementIncome: 60000
    };

    const result = calculateRetirementSavings(inputs);
    expect(result).toBeGreaterThan(0);
    expect(typeof result).toBe('number');
  });

  // Add more calculator logic tests here
});
