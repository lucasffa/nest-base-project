# `src/common` Directory Overview

## Introduction

The `src/common` directory of the `nest-base-project` is a vital component in the architecture of the application. It encapsulates a variety of utility tools, decorators, guards, and helper functions that contribute significantly to the application’s functionality, security, and maintainability. This directory is essential for ensuring that the application’s structure remains robust and scalable.

## Decorators

### `RateLimit` Decorator (`src/common/decorators/rate-limit.decorator.ts`)

- **Purpose**: The `RateLimit` decorator is used to apply rate limiting on individual route handlers. It leverages metadata to specify the rate limits for different endpoints.
- **Functionality**: It sets the rate limit time window and the maximum number of points (requests) allowed in that window for a given route.
- **Usage**: Applied directly to route handlers in controllers to control the frequency of incoming requests, thereby preventing abuse and ensuring the availability of the service.

## Guards

### `RateLimitingGuard` (`src/common/guards/rate-limiting.guard.ts`)

- **Purpose**: The `RateLimitingGuard` is an implementation of `CanActivate` that enforces the rate limits set by the `RateLimit` decorator.
- **Functionality**: It uses `RateLimiterMemory` to track requests by IP address and token, limiting the number of requests based on the defined thresholds.
- **Usage**: Integrated with route handlers to protect the API against excessive use and to maintain service reliability and efficiency.

## Helpers Directory (`src/common/helpers/`)

- **Overview**: Contains utility classes and functions that assist in various aspects of the application. It includes dynamic example generators and the `PermissionChecker` class.
- **Key Components**:
  - `generate-examples.helper.ts`: Generates dynamic examples for Swagger documentation based on provided keys.
  - `generate-properties.helper.ts`: Dynamically creates property objects for Swagger based on provided fields.
  - `PermissionChecker`: Centralizes the logic for permission and role verification, enhancing the application's security and modular design.

## Best Practices and Importance

- **DRY Principle**: The utilities in the `src/common` directory adhere to the "Don't Repeat Yourself" principle, ensuring that the codebase remains efficient, less redundant, and easier to maintain.
- **Modularity**: By centralizing common functionalities, the directory promotes modularity. It allows different parts of the application to leverage common logic without duplication.
- **Security and Performance**: The `RateLimitingGuard` and `PermissionChecker` are key to the application's security, protecting against overuse and unauthorized access, respectively.
- **Enhanced Documentation and API Usability**: The decorators and helper functions for Swagger documentation make the API more user-friendly, providing clear and detailed information on API usage.

## Conclusion

In conclusion, the `src/common` directory is a foundational part of the `nest-base-project`, embodying the principles of clean architecture and best coding practices. It enhances the application’s scalability, security, and maintainability, making it an exemplary model for robust and efficient backend development.