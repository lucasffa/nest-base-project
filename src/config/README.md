# NestJS Configuration Schema

This is a NestJS configuration schema for managing various environment variables used in your application. This schema is designed to ensure that the expected types and validation rules are enforced for each configuration variable.

## Configuration Variables

Here is a breakdown of the configuration variables defined in the `ConfigurationSchema` class:

- **JWT_SECRET**: A string representing the secret key for JWT (JSON Web Tokens) authentication.

- **DB_TYPE**: A string specifying the type of the database used by the application.

- **DB_HOST**: A string indicating the host or IP address of the database server.

- **DB_PORT**: A number representing the port number for the database connection.

- **DB_USERNAME**: A string containing the username used to authenticate with the database.

- **DB_PASSWORD**: A string containing the password used to authenticate with the database.

- **DB_DATABASE**: A string specifying the name of the database to connect to.

- **PORT**: An optional number representing the port on which the application should run. This variable is optional, meaning it may not be defined in all environments.

- **CORS_ORIGIN**: An optional string specifying the allowed CORS (Cross-Origin Resource Sharing) origins. Like PORT, this variable is also optional.

- **NODE_ENV**: A string representing the current environment mode of the application (e.g., 'development', 'production', 'test').

- **COOKIE_SECRET**: A string representing the secret key for handling cookies or sessions in the application.

## Validation Rules

The configuration variables are decorated with validation rules using the `class-validator` library to ensure that they meet specific criteria:

- **@IsString()**: Ensures that the variable is of type string.

- **@IsNumber()**: Ensures that the variable is of type number.

- **@IsOptional()**: Specifies that a variable is optional, meaning it may or may not be defined.

These validation rules help maintain consistency and prevent invalid values from being used in your application.

## Usage

You can use this `ConfigurationSchema` class in your NestJS application to validate and access configuration variables. Make sure to load and validate these variables from your environment or configuration files using tools like `dotenv` or directly from environment variables.

```typescript
import { ConfigurationSchema } from './config/configuration.schema';

const config = new ConfigurationSchema();

// Access configuration variables
const jwtSecret = config.JWT_SECRET;
const dbType = config.DB_TYPE;
const dbHost = config.DB_HOST;
// ... and so on

// or this following, in main.ts

app.enableCors({
  origin: configService.get<string>('CORS_ORIGIN', 'http://localhost:5000'),
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});


// Use these variables in this NestJS application as needed.
```
