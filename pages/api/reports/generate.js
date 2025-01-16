import { authenticate } from '@/lib/auth';
import { generatePDF } from '@/lib/pdf-generator';
import { getPortfolioData } from '@/lib/portfolio';

export default authenticate(async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { reportType, dateRange } = req.body;
    const userId = req.user.id;

    // Get portfolio data
    const portfolioData = await getPortfolioData(userId, dateRange);

    // Generate PDF report
    const pdfBuffer = await generatePDF({
      type: reportType,
      data: portfolioData,
      user: req.user
    });

    // Save report metadata
    await prisma.report.create({
      data: {
        type: reportType,
        userId,
        generatedAt: new Date()
      }
    });

    // Send PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${reportType}-${new Date().toISOString()}.pdf"`);
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json({ error: 'Report generation failed' });
  }
});
