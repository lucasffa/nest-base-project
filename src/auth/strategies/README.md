# Auth Strategies Directory

## Overview

The `strategies` directory within the `auth` module of the `nest-base-project` is dedicated to implementing authentication strategies using Passport, a middleware for Node.js. This directory plays a critical role in defining how the application handles authentication, particularly JWT (JSON Web Token) based authentication.

## Component

### `jwt.strategy.ts`

- **Purpose**: Implements the strategy for validating JWT tokens used in the application's authentication process.
  
- **Functionality**: 
  - **Token Extraction**: Extracts the JWT token from the authorization header of incoming requests using `ExtractJwt.fromAuthHeaderAsBearerToken()`.
  - **Token Validation**: Validates the JWT token's integrity and expiration. If valid, it proceeds to the `validate` method.
  - **Payload Handling**: In the `validate` method, decodes the payload of the JWT token, extracting essential user information such as `uuid`, `email`, and `role`. This information is then attached to the request object, making it accessible throughout the request's lifecycle.

- **Usage**: 
  - Applied globally to the application, this strategy is invoked whenever a route is protected by the `JwtAuthGuard`.
  - It's a critical component in ensuring that only requests with valid JWT tokens can access protected routes and resources.

## Workflow

1. **Token Extraction**: When a request with a JWT token hits a protected route, the `JwtStrategy` extracts the token from the request header.

2. **Token Validation**: The strategy validates the token's integrity and checks its expiration status.

3. **User Identification**: Upon successful validation, it decodes the payload and constructs a user object, which is then attached to the request.

4. **Continued Request Processing**: Once the request has been authenticated, it proceeds to the route handler or any subsequent middleware/guards.

## Best Practices

- **Secure Token Management**: Store the JWT secret key (`JWT_SECRET`) in a secure and accessible manner, typically using environment variables.

- **Payload Minimalism**: Only include essential and non-sensitive information in the JWT payload to enhance security and reduce token size.

- **Strategy Extension**: The `JwtStrategy` can be extended or modified to include additional checks or to implement different token extraction methods as needed.

## Conclusion

The `jwt.strategy.ts` in the `strategies` directory is a vital component for secure authentication in the `nest-base-project`. It leverages Passport's JWT Strategy to provide a robust and flexible authentication mechanism, ensuring that users are correctly identified and that their tokens are valid before granting access to protected resources.
