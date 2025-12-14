import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  OnInit,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import {
  EFMarkerType,
  FCanvasChangeEvent,
  FCanvasComponent,
  FConnectionContent,
  FCreateConnectionEvent,
  FCreateNodeEvent,
  FFlowComponent,
  FFlowModule,
  FMoveNodesEvent,
  FReassignConnectionEvent,
  FSelectionChangeEvent,
} from '@foblex/flow';
import {
  EConnectionType,
  ENodeType,
  FLOW_STATE_PROVIDERS,
  FlowState,
  IFlow,
} from '@flow-state';
import { Node } from '../node';
import { FlowApiService } from '../../services';
import { MEDIATOR_PROVIDER } from '@core';
import { FlowBackground } from '../flow-background';
import { NodePalette } from '../node-palette';
import { FlowToolbar } from '../flow-toolbar';
import { ConfigurationPanel } from '@shared-components';
import { NodeConfiguration } from '../node-configuration';
import { ConditionConnectionToolbar } from '../condition-connection-toolbar';
import { RemoveConnectionButton } from '../remove-connection-button';
import { provideMutator } from '@foblex/mutator';
import { FlowGithubCta } from '../github-cta';

const UNDO_REDO_HISTORY_LIMIT = 40;

@Component({
  selector: 'flow',
  templateUrl: './flow.html',
  styleUrl: './flow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideMutator({
      limit: UNDO_REDO_HISTORY_LIMIT,
    }),
    MEDIATOR_PROVIDER,
    ...FLOW_STATE_PROVIDERS,
    FlowApiService,
  ],
  imports: [
    FFlowModule,
    Node,
    FlowBackground,
    NodePalette,
    FlowToolbar,
    ConfigurationPanel,
    NodeConfiguration,
    ConditionConnectionToolbar,
    FConnectionContent,
    RemoveConnectionButton,
    FlowGithubCta,
  ],
  host: {
    '(keydown)': 'onKeydown($event)',
    tabindex: '0',
  },
})
export class Flow implements OnInit {
  private readonly _state = inject(FlowState);
  private readonly _injector = inject(Injector);
  private readonly _apiService = inject(FlowApiService);

  public readonly key = input.required<string>();

  private readonly _flow = viewChild(FFlowComponent);
  private readonly _canvas = viewChild(FCanvasComponent);
  private readonly _elementRef = inject(ElementRef);

  protected readonly viewModel = signal<IFlow | undefined>(undefined);

  protected readonly connections = computed(() => {
    return Array.from(Object.values(this.viewModel()?.connections || {}));
  });

  protected readonly nodes = computed(() => {
    return Array.from(Object.values(this.viewModel()?.nodes || {}));
  });
  protected readonly eMarkerType = EFMarkerType;
  protected readonly eNodeTypes = ENodeType;
  protected readonly eConnectionTypes = EConnectionType;

  private _isFirstChanges = true;
  private _isChangeAfterLoadedResetAndCenter = true;

  public ngOnInit(): void {
    this._initializeState();
    this._listenStateChanges();
  }

  private _initializeState(): void {
    effect(
      () => {
        const key = this.key();
        untracked(() => this._apiService.initialize(key));
      },
      { injector: this._injector }
    );
  }

  private _listenStateChanges(): void {
    effect(
      () => {
        this._state.changes();
        if (this._isFirstChanges) {
          this._isFirstChanges = false;
          return;
        }
        untracked(() => {
          if (!this._isChangeAfterLoadedResetAndCenter) {
            this._apiService.save();
          }
          this._applyChanges();
        });
      },
      { injector: this._injector }
    );
  }

  private _applyChanges(): void {
    this.viewModel.set(this._state.getSnapshot());
    if (!this.viewModel()) {
      return;
    }
    this._reCenterCanvasIfUndedToFirstStep();
    this._applySelectionChanges(this.viewModel()!);
  }

  private _reCenterCanvasIfUndedToFirstStep(): void {
    if (this.viewModel()?.transform) {
      this._isChangeAfterLoadedResetAndCenter = false;
    } else {
      if (!this._state.canUndo() && !this._isChangeAfterLoadedResetAndCenter) {
        this.editorLoaded();
      }
    }
  }

  private _applySelectionChanges({ selection }: IFlow): void {
    setTimeout(() => {
      this._flow()?.select(
        selection?.nodes || [],
        selection?.connections || [],
        false
      );
    });
  }

  protected editorLoaded(): void {
    this._isChangeAfterLoadedResetAndCenter = true;
    this._canvas()?.resetScaleAndCenter(false);
  }

  protected changeCanvasTransform(event: FCanvasChangeEvent): void {
    this._ifCanvasChangedFromInitialReCenterUpdateInitialState(event);
  }

  private _ifCanvasChangedFromInitialReCenterUpdateInitialState(
    event: FCanvasChangeEvent
  ): void {
    if (this._isChangeAfterLoadedResetAndCenter) {
      this._isChangeAfterLoadedResetAndCenter = false;
      this._state.patchBase({ transform: { ...event } });
      return;
    }
    this._apiService.changeCanvasTransform(event);
  }

  protected createNode(event: FCreateNodeEvent<ENodeType>): void {
    this._apiService.createNode(event);
  }

  protected createConnection(event: FCreateConnectionEvent): void {
    this._apiService.createConnection(event);
  }

  protected reassignConnection(event: FReassignConnectionEvent): void {
    this._apiService.reassignConnection(event);
  }

  protected moveNodes(event: FMoveNodesEvent): void {
    this._apiService.moveNodes(event);
  }

  protected changeSelection(event: FSelectionChangeEvent): void {
    this._apiService.changeSelection(event);
  }

  protected resetScaleAndCenter(): void {
    this._canvas()?.resetScaleAndCenter();
  }

  protected fitToScreen(): void {
    this._canvas()?.fitToScreen();
  }

  protected resetFlow(): void {
    this._flow()?.reset();
    this._apiService.reset(this.key());
    this._isChangeAfterLoadedResetAndCenter = true;
  }

  protected exportFlow(): void {
    this._apiService.export();
  }

  protected importFlow(content: string): void {
    this._apiService.import(content);
    this._isChangeAfterLoadedResetAndCenter = true;
    this._flow()?.reset();
    this._canvas()?.resetScaleAndCenter(false);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.target === this._elementRef.nativeElement) {
      console.log(event);
    }
  }

  protected executeFlow(): void {
    throw new Error('Not implemented');
  }
}
