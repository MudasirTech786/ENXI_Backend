// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from 'src/roles/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  // Register a new user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, roleName } = createUserDto;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find the role by its name
    const role = await this.roleRepository.findOne({ where: { name: roleName } });
    if (!role) {
      throw new Error('Role not found');
    }

    // Create a new user instance
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      role,  // Use the role object instead of roleName
    });

    // Save the user to the database
    return this.userRepository.save(user);
  }

  // Find a user by username
  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { username },
      relations: ['role'], // Include role info
    });
  }
}
