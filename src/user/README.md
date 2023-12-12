# User Module

## Overview

The `user` module in the `nest-base-project` is a crucial component of our NestJS-based backend application. It is specifically designed to handle all operations related to user management, including CRUD operations, user authentication, and interaction with the user-related data in the database.

## Structure

```
user
├── dto
│   ├── create-user.dto.ts
│   ├── login.dto.ts
│   └── ...
├── user.controller.ts
├── user.service.ts
└── user.entity.ts
```

### Components

- **DTOs (Data Transfer Objects)**: Define the structure and validation for incoming request data, ensuring that the data conforms to the expected format.

- **User Controller (`user.controller.ts`)**: Handles incoming HTTP requests related to user management, such as creating, updating, deleting, and fetching user data. It utilizes decorators for defining routes and integrating role-based and permission-based access control.

- **User Service (`user.service.ts`)**: Contains the business logic for user management. It interacts with the `User` entity to perform database operations and implements advanced functionalities like role and permission checks using `PermissionChecker`.

- **User Entity (`user.entity.ts`)**: Represents the `User` table in the database, defining the structure of user data.

## Features

- **CRUD Operations**: Supports creating, reading, updating, and deleting user information.
- **Soft Deletion**: Implements soft delete functionality, allowing for reversible deletion of user records.
- **Activation Status Management**: Provides the ability to toggle the activation status of users.
- **Role and Permission Checks**: Integrates advanced role and permission-based access control for user operations.
- **Authentication and Authorization**: Supports user authentication and controls access to various endpoints based on user roles.

## Usage

This module is used to manage user-related operations within the application. It provides endpoints for:

- Creating new users.
- Fetching user information by ID, email, or UUID.
- Updating user information.
- Soft deleting users.
- Changing user activation status.
- User authentication and token generation.

## Integration

The `user` module is integrated with the `auth` module for handling authentication and authorization. It relies on services like `UserService` and `PermissionChecker` to enforce access control and business logic.

## Security

- Implements JWT-based authentication for secure user login.
- Utilizes role-based and permission-based access control to secure endpoints.
- Passwords are hashed using bcrypt for enhanced security.
