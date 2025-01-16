import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

export default function EstateCalculator() {
  const [assets, setAssets] = useState({
    realEstate: 0,
    investments: 0,
    retirement: 0,
    insurance: 0,
    other: 0
  });

  const [liabilities, setLiabilities] = useState({
    mortgage: 0,
    loans: 0,
    other: 0
  });

  const calculateEstate = () => {
    const totalAssets = Object.values(assets).reduce((a, b) => a + b, 0);
    const totalLiabilities = Object.values(liabilities).reduce((a, b) => a + b, 0);
    const netEstate = totalAssets - totalLiabilities;

    // Estate tax calculation (2024 rates)
    const exemptionAmount = 13610000;
    const taxableEstate = Math.max(netEstate - exemptionAmount, 0);
    const estateTax = taxableEstate * 0.40;

    return {
      totalAssets,
      totalLiabilities,
      netEstate,
      taxableEstate,
      estateTax
    };
  };

  const results = calculateEstate();

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Estate Planning Calculator</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-4">Assets</h3>
          <div className="space-y-4">
            {Object.entries(assets).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setAssets({ ...assets, [key]: Number(e.target.value) })}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Liabilities</h3>
          <div className="space-y-4">
            {Object.entries(liabilities).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setLiabilities({ ...liabilities, [key]: Number(e.target.value) })}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-4">Estate Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Assets</p>
            <p className="text-xl font-bold">${results.totalAssets.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Liabilities</p>
            <p className="text-xl font-bold">${results.totalLiabilities.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Net Estate</p>
            <p className="text-xl font-bold">${results.netEstate.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Estimated Estate Tax</p>
            <p className="text-xl font-bold">${results.estateTax.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
