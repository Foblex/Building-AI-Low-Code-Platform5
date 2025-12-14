import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { ConfigurationGroupHeader } from '@shared-components';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { IConfigurationForm, IConfigurationValue } from './models';
import { distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormUtils } from '@core';

@Component({
  selector: 'conditional-branch-configuration',
  templateUrl: './conditional-branch-configuration.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    ConfigurationGroupHeader,
    MatFormField,
    MatInput,
    CdkTextareaAutosize,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConditionalBranchConfiguration),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ConditionalBranchConfiguration),
      multi: true,
    },
  ],
  host: {
    class: 'configuration-group',
  },
})
export class ConditionalBranchConfiguration
  implements OnInit, ControlValueAccessor, Validator
{
  protected formGroup!: FormGroup<IConfigurationForm>;

  private _onChange: ((value: IConfigurationValue) => void) | undefined;
  private _onTouch: (() => void) | undefined;

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _fb = inject(FormBuilder);

  public ngOnInit(): void {
    this.formGroup = this._buildForm();
    this._subscribeToValueChanges();
  }

  private _buildForm(): FormGroup<IConfigurationForm> {
    return this._fb.group<IConfigurationForm>({
      prompt: this._fb.control(null, [Validators.required]),
    });
  }

  public registerOnChange(fn: (value: IConfigurationValue) => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouch = fn;
  }

  public validate(): ValidationErrors | null {
    return FormUtils.validateForm(this.formGroup);
  }

  public writeValue(value?: IConfigurationValue): void {
    this.formGroup.patchValue({ ...value }, { emitEvent: false });
  }

  private _subscribeToValueChanges(): void {
    this.formGroup.valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this._destroyRef))
      .subscribe((value) => {
        this._onTouch?.();
        this._onChange?.(value);
      });
  }
}
