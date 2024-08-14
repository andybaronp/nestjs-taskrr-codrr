import { ACCESS_LEVLE } from '../../constants/rols';
import { ProjectsEntity } from '../../projects/entities/projects.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { UsersEntity } from './users.entity';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'users_projects' })
export class UsersProjectsEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ACCESS_LEVLE })
  accessLevel: ACCESS_LEVLE;

  @ManyToOne(() => UsersEntity, (user) => user.projectsIncludes)
  user: UsersEntity;
  @ManyToOne(() => ProjectsEntity, (project) => project.usersIncludes)
  project: ProjectsEntity;
}
