import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity'; // Role entity

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  // Method to seed roles
  async seedRoles() {
    const roles = ['admin', 'user']; // Default roles

    // Iterate over the roles and add them if they don't exist
    for (const roleName of roles) {
      const existingRole = await this.roleRepository.findOne({ where: { name: roleName } });
      if (!existingRole) {
        await this.roleRepository.save({ name: roleName });
        console.log(`Role "${roleName}" created.`);
      }
    }
  }
}
