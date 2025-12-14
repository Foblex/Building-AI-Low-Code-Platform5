import { Mutator } from '@foblex/mutator';
import { Injectable } from '@angular/core';
import { IFlow } from './flow';

@Injectable()
export class FlowState extends Mutator<IFlow> {}
