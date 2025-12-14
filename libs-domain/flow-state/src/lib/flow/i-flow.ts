import { TKey } from '@core';
import { INode } from '../node';
import { IConnection } from '../connection';
import { ISelection } from '../selection';
import { ITransform } from '../transform';

export interface IFlow {
  key: TKey;

  name: string;

  nodes: Record<TKey, INode>;

  connections: Record<TKey, IConnection>;

  selection?: ISelection;

  transform?: ITransform;
}
