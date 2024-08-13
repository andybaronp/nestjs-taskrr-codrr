import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';
import { ACCESS_LEVLE } from 'src/constants/rols';
import { UsersEntity } from './users.entity';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';

@Entity({ name: 'users_projects' })
export class UsersProjectsEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ACCESS_LEVLE })
  accessLevel: ACCESS_LEVLE;

  @ManyToOne(() => UsersEntity, (user) => user.projectsIncludes)
  user: UsersEntity;
  @ManyToOne(() => ProjectsEntity, (project) => project.usersIncludes)
  project: ProjectsEntity;
}
