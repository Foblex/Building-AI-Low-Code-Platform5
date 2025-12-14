import { inject, Injectable } from '@angular/core';
import { ConnectionRemoveRequest } from './connection-remove-request';
import { ICommand, MediatorRegister } from '@core';
import { FlowState } from '../../flow-state';
import { EChangeNotifier } from '../../e-change-notifier';

@MediatorRegister(ConnectionRemoveRequest)
@Injectable()
export class ConnectionRemove implements ICommand<ConnectionRemoveRequest, void> {
  private readonly _state = inject(FlowState);

  public handle({ key }: ConnectionRemoveRequest): void {
    this._state.delete(
      {
        connections: {
          [key]: null,
        },
      },
      EChangeNotifier.CANVAS
    );
  }
}
