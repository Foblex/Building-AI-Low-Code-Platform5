import { IRequest } from '@core';
import { Observable } from 'rxjs';
import { IFlow } from '../i-flow';

export class FlowImportRequest implements IRequest<Observable<IFlow>> {
  public static fToken = Symbol('FlowImportRequest');

  constructor(public readonly content: string) {}
}
