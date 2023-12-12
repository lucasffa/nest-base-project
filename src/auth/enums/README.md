# Auth Enums Directory

## Overview

The `enums` directory within the `auth` module of the `nest-base-project` plays a critical role in defining the core constants and mappings that govern the authentication and authorization mechanisms of the application. This directory contains several TypeScript enumeration (enum) files that standardize the roles, permissions, and route requirements across the application.

## Contents

### `guards.enum.ts`

- **Purpose**: Defines identifiers for different types of guards used in the application.
- **Usage**: Primarily used to reference guards in a more readable and maintainable way throughout the codebase, especially when configuring route requirements.

### `permissions.enum.ts`

- **Purpose**: Enumerates the permissions available in the application.
- **Details**: Each permission corresponds to a specific action or set of actions that users can perform. For instance, `READ_ALL_USERS` allows reading all user data, while `UPDATE_OWN_USER` allows a user to update their own information.
- **Usage**: Used in conjunction with decorators and guards to enforce permission-based access control on API endpoints.

### `roles.enum.ts`

- **Purpose**: Lists the roles that can be assigned to users within the application.
- **Details**: Defines roles like `User`, `Helper`, `Mod`, and `Admin`, each potentially associated with a different set of permissions.
- **Usage**: Used throughout the application to assign roles to users and to check user roles for access control.

### `routes.enum.ts`

- **Purpose**: Specifies the route requirements for different parts of the application.
- **Details**: Contains the `RouteRequirements` enum, which maps different routes (or functionalities) to specific access control requirements. Each route requirement specifies the roles, permissions, and guards needed for accessing that route.
- **Usage**: This structure allows for a centralized and organized way of managing route access control, making it easier to maintain and modify access rules.

### `rolePermissions`

- **Purpose**: Maps each role to its corresponding set of permissions.
- **Details**: This constant provides a lookup table for what permissions are associated with each role. For example, `Role.Admin` might have permissions to perform actions like `READ_ALL_USERS` and `DELETE_ONE_USER`.
- **Usage**: Integral in implementing role-based access control. It's used by guards to determine if a user with a certain role has the necessary permissions to access a route or perform an action.

## Integration and Workflow

1. **Role and Permission Assignment**: When a user is created or updated, they are assigned a role defined in `roles.enum.ts`. This role implicitly grants them the permissions associated with that role, as defined in `rolePermissions`.

2. **Access Control**: When a request is made to a protected route, the corresponding guard (referenced in `guards.enum.ts`) is invoked. This guard checks the `RouteRequirements` for that route and determines if the user has the necessary role and permissions.

3. **RouteRequirements**: The `RouteRequirements` and `RouteRequirementDetails` offer a streamlined way to associate routes with specific access control requirements, enhancing the readability and maintainability of the code.

4. **Decorators**: Custom decorators like `@Roles` and `@Permissions`, utilizing the enums, are applied to controller methods to enforce the defined access control rules.

## Conclusion

The `enums` directory in the `auth` module provides a structured and efficient way to manage roles, permissions, and access control mechanisms within the NestJS application. By centralizing these definitions, the application's security model is not only more manageable but also scalable and adaptable to future changes or additions in roles and permissions.
