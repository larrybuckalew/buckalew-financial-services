interface RetirementPlanningParams {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturn: number;
  expectedInflation: number;
  socialSecurityBenefit: number;
  desiredRetirementIncome: number;
}

export const calculateRetirementNeeds = (params: RetirementPlanningParams) => {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentSavings,
    monthlyContribution,
    expectedReturn,
    expectedInflation,
    socialSecurityBenefit,
    desiredRetirementIncome
  } = params;

  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;
  
  // Calculate real rate of return (accounting for inflation)
  const realReturn = (1 + expectedReturn) / (1 + expectedInflation) - 1;
  
  // Calculate future value of current savings
  const futureSavings = currentSavings * Math.pow(1 + realReturn, yearsToRetirement);
  
  // Calculate future value of monthly contributions
  const futureContributions = monthlyContribution * 12 * 
    ((Math.pow(1 + realReturn, yearsToRetirement) - 1) / realReturn);
  
  // Calculate total retirement savings needed
  const totalSavingsNeeded = desiredRetirementIncome * 12 * 
    ((1 - Math.pow(1 + realReturn, -yearsInRetirement)) / realReturn);
  
  // Adjust for social security
  const socialSecurityValue = socialSecurityBenefit * 12 * 
    ((1 - Math.pow(1 + realReturn, -yearsInRetirement)) / realReturn);
  
  const netSavingsNeeded = totalSavingsNeeded - socialSecurityValue;
  const projectedSavings = futureSavings + futureContributions;
  
  return {
    projectedSavings,
    totalSavingsNeeded: netSavingsNeeded,
    monthlyContributionNeeded: calculateRequiredContribution({
      target: netSavingsNeeded,
      current: currentSavings,
      years: yearsToRetirement,
      rate: realReturn
    }),
    savingsGap: netSavingsNeeded - projectedSavings,
    fundingRatio: (projectedSavings / netSavingsNeeded) * 100
  };
};

interface ContributionParams {
  target: number;
  current: number;
  years: number;
  rate: number;
}

const calculateRequiredContribution = (params: ContributionParams) => {
  const { target, current, years, rate } = params;
  
  const futureValueNeeded = target - (current * Math.pow(1 + rate, years));
  const annualContribution = futureValueNeeded / 
    ((Math.pow(1 + rate, years) - 1) / rate);
  
  return annualContribution / 12;
};