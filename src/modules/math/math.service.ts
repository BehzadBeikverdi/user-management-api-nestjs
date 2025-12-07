import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Math!';
  }

  getGoodbye(): string {
    return 'Goodbye Math!';
  }

  sumCalculate(a: number, b: number): number {
    return a + b;
  }

  negCalculate(a: number, b: number): number {
    return a - b;
  }

  multiCalculate(a: number, b: number): number {
    return a * b;
  }

  divideCalculate(a: number, b: number): number {
    return a / b;
  }
}
