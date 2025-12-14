import { inject, Injectable } from '@angular/core';
import { Mediator, TKey } from '@core';
import {
  ConnectionChangeConfigurationRequest,
  ConnectionCreateRequest,
  ConnectionReassignRequest,
  ConnectionRemoveRequest,
  ENodeType,
  FlowExportRequest,
  FlowImportRequest,
  FlowInitializeStateRequest,
  FlowResetRequest,
  FlowSaveRequest,
  NodeBulkMoveRequest,
  NodeCreateRequest,
  NodeRemoveRequest,
  SelectionChangeRequest,
  TransformChangeRequest,
} from '@flow-state';
import {
  FCanvasChangeEvent,
  FCreateConnectionEvent,
  FCreateNodeEvent,
  FMoveNodesEvent,
  FReassignConnectionEvent,
  FSelectionChangeEvent,
} from '@foblex/flow';

@Injectable()
export class FlowApiService {
  private readonly _mediator = inject(Mediator);

  public initialize(key: TKey): void {
    this._mediator.send(new FlowInitializeStateRequest(key));
  }

  public save(): void {
    this._mediator.send(new FlowSaveRequest());
  }

  public changeCanvasTransform(event: FCanvasChangeEvent): void {
    this._mediator.send(new TransformChangeRequest(event));
  }

  public createNode(event: FCreateNodeEvent<ENodeType>): void {
    this._mediator.send(new NodeCreateRequest(event));
  }

  public createConnection(event: FCreateConnectionEvent): void {
    if (!event.fInputId) {
      return;
    }
    this._mediator.send(new ConnectionCreateRequest(event));
  }

  public reassignConnection(event: FReassignConnectionEvent): void {
    if (!event.newTargetId) {
      return;
    }
    this._mediator.send(new ConnectionReassignRequest(event));
  }

  public removeConnection(key: TKey): void {
    this._mediator.send(new ConnectionRemoveRequest(key));
  }

  public changeConnectionConfiguration(
    key: TKey,
    configuration: Record<string, any>
  ): void {
    this._mediator.send(
      new ConnectionChangeConfigurationRequest(key, configuration)
    );
  }

  public moveNodes(event: FMoveNodesEvent): void {
    this._mediator.send(
      new NodeBulkMoveRequest(
        event.fNodes.map((node) => {
          return {
            key: node.id,
            position: node.position,
          };
        })
      )
    );
  }

  public changeSelection(event: FSelectionChangeEvent): void {
    this._mediator.send(new SelectionChangeRequest(event));
  }

  public removeNode(key: TKey): void {
    this._mediator.send(new NodeRemoveRequest(key));
  }

  public reset(key: TKey): void {
    this._mediator.send(new FlowResetRequest(key));
  }

  public import(content: string): void {
    this._mediator.send(new FlowImportRequest(content));
  }

  public export(): void {
    this._mediator.send(new FlowExportRequest());
  }
}
