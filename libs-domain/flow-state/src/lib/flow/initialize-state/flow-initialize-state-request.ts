import { createToken, IRequest, TKey } from '@core';

export class FlowInitializeStateRequest implements IRequest<void> {
  public static fToken = createToken<FlowInitializeStateRequest, void>(
    'FlowInitializeStateRequest'
  );

  constructor(public readonly key: TKey) {}
}
