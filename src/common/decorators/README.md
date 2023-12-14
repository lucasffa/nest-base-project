# README.md for `rate-limit.decorator.ts`

## Overview

The `rate-limit.decorator.ts` file contains a custom decorator for NestJS, designed to implement flexible and efficient rate limiting on a per-route basis. This decorator allows developers to specify rate limiting parameters directly in the controller's route handlers, making the code more readable, maintainable, and clean.

## Benefits of Using `RateLimit` Decorator

- **Flexibility**: Allows setting different rate limiting parameters (time window and points) for each route.
- **Readability and Clean Code**: Integrates rate limiting into the route decorators, keeping the related configuration close to the route logic.
- **Ease of Maintenance**: Centralizes the rate limiting logic, making it easier to update or modify as needed.
- **Scalability**: Supports different rate limiting strategies for different endpoints, catering to varied traffic patterns and use cases.

## Implementation Details

The `RateLimit` decorator takes two parameters:
- `timeWindow`: The duration (in seconds) for which the rate limit is calculated.
- `points`: The maximum number of requests allowed in the given `timeWindow`.

## Usage

To apply the `RateLimit` decorator, include it above your route handler in the controller along with other relevant decorators such as `@Get()`, `@Post()`, etc. You can specify the rate limiting parameters (`timeWindow` and `points`) directly in the decorator.

### Example

In the following example, the `findAll` route in a controller is decorated with `@RateLimit`. This route is limited to 2 requests within a 10-second window:

```typescript
import { RateLimit } from '../common/decorators/rate-limit.decorator';
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get()
  @RateLimit(10, 2) // 2 requests per 10 seconds
  @UseGuards(...RouteRequirementDetails[RouteRequirements.ReadAllUsers].guards)
  @Permissions(...RouteRequirementDetails[RouteRequirements.ReadAllUsers].permissions)
  findAll(): Promise<ReadAllUsersResponseDto[]> {
    return this.userService.findAll();
  }
}
```

### Configuration for Route Requirements

You can also use predefined configurations from a constant or configuration file. For instance, `RouteRequirementDetails` may contain predefined settings for different routes:

```typescript
[RouteRequirements.ReadAllUsers]: {
  roles: [],
  permissions: [Permission.READ_ALL_USERS],
  guards: [Guards.JwtAuthGuard, Guards.PermissionsGuard, Guards.RateLimitingGuard],
  rateLimitTimeWindow: 10,
  rateLimitPoints: 2,
  fields: ['uuid', 'name', 'email', 'role', 'isActive', 'isDeleted', 'deletedAt', 'updatedAt'],
},
```

Using this approach, you can refer to these predefined settings directly in the decorator:

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

This method ensures a consistent and centralized configuration for rate limiting across different routes, enhancing the maintainability and scalability of this application.