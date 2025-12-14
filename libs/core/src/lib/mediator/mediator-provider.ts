import {inject, Injector, Provider} from '@angular/core';
import {Mediator} from './mediator';

export const MEDIATOR_PROVIDER: Provider = {
  provide: Mediator,
  useFactory: () => new Mediator(inject(Injector)),
};
