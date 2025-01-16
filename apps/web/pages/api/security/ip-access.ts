import { NextApiRequest, NextApiResponse } from 'next';
import ipAccessControlService from '@/services/security/ipAccessControlService';
import { authMiddleware } from '@/middleware/authMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await authMiddleware(req, res, async () => {
    const { method } = req;
    const userId = req.user.id; // From auth middleware

    switch (method) {
      case 'POST':
        try {
          const { 
            allowedCountries, 
            blockedCountries, 
            allowedIPs, 
            blockedIPs 
          } = req.body;

          await ipAccessControlService.createAccessRule({
            userId,
            allowedCountries,
            blockedCountries,
            allowedIPs,
            blockedIPs
          });

          return res.status(200).json({ message: 'Access rule created successfully' });
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }

      case 'GET':
        try {
          const logs = await ipAccessControlService.getRecentAccessLogs(userId);
          return res.status(200).json(logs);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }

      default:
        res.setHeader('Allow', ['POST', 'GET']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  });
}
