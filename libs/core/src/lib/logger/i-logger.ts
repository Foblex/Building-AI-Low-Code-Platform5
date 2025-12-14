import { InjectionToken } from '@angular/core';

export const LOGGER_TOKEN = new InjectionToken<ILogger>('LOGGER_TOKEN');

export interface ILogger {
  log(...data: any[]): void;
  error(...data: any[]): void;
}
