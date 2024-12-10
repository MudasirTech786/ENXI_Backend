// src/auth/auth.controller.ts
import { Controller, Post, Body, Get, BadRequestException, UnauthorizedException, UseGuards, Req} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return this.authService.login(user);
  }

  @Post('user-info')
  async getUserInfo(
    @Body() loginDto: { username: string; password: string }
  ): Promise<{ username: string; role: string }> {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password
    );
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }

    // Return only username and role
    return {
      username: user.username,
      role: user.role.name, // Assuming `role` is an object with a `name` field
    };
  }

  @Post('register')
  async register(@Body() registerDto: { username: string; password: string; role: string }) {
    try {
      // Assuming you have a method in AuthService to handle user creation
      const newUser = await this.authService.register(registerDto);
      return { message: 'User registered successfully', user: newUser };
    } catch (error) {
      throw new BadRequestException('User registration failed');
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    await this.authService.logout(token);
    return { message: 'Logged out successfully' };
  }
}
