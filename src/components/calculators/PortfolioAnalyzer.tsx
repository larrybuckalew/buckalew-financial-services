import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { optimizePortfolio } from '@/lib/finance/portfolioOptimization';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function PortfolioAnalyzer() {
  const [assets, setAssets] = useState([
    {
      name: '',
      expectedReturn: 0,
      standardDeviation: 0,
      correlations: {}
    }
  ]);

  const [params, setParams] = useState({
    riskTolerance: 5,
    investmentHorizon: 10
  });

  const [results, setResults] = useState(null);

  const handleAddAsset = () => {
    setAssets([...assets, {
      name: '',
      expectedReturn: 0,
      standardDeviation: 0,
      correlations: {}
    }]);
  };

  const handleAssetChange = (index, field, value) => {
    const newAssets = [...assets];
    newAssets[index][field] = value;
    setAssets(newAssets);
  };

  const handleOptimize = () => {
    const optimizationResults = optimizePortfolio({
      assets,
      ...params
    });
    setResults(optimizationResults);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Optimization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assets.map((asset, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Asset Name"
                  value={asset.name}
                  onChange={(e) => handleAssetChange(index, 'name', e.target.value)}
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Expected Return"
                  value={asset.expectedReturn}
                  onChange={(e) => handleAssetChange(index, 'expectedReturn', parseFloat(e.target.value))}
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Standard Deviation"
                  value={asset.standardDeviation}
                  onChange={(e) => handleAssetChange(index, 'standardDeviation', parseFloat(e.target.value))}
                />
              </div>
            ))}

            <Button onClick={handleAddAsset}>Add Asset</Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Risk Tolerance (1-10)</label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={params.riskTolerance}
                  onChange={(e) => setParams({ ...params, riskTolerance: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Investment Horizon (years)</label>
                <Input
                  type="number"
                  value={params.investmentHorizon}
                  onChange={(e) => setParams({ ...params, investmentHorizon: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <Button onClick={handleOptimize}>Optimize Portfolio</Button>

            {results && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold">Expected Return</h3>
                      <p className="text-2xl font-bold">
                        {(results.metrics.expectedReturn * 100).toFixed(2)}%
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold">Risk</h3>
                      <p className="text-2xl font-bold">
                        {(results.metrics.risk * 100).toFixed(2)}%
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold">Sharpe Ratio</h3>
                      <p className="text-2xl font-bold">
                        {results.metrics.sharpeRatio.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={Object.entries(results.allocation).map(([name, weight]) => ({
                          name,
                          value: weight
                        }))}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                      >
                        {Object.entries(results.allocation).map((entry, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}