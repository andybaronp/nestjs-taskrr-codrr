import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorators';
import { ROLES } from 'src/constants/rols';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflecto: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflecto.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) return true;

    const roles = this.reflecto.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );
    const admin = this.reflecto.get<string>(ADMIN_KEY, context.getHandler());

    const req = context.switchToHttp().getRequest<Request>();

    const { roleUser } = req;

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
    if (roleUser === ROLES.ADMIN) return true;

    const isAuth = roles.some((role) => role === roleUser);
    if (!isAuth) {
      throw new UnauthorizedException(
        'No tiene permisos para realizar esta accion',
      );
    }

    return true;
  }
}
