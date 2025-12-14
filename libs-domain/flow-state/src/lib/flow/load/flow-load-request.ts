import { IRequest, TKey } from '@core';
import { Observable } from 'rxjs';
import { IFlow } from '../i-flow';

export class FlowLoadRequest implements IRequest<Observable<IFlow>> {
  public static fToken = Symbol('FlowLoadRequest');

  constructor(public readonly key: TKey) {}
}
