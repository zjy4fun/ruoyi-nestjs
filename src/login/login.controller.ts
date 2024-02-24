import { Body, Controller, Get } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiTags } from '@nestjs/swagger';

export class LoginDto {
  username: string;
  password: string;
}

@ApiTags('login')
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('/login')
  login(@Body() loginDto: LoginDto): string {
    return this.loginService.login(loginDto);
  }
}
