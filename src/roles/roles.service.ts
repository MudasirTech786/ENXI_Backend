import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>, // Inject the Role repository
  ) {}

  // Example method to fetch all roles
  async findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  // Example method to create a new role
  async create(roleName: string): Promise<Role> {
    const role = this.rolesRepository.create({ name: roleName });
    return this.rolesRepository.save(role);
  }
}
