import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Flow } from 'libs-domain/flow/src';
import { MEDIATOR_PROVIDER } from '@core';

@Component({
  imports: [RouterModule, Flow],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [
    MEDIATOR_PROVIDER,
  ]
})
export class App {
  protected title = 'ide';
}
