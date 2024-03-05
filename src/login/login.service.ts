import { Injectable } from '@nestjs/common';
import { LoginDto } from './LoginDto';
import { TokenService } from './token.service';
import * as svgCaptcha from 'svg-captcha';
import { AjaxResult } from '../domain/AjaxResult';
import { v4 as uuidv4 } from 'uuid';
import { Buffer } from 'buffer';

@Injectable()
export class LoginService {
  constructor(private readonly tokenService: TokenService) {
  }

  login(loginDto: LoginDto): string {
    return this.tokenService.createToken(loginDto);
  }

  getCode(): AjaxResult {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#f60',
    });
    const uuid = uuidv4();
    // TODO 把 verifyKey 和 code 保存到 redis 中
    const verifyKey = 'captcha_codes:' + uuid;
    const code = captcha.text;

    const data = {
      uuid: uuid,
      img: captcha.data,
    };
    const ajaxResult = AjaxResult.success('获取验证码成功', data);
    return ajaxResult;
  }
}
