import { authenticate } from '@/lib/auth';

export default authenticate(async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { assets, liabilities } = req.body;

    // Calculate estate values
    const totalAssets = Object.values(assets).reduce((a, b) => a + b, 0);
    const totalLiabilities = Object.values(liabilities).reduce((a, b) => a + b, 0);
    const netEstate = totalAssets - totalLiabilities;

    // Estate tax calculation (2024 rates)
    const exemptionAmount = 13610000;
    const taxableEstate = Math.max(netEstate - exemptionAmount, 0);
    const estateTax = taxableEstate * 0.40;

    // Save calculation to database
    await prisma.estateCalculation.create({
      data: {
        userId: req.user.id,
        totalAssets,
        totalLiabilities,
        netEstate,
        taxableEstate,
        estateTax
      }
    });

    res.status(200).json({
      totalAssets,
      totalLiabilities,
      netEstate,
      taxableEstate,
      estateTax,
      recommendations: generateRecommendations(netEstate, estateTax)
    });
  } catch (error) {
    console.error('Estate calculation error:', error);
    res.status(500).json({ error: 'Failed to calculate estate values' });
  }
});

function generateRecommendations(netEstate, estateTax) {
  const recommendations = [];

  if (estateTax > 0) {
    recommendations.push({
      type: 'tax_planning',
      message: 'Consider establishing an irrevocable life insurance trust (ILIT) to reduce estate tax liability.'
    });
  }

  if (netEstate > 1000000) {
    recommendations.push({
      type: 'trust_planning',
      message: 'Consider setting up a revocable living trust to avoid probate.'
    });
  }

  return recommendations;
}
