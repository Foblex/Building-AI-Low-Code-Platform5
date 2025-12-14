import { IRequest, TKey } from '@core';
import { Observable } from 'rxjs';
import { IFlow } from '../i-flow';

export class FlowResetRequest implements IRequest<Observable<IFlow>> {
  public static fToken = Symbol('FlowResetRequest');

  constructor(public readonly key: TKey) {}
}
