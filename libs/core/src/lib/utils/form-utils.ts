import {FormGroup, ValidationErrors} from '@angular/forms';

export class FormUtils {

  public static validateForm(formGroup: FormGroup): ValidationErrors | null {
    return !formGroup.disabled && formGroup.invalid ? { invalid: true } : null;
  }
}
