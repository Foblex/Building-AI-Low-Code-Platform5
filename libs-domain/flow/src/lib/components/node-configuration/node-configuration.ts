import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  Injector,
  OnInit,
  signal,
  untracked,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfigurationGroupHeader } from '@shared-components';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { INodeConfigurationForm, INodeConfigurationValue } from './models';
import { IMutatorChange } from '@foblex/mutator';
import {
  EChangeNotifier,
  ENodeType,
  FlowState,
  INodeConfiguration,
} from '@flow-state';
import { NodeApiService } from '../../services';
import { AiParserConfiguration } from '@node-configuration-ai-parser';
import { AiValidatorConfiguration } from '@node-configuration-ai-validator';
import { AiExecutorConfiguration } from '@node-configuration-ai-executor';
import { LoggerConfiguration } from '@node-configuration-logger';
import { ConditionalBranchConfiguration } from '@node-configuration-conditional-branch';
import { StartConfiguration } from '@node-configuration-start';
import { distinctUntilChanged } from 'rxjs';
import { debounceWithDestroyAndFlush } from '@core';

@Component({
  selector: 'node-configuration',
  templateUrl: './node-configuration.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NodeApiService],
  imports: [
    ReactiveFormsModule,
    ConfigurationGroupHeader,
    MatFormField,
    MatInput,
    CdkTextareaAutosize,
    AiParserConfiguration,
    AiValidatorConfiguration,
    AiExecutorConfiguration,
    LoggerConfiguration,
    ConditionalBranchConfiguration,
    StartConfiguration,
  ],
})
export class NodeConfiguration implements OnInit {
  protected formGroup!: FormGroup<INodeConfigurationForm>;

  protected readonly eTypes = ENodeType;
  protected readonly type = signal<ENodeType | undefined>(undefined);

  private readonly _apiService = inject(NodeApiService);
  private readonly _state = inject(FlowState);
  private readonly _injector = inject(Injector);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _fb = inject(FormBuilder);

  public ngOnInit(): void {
    this.formGroup = this._buildForm();
    this._listenStateChanges();
    this._subscribeToValueChanges();
  }

  private _listenStateChanges(): void {
    effect(
      () => {
        const change = this._state.changes();
        untracked(() => this._updateViewModel(change));
      },
      { injector: this._injector }
    );
  }

  private _updateViewModel(change: IMutatorChange): void {
    if (change.notifier === EChangeNotifier.CONFIGURATION_PANEL) {
      return;
    }
    const data = this._apiService.get();
    this.type.set(data.type);
    this._applyFormData(data);
  }

  private _applyFormData(value: INodeConfiguration): void {
    this.formGroup.reset({}, { emitEvent: false });
    this.formGroup.patchValue({ ...value }, { emitEvent: false });
  }

  private _buildForm(): FormGroup<INodeConfigurationForm> {
    return this._fb.group<INodeConfigurationForm>({
      key: this._fb.control(null),
      name: this._fb.control(null, [Validators.required]),
      description: this._fb.control(null),
      configuration: this._fb.control(null, [Validators.required]),
    });
  }

  private _subscribeToValueChanges(): void {
    this.formGroup.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceWithDestroyAndFlush(
          this._destroyRef,
          350,
          (value: INodeConfigurationValue) =>
            this._apiService.change({
              ...value,
              type: this.type(),
            } as INodeConfiguration)
        )
      )
      .subscribe();
  }
}
