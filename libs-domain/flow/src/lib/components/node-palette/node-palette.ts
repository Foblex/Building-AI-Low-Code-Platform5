import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { FFlowModule } from '@foblex/flow';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DEFAULT_NODE_MAP } from '@flow-state';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'node-palette',
  templateUrl: './node-palette.html',
  styleUrl: './node-palette.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FFlowModule,
    MatTooltipModule,
    MatIcon,
  ],
})
export class NodePalette {
  protected readonly nodes = Object.entries(DEFAULT_NODE_MAP).map((value) => {
    return {
      ...value[1],
      type: value[0],
    };
  });
}
