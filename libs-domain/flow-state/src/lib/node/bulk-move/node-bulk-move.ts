import { inject, Injectable } from '@angular/core';
import { ICommand, MediatorRegister, TKey } from '@core';
import { IPoint } from '@foblex/2d';
import { NodeBulkMoveRequest } from './node-bulk-move-request';
import { FlowState } from '../../flow-state';
import { INode } from '../i-node';
import { EChangeNotifier } from '../../e-change-notifier';

@MediatorRegister(NodeBulkMoveRequest)
@Injectable()
export class NodeBulkMove implements ICommand<NodeBulkMoveRequest, void> {
  private readonly _state = inject(FlowState);

  public handle({ nodes }: NodeBulkMoveRequest): void {
    this._state.update(
      {
        nodes: this._changes(nodes),
      },
      EChangeNotifier.CANVAS
    );
  }

  private _changes(
    nodes: { key: TKey; position: IPoint }[]
  ): Record<string, Partial<INode>> {
    return Object.fromEntries(
      nodes.map(({ key, position }) => [key, { position }])
    );
  }
}
