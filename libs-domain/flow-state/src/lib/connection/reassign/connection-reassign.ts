import { inject, Injectable } from '@angular/core';
import { ConnectionReassignRequest } from './connection-reassign-request';
import { ICommand, MediatorRegister } from '@core';
import { FlowState } from '../../flow-state';
import { EChangeNotifier } from '../../e-change-notifier';

@MediatorRegister(ConnectionReassignRequest)
@Injectable()
export class ConnectionReassign implements ICommand<ConnectionReassignRequest, void> {
  private readonly _state = inject(FlowState);

  public handle({ event }: ConnectionReassignRequest): void {
    this._state.update(
      {
        connections: {
          [event.connectionId]: {
            target: event.newTargetId
          },
        },
      },
      EChangeNotifier.CANVAS
    );
  }
}
