# Auth Enums Directory

## Overview

The `enums` directory in the `auth` module of the `nest-base-project` is crucial for defining constants and mappings that drive the authentication and authorization mechanisms. This directory contains several TypeScript enumeration (enum) files, outlining the standard roles, permissions, and route requirements across the application.

## Contents

### `guards.enum.ts`
- **Purpose**: Identifies different guards used in the application.
- **Usage**: Simplifies referencing guards in the code, especially when configuring route requirements.

### `permissions.enum.ts`
- **Purpose**: Enumerates available permissions in the application.
- **Details**: Permissions correspond to actions or sets of actions users can perform (e.g., `READ_ALL_USERS`).
- **Usage**: Enforces permission-based access control on API endpoints.

### `roles.enum.ts`
- **Purpose**: Lists roles assignable to users.
- **Details**: Defines roles such as `User`, `Helper`, `Mod`, `Admin`, each with potential permissions.
- **Usage**: Assigns roles to users and checks roles for access control.

### `routes.enum.ts`
- **Purpose**: Specifies route requirements.
- **Details**: Maps routes to specific access control requirements, including roles, permissions, and guards.
- **Usage**: Manages route access control, enhancing maintainability and modification ease.

### `rolePermissions`
- **Purpose**: Maps roles to corresponding permissions.
- **Details**: Provides a lookup table for each role's permissions.
- **Usage**: Essential for implementing role-based access control.

## Integration and Workflow

1. **Role and Permission Assignment**: Users are assigned roles (from `roles.enum.ts`), granting them associated permissions (`rolePermissions`).
2. **Access Control**: Protected route requests invoke guards (from `guards.enum.ts`) that check `RouteRequirements` for user role and permission eligibility.
3. **RouteRequirements**: Associates routes with specific access control requirements.
4. **Decorators**: Custom decorators (`@Roles`, `@Permissions`) enforce access control rules using these enums.

## Conclusion

The `enums` directory in the `auth` module centralizes the management of roles, permissions, and access control, enhancing the security model's scalability and adaptability in the NestJS application.
