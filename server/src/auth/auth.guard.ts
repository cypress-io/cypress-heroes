import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserViewModel } from '../models/models';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';

export interface AuthedRequest extends Request {
  user: UserViewModel;
}

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthedRequest>();

    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler()
    );

    let user: User;
    if (request.headers.authorization) {
      await (super.canActivate(context) as Promise<boolean>);
      user = request.user;
    }
    if (requiredRoles) {
      if (!user) {
        return false;
      }
      if (requiredRoles.indexOf('admin') >= 0) {
        return user.isAdmin;
      }
      return true;
    } else {
      return true;
    }
  }
}
