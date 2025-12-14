import { inject, Injectable } from '@angular/core';
import { guid, ICommand, MediatorRegister } from '@core';
import { PointExtensions } from '@foblex/2d';
import { NodeCreateRequest } from './node-create-request';
import { FlowState } from '../../flow-state';
import { EChangeNotifier } from '../../e-change-notifier';
import { INode } from '../i-node';
import { FCreateNodeEvent } from '@foblex/flow';
import { ENodeType } from '../e-node-type';
import { DEFAULT_NODE_MAP } from '../default-node-map';
import { isNodeValid } from '../node-validation';

@MediatorRegister(NodeCreateRequest)
@Injectable()
export class NodeCreate implements ICommand<NodeCreateRequest, void> {
  private readonly _state = inject(FlowState);

  public handle({ event }: NodeCreateRequest): void {
    this._addToState(this._node(event));
  }

  private _addToState(node: INode): void {
    this._state.create(
      {
        nodes: { [node.key]: node },
        selection: {
          nodes: [node.key],
          connections: [],
        },
      },
      EChangeNotifier.CANVAS
    );
  }

  private _node(event: FCreateNodeEvent<ENodeType>): INode {
    const key = guid();
    const base = DEFAULT_NODE_MAP[event.data];

    if (!base) {
      throw new Error(`Node type ${event.data} is not supported.`);
    }

    return {
      ...base,
      key,
      type: event.data,
      position: event.rect ?? PointExtensions.initialize(),
      invalid: !isNodeValid({
        ...base,
        type: event.data,
        configuration: base.configuration,
      }),
    };
  }
}
