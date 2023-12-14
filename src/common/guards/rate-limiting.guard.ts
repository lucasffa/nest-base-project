import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';
import { Reflector } from '@nestjs/core';
import { RATE_LIMIT_TIME_WINDOW_KEY, RATE_LIMIT_POINTS_KEY } from '../decorators/rate-limit.decorator';

@Injectable()
export class RateLimitingGuard implements CanActivate {
  private rateLimiters: Map<string, RateLimiterMemory> = new Map();

  constructor(private reflector: Reflector) {}

  private getRateLimiter(key: string, timeWindow: number, points: number): RateLimiterMemory {
    if (!this.rateLimiters.has(key)) {
      const rateLimiter = new RateLimiterMemory({
        keyPrefix: key,
        points: points,
        duration: timeWindow,
      });
      this.rateLimiters.set(key, rateLimiter);
    }
    return this.rateLimiters.get(key);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const timeWindow = this.reflector.get<number>(RATE_LIMIT_TIME_WINDOW_KEY, context.getHandler()) || 60;
    const points = this.reflector.get<number>(RATE_LIMIT_POINTS_KEY, context.getHandler()) || 3;

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : undefined;
    const ipKey = 'ip:' + request.ip;
    const tokenKey = 'token:' + (token || 'anonymous');

    try {
      await this.getRateLimiter(ipKey, timeWindow, points).consume(1);
      await this.getRateLimiter(tokenKey, timeWindow, points).consume(1);
      return true;
    } catch (rejRes: RateLimiterRes | any) {
      throw new HttpException('Too many requests', HttpStatus.TOO_MANY_REQUESTS);
    }
  }
}