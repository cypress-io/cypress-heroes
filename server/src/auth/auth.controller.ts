import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

let count = 1;

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/')
  async login(@Request() req) {
    // if (count < 3) {
    //   count++;
    //   throw new Error('oooppsie');
    // }
    // return new Promise((res) => {
    //   setTimeout(() => {
    //     res(this.authService.login(req.user))
    //   }, 3500)
    // })
    return this.authService.login(req.user);
  }
}
