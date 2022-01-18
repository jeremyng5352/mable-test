import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { NodeModel, NodeStateModel } from '../../interfaces/node.model';
import { NodeService } from '../../services/node.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit, OnDestroy {
  @Input() id: NodeModel['id'];
  private onDestroy$ = new Subject<void>();
  isOnHover: boolean = false;
  isCreateNodeShown: boolean = false;
  node$ = new BehaviorSubject<NodeStateModel | null>(null);

  constructor(private nodeService: NodeService) { }

  ngOnInit() {
    this.nodeService.getNodeObs(this.id).pipe(
      takeUntil(this. onDestroy$)
    ).subscribe((node) => {
      console.log(node);
      this.node$.next(node);
    });
  }

  ngOnDestroy(): void {
      
  }

  setOnHover(status: boolean): void {
    this.isOnHover = status;
  }

  deleteNode(id: NodeModel['id']): void {

  }

  showCreateNode(): void {
    this.isCreateNodeShown = true;
  }

  cancelNodeCreation(): void {
    this.isCreateNodeShown = false;
  }
}
