# Auth Decorators Directory

## Overview

The `decorators` directory within the `auth` module of the `nest-base-project` is a specialized section responsible for defining custom decorators used in the application. These decorators are crucial for implementing role-based and permission-based access control in a clean and declarative manner.

## Contents

### `permissions.decorator.ts`

- **Purpose**: Creates a custom decorator `Permissions` that is used to define which permissions are required to access a particular route or controller method.
- **Details**: It utilizes the `SetMetadata` function from NestJS to associate metadata with a route handler. This metadata is then used by guards to enforce permission checks.
- **Usage**: Applied on controller methods to specify the required permissions for accessing them. For example, `@Permissions(Permission.UPDATE_OWN_USER)` would restrict access to users who have the `UPDATE_OWN_USER` permission.

### `roles.decorator.ts`

- **Purpose**: Defines the `Roles` decorator for specifying required user roles to access certain parts of the application.
- **Details**: Similar to `Permissions`, it uses `SetMetadata` to associate role requirements with a controller method.
- **Usage**: Placed above controller methods to indicate which user roles can invoke these methods. For instance, `@Roles(Role.Admin)` would limit access to users with the `Admin` role.

## How They Work

1. **Metadata Association**: When these decorators are used on a controller method, they associate the specified roles or permissions with that method as metadata.

2. **Guard Interaction**: During a request, guards like `RolesGuard` or `PermissionsGuard` read this metadata and determine if the user making the request has the required roles or permissions.

3. **Access Control Enforcement**: If the user meets the criteria set by the decorators, they are allowed to access the route. If not, the request is denied, usually with an unauthorized access error.

## Best Practices

- **Clear Access Definitions**: Use these decorators to clearly define access control rules at the controller level, ensuring that they are easy to read and maintain.

- **Combining Roles and Permissions**: In some cases, it's beneficial to use both `Roles` and `Permissions` decorators together to enforce both role and permission checks on a single route.

- **Avoid Overuse**: Apply these decorators judiciously. Overusing them can lead to complex and hard-to-track permission structures.

## Conclusion

The custom decorators in the `auth/decorators` directory play a vital role in securing the application. They provide a declarative and maintainable way to handle authorization, ensuring that only users with the right roles and permissions can access specific parts of the application.
