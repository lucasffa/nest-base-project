import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../auth/roles.enum';


@Entity()
export class User {
  // User entity with the following fields:
  // id: number
  // uuid: string
  // name: string
  // email: string
  // password: string
  // createdAt: Date
  // updatedAt: Date
  // lastLogin: Date
  // isActive: boolean
  // isDeleted: boolean
  // deletedAt: Date
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  uuid: string;

  @Column()
  name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  // Method to set the password (encrypting it)
  setPassword(password: string) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    this.password = bcrypt.hashSync(password, salt);
  }

  // Method to validate a password
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User
  })
  role: Role;

  @Column({type: 'timestamp'})
  createdAt: Date;

  @Column({type: 'timestamp'})
  updatedAt: Date;

  @Column({type: 'timestamp', nullable: true})
  lastLogin: Date;

  @Column()
  isActive: boolean;

  @Column()
  isDeleted: boolean;

  @Column({type: 'timestamp', nullable: true})
  deletedAt: Date;

}
