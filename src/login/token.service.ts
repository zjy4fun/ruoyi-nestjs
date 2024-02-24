import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  createToken(payload: any): string {
    const secretKey = 'your_secret_key';
    const expiresIn = '1h';
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  }
}
