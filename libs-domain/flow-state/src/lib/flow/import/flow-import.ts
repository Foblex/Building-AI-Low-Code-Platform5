import { inject, Injectable } from '@angular/core';
import { FlowImportRequest } from './flow-import-request';
import { IQuery, MediatorRegister } from '@core';
import { IFlow } from '../i-flow';
import { FlowState } from '../../flow-state';

@MediatorRegister(FlowImportRequest)
@Injectable()
export class FlowImport implements IQuery<FlowImportRequest, void> {
  private readonly _state = inject(FlowState);

  public handle({ content }: FlowImportRequest): void {
    const parsed = JSON.parse(content) as IFlow | undefined;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Invalid flow JSON structure');
    }

    this._state.initialize({
      ...parsed,
    });
  }
}
