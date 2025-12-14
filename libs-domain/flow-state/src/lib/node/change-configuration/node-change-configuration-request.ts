import { INodeConfiguration } from '../i-node-configuration';

export class NodeChangeConfigurationRequest {
  public static fToken = Symbol('NodeChangeConfigurationRequest');

  constructor(public readonly node: INodeConfiguration) {}
}
