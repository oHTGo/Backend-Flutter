import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn
} from 'typeorm';
import {IsNotEmpty, IsPhoneNumber, IsString} from 'class-validator';
import {User} from './User.entity';

@Entity()
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsPhoneNumber('VN')
  phoneNumber: string;

  @Column()
  @IsString()
  avatarUrl: string;

  @ManyToOne(() => User, (user) => user.clients)
  @JoinColumn({name: 'createdBy'})
  createdBy: User;
}
