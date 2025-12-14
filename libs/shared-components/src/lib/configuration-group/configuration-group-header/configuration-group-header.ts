import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'configuration-group-header',
  templateUrl: './configuration-group-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'configuration-group-header',
  },
})
export class ConfigurationGroupHeader {

  public readonly title = input.required<string>();
}
