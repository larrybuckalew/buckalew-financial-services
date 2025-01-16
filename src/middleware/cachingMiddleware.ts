import { NextApiRequest, NextApiResponse } from 'next';
import cacheService from '@/services/cache/cacheService';

export interface CacheConfig {
  key: string;
  ttl?: number;
  tags?: string[];
}

export const cachingMiddleware = async (
  req: NextApiRequest, 
  res: NextApiResponse, 
  next: () => Promise<void>,
  config: CacheConfig
) => {
  const { key, ttl = 3600, tags = [] } = config;

  try {
    // Check cache first for GET requests
    if (req.method === 'GET') {
      const cachedData = await cacheService.get(key);
      if (cachedData) {
        res.status(200).json(cachedData);
        return;
      }
    }

    // If not in cache or not a GET request, proceed with original handler
    const originalJson = res.json;
    res.json = async (body) => {
      // Cache the response for successful GET requests
      if (req.method === 'GET') {
        await cacheService.set(key, body, { ttl });
        
        // Add tags for selective cache invalidation
        for (const tag of tags) {
          await cacheService.set(`tag:${tag}`, key, { ttl });
        }
      }
      
      return originalJson.call(res, body);
    };

    await next();
  } catch (error) {
    res.status(500).json({ error: 'Caching middleware error' });
  }
};

// Utility for selective cache invalidation
export const invalidateCacheTags = async (tags: string[]) => {
  for (const tag of tags) {
    const relatedKeys = await cacheService.get(`tag:${tag}`);
    if (relatedKeys) {
      await cacheService.delete(relatedKeys);
      await cacheService.delete(`tag:${tag}`);
    }
  }
};
