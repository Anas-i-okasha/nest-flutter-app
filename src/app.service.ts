import { Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}

  async getHello() {
    const isExist = await this.redisService.get('Anas');
    if (isExist) return isExist;

    await this.redisService.set('Anas', 'okashawithredis');
    return 'Anas okasha!';
  }
}
