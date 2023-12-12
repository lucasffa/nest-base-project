// src/data-source.ts
import { DataSource } from 'typeorm';
import { User } from './user/user.entity'; // Adjust the path to your User entity

export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as any,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User],
    synchronize: true,
});
