import { FlowInitializeState } from './initialize-state';
import { FlowLoad } from './load';
import { FlowSave } from './save';
import { FlowReset } from './reset';
import { FlowImport } from './import';
import { FlowExport } from './export';

export const FLOW_PROVIDERS = [
  FlowImport,
  FlowExport,
  FlowInitializeState,
  FlowLoad,
  FlowReset,
  FlowSave
];
