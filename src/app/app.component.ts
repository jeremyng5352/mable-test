import { Component } from '@angular/core';
import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showCreateNode: boolean = false;
  baseNodes$ = this.nodeService.baseNodes$;

  constructor(private nodeService: NodeService) {}

  addFolderToRoot(): void {
    this.showCreateNode = true;
  }

  cancelNodeCreation(): void {
    this.showCreateNode = false;
  }
}
