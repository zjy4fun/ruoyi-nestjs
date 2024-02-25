import { Injectable } from '@nestjs/common';
import { LoginDto } from './LoginDto';
import { TokenService } from './token.service';
import * as svgCaptcha from 'svg-captcha';
import { AjaxResult } from './AjaxResult';

@Injectable()
export class LoginService {
  constructor(private readonly tokenService: TokenService) {}
  login(loginDto: LoginDto): string {
    return this.tokenService.createToken(loginDto);
  }

  getCode(res: any) {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#f60',
    });
    res.type('svg');
    const ajaxResult = new AjaxResult(200, '获取验证码成功', captcha.data);
    res.status(200).send(ajaxResult);
  }
}
