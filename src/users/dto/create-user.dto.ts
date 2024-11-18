// src/users/dto/create-user.dto.ts

import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  roleName: string; // Instead of passing the Role entity, pass the role name
}
