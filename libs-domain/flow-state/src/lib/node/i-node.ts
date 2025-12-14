import { IPoint } from '@foblex/2d';
import { ENodeType } from './e-node-type';
import { TKey } from '@core';

export interface INode {
  key: TKey;
  name?: string | null;
  description?: string | null;
  icon: string;
  type: ENodeType;
  position: IPoint;
  configuration?: Record<string, any> | null;
  invalid?: boolean;
}
