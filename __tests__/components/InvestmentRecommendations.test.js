import { render, screen } from '@testing-library/react';
import InvestmentRecommendations from '@/components/planning/InvestmentRecommendations';

describe('InvestmentRecommendations Component', () => {
  const mockRecommendations = [
    {
      title: 'Increase Bond Allocation',
      description: 'Consider increasing bond allocation for stability',
      riskLevel: 2,
      timeline: '6-12 months',
      tags: ['bonds', 'defensive']
    }
  ];

  it('renders recommendations correctly', () => {
    render(<InvestmentRecommendations recommendations={mockRecommendations} />);
    
    expect(screen.getByText('Investment Recommendations')).toBeInTheDocument();
    expect(screen.getByText('Increase Bond Allocation')).toBeInTheDocument();
  });

  it('displays risk level indicators', () => {
    render(<InvestmentRecommendations recommendations={mockRecommendations} />);
    
    const riskDots = screen.getAllByTestId('risk-dot');
    expect(riskDots).toHaveLength(5);
    
    // Check active risk dots
    const activeDots = riskDots.filter(dot => dot.classList.contains('bg-blue-500'));
    expect(activeDots).toHaveLength(mockRecommendations[0].riskLevel);
  });

  it('displays tags correctly', () => {
    render(<InvestmentRecommendations recommendations={mockRecommendations} />);
    
    mockRecommendations[0].tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });
});
