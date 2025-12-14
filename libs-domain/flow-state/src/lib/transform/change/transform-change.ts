import { inject, Injectable } from '@angular/core';
import { TransformChangeRequest } from './transform-change-request';
import { ICommand, MediatorRegister } from '@core';
import { EChangeNotifier } from '../../e-change-notifier';
import { FlowState } from '../../flow-state';

@MediatorRegister(TransformChangeRequest)
@Injectable()
export class TransformChange implements ICommand<TransformChangeRequest, void> {
  private readonly _state = inject(FlowState);

  public handle({ event }: TransformChangeRequest): void {
    this._state.update(
      {
        transform: {
          position: event.position,
          scale: event.scale,
        },
      },
      EChangeNotifier.CANVAS
    );
  }
}
