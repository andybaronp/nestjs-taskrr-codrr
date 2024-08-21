import { ROLES } from 'src/constants/rols';

export interface PayloadJWT {
  sub: string;
  role: ROLES;
}

export interface AuthBody {
  username: string;
  password: string;
}
