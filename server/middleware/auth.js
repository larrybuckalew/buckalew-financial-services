import jwt from 'jsonwebtoken';
import logger from '../../lib/advanced-logger';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Authentication failed', { error: error.message });
    res.status(401).json({ error: 'Authentication failed' });
  }
};