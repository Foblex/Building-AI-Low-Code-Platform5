import { IRequest } from '@core';
import { Observable } from 'rxjs';
import { IFlow } from '../i-flow';

export class FlowExportRequest implements IRequest<Observable<IFlow>> {
  public static fToken = Symbol('FlowExportRequest');
}
