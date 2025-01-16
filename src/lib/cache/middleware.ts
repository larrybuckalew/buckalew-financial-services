import { NextApiRequest, NextApiResponse } from 'next';
import { getCache, setCache } from './redis';

export const withCache = (ttl?: number) => {
  return (handler: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
      return handler(req, res);
    }

    const cacheKey = `api:${req.url}`;
    const cachedData = await getCache(cacheKey);

    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    const originalJson = res.json;
    res.json = async (data: any) => {
      await setCache(cacheKey, data, ttl);
      return originalJson.call(res, data);
    };

    return handler(req, res);
  };
};