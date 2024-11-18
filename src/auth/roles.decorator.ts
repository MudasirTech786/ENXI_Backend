import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/users/role.enum'; // Correct import path

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
