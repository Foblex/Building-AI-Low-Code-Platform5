import { FSelectionChangeEvent } from '@foblex/flow';
import { IRequest } from '@core';

export class SelectionChangeRequest implements IRequest<void> {
  public static fToken = Symbol('SelectionChangeRequest');

  constructor(public readonly event: FSelectionChangeEvent) {}
}
