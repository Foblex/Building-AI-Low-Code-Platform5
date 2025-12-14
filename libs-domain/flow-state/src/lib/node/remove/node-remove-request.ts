import { createToken, IRequest, TKey } from '@core';

export class NodeRemoveRequest implements IRequest<void> {
  public static fToken = createToken<NodeRemoveRequest, void>(
    'NodeRemoveRequest'
  );

  constructor(public readonly key: TKey) {}
}
