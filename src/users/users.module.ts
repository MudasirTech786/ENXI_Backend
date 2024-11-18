// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Role } from 'src/roles/role.entity'; // Path to Role entity

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])], // Import User and Role repositories
  providers: [UsersService],
  exports: [UsersService], // Export UsersService so it can be used in other modules
})
export class UsersModule {}
