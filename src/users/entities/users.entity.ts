import { IUser } from 'interfaces/user.interface';
import { BaseEntity } from 'src/config/base.entity';
import { ROLES } from 'src/constants/rols';
import { Column, Entity, OneToMany } from 'typeorm';
import { UsersProjectsEntity } from './usersProjects.entities';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  age: number;
  @Column({ unique: true })
  email: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;
  @OneToMany(() => UsersProjectsEntity, (project) => project.user)
  projectsIncludes: UsersProjectsEntity[];
}
