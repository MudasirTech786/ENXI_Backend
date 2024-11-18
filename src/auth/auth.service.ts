// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';  // Correct import
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,  // Corrected from UserService to UsersService
    private jwtService: JwtService,
  ) {}

  // Validate the user by username and password
  async validateUser(username: string, password: string): Promise<any> {
    // Ensure the findOne method is implemented correctly in UsersService
    const user = await this.userService.findOne(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return { username: user.username, sub: user.id, role: user.role }; // Include user details for JWT
    }
    return null;
  }

  // Handle login and return JWT token
  async login(user: any) {
    const payload: JwtPayload = { 
      username: user.username, 
      sub: user.sub, 
      role: user.role  // Add the role field here
    };  
    return {
      access_token: this.jwtService.sign(payload),  // Generate and return JWT token
    };
  }
}
