import { Redis as RedisClient, RedisKey } from 'ioredis'

import { ICacheProvider } from '@shared/providers/CacheProvider/models/ICacheProvider'
import cacheConfig from '@config/cache'


export class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient

  constructor() {
    this.client = new RedisClient(cacheConfig.config.redis)
  }

  async save<T>(key: string, value: T): Promise<void> {
    await this.client.set(key, JSON.stringify(value))
  }

  async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key)

    if(!data) return null

    const parsedData = JSON.parse(data) as T

    return parsedData
  }

  async invalidate(key: string): Promise<void> {
    await this.client.del(key)
  }

  async invalidateByPrefix(keyPrefix: string): Promise<void> {
    const keys: RedisKey[] = await this.client.keys(`${keyPrefix}:*`)

    const pipeline = this.client.pipeline()

    pipeline.del(...keys)

    await pipeline.exec()
  }
}
