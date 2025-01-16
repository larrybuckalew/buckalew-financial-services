import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { authenticator } from 'otplib';

const prisma = new PrismaClient();

export interface AuthenticatedRequest extends NextApiRequest {
  user?: any;
}

export async function authMiddleware(
  req: AuthenticatedRequest,
  res: NextApiResponse,
  next: NextHandler
) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        mfaEnabled: true,
        isActive: true
      }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'User not found or inactive' });
    }

    // Check MFA if enabled
    if (user.mfaEnabled) {
      const mfaToken = req.headers['x-mfa-token'];
      if (!mfaToken) {
        return res.status(401).json({ error: 'MFA token required' });
      }

      const mfaUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { mfaSecret: true }
      });

      if (!mfaUser?.mfaSecret || !authenticator.verify({
        token: mfaToken as string,
        secret: mfaUser.mfaSecret
      })) {
        return res.status(401).json({ error: 'Invalid MFA token' });
      }
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
}