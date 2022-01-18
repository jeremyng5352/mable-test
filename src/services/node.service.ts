import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NodeModel, NodeStateModel } from '../interfaces/node.model';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  nodeDictionary = new Map<NodeModel['id'], NodeModel>();
  nodesStateObs = new Map<NodeModel['id'], BehaviorSubject<NodeStateModel>>();
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
    const nodeState = this.convertNodeToNodeState(parentNode);
    // this.nodesStateObs.set(parentId, new BehaviorSubject(nodeState));
    this.nodesStateObs.get(parentId)?.next(nodeState);
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
    const newNodeState = this.convertNodeToNodeState(newNode);
    this.nodesStateObs.set(id, new BehaviorSubject(newNodeState));
    return newNode;
  }

  convertNodeToNodeState(node: NodeModel): NodeStateModel {
    return {
      name: node.name,
      id: node.id,
      type: node.type,
      children: node.children.map((child) => child.id)
    };
  }

  getNodeObs(id: NodeModel['id']): Observable<NodeStateModel> {
    const node = <Observable<NodeStateModel>>this.nodesStateObs.get(id);
    return node;
  }
}
