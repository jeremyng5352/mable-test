import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-node',
  templateUrl: './create-node.component.html',
  styleUrls: ['./create-node.component.scss']
})
export class CreateNodeComponent {
  @Output() cancelNodeCreation = new EventEmitter<void>();
  formValue: string = ''; 

  constructor() { }


  createNode(): void {

  }

  cancel(): void {
    this.cancelNodeCreation.emit();
  }

}
