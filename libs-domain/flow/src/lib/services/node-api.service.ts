import { inject, Injectable } from '@angular/core';
import { Mediator } from '@core';
import {
  INodeConfiguration,
  NodeChangeConfigurationRequest,
  NodeGetConfigurationRequest,
} from '@flow-state';

@Injectable()
export class NodeApiService {
  private readonly _mediator = inject(Mediator);

  public get(): INodeConfiguration {
    return this._mediator.send(new NodeGetConfigurationRequest());
  }

  public change(node: INodeConfiguration): void {
    this._mediator.send(new NodeChangeConfigurationRequest(node));
  }
}
