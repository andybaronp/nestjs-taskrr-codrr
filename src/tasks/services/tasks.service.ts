import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksEntity } from '../entities/tasks.entity';
import { Repository } from 'typeorm';
import { ProjectsService } from '../../projects/services/projects.service';
import { TasksDto } from '../dto/task.dto';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly taskRepository: Repository<TasksEntity>,
    private readonly projectRepository: ProjectsService,
  ) {}

  public async createrTask(body: TasksDto, projectId: string) {
    try {
      const project = await this.projectRepository.findProjectById(projectId);
      if (project === undefined) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontro el proyecto',
        });
      }
      return await this.taskRepository.save({ ...body, project });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
