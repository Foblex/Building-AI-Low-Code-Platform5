import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'configuration-group-row',
  templateUrl: './configuration-group-row.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'configuration-group-row',
  }
})
export class ConfigurationGroupRow {

}
