import { CONNECTION_PROVIDERS } from './connection';
import { FLOW_PROVIDERS } from './flow';
import { NODE_PROVIDERS } from './node';
import { SELECTION_PROVIDERS } from './selection';
import { TRANSFORM_PROVIDERS } from './transform';
import { FlowState } from './flow-state';

export const FLOW_STATE_PROVIDERS = [
  FlowState,
  ...CONNECTION_PROVIDERS,
  ...FLOW_PROVIDERS,
  ...NODE_PROVIDERS,
  ...SELECTION_PROVIDERS,
  ...TRANSFORM_PROVIDERS,
];
