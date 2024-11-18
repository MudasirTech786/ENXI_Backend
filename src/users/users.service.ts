// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from 'src/roles/role.entity'; // Path to Role entity
import { CreateUserDto } from './dto/create-user.dto'; // Assuming you have a DTO for user creation
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    
    @InjectRepository(Role)
    private roleRepository: Repository<Role>, // Inject the Role repository
  ) {}

  // Method to create a user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, roleName } = createUserDto; // Assuming roleName is passed in the DTO
    
    // Fetch the role from the database based on the roleName
    const role = await this.roleRepository.findOne({ where: { name: roleName } });
    
    if (!role) {
      throw new Error('Role not found');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    
    // Create the user with the found role
    const user = this.userRepository.create({ username, password: hashedPassword, role });
    
    // Save the user to the database
    return this.userRepository.save(user);
  }

  // Method to find a user by username
  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { username }, // Search for the user by username
      relations: ['role'], // Include role information in the result
    });
  }
}
