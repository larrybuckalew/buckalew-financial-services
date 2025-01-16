import { NextApiRequest, NextApiResponse } from 'next';
import twoFactorAuthService from '@/services/security/twoFactorAuthService';
import { authMiddleware } from '@/middleware/authMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await authMiddleware(req, res, async () => {
    const { method } = req;
    const userId = req.user.id; // From auth middleware

    switch (method) {
      case 'POST':
        try {
          const { action, token } = req.body;

          switch (action) {
            case 'generate':
              const secretSetup = await twoFactorAuthService.generateTwoFactorSecret(userId);
              return res.status(200).json(secretSetup);

            case 'enable':
              const enabled = await twoFactorAuthService.enableTwoFactor(userId, token);
              return res.status(200).json({ enabled });

            case 'disable':
              await twoFactorAuthService.disableTwoFactor(userId);
              return res.status(200).json({ disabled: true });

            default:
              return res.status(400).json({ error: 'Invalid action' });
          }
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }

      default:
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  });
}
