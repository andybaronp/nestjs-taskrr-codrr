import { SetMetadata } from '@nestjs/common';
import { ADMIN_KEY } from 'src/constants/key-decorators';
import { ROLES } from 'src/constants/rols';

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);
