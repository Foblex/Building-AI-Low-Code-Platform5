import { ENodeType } from './e-node-type';
import { TKey } from '@core';

export interface INodeConfiguration {
  key: TKey;
  name?: string | null;
  description?: string | null;
  type: ENodeType;
  configuration?: Record<string, any> | null;
  invalid?: boolean;
}
