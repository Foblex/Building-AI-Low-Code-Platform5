import { PointExtensions } from '@foblex/2d';
import { DEFAULT_NODE_MAP, ENodeType } from '../node';
import { IFlow } from './i-flow';

export const FLOW_INITIAL_MODEL: IFlow = {
  key: 'flow-1',
  name: 'New Flow',
  nodes: {
    node1: {
      ...DEFAULT_NODE_MAP[ENodeType.START],
      key: 'node1',
      type: ENodeType.START,
      position: PointExtensions.initialize(),
    },
  },
  connections: {},
};
