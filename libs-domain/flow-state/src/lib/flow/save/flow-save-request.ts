import { createToken, IRequest } from '@core';

export class FlowSaveRequest implements IRequest<void> {
  public static fToken = createToken<FlowSaveRequest, void>(
    'FlowSaveRequest'
  );
}
