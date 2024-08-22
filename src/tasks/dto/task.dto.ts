import {
  IsEnum,
  IsNotEmpty,
  isNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { STATUS_TASKS } from '../../constants/status-tasks';
import { ProjectDTO } from '../../projects/dto/projects.dto';

export class TasksDto {
  @IsNotEmpty()
  @IsString()
  taskName: string;
  @IsNotEmpty()
  @IsString()
  taskDescription: string;
  @IsNotEmpty()
  @IsEnum(STATUS_TASKS)
  taskStatus: STATUS_TASKS;
  @IsString()
  @IsNotEmpty()
  responsableName: string;

  @IsOptional()
  project: ProjectDTO;
}
