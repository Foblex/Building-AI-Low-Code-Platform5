import { inject, Injectable } from '@angular/core';
import {
  ICommand,
  IndexedDBStorage,
  MediatorRegister,
} from '@core';
import { FlowSaveRequest } from './flow-save-request';
import { FlowState } from '../../flow-state';

@MediatorRegister(FlowSaveRequest)
@Injectable()
export class FlowSave implements ICommand<FlowSaveRequest, void> {
  private readonly _indexedDB = inject(IndexedDBStorage);
  private readonly _state = inject(FlowState);

  public handle(): void {
    console.log(`[FlowSave] 123`);
    const current = this._state.getSnapshot();
    console.log(current.key);
    this._indexedDB.setItem(current.key, current).finally(() => {
      console.log('save')
      // Saved
    });
  }
}
