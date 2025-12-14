import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  input,
  OnInit,
  signal,
  untracked,
} from '@angular/core';
import { FFlowModule } from '@foblex/flow';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';
import { FlowApiService } from '../../services';
import { TKey } from '@core';
import { IIfElseConnectionConfiguration } from '@flow-state';

@Component({
  selector: 'condition-connection-toolbar',
  templateUrl: './condition-connection-toolbar.html',
  styleUrl: './condition-connection-toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FFlowModule, MatTooltipModule, MatButton],
})
export class ConditionConnectionToolbar implements OnInit {
  private readonly _apiService = inject(FlowApiService);
  private readonly _injector = inject(Injector);

  public readonly key = input.required<TKey>();
  public readonly configuration = input.required<
    IIfElseConnectionConfiguration,
    Record<string, any>
  >({
    transform: (x) => x as IIfElseConnectionConfiguration,
  });

  protected readonly value = signal(true);

  public ngOnInit(): void {
    this._listenConfigurationChanges();
  }

  private _listenConfigurationChanges(): void {
    effect(
      () => {
        const configuration = this.configuration();
        untracked(() => {
          this.value.set(configuration.condition);
        });
      },
      { injector: this._injector }
    );
  }

  protected toggle(): void {
    this.value.update((x) => !x);
    this._apiService.changeConnectionConfiguration(this.key(), {
      condition: this.value(),
    });
  }
}
