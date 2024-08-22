import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';
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
  host: 'localhost',
  port: 5432,
  username: 'ucodrr',
  password: 'secret1234',
  database: 'codrrdb',
  entities: [UsersEntity, ProjectsEntity, UsersProjectsEntity],
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
