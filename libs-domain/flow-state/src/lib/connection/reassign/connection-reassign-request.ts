import { FReassignConnectionEvent } from '@foblex/flow';
import { IRequest } from '@core';

export class ConnectionReassignRequest implements IRequest<void> {
  public static fToken = Symbol('ConnectionReassignRequest');

  constructor(public readonly event: FReassignConnectionEvent) {}
}
