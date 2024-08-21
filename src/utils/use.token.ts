import {
  AuthTokenResult,
  IUseToken,
} from 'src/auth/interfaces/auth.interfaces';
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IUseToken | string => {
  try {
    const decode = jwt.decode(token) as AuthTokenResult;
    const currentDate = new Date();
    const expDate = new Date(decode.exp);
    return {
      sub: decode.sub,
      role: decode.role,
      isEspired: +expDate <= +currentDate / 1000,
    };
  } catch (error) {
    return 'Invalid token';
  }
};
