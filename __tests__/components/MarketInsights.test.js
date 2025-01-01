import { render, screen } from '@testing-library/react';
import MarketInsights from '@/components/dashboard/MarketInsights';

describe('MarketInsights Component', () => {
  const mockInsights = [
    {
      title: 'S&P 500',
      trend: 'up',
      percentage: 2.5,
      description: 'Market showing strong momentum',
      impact: 'Positive for growth portfolios'
    }
  ];

  it('renders market insights correctly', () => {
    render(<MarketInsights insights={mockInsights} />);
    
    expect(screen.getByText('Market Insights')).toBeInTheDocument();
    expect(screen.getByText('S&P 500')).toBeInTheDocument();
    expect(screen.getByText('2.5%')).toBeInTheDocument();
  });

  it('displays correct trend icons', () => {
    render(<MarketInsights insights={mockInsights} />);
    
    const trendIcon = screen.getByTestId('trend-icon');
    expect(trendIcon).toHaveClass(mockInsights[0].trend === 'up' ? 'text-green-500' : 'text-red-500');
  });
});
