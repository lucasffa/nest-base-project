# Auth Guards Directory

## Overview

The `guards` directory within the `auth` module of the `nest-base-project` contains custom guards that are essential for enforcing security policies, particularly in authenticating users and authorizing access based on roles and permissions. These guards act as a barrier to prevent unauthorized access to certain parts of the application.

## Components

### `jwt-auth.guard.ts`

- **Purpose**: This guard is responsible for implementing JWT (JSON Web Token) authentication.
- **Functionality**: It extends the `AuthGuard` provided by `@nestjs/passport`, specifically for the 'jwt' strategy. When used, it validates the JWT token attached to the request and ensures the user is authenticated.
- **Usage**: Applied globally or to specific routes that require user authentication.

### `permissions.guard.ts`

- **Purpose**: To enforce permission-based access control.
- **Functionality**: It utilizes the `Reflector` to access custom metadata (permissions) set on route handlers. It then checks whether the current user's roles include the required permissions.
- **Usage**: Used in conjunction with the `Permissions` decorator to protect routes based on specific permissions.

### `roles.guard.ts`

- **Purpose**: Designed to enforce role-based access control.
- **Functionality**: Similar to `PermissionsGuard`, it uses `Reflector` to retrieve role requirements from route handlers. It checks if the requesting user's role matches any of the required roles.
- **Usage**: Works in tandem with the `Roles` decorator to restrict access to routes based on user roles.

## Workflow

1. **JWT Authentication**: When a request hits a protected route, `JwtAuthGuard` first verifies the JWT token. If the token is valid, it allows the request to proceed.

2. **Role and Permission Checks**: For routes with additional role or permission requirements, `RolesGuard` and `PermissionsGuard` are invoked after JWT authentication. They check if the authenticated user has the required roles or permissions.

3. **Access Decision**: If the user meets all the requirements, access is granted; otherwise, access is denied, typically with an unauthorized access error.

## Best Practices

- **Global vs. Route-Specific Guards**: While `JwtAuthGuard` can be applied globally, `RolesGuard` and `PermissionsGuard` are often used at the route level for finer control.

- **Comprehensive Security**: Combine these guards to create a comprehensive security system that includes both authentication and authorization.

- **Maintainability and Scalability**: By encapsulating the logic in guards, the security system remains maintainable and scalable, as changes to the authentication or authorization mechanisms are centralized.

## Conclusion

The custom guards in the `auth/guards` directory provide a robust and flexible way to secure the application. They ensure that only authenticated users with the appropriate roles and permissions can access specific functionalities, thereby enhancing the application's overall security and integrity.
