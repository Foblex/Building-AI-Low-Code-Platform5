import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'flow-github-cta',
  templateUrl: './github-cta.html',
  styleUrl: './github-cta.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule],
})
export class FlowGithubCta {
  protected readonly githubUrl = 'https://github.com/Foblex/f-flow';
}
