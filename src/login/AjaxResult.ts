import { Injectable } from '@nestjs/common';

@Injectable()
export class AjaxResult {
  private code: number;
  private msg: string;
  private data: any;

  constructor(code: number, msg: string, data?: any) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  static success(msg: string = '操作成功', data?: any): AjaxResult {
    return new AjaxResult(200, msg, data);
  }

  static warn(msg: string, data?: any): AjaxResult {
    return new AjaxResult(400, msg, data);
  }

  static error(msg: string = '操作失败', data?: any): AjaxResult {
    return new AjaxResult(500, msg, data);
  }

  isSuccess(): boolean {
    return this.code === 200;
  }

  isWarn(): boolean {
    return this.code === 400;
  }

  isError(): boolean {
    return this.code === 500;
  }

  getCode(): number {
    return this.code;
  }

  getMsg(): string {
    return this.msg;
  }

  getData(): any {
    return this.data;
  }

  setData(data: any): void {
    this.data = data;
  }
}
