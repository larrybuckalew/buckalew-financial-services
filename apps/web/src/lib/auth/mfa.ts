import { authenticator } from 'otplib';
import { prisma } from '@/lib/db';

export async function setupMFA(userId: string) {
  const secret = authenticator.generateSecret();
  
  await prisma.user.update({
    where: { id: userId },
    data: {
      mfaSecret: secret,
      mfaEnabled: false, // Will be enabled after verification
    },
  });

  return secret;
}

export async function verifyMFA(userId: string, token: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { mfaSecret: true },
  });

  if (!user?.mfaSecret) {
    throw new Error('MFA not set up');
  }

  const isValid = authenticator.verify({
    token,
    secret: user.mfaSecret,
  });

  if (isValid) {
    await prisma.user.update({
      where: { id: userId },
      data: { mfaEnabled: true },
    });
  }

  return isValid;
}

export async function disableMFA(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      mfaSecret: null,
      mfaEnabled: false,
    },
  });
}