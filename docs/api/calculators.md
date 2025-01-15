# Calculator APIs

## Mortgage Calculator

### `POST /api/calculators/mortgage`

Calculate monthly mortgage payments and amortization schedule.

#### Request Body
```typescript
{
  loanAmount: number;      // Total loan amount
  interestRate: number;    // Annual interest rate (percentage)
  loanTerm: number;        // Loan term in years
  downPayment?: number;    // Optional down payment amount
  propertyTax?: number;    // Optional annual property tax
  insurance?: number;      // Optional annual insurance cost
}
```

#### Response
```typescript
{
  success: true,
  data: {
    monthlyPayment: number;        // Total monthly payment
    principalAndInterest: number;  // Monthly P&I payment
    propertyTax?: number;          // Monthly property tax
    insurance?: number;            // Monthly insurance
    amortizationSchedule: Array<{  // Monthly payment breakdown
      month: number;
      payment: number;
      principal: number;
      interest: number;
      remainingBalance: number;
    }>;
  }
}
```

## Retirement Calculator

### `POST /api/calculators/retirement`

Calculate retirement savings projections.

#### Request Body
```typescript
{
  currentAge: number;          // Current age
  retirementAge: number;       // Planned retirement age
  lifeExpectancy: number;      // Expected life span
  currentSavings: number;      // Current retirement savings
  monthlyContribution: number; // Monthly contribution
  expectedReturn: number;      // Expected annual return (percentage)
  inflationRate?: number;      // Optional inflation rate (percentage)
}
```

#### Response
```typescript
{
  success: true,
  data: {
    totalSavings: number;      // Projected total savings
    monthlyIncome: number;     // Projected monthly retirement income
    savingsBreakdown: {
      contributions: number;    // Total contributions
      earnings: number;        // Total investment earnings
    };
    yearByYearProjection: Array<{
      age: number;
      balance: number;
      contributions: number;
      earnings: number;
    }>;
  }
}
```

## Error Responses

All calculator endpoints return standardized error responses:

```typescript
{
  success: false,
  error: {
    code: string;      // Error code
    message: string;   // Human-readable error message
    details?: {        // Optional error details
      field?: string;  // Field that caused the error
      value?: any;     // Invalid value
      limit?: any;     // Validation limit
    };
  }
}
```