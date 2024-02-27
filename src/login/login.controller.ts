import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './LoginDto';
import { AjaxResult } from './AjaxResult';

@ApiTags('login')
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto): string {
    return this.loginService.login(loginDto);
  }

  @Get('/captchaImage')
  getCode(@Res() res: any): AjaxResult {
    return this.loginService.getCode(res);
  }
}
