import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly authService: AuthService,
  ) {}
  // 登录
  @Post('login')
  async login(@Body() loginParams: any) {
    const authResult = await this.authService.validateUser(
      loginParams.username,
      loginParams.password,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };

      default:
        return {
          code: 600,
          msg: '查无此人',
        };
    }
  }
  // 注册
  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  async register(@Body() body: any) {
    return await this.usersService.register(body);
  }
}
