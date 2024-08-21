import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PUBLIC_KEY } from 'src/constants/key-decorators';
import { UsersService } from 'src/users/services/users.service';
import { ErrorManager } from 'src/utils/error.manager';
import { useToken } from 'src/utils/use.token';
import { AuthTokenResult, IUseToken } from '../interfaces/auth.interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
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

    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers['authorization'];
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Invalid token');
    }
    const manageToken: IUseToken | string = useToken(token);

    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }
    if (manageToken.isEspired) {
      throw new UnauthorizedException('El token ha expirado');
    }

    const { sub } = manageToken;
    const user = await this.userService.findUserById(sub);

    if (!user) {
      throw new UnauthorizedException('No se ha podido encontrar el usuario');
    }
    req.idUser = user.id;
    req.roleUser = user.role;

    return true;
  }
}
