import { Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { NodeModel, NodeStateModel } from '../../interfaces/node.model';
import { NodeService } from '../../services/node.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeComponent implements OnInit, OnDestroy {
  @Input() parentId: NodeModel['id'];
  @Input() id: NodeModel['id'];
  private onDestroy$ = new Subject<void>();
  isOnHover: boolean = false;
  isCreateNodeShown: boolean = false;
  node$ = new BehaviorSubject<NodeStateModel | null>(null);

  constructor(private nodeService: NodeService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.nodeService.getNodeObs(this.id).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((node) => {
      this.node$.next(node);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  setOnHover(status: boolean): void {
    this.isOnHover = status;
  }

  deleteNode(id: NodeModel['id']): void {
    this.nodeService.deleteNode(id, this.parentId);
  }

  showCreateNode(): void {
    this.isCreateNodeShown = true;
  }

  cancelNodeCreation(): void {
    this.isCreateNodeShown = false;
  }
}
