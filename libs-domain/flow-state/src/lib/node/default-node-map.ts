import { ENodeType } from './e-node-type';

export interface IDefaultNode {
  name: string;
  description: string;
  icon: string;
  configuration?: Record<string, any>;
}

export const DEFAULT_NODE_MAP: Record<ENodeType, IDefaultNode> = {
  [ENodeType.START]: {
    name: 'Start',
    description: 'Start: incoming request',
    icon: 'link',
    configuration: {
      incomingData: null,
    },
  },
  [ENodeType.AI_PARSER]: {
    name: 'AI Parser',
    description: 'Extract JSON fields',
    icon: 'code_blocks',
    configuration: {
      prompt: null,
      outputFormat: null,
    },
  },
  [ENodeType.AI_VALIDATOR]: {
    name: 'AI Validator',
    description: 'AI data checker',
    icon: 'check_circle',
    configuration: {
      prompt: null,
      expectedSchema: null,
    },
  },
  [ENodeType.AI_EXECUTOR]: {
    name: 'AI Executor',
    description: 'AI-powered action',
    icon: 'psychology',
    configuration: {
      prompt: null,
      resultType: null,
    },
  },
  [ENodeType.CONDITIONAL_BRANCH]: {
    name: 'If-Else',
    description: 'Conditional branching',
    icon: 'fork_right',
    configuration: {
      prompt: null,
    },
  },
  [ENodeType.LOGGER]: {
    name: 'Logger',
    description: 'Flow logging',
    icon: 'terminal',
    configuration: {
      output: null,
    },
  },
};
