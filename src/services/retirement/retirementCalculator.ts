export interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  currentAnnualIncome: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedAnnualReturn: number;
  expectedInflationRate: number;
}

export interface RetirementProjection {
  totalRetirementSavings: number;
  annualRetirementIncome: number;
  replacementRatio: number;
  yearsToRetirement: number;
  monthlyIncomeNeeded: number;
  retirementFundingGap?: number;
}

class RetirementCalculator {
  // Calculate retirement savings projection
  calculateRetirementProjection(inputs: RetirementInputs): RetirementProjection {
    const {
      currentAge,
      retirementAge,
      currentAnnualIncome,
      currentSavings,
      monthlyContribution,
      expectedAnnualReturn,
      expectedInflationRate
    } = inputs;

    const yearsToRetirement = retirementAge - currentAge;
    const monthlyContributionAnnual = monthlyContribution * 12;

    // Calculate future value of current savings and monthly contributions
    const totalRetirementSavings = this.calculateCompoundGrowth(
      currentSavings, 
      monthlyContributionAnnual, 
      expectedAnnualReturn, 
      yearsToRetirement
    );

    // Estimate annual income needed in retirement
    const currentAnnualIncomeAdjusted = this.adjustForInflation(
      currentAnnualIncome, 
      expectedInflationRate, 
      yearsToRetirement
    );

    // Typical retirement income replacement ratio (65-80%)
    const replacementRatio = 0.75;
    const annualRetirementIncome = currentAnnualIncomeAdjusted * replacementRatio;
    const monthlyIncomeNeeded = annualRetirementIncome / 12;

    // Calculate potential funding gap
    const retirementFundingGap = this.calculateRetirementFundingGap(
      totalRetirementSavings,
      annualRetirementIncome,
      retirementAge
    );

    return {
      totalRetirementSavings: Math.round(totalRetirementSavings),
      annualRetirementIncome: Math.round(annualRetirementIncome),
      replacementRatio,
      yearsToRetirement,
      monthlyIncomeNeeded: Math.round(monthlyIncomeNeeded),
      retirementFundingGap
    };
  }

  // Calculate compound growth
  private calculateCompoundGrowth(
    principal: number, 
    annualContribution: number, 
    annualReturn: number, 
    years: number
  ): number {
    let total = principal;
    for (let year = 0; year < years; year++) {
      total = (total + annualContribution) * (1 + annualReturn);
    }
    return total;
  }

  // Adjust income for inflation
  private adjustForInflation(
    currentIncome: number, 
    inflationRate: number, 
    years: number
  ): number {
    return currentIncome * Math.pow(1 + inflationRate, years);
  }

  // Calculate retirement funding gap
  private calculateRetirementFundingGap(
    totalSavings: number, 
    annualRetirementIncome: number,
    retirementAge: number,
    expectedLifeExpectancy: number = 85
  ): number {
    const yearsInRetirement = expectedLifeExpectancy - retirementAge;
    const totalRetirementCost = annualRetirementIncome * yearsInRetirement;
    
    const fundingGap = totalRetirementCost - totalSavings;
    return Math.max(fundingGap, 0);
  }

  // Provide retirement strategy recommendations
  generateRetirementStrategyRecommendations(projection: RetirementProjection): string[] {
    const recommendations: string[] = [];

    // Savings rate recommendations
    if (projection.retirementFundingGap && projection.retirementFundingGap > 0) {
      recommendations.push(
        `Consider increasing monthly contributions by at least $${
          Math.round(projection.retirementFundingGap / (projection.yearsToRetirement * 12))
        } to close the funding gap.`
      );
    }

    // Age-based recommendations
    if (projection.yearsToRetirement > 20) {
      recommendations.push(
        "You have time to grow your investments. Consider a growth-oriented portfolio with higher equity allocation."
      );
    } else if (projection.yearsToRetirement > 10) {
      recommendations.push(
        "Begin gradually shifting to a more balanced portfolio to protect your accumulated savings."
      );
    } else {
      recommendations.push(
        "Focus on capital preservation and consider more conservative investment options."
      );
    }

    // Replacement ratio insights
    if (projection.replacementRatio < 0.6) {
      recommendations.push(
        "Your projected retirement income may not maintain your current lifestyle. Explore additional savings or income strategies."
      );
    }

    return recommendations;
  }

  // Simulate different scenarios
  simulateRetirementScenarios(baseInputs: RetirementInputs): {
    conservative: RetirementProjection,
    moderate: RetirementProjection,
    aggressive: RetirementProjection
  } {
    return {
      conservative: this.calculateRetirementProjection({
        ...baseInputs,
        expectedAnnualReturn: baseInputs.expectedAnnualReturn * 0.8,
        monthlyContribution: baseInputs.monthlyContribution * 1.2
      }),
      moderate: this.calculateRetirementProjection(baseInputs),
      aggressive: this.calculateRetirementProjection({
        ...baseInputs,
        expectedAnnualReturn: baseInputs.expectedAnnualReturn * 1.2,
        monthlyContribution: baseInputs.monthlyContribution * 1.5
      })
    };
  }
}

export default new RetirementCalculator();
