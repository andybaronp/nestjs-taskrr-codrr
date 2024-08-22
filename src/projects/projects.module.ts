import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { ProjectsController } from './controllers/projects.controller';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entities';
import { UsersService } from 'src/users/services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsEntity, UsersProjectsEntity])],
  providers: [ProjectsService, UsersService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
