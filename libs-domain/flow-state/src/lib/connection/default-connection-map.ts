import { EConnectionType } from './e-connection-type';

export interface IDefaultConnection {
  configuration: Record<string, any>;
}

export interface IIfElseConnectionConfiguration {
  condition: boolean;
}

export const DEFAULT_CONNECTION_MAP: Record<
  EConnectionType,
  IDefaultConnection
> = {
  [EConnectionType.IF_ELSE]: {
    configuration: {
      condition: true,
    },
  },
  [EConnectionType.DEFAULT]: {
    configuration: {},
  },
};
