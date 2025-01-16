import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { withErrorHandling } from '@/lib/api/middleware';

export const GET = withErrorHandling(async (req) => {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const goals = await prisma.financialGoal.findMany({
    where: { userId: session.user.id },
    include: {
      milestones: true
    }
  });

  return NextResponse.json(goals);
});

export const POST = withErrorHandling(async (req) => {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name, targetAmount, targetDate, category, milestones } = body;

  const goal = await prisma.financialGoal.create({
    data: {
      name,
      targetAmount,
      targetDate: new Date(targetDate),
      category,
      userId: session.user.id,
      milestones: {
        create: milestones?.map(milestone => ({
          name: milestone.name,
          targetDate: new Date(milestone.targetDate),
          targetAmount: milestone.targetAmount
        })) || []
      }
    },
    include: {
      milestones: true
    }
  });

  return NextResponse.json(goal, { status: 201 });
});

export const PUT = withErrorHandling(async (req) => {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { id, name, targetAmount, targetDate, category, milestones } = body;

  const goal = await prisma.financialGoal.update({
    where: { id, userId: session.user.id },
    data: {
      name,
      targetAmount,
      targetDate: new Date(targetDate),
      category,
      milestones: {
        deleteMany: {},
        create: milestones?.map(milestone => ({
          name: milestone.name,
          targetDate: new Date(milestone.targetDate),
          targetAmount: milestone.targetAmount
        })) || []
      }
    },
    include: {
      milestones: true
    }
  });

  return NextResponse.json(goal);
});

export const DELETE = withErrorHandling(async (req) => {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await req.json();

  await prisma.financialGoal.delete({
    where: { id, userId: session.user.id }
  });

  return NextResponse.json({ success: true });
});