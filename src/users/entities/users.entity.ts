import { IUser } from 'interfaces/user.interface';
import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  age: number;
  @Column()
  email: string;
  username: string;
  @Column()
  password: string;
  @Column()
  role: string;
}
