import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisCache {
  private redisClient: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redisClient = redisService.getClient();
  }

  async setCacheObject<T>(
    key: string,
    value: T,
    timeout?: number,
  ): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value), 'EX', timeout);
  }

  async getCacheObject<T>(key: string): Promise<T | null> {
    const data = await this.redisClient.get(key);
    return data ? JSON.parse(data) : null;
  }

  async deleteObject(key: string): Promise<boolean> {
    return (await this.redisClient.del(key)) === 1;
  }

  async setCacheList<T>(key: string, dataList: T[]): Promise<void> {
    await this.redisClient.rpush(
      key,
      ...dataList.map((item) => JSON.stringify(item)),
    );
  }

  async getCacheList<T>(key: string): Promise<T[]> {
    const data = await this.redisClient.lrange(key, 0, -1);
    return data.map((item) => JSON.parse(item));
  }

  async setCacheSet<T>(key: string, dataSet: Set<T>): Promise<void> {
    await Promise.all(
      [...dataSet].map((item) =>
        this.redisClient.sadd(key, JSON.stringify(item)),
      ),
    );
  }

  async getCacheSet<T>(key: string): Promise<Set<T>> {
    const data = await this.redisClient.smembers(key);
    return new Set(data.map((item) => JSON.parse(item)));
  }

  async setCacheMap<T>(key: string, dataMap: Map<string, T>): Promise<void> {
    const entries = [...dataMap.entries()].map(([field, value]) => [
      field,
      JSON.stringify(value),
    ]);
    await this.redisClient.hmset(key, ...entries.flat());
  }

  async getCacheMap<T>(key: string): Promise<Map<string, T>> {
    const data = await this.redisClient.hgetall(key);
    const map = new Map<string, T>();
    for (const [field, value] of Object.entries(data)) {
      map.set(field, JSON.parse(value));
    }
    return map;
  }

  async setCacheMapValue<T>(
    key: string,
    hKey: string,
    value: T,
  ): Promise<void> {
    await this.redisClient.hset(key, hKey, JSON.stringify(value));
  }

  async getCacheMapValue<T>(key: string, hKey: string): Promise<T | null> {
    const data = await this.redisClient.hget(key, hKey);
    return data ? JSON.parse(data) : null;
  }

  async deleteCacheMapValue(key: string, hKey: string): Promise<boolean> {
    return (await this.redisClient.hdel(key, hKey)) === 1;
  }

  async keys(pattern: string): Promise<string[]> {
    return this.redisClient.keys(pattern);
  }

  async expire(key: string, timeout: number): Promise<boolean> {
    return (await this.redisClient.expire(key, timeout)) === 1;
  }

  async getExpire(key: string): Promise<number> {
    return this.redisClient.ttl(key);
  }

  async hasKey(key: string): Promise<boolean> {
    return (await this.redisClient.exists(key)) === 1;
  }
}
