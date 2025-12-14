import { inject, Injectable } from '@angular/core';
import { NodeGetConfigurationRequest } from './node-get-configuration-request';
import { IHandler, MediatorRegister } from '@core';
import { FlowState } from '../../flow-state';
import { INode } from '../i-node';
import { IFlow } from '../../flow';
import { INodeConfiguration } from '../i-node-configuration';

@MediatorRegister(NodeGetConfigurationRequest)
@Injectable()
export class NodeGetConfiguration
  implements IHandler<NodeGetConfigurationRequest, INodeConfiguration>
{
  private readonly _state = inject(FlowState);

  public handle(): INodeConfiguration {
    const current = this._getSelectedNode();

    return {
      key: current.key,
      type: current.type,
      name: current.name,
      description: current.description,
      configuration: current.configuration,
    };
  }

  private _getSelectedNode(): INode {
    const current = this._state.getSnapshot();

    const firstSelectedNodeId = this._getFirstSelectedNodeId(current);

    let result: INode | undefined;
    if (firstSelectedNodeId) {
      result = current.nodes[firstSelectedNodeId];
    }

    if (!result) {
      throw new Error('No node selected');
    }
    return result;
  }

  private _getFirstSelectedNodeId(snapshot: IFlow): string | undefined {
    return snapshot.selection?.nodes.length
      ? snapshot.selection.nodes[0]
      : undefined;
  }
}
