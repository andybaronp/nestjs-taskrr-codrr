import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { TasksDto } from '../dto/task.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AccessLevelGuard } from '../../auth/guards/access_level.guard';
import { AccessLevel } from '../../auth/decorators/access_level.decorator';

@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @AccessLevel('DEVELOPER')
  @Post('create/:projectId')
  public async createTask(
    @Param('projectId') projectId: string,
    @Body() body: TasksDto,
  ) {
    return await this.tasksService.createrTask(body, projectId);
  }
}
