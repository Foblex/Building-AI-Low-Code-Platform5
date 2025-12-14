import { createToken, IRequest, TKey } from '@core';
import { IPoint } from '@foblex/2d';

export class NodeBulkMoveRequest implements IRequest<void> {
  public static fToken = createToken<NodeBulkMoveRequest, void>(
    'NodeBulkMoveRequest'
  );

  constructor(
    public readonly nodes: { key: TKey; position: IPoint }[]
  ) {}
}
