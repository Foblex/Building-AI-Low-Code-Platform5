import { ILogger } from './i-logger';

export class DefaultLogger implements ILogger {
  public log(...data: any[]): void { /* empty */ }

  public error(...data: any[]): void { /* empty */ }
}
