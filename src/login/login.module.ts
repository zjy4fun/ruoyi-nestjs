import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TokenService } from './token.service';

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [LoginService, TokenService],
})
export class LoginModule {}
