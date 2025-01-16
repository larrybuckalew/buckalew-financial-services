import { NextApiRequest, NextApiResponse } from 'next';
import fraudDetectionService from '@/services/security/fraudDetectionService';
import { authMiddleware } from '@/middleware/authMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await authMiddleware(req, res, async () => {
    const { method } = req;
    const userId = req.user.id; // From auth middleware

    switch (method) {
      case 'POST':
        try {
          const transaction = req.body;
          const riskAssessment = await fraudDetectionService.assessTransactionRisk(transaction);
          
          return res.status(200).json(riskAssessment);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }

      case 'GET':
        try {
          const fraudAlerts = await fraudDetectionService.getRecentFraudAlerts(userId);
          return res.status(200).json(fraudAlerts);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }

      case 'PUT':
        try {
          // Manually trigger model training
          await fraudDetectionService.trainFraudModel();
          return res.status(200).json({ message: 'Model training initiated' });
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }

      default:
        res.setHeader('Allow', ['POST', 'GET', 'PUT']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  });
}
