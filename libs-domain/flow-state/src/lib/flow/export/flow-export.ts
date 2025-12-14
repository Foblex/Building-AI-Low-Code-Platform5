import { inject, Injectable } from '@angular/core';
import { FlowExportRequest } from './flow-export-request';
import { IQuery, MediatorRegister } from '@core';
import { FlowState } from '../../flow-state';

const FILE_NAME_SANITIZE_PATTERN = /[^a-zA-Z0-9-_.]+/g;
const FILE_NAME_SEPARATOR_PATTERN = /[-_.]{2,}/g;
const FILE_NAME_TRIM_PATTERN = /^[._-]+|[._-]+$/g;

@MediatorRegister(FlowExportRequest)
@Injectable()
export class FlowExport implements IQuery<FlowExportRequest, void> {
  private readonly _state = inject(FlowState);

  public handle(): void {
    const snapshot = this._state.getSnapshot();
    const fileName = this._sanitizeFileName(snapshot.name || 'flow');
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${fileName}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  private _sanitizeFileName(name: string): string {
    const cleaned = name
      .replace(FILE_NAME_SANITIZE_PATTERN, '-')
      .replace(FILE_NAME_SEPARATOR_PATTERN, '-');
    const trimmed = cleaned.replace(FILE_NAME_TRIM_PATTERN, '');
    return trimmed || 'flow';
  }
}
