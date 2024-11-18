import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity'; // Import the Role entity

@Module({
  imports: [TypeOrmModule.forFeature([Role])], // Import the Role entity repository
  providers: [],
  exports: [],
})
export class RolesModule {}
