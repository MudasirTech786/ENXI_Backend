import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Ensure expiration is checked
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // Log the payload for debugging
    console.log('JWT Payload:', payload);

    const token = ExtractJwt.fromAuthHeaderAsBearerToken();
    if (this.authService.isTokenBlacklisted(token)) {
      throw new UnauthorizedException('Token is invalid (logged out)');
    }
    
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}
