# nest-base-project

## Overview

This "nest-base-project" is a NestJS-based backend application designed for robust API development. It showcases advanced features like a fully functional user management system with enhanced authentication, role-based access control, and CRUD operations on user data.

## Features

- **Advanced Role and Permission-Based Access Control**: Implementing a sophisticated system that provides granular control over user permissions.
- **Full CRUD Operations on User**: Create, Read, Update, and Delete user entities.
- **Authentication and Authorization**: Using JWT tokens and role-based access control with enhanced security measures.
- **PostgreSQL Integration**: For robust, relational data management.
- **Password Encryption**: Using bcrypt for securing user passwords.
- **Validation and Error Handling**: Through DTOs and custom decorators for structured error responses.

## Architecture

### Directory Structure

```
src
├── auth
│   ├── decorators
│   ├── enums
│   ├── guards
│   ├── strategies
│   └── ...
├── helpers
│   └── permission-checker.ts
├── user
│   ├── dto
│   └── ...
└── ...
```

- **auth**: Includes authentication logic, JWT strategies, guards, decorators, and role-based access control mechanisms.
- **helpers**: Contains utility classes like `PermissionChecker` for managing permissions and roles.
- **user**: Manages user-related operations with controllers and services.

### Key Components

- **PermissionChecker**: A helper class for role and permission verification.
- **Controllers**: Manage incoming requests and responses.
- **Services**: Business logic and database interactions.
- **Entities**: Database table representations.
- **Modules**: Functional code organization.
- **Decorators**: Functional extension for roles and validation.
- **DTOs**: Data format definitions for requests.

## Technologies

- **NestJS**: A progressive Node.js framework for scalable server-side applications.
- **TypeORM**: ORM for database interaction in an object-oriented way.
- **PostgreSQL**: Open-source object-relational database system.
- **JWT**: Secure authentication method.
- **bcrypt**: Password hashing library.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- Environment variables (JWT_SECRET, DATABASE_URL)

### Installation

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up the database and environment variables.
4. Run the application: `npm run start`.

## Usage

Endpoints for user management and authentication:

- `/users`: CRUD operations on users.
- `/auth/login`: User authentication and JWT issuance.

### Example Requests

```
POST /users
{
  "name": "John Doe",
  "email": "john@example.com",
  ...
}
```

## Security

- **JWT Authentication**: Secure user credential transmission.
- **Password Hashing**: Using bcrypt.
- **Advanced Role-Based Access Control**: Detailed user access management.

## Testing

- Unit and integration tests for services, controllers, and endpoints.

### Running Tests

Execute `npm run test` for testing.

## Contributing

Contributions are welcome. Please adhere to the pull request process.

## License

- Project: [MIT License](LICENSE).
- Nest: [MIT licensed](LICENSE).

