import { inject, Injectable } from '@angular/core';
import { FlowLoadRequest } from './flow-load-request';
import { IndexedDBStorage, IQuery, MediatorRegister } from '@core';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { map, Observable, of, switchMap } from 'rxjs';
import { IFlow } from '../i-flow';
import { FLOW_INITIAL_MODEL } from '../flow-initial-model';
import { withNodesValidation } from '../../node';

@MediatorRegister(FlowLoadRequest)
@Injectable()
export class FlowLoad implements IQuery<FlowLoadRequest, Observable<IFlow>> {
  private readonly _indexedDB = inject(IndexedDBStorage);

  public handle(request: FlowLoadRequest): Observable<IFlow> {
    return fromPromise(this._indexedDB.getItem(request.key)).pipe(
      switchMap((x) => {
        if (x) {
          return of(x as IFlow);
        }
        return of({
          ...FLOW_INITIAL_MODEL,
          key: request.key,
        });
      }),
      map((flow) => this._applyValidation(flow))
    );
  }

  private _applyValidation(flow: IFlow): IFlow {
    return {
      ...flow,
      nodes: withNodesValidation(flow.nodes),
    };
  }
}
