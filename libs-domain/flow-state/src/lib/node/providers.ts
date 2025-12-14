import { NodeBulkMove } from './bulk-move';
import { NodeCreate } from './create';
import { NodeGetConfiguration } from './get-configuration';
import { NodeChangeConfiguration } from './change-configuration';
import { NodeRemove } from './remove';

export const NODE_PROVIDERS = [
  NodeBulkMove,
  NodeGetConfiguration,
  NodeChangeConfiguration,
  NodeCreate,
  NodeRemove
];
