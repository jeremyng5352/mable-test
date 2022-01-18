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
  name: string = ''; 

  constructor(
    private nodeService: NodeService
  ) { }

  ngAfterViewInit(): void {
      this.element.nativeElement.focus();
  }

  createNewNode(): void {
    if (this.name) {
      !this.parentId ?
       this.nodeService.createNewBaseNode(this.name, this.initialType) : 
       this.nodeService.createNewNodeForParent(this.name, this.initialType, this.parentId);
    }
    this.cancel();
  }

  cancel(): void {
    this.cancelNodeCreation.emit();
  }

}
