import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';
import { TasksEntity } from 'src/tasks/entities/tasks.entity';
import { UsersEntity } from 'src/users/entities/users.entity';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entities';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env`,
});

const configService = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [UsersEntity, ProjectsEntity, UsersProjectsEntity, TasksEntity],
  // entities: ['dist/../**/**/*.entity{.ts,.js}'],
  // entities: [__dirname + '../**/**/*.entity{.ts,.js}'],
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const appDataSource = new DataSource(DataSourceConfig);
