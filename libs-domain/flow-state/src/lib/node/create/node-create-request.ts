import { createToken, IRequest } from '@core';
import { FCreateNodeEvent } from '@foblex/flow';
import { ENodeType } from '../e-node-type';

export class NodeCreateRequest implements IRequest<void> {
  public static fToken = createToken<NodeCreateRequest, void>(
    'NodeCreateRequest'
  );

  constructor(public readonly event: FCreateNodeEvent<ENodeType>) {}
}
