import { inject, Injectable } from '@angular/core';
import { ICommand, Mediator, MediatorRegister, TKey } from '@core';
import { FlowInitializeStateRequest } from './flow-initialize-state-request';
import { FlowState } from '../../flow-state';
import { Observable, take } from 'rxjs';
import { IFlow } from '../i-flow';
import { FlowLoadRequest } from '../load';

@MediatorRegister(FlowInitializeStateRequest)
@Injectable()
export class FlowInitializeState
  implements ICommand<FlowInitializeStateRequest, void>
{
  private readonly _mediator = inject(Mediator);
  private readonly _state = inject(FlowState);

  public handle({ key }: FlowInitializeStateRequest): void {
    this._loadEntity(key)
      .pipe(take(1))
      .subscribe((x) => this._initializeState(x));
  }

  private _loadEntity(key: TKey): Observable<IFlow> {
    return this._mediator.send(new FlowLoadRequest(key));
  }

  private _initializeState(entity: IFlow): void {
    this._state.initialize(entity);
  }
}
