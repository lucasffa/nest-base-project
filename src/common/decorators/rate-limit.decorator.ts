import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_TIME_WINDOW_KEY = 'rateLimitTimeWindow';
export const RATE_LIMIT_POINTS_KEY = 'rateLimitPoints';

export const RateLimit = (timeWindow: number, points: number) => {
    return (target: any, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        SetMetadata(RATE_LIMIT_TIME_WINDOW_KEY, timeWindow)(target, key, descriptor);
        SetMetadata(RATE_LIMIT_POINTS_KEY, points)(target, key, descriptor);
    };
};
