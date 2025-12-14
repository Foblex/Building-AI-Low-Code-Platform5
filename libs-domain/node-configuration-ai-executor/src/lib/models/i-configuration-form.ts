import { FormControl } from '@angular/forms';

export interface IConfigurationForm {
  prompt: FormControl<string | null>;
  resultType: FormControl<string | null>;
}
