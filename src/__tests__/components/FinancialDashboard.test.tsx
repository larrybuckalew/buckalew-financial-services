import { render, screen } from '@testing-library/react'
import FinancialDashboard from '@/components/FinancialDashboard'

describe('FinancialDashboard', () => {
  it('renders dashboard components', () => {
    render(<FinancialDashboard />)
    
    expect(screen.getByRole('heading', { name: /financial dashboard/i })).toBeInTheDocument()
    expect(screen.getByTestId('portfolio-summary')).toBeInTheDocument()
    expect(screen.getByTestId('investment-tracker')).toBeInTheDocument()
  })

  it('displays user portfolio data correctly', () => {
    const mockPortfolioData = {
      totalValue: 100000,
      returns: 15.5,
      allocation: {
        stocks: 60,
        bonds: 30,
        cash: 10
      }
    }

    render(<FinancialDashboard portfolioData={mockPortfolioData} />)
    
    expect(screen.getByText(/\$100,000/)).toBeInTheDocument()
    expect(screen.getByText(/15.5%/)).toBeInTheDocument()
  })
})