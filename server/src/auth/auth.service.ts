import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserViewModel } from '../models/models';
import { UsersService } from '../users/users.service';
import { validatePassword } from '../utils/cypto';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.getByUsername(username);
      if (user) {
        const isPasswordValid = await validatePassword(pass, user.password);
        if (isPasswordValid) {
          const { password, ...result } = user;
          return result;
        }
      }
      return null;
    } catch (ex) {
      if (ex.name === 'NotFoundError') {
        throw new UnauthorizedException();
      } else {
        throw ex;
      }
    }
  }

  async login(user: UserViewModel) {
    const payload = {
      username: user.email,
      sub: user.id,
      isAdmin: user.isAdmin,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
      expiresAt: Math.floor(
        new Date().getTime() / 1000 + jwtConstants.expireSecs,
      ),
    };
  }
}
