import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showCreateNode: boolean = false;

  addFolderToRoot(): void {
    this.showCreateNode = true;
  }

  cancelNodeCreation(): void {
    this.showCreateNode = false;
  }
}
