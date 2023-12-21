# Log Module for NestJS

This directory contains the implementation of a custom `LogModule` for handling application logging in a NestJS application. It integrates with MongoDB using Mongoose for storing log entries.

## Overview

The `LogModule` provides an extended logging service (`LogService`) that overrides NestJS's default Logger methods to include functionality for saving log entries to a MongoDB database. The module leverages a custom `MongooseModule` for database interactions.

## Structure

The directory consists of the following components:

- **LogService (log.service.ts):** An extendable service that overrides NestJS's default Logger methods for custom logging functionality.
- **LogModel (log.model.ts):** A Mongoose schema and model representing the structure of log entries in MongoDB.
- **LogModule (log.module.ts):** A NestJS module that encapsulates the logging functionality.
- **Log Interface (log.interface.ts):** A TypeScript interface representing the structure of a log entry.

## Implementation Details

### LogService

- **Custom Logging Methods:** Overrides default NestJS Logger methods (`log`, `error`, `warn`, `debug`, `verbose`) to include saving logs to MongoDB.
- **saveLog Method:** A private method to handle the creation and storage of log entries in the database.

### LogModel

- **Mongoose Schema:** Defines the schema for log entries, including fields like `level`, `message`, `context`, `additionalContext`, `trace`, and `timestamp`.
- **Model Definition:** Creates a Mongoose model based on the defined schema.

### LogModule

- **Module Setup:** Imports the custom `MongooseModule` for MongoDB interactions and provides the `LogService`.

### Log Interface

- **Structure Definition:** Defines the structure of a log entry as a TypeScript interface, ensuring type safety.

## Usage

To use the `LogService` in other parts of the application:

1. Import `LogModule` in the desired module (e.g., `AppModule`).
2. Inject `LogService` into services or controllers where logging is required.

## Example

```typescript
import { Injectable } from '@nestjs/common';
import { LogService } from '../log/log.service';

@Injectable()
export class SomeService {
  constructor(private logService: LogService) {}

  someMethod() {
    this.logService.log('Some log message', 'SomeService');
  }
}
```

## Future Enhancements

- **Log Level Configuration:** Introduce dynamic log level configuration based on environment or runtime parameters.
- **Log Rotation and Retention:** Implement mechanisms for log rotation and retention policies.
- **Advanced Query Capabilities:** Enhance `MongooseService` to support advanced querying of log entries for monitoring and analysis purposes.
