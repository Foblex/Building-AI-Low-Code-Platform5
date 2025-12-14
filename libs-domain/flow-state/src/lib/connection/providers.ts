import { ConnectionCreate } from './create';
import { ConnectionReassign } from './reassign';
import { ConnectionRemove } from './remove';
import { ConnectionChangeConfiguration } from './change-configuration';

export const CONNECTION_PROVIDERS = [
  ConnectionChangeConfiguration,
  ConnectionCreate,
  ConnectionReassign,
  ConnectionRemove,
];
