import { Injectable } from '@angular/core';
import { ILogger } from './i-logger';

@Injectable()
export class ConsoleLogger implements ILogger {

  public log(...data: any[]): void {
    console.log(data);
  }

  public error(...data: any[]): void {
    console.error(data);
  }
}
