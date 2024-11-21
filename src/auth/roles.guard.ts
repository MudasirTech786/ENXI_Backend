import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // No roles required, so allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Assuming user.role is an object, access the name or string value of the role
    const userRole = user.role?.name?.toLowerCase() || user.role?.toLowerCase();
    if (!userRole) {
      throw new ForbiddenException('User role not found');
    }

    // Check if the user's role is included in the required roles
    if (requiredRoles.includes(userRole)) {
      return true;
    }

    throw new ForbiddenException('Access denied');
  }
}
