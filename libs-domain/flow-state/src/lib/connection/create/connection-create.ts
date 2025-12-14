import { inject, Injectable } from '@angular/core';
import { ConnectionCreateRequest } from './connection-create-request';
import { ICommand, MediatorRegister, TKey } from '@core';
import { FlowState } from '../../flow-state';
import { FCreateConnectionEvent } from '@foblex/flow';
import { IConnection } from '../i-connection';
import { generateGuid } from '@foblex/utils';
import { EChangeNotifier } from '../../e-change-notifier';
import { EConnectionType } from '../e-connection-type';
import { ENodeType } from '../../node';
import { DEFAULT_CONNECTION_MAP } from '../default-connection-map';

@MediatorRegister(ConnectionCreateRequest)
@Injectable()
export class ConnectionCreate
  implements ICommand<ConnectionCreateRequest, void>
{
  private readonly _state = inject(FlowState);

  public handle({ event }: ConnectionCreateRequest): void {
    const connection = this._connection(event);

    this._state.create(
      {
        connections: {
          [connection.key]: connection,
        },
      },
      EChangeNotifier.CANVAS
    );
  }

  private _getConnectionType(key: TKey): EConnectionType {
    const nodeType = this._state.getSnapshot().nodes[key].type;
    switch (nodeType) {
      case ENodeType.CONDITIONAL_BRANCH:
        return EConnectionType.IF_ELSE;
      default:
        return EConnectionType.DEFAULT;
    }
  }

  private _connection(event: FCreateConnectionEvent): IConnection {
    const type = this._getConnectionType(event.fOutputId as TKey);

    return {
      key: generateGuid(),
      source: event.fOutputId as TKey,
      target: event.fInputId as TKey,
      type: type,
      ...DEFAULT_CONNECTION_MAP[type],
    };
  }
}
