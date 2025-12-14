import { inject, Injectable } from '@angular/core';
import { FlowResetRequest } from './flow-reset-request';
import { IndexedDBStorage, IQuery, MediatorRegister } from '@core';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { take } from 'rxjs';
import { IFlow } from '../i-flow';
import { FLOW_INITIAL_MODEL } from '../flow-initial-model';
import { FlowState } from '../../flow-state';
import { withNodesValidation } from '../../node';

@MediatorRegister(FlowResetRequest)
@Injectable()
export class FlowReset implements IQuery<FlowResetRequest, void> {
  private readonly _indexedDB = inject(IndexedDBStorage);
  private readonly _state = inject(FlowState);

  public handle(request: FlowResetRequest): void {
    const flow = {
      ...FLOW_INITIAL_MODEL,
      key: request.key,
    };
    const validatedFlow = {
      ...flow,
      nodes: withNodesValidation(flow.nodes),
    };

    fromPromise(
      this._indexedDB.setItem(request.key, validatedFlow)
    )
      .pipe(take(1))
      .subscribe(() => this._initializeState(validatedFlow));
  }

  private _initializeState(entity: IFlow): void {
    this._state.initialize(entity);
  }
}
