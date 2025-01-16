import { authenticate } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

export default authenticate(async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { date, time, type } = req.body;
    const userId = req.user.id;

    const meeting = await prisma.meeting.create({
      data: {
        date,
        time,
        type,
        userId,
        status: 'scheduled'
      }
    });

    await sendEmail({
      to: req.user.email,
      subject: 'Meeting Confirmation',
      template: 'meeting-confirmation',
      data: { meeting }
    });

    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ error: 'Scheduling failed' });
  }
});