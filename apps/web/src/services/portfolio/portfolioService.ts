import { v4 as uuidv4 } from 'uuid';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  type: 'STOCK' | 'BOND' | 'CRYPTO' | 'FUND';
}

export interface Portfolio {
  id: string;
  name: string;
  assets: Asset[];
  totalValue: number;
  performance: {
    totalGain: number;
    totalGainPercent: number;
  };
}

class PortfolioService {
  // Create a new portfolio
  createPortfolio(name: string, initialAssets: Asset[] = []): Portfolio {
    return {
      id: uuidv4(),
      name,
      assets: initialAssets,
      totalValue: this.calculateTotalValue(initialAssets),
      performance: this.calculatePerformance(initialAssets)
    };
  }

  // Add an asset to a portfolio
  addAsset(portfolio: Portfolio, asset: Asset): Portfolio {
    const updatedAssets = [...portfolio.assets, asset];
    return {
      ...portfolio,
      assets: updatedAssets,
      totalValue: this.calculateTotalValue(updatedAssets),
      performance: this.calculatePerformance(updatedAssets)
    };
  }

  // Remove an asset from a portfolio
  removeAsset(portfolio: Portfolio, assetId: string): Portfolio {
    const updatedAssets = portfolio.assets.filter(asset => asset.id !== assetId);
    return {
      ...portfolio,
      assets: updatedAssets,
      totalValue: this.calculateTotalValue(updatedAssets),
      performance: this.calculatePerformance(updatedAssets)
    };
  }

  // Calculate total portfolio value
  private calculateTotalValue(assets: Asset[]): number {
    return assets.reduce((total, asset) => 
      total + (asset.quantity * asset.currentPrice), 0
    );
  }

  // Calculate portfolio performance
  private calculatePerformance(assets: Asset[]): Portfolio['performance'] {
    const totalInvested = assets.reduce((total, asset) => 
      total + (asset.quantity * asset.purchasePrice), 0
    );
    
    const totalCurrentValue = this.calculateTotalValue(assets);
    
    const totalGain = totalCurrentValue - totalInvested;
    const totalGainPercent = (totalGain / totalInvested) * 100;

    return {
      totalGain,
      totalGainPercent
    };
  }

  // Analyze portfolio diversification
  analyzeDiversification(portfolio: Portfolio): { [key: string]: number } {
    const typeAllocation: { [key: string]: number } = {};
    
    portfolio.assets.forEach(asset => {
      typeAllocation[asset.type] = 
        (typeAllocation[asset.type] || 0) + (asset.quantity * asset.currentPrice);
    });

    // Convert to percentage
    const totalValue = portfolio.totalValue;
    Object.keys(typeAllocation).forEach(type => {
      typeAllocation[type] = (typeAllocation[type] / totalValue) * 100;
    });

    return typeAllocation;
  }

  // Recommend rebalancing
  recommendRebalancing(portfolio: Portfolio, targetAllocation: { [key: string]: number }): string[] {
    const currentAllocation = this.analyzeDiversification(portfolio);
    const recommendations: string[] = [];

    Object.keys(targetAllocation).forEach(type => {
      const currentWeight = currentAllocation[type] || 0;
      const targetWeight = targetAllocation[type];
      const difference = Math.abs(currentWeight - targetWeight);

      if (difference > 5) {  // 5% threshold for rebalancing
        recommendations.push(
          `Consider ${currentWeight > targetWeight ? 'selling' : 'buying'} 
          ${type} assets to align with target allocation`
        );
      }
    });

    return recommendations;
  }
}

export default new PortfolioService();
