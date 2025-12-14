import { inject, Injectable } from '@angular/core';
import { SelectionChangeRequest } from './selection-change-request';
import { ICommand, MediatorRegister } from '@core';
import { FlowState } from '../../flow-state';
import { EChangeNotifier } from '../../e-change-notifier';

@MediatorRegister(SelectionChangeRequest)
@Injectable()
export class SelectionChange implements ICommand<SelectionChangeRequest, void> {
  private readonly _state = inject(FlowState);

  public handle({ event }: SelectionChangeRequest): void {
    this._state.update(
      {
        selection: {
          nodes: [...event.fNodeIds],
          connections: [...event.fConnectionIds],
        },
      },
      EChangeNotifier.CANVAS
    );
  }
}
