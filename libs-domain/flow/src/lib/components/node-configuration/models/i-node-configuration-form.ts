import { FormControl } from '@angular/forms';

export interface INodeConfigurationForm {
  key: FormControl<string | null>;
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  configuration: FormControl<Record<string, any> | null>;
}
