import { inject, Injectable } from '@angular/core';
import { IHandler, MediatorRegister } from '@core';
import { FlowState } from '../../flow-state';
import { NodeChangeConfigurationRequest } from './node-change-configuration-request';
import { EChangeNotifier } from '../../e-change-notifier';
import { isNodeValid } from '../node-validation';

@MediatorRegister(NodeChangeConfigurationRequest)
@Injectable()
export class NodeChangeConfiguration
  implements IHandler<NodeChangeConfigurationRequest, void>
{
  private readonly _state = inject(FlowState);

  public handle({ node }: NodeChangeConfigurationRequest): void {
    this._state.update(
      {
        nodes: {
          [node.key]: {
            name: node.name,
            description: node.description,
            configuration: node.configuration,
            invalid: !isNodeValid(node),
          },
        },
      },
      EChangeNotifier.CONFIGURATION_PANEL
    );
  }
}
