import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NodeModel } from '../../interfaces/node.model';
import { NodeService } from '../../services/node.service';

@Component({
  selector: 'app-create-node',
  templateUrl: './create-node.component.html',
  styleUrls: ['./create-node.component.scss']
})
export class CreateNodeComponent implements AfterViewInit {
  @ViewChild('formInput') private element: ElementRef;
  @Output() cancelNodeCreation = new EventEmitter<void>();
  @Input() parentId: NodeModel['id'] = '';
  @Input() initialType: NodeModel['type'] = 'folder';
  formValue: string = ''; 

  constructor(
    private nodeService: NodeService
  ) { }

  ngAfterViewInit(): void {
      this.element.nativeElement.focus();
  }

  createNewNode(): void {
    if (!this.formValue) {
      return;
    }
    !this.parentId ? this.nodeService.createNewBaseNode(this.formValue, this.initialType) : this.nodeService.createNewNode(this.formValue, this.initialType);
    this.cancel();
  }

  cancel(): void {
    this.cancelNodeCreation.emit();
  }

}
