import { Injectable } from '@nestjs/common';
import { LoginDto } from './login.controller';

@Injectable()
export class LoginService {
  // TODO 生成 token
  login(loginDto: LoginDto): string {
    console.log(loginDto);
    return 'login';
  }
}
