import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from './eums/roleEnum';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
