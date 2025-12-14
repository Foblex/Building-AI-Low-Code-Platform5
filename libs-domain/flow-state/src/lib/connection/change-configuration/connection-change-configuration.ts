import { inject, Injectable } from '@angular/core';
import { ICommand, MediatorRegister } from '@core';
import { ConnectionChangeConfigurationRequest } from './connection-change-configuration-request';
import { FlowState } from '../../flow-state';
import { EChangeNotifier } from '../../e-change-notifier';

@MediatorRegister(ConnectionChangeConfigurationRequest)
@Injectable()
export class ConnectionChangeConfiguration
  implements ICommand<ConnectionChangeConfigurationRequest, void>
{
  private readonly _state = inject(FlowState);

  public handle({ key, configuration }: ConnectionChangeConfigurationRequest): void {
    this._state.update(
      {
        connections: {
          [key]: {
            configuration,
          },
        },
      },
      EChangeNotifier.CANVAS
    );
  }
}
