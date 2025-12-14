import { PointExtensions } from '@foblex/2d';
import { describe, expect, it } from 'vitest';
import { ENodeType, INode, isNodeValid, withNodesValidation } from '@flow-state';

const baseNode = (overrides: Partial<INode>): INode => ({
  key: 'node-1',
  name: 'Test node',
  description: '',
  icon: 'bolt',
  type: ENodeType.AI_PARSER,
  position: PointExtensions.initialize(),
  configuration: { prompt: null, outputFormat: null },
  ...overrides,
});

describe('node validation', () => {
  it('returns false when required configuration values are missing', () => {
    const node = baseNode({ configuration: { prompt: null, outputFormat: null } });

    expect(isNodeValid(node)).toBe(false);
  });

  it('returns true when all required fields are provided', () => {
    const node = baseNode({
      configuration: { prompt: 'Do work', outputFormat: '{ "ok": true }' },
    });

    expect(isNodeValid(node)).toBe(true);
  });

  it('adds invalid flag when mapping nodes with validation', () => {
    const nodes = withNodesValidation({
      a: baseNode({ key: 'a', configuration: { prompt: null, outputFormat: null } }),
      b: baseNode({
        key: 'b',
        configuration: { prompt: 'Prompt', outputFormat: '{ }' },
      }),
    });

    expect(nodes.a.invalid).toBe(true);
    expect(nodes.b.invalid).toBe(false);
  });
});
