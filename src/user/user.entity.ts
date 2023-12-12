import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../auth/enums/roles.enum';

@Entity()
export class User {
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

  setPassword(password: string) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    this.password = bcrypt.hashSync(password, salt);
  }

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
  lastLoginAt: Date;

  @Column()
  isActive: boolean;

  @Column()
  isDeleted: boolean;

  @Column({type: 'timestamp', nullable: true})
  deletedAt: Date;

}