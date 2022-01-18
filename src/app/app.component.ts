import { Component } from '@angular/core';
import { NodeService } from '../services/node.service';
import { NodeModel } from '../interfaces/node.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nodeIdentity = (index: number, node: NodeModel): string => {
    return node ? node.id : `${index}`;
  }
  isCreateNodeShown: boolean = false;
  baseNodes$ = this.nodeService.baseNodes$;

  constructor(private nodeService: NodeService) {}

  addFolderToRoot(): void {
    this.isCreateNodeShown = true;
  }

  cancelNodeCreation(): void {
    this.isCreateNodeShown = false;
  }
}
