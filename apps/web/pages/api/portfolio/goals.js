import { authenticate } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default authenticate(async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const goals = await prisma.goal.findMany({
        where: {
          portfolio: {
            userId: req.user.id
          }
        },
        include: {
          portfolio: true
        }
      });

      res.status(200).json(goals);
    } catch (error) {
      console.error('Error fetching goals:', error);
      res.status(500).json({ error: 'Failed to fetch goals' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, target, targetDate, portfolioId } = req.body;

      const goal = await prisma.goal.create({
        data: {
          name,
          target,
          current: 0,
          targetDate: new Date(targetDate),
          portfolioId
        }
      });

      res.status(201).json(goal);
    } catch (error) {
      console.error('Error creating goal:', error);
      res.status(500).json({ error: 'Failed to create goal' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
});
