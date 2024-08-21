import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import {
  ACCESS_LEVEL_KEY,
  ADMIN_KEY,
  PUBLIC_KEY,
  ROLES_KEY,
} from 'src/constants/key-decorators';
import { ROLES } from 'src/constants/rols';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflecto: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflecto.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) return true;

    const roles = this.reflecto.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );
    const access_level = this.reflecto.get<number>(
      ACCESS_LEVEL_KEY,
      context.getHandler(),
    );
    const admin = this.reflecto.get<string>(ADMIN_KEY, context.getHandler());

    const req = context.switchToHttp().getRequest<Request>();

    const { roleUser, idUser } = req;
    if (access_level === undefined) {
      if (roles === undefined) {
        if (!admin) {
          return true;
        } else if (admin && roleUser === ROLES.ADMIN) {
          return true;
        } else {
          throw new UnauthorizedException(
            'No tiene permisos para realizar esta accion',
          );
        }
      }
    }
    if (roleUser === ROLES.ADMIN) return true;

    const user = await this.userService.findUserById(idUser);

    const userExistInProject = user.projectsIncludes.find(
      (project) => project.project.id === req.params.projectId,
    );
    if (!userExistInProject)
      throw new UnauthorizedException('No formas parte del proyecto');
    if (userExistInProject === undefined)
      throw new UnauthorizedException('No formas parte del proyecto');

    if (access_level !== userExistInProject.accessLevel)
      throw new UnauthorizedException(
        'No tienes  el nivel de acceso necesario para realizar esta accion',
      );
    return true;
  }
}
