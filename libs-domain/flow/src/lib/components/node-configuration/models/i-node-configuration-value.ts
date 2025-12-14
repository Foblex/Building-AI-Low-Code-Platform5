export interface INodeConfigurationValue {
  key?: string | null;
  name?: string | null;
  description?: string | null;
  configuration?: Record<string, any> | null;
}
