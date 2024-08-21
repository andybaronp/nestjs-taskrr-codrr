import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersEntity } from 'src/users/entities/users.entity';
import { PayloadJWT } from '../interfaces/auth.interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  //valida si exite usurio o email con esa password
  public async validateUser(username: string, password: string) {
    const userByUsername = await this.userService.findBy({
      key: 'username',
      value: username,
    });
    const userByEmail = await this.userService.findBy({
      key: 'email',
      value: username,
    });

    //valida si exite usurio con esa password
    if (userByUsername) {
      const match = await bcrypt.compare(password, userByUsername.password);

      if (match) {
        return userByUsername;
      }
    }
    //valida si exite  email con esa password
    if (userByEmail) {
      const match = await bcrypt.compare(password, userByEmail.password);

      if (match) {
        return userByEmail;
      }
    }

    return null;
  }

  //firma el token
  public signJWT({
    paylod,
    secret,
    expires,
  }: {
    paylod: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }) {
    return jwt.sign(paylod, secret, { expiresIn: expires });
  }
  //Usuario con el token
  public async generateJWT(user: UsersEntity): Promise<any> {
    const getuser = await this.userService.findUserById(user.id);

    //crea el payload
    const payload: PayloadJWT = {
      role: getuser.role,
      sub: getuser.id,
    };
    return {
      accessToken: this.signJWT({
        paylod: payload,
        secret: process.env.JWT_SECRET,
        expires: '1h',
      }),
      user: user,
    };
  }
}
