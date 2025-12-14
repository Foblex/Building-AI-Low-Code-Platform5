import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input
} from '@angular/core';
import { FFlowModule } from '@foblex/flow';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { FlowApiService } from '../../services';
import { TKey } from '@core';

@Component({
  selector: 'remove-connection-button',
  templateUrl: './remove-connection-button.html',
  styleUrl: './remove-connection-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FFlowModule, MatTooltipModule, MatIcon],
})
export class RemoveConnectionButton {
  private readonly _apiService = inject(FlowApiService);

  public readonly key = input.required<TKey>();

  protected removeConnection(): void {
    this._apiService.removeConnection(this.key());
  }
}
