import { FormControl } from '@angular/forms';

export interface IConfigurationForm {
  prompt: FormControl<string | null>;
  outputFormat: FormControl<string | null>;
}
