import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const profile = await prisma.user.findUnique({
          where: { id: session.user.id },
        });
        res.status(200).json(profile);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
      }
      break;

    case 'PUT':
      try {
        const { name, email } = req.body;
        const updatedProfile = await prisma.user.update({
          where: { id: session.user.id },
          data: { name, email },
        });
        res.status(200).json(updatedProfile);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}