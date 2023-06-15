import { Redis as RedisClient } from 'ioredis'
import { NextFunction, Request, Response } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'

import cacheConfig from '@config/cache'
import { AppError } from '@shared/errors'
import { StatusCode } from '@shared/commons'

const redisClient = new RedisClient({...cacheConfig.config.redis, enableOfflineQueue: false})

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 5,
  duration: 5
})

export async function rateLimiterRedis(request: Request, _: Response, next: NextFunction): Promise<void> {
  try {
    await rateLimiter.consume(request.ip)

    return next()
  } catch (error) {
    throw new AppError('Too Many Requests', StatusCode.TOO_MANY_REQUESTS)
  }
}
