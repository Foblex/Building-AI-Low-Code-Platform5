import { IRequest } from '@core';
import { FCanvasChangeEvent } from '@foblex/flow';

export class TransformChangeRequest implements IRequest<void> {
  public static fToken = Symbol('TransformChangeRequest');

  constructor(public readonly event: FCanvasChangeEvent) {}
}
