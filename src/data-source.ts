// src/data-source.ts
import { DataSource } from 'typeorm';
import { User } from './user/user.entity'; // Adjust the path to your User entity

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: '191.101.232.229',
    port: 5432,
    username: 'apiuser',
    password: 'newpassword',
    database: 'db_myserver',
    entities: [User],
    synchronize: true,
});
