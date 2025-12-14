import { TKey } from '@core';
import { ENodeType } from './e-node-type';
import { INode } from './i-node';

const isFilled = (value: unknown): boolean => {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return true;
};

const validateConfiguration = (
  type: ENodeType,
  configuration: Record<string, unknown> | null | undefined
): boolean => {
  if (!configuration) {
    return false;
  }

  const requiredFields: Record<ENodeType, string[]> = {
    [ENodeType.START]: ['incomingData'],
    [ENodeType.AI_PARSER]: ['prompt', 'outputFormat'],
    [ENodeType.AI_VALIDATOR]: ['prompt', 'expectedSchema'],
    [ENodeType.AI_EXECUTOR]: ['prompt', 'resultType'],
    [ENodeType.CONDITIONAL_BRANCH]: ['prompt'],
    [ENodeType.LOGGER]: ['output'],
  };

  return (requiredFields[type] ?? []).every((field) =>
    isFilled(configuration[field])
  );
};

export const isNodeValid = (
  node: Pick<INode, 'name' | 'configuration' | 'type'>
): boolean => {
  if (!isFilled(node.name)) {
    return false;
  }

  return validateConfiguration(node.type, node.configuration);
};

export const withNodesValidation = (
  nodes: Record<TKey, INode>
): Record<TKey, INode> => {
  return Object.values(nodes).reduce<Record<TKey, INode>>((acc, node) => {
    acc[node.key] = {
      ...node,
      invalid: !isNodeValid(node),
    };
    return acc;
  }, {});
};
