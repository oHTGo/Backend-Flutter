import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity
} from 'typeorm';
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {Client} from './Client.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column()
  @IsString()
  fullName: string;

  @OneToMany(() => Client, (client) => client.createdBy, {cascade: true})
  clients: Client[];
}
