# README.md for `RateLimitingGuard` in `rate-limit.decorator.ts`

## Overview

The `RateLimitingGuard` is an advanced implementation of rate limiting in NestJS applications, utilizing a custom decorator `@RateLimit` from `rate-limit.decorator.ts`. This guard is designed to provide a robust and flexible solution for controlling traffic on a per-route basis, ensuring the optimal balance between resource availability and user experience.

## Key Features and Benefits

- **Flexible Rate Limiting**: Allows dynamic setting of rate limits per route using the `@RateLimit` decorator, which accepts parameters for both time window and maximum request points.
- **Dual Key Strategy**: Implements separate rate limiters for IP addresses and authentication tokens, ensuring comprehensive coverage against potential abuse.
- **Clean and Modular Code**: The guard and decorator architecture keeps the application code organized, enhancing readability and maintainability.
- **Easy to Integrate**: Seamlessly integrates with existing NestJS guards and decorators, allowing for straightforward implementation in any application route.
- **Scalable Solution**: Designed to cater to applications with varying traffic patterns and requirements, offering the flexibility to adjust rate limits based on specific route needs.

## Implementation Details

### The `RateLimit` Decorator

The `RateLimit` decorator is used to specify rate limiting parameters directly in route handlers. It takes two arguments:

- `timeWindow`: The duration (in seconds) for which the rate limit is calculated.
- `points`: The maximum number of requests allowed within the specified `timeWindow`.

### The `RateLimitingGuard`

This guard reads the metadata set by the `RateLimit` decorator and enforces rate limits based on IP address and token. A unique rate limiter is created for each key (IP or token), allowing individual tracking and limiting of requests.

## Usage

### Applying the `RateLimit` Decorator

To use the `RateLimit` decorator, include it above the route handler in the controller. Here's an example of how to apply it along with route-specific requirements:

```typescript
@Controller('users')
export class UsersController {
  @Get()
  @RateLimit(10, 2) // Limit to 2 requests per 10 seconds
  @UseGuards(...RouteRequirementDetails[RouteRequirements.ReadAllUsers].guards)
  @Permissions(...RouteRequirementDetails[RouteRequirements.ReadAllUsers].permissions)
  findAll(): Promise<ReadAllUsersResponseDto[]> {
    return this.userService.findAll();
  }
}
```

### Setting Route-Specific Requirements

The rate limiting parameters can be extracted from a predefined configuration, as shown in the `RouteRequirementDetails` example:

```typescript
[RouteRequirements.ReadAllUsers]: {
  roles: [],
  permissions: [Permission.READ_ALL_USERS],
  guards: [Guards.JwtAuthGuard, Guards.PermissionsGuard, Guards.RateLimitingGuard],
  rateLimitTimeWindow: 10,
  rateLimitPoints: 2,
  // ... other fields
},
```

Using this approach, you can refer to these predefined settings directly in the route decorator:

```typescript
  @Get()
  @RateLimit(
    RouteRequirementDetails[RouteRequirements.ReadAllUsers].rateLimitTimeWindow, 
    RouteRequirementDetails[RouteRequirements.ReadAllUsers].rateLimitPoints
  )
  @UseGuards(...RouteRequirementDetails[RouteRequirements.ReadAllUsers].guards)
  @Permissions(...RouteRequirementDetails[RouteRequirements.ReadAllUsers].permissions)
  findAll(): Promise<ReadAllUsersResponseDto[]> {
    return this.userService.findAll();
  }
```

This method ensures a consistent and centralized configuration for rate limiting, enhancing the application's scalability and maintainability.