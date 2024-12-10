import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service'; // Ensure correct import
import { Observable } from 'rxjs'; // Import Observable if needed

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: any): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1]; // Extract token from authorization header
  
    console.log('Token:', token); // Log the token for debugging purposes
  
    // Call the base class's canActivate method first (for basic JWT validation)
    const isAuthenticated = await super.canActivate(context) as boolean;
  
    if (!isAuthenticated) {
      throw new UnauthorizedException('Authentication failed');
    }
  
    // Check if the token is blacklisted
    // if (token && this.authService.isTokenBlacklisted(token)) {
    //   console.log('Token is blacklisted'); // Log blacklist check
    //   throw new UnauthorizedException('Token is invalid (logged out)');
    // }
  
    return true;
  }
  
}
