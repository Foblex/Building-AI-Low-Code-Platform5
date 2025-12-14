import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FFlowModule } from '@foblex/flow';
import { ENodeType, INode } from '@flow-state';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlowApiService } from '../../services';
import { TKey } from '@core';

@Component({
  selector: 'node',
  templateUrl: './node.html',
  styleUrl: './node.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FFlowModule, MatIcon, MatTooltipModule],
  host: {
    '[class.invalid]': 'viewModel().invalid',
  },
})
export class Node {
  private readonly _apiService = inject(FlowApiService);

  public readonly viewModel = input.required<INode>();

  protected readonly eTypes = ENodeType;

  protected removeNode(key: TKey): void {
    this._apiService.removeNode(key);
  }
}
