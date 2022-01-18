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
    const newNode = this.createNewNode(name, type);
    const currentBaseNodes: NodeModel[] = this.baseNodes$.getValue();
    this.baseNodes$.next([...currentBaseNodes, newNode]);
  }

  createNewNodeForParent(name: NodeModel['name'], type: NodeModel['type'], parentId: NodeModel['id']): void {
    const newNode = this.createNewNode(name, type);
    const parentNode = <NodeModel>this.nodeDictionary.get(parentId);
    parentNode.children = [...parentNode?.children, newNode];
    this.nodeDictionary.set(parentId, parentNode);
    this.nodeDictionary.set(newNode.id, newNode);
  }

  createNewNode(name: NodeModel['name'], type: NodeModel['type']): NodeModel {
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
