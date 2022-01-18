import { Component, Input, OnInit } from '@angular/core';
import { NodeModel } from '../../interfaces/node.model';
import { NodeService } from '../../services/node.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {
  @Input() nodeModel: NodeModel;
  isOnHover: boolean = false;
  isCreateNodeShown: boolean = false;

  constructor(private nodeService: NodeService) { }

  ngOnInit() {
  }

  setOnHover(status: boolean): void {
    this.isOnHover = status;
    console.log(this.isOnHover)
  }

  addChildNode(id: NodeModel['id']): void {
    // this.nodeService.createNewNodeForParent(id, 'file');
  }

  deleteNode(id: NodeModel['id']): void {

  }

  showCreateNode(): void {
    this.isCreateNodeShown = true;
  }
}
