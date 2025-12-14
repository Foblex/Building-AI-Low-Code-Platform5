import { TKey } from '@core';
import { EConnectionType } from './e-connection-type';

export interface IConnection {
  key: TKey;
  source: TKey;
  target: TKey;
  type: EConnectionType;
  configuration: Record<string, any>;
}
