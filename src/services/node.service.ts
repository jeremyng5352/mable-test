import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NodeModel } from '../interfaces/node.model';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  nodeDictionary = new Map<NodeModel['id'], NodeModel>();
  baseNodes$ = new BehaviorSubject<NodeModel[]>([]);

  constructor() { }

  createNewBaseNode(name: NodeModel['name'], type: NodeModel['type']): void {
    console.log('createNewBaseNode');
    const newNode = this.createNewNode(name, type);
    const currentBaseNodes: NodeModel[] = this.baseNodes$.getValue();
    this.baseNodes$.next([...currentBaseNodes, newNode]);
  }

  createNewNode(name: NodeModel['name'], type: NodeModel['type']): NodeModel {
    console.log('createNewNode');
    const id = `${Math.random()}`;
    const newNode: NodeModel = {
      name,
      type,
      id,
      children: []
    };
    this.nodeDictionary.set(id, newNode);
    return newNode;
  }

}
