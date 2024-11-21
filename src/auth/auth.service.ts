// src/auth/auth.service.ts
import { Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(username);
      if (user && await bcrypt.compare(password, user.password)) {
        return { username: user.username, sub: user.id, role: user.role };
      }
      return null; // Keep null for invalid credentials if preferred
    } catch (error) {
      console.error('Error validating user:', error);
      throw error; // Rethrow to ensure proper error bubbling
    }
  }
  
  async login(user: any) {
    const payload = { username: user.username, sub: user.sub, role: user.role };
    return {
      access_token: this.jwtService.sign(payload), // Signs using the configured secret
      username: user.username,
      role: user.role,
    };
  }

  // Add register method
  async register(registerDto: { username: string; password: string; role: string }) {
    const existingUser = await this.usersService.findOne(registerDto.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser = await this.usersService.createUser({
      username: registerDto.username,
      password: hashedPassword,
      roleName: registerDto.role, // Assuming the role is just a string, adjust if necessary
    });

    return newUser;
  }

  async validateAndRetrieveUserInfo(username: string, password: string) {
    // Find the user by username
    const user = await this.usersService.findOne(username);

    // If user not found, throw an error
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Return the username and role
    return {
      username: user.username,
      role: user.role.name, // Assuming role has a 'name' property
    };
  }
}
