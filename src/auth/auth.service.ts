import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';  // Import ConfigService


@Injectable()
export class AuthService {
  private tokenBlacklist: Set<string> = new Set();

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,  // Inject ConfigService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(username);
      if (user && await bcrypt.compare(password, user.password)) {
        return { username: user.username, sub: user.id, role: user.role };
      }
      return null; // Invalid credentials
    } catch (error) {
      console.error('Error validating user:', error);
      throw error; // Ensure proper error handling
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.sub, role: user.role };
    
    console.log('Login payload:', payload); // Log for debugging
    
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'), // Get the JWT_SECRET from .env
        expiresIn: '1h', // Set expiration as needed
      }),
      username: user.username,
      role: user.role,
    };
  }

  async register(registerDto: { username: string; password: string; role: string }) {
    const existingUser = await this.usersService.findOne(registerDto.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.usersService.createUser({
      username: registerDto.username,
      password: hashedPassword,
      roleName: registerDto.role,  // Assuming 'role' is a string
    });

    return newUser;
  }

  // Add method to check if a token is blacklisted
  isTokenBlacklisted(token: string): boolean {
    return this.tokenBlacklist.has(token);
  }
  

  async logout(token: string): Promise<void> {
    if (!this.isTokenBlacklisted(token)) {
      this.tokenBlacklist.add(token); // Add token to the blacklist
    }
    console.log('Token blacklisted:', token); // Optional log for debugging
  }
}
