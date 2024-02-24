import { Injectable } from '@nestjs/common';
import { LoginDto } from './LoginDto';
import { TokenService } from './token.service';

@Injectable()
export class LoginService {
  constructor(private readonly tokenService: TokenService) {}
  login(loginDto: LoginDto): string {
    return this.tokenService.createToken(loginDto);
  }
}
