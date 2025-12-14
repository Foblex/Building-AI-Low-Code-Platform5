import { inject, Injectable } from '@angular/core';
import { ICommand, MediatorRegister, TKey } from '@core';
import { FlowState } from '../../flow-state';
import { EChangeNotifier } from '../../e-change-notifier';
import { NodeRemoveRequest } from './node-remove-request';
import { IConnection } from '../../connection';

@MediatorRegister(NodeRemoveRequest)
@Injectable()
export class NodeRemove implements ICommand<NodeRemoveRequest, void> {
  private readonly _state = inject(FlowState);

  public handle({ key }: NodeRemoveRequest): void {
    const snapshot = this._state.getSnapshot();
    const connectionsToRemove = this._getConnectionsToRemove(
      snapshot.connections,
      key
    );

    this._state.delete(
      {
        nodes: { [key]: null },
        connections: this._asNullMap(connectionsToRemove),
      },
      EChangeNotifier.CANVAS
    );
  }

  private _getConnectionsToRemove(
    connections: Record<TKey, IConnection>,
    nodeKey: TKey
  ): TKey[] {
    return Object.values(connections)
      .filter(
        (connection) =>
          connection.source === nodeKey || connection.target === nodeKey
      )
      .map((connection) => connection.key);
  }

  private _asNullMap(keys: TKey[]): Record<TKey, null> {
    return keys.reduce<Record<TKey, null>>((acc, connectionKey) => {
      acc[connectionKey] = null;
      return acc;
    }, {});
  }
}
