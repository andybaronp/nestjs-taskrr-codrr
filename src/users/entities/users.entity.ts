import { IUser } from 'interfaces/user.interface';
import { ROLES } from '../../constants/rols';
import { Entity, Column, OneToMany } from 'typeorm';
import { UsersProjectsEntity } from './usersProjects.entities';
import { BaseEntity } from '../../config/base.entity';
import { Exclude } from 'class-transformer';
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
  @Exclude()
  @Column()
  password: string;
  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;
  @OneToMany(() => UsersProjectsEntity, (userProject) => userProject.user)
  projectsIncludes: UsersProjectsEntity[];
}
