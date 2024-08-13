import { IProject } from 'interfaces/project.interface';
import { BaseEntity } from 'src/config/base.entity';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entities';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'projects' })
export class ProjectsEntity extends BaseEntity implements IProject {
  @Column()
  name: string;
  @Column()
  description: string;
  @OneToMany(() => UsersProjectsEntity, (userProject) => userProject.project)
  usersIncludes: UsersProjectsEntity[];
}
