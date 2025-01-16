import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { Tokens } from 'csrf';
import Redis from 'ioredis';

const tokens = new Tokens();
const redis = new Redis(process.env.REDIS_URL!);

export async function csrfProtection(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) {
  // Skip CSRF check for non-mutating methods
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method!)) {
    return next();
  }

  const token = req.headers['x-csrf-token'] as string;
  const sessionToken = await redis.get(`csrf:${req.cookies.sessionId}`);

  if (!token || !sessionToken) {
    return res.status(403).json({ error: 'CSRF token required' });
  }

  try {
    if (tokens.verify(sessionToken, token)) {
      next();
    } else {
      res.status(403).json({ error: 'Invalid CSRF token' });
    }
  } catch (error) {
    console.error('CSRF validation error:', error);
    res.status(403).json({ error: 'CSRF validation failed' });
  }
}

export async function generateCsrfToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const secret = tokens.secretSync();
  const token = tokens.create(secret);

  await redis.set(`csrf:${req.cookies.sessionId}`, secret, 'EX', 3600); // 1 hour

  return token;
}