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
    this.nodeDictionary.set(parentId, parentNode);
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

  deleteNode(id: NodeModel['id'], parentId: NodeModel['id']): void {
    const nodeState = <BehaviorSubject<NodeStateModel>>this.nodesStateObs.get(id);
    const children = nodeState.getValue().children;
    // clean everything within the children
    if (children.length > 0 ) {
      children.forEach((child) => this.deleteNode(child, id));
    }
    // update the parent so that the UI will be updated
    if (parentId) {
      const parentNode = this.removeNodeFromChildren(parentId, id);
      const parentNodeState = this.convertNodeToNodeState(parentNode);
      this.nodesStateObs.get(parentId)?.next(parentNodeState);
    } else {
      this.removeNodeFromBase(id);
    }
    this.nodesStateObs.delete(id);
    this.nodeDictionary.delete(id);
  }

  removeNodeFromChildren(parentId: NodeModel['id'], targetId: NodeModel['id']): NodeModel {
    const parentNode = <NodeModel>this.nodeDictionary.get(parentId);
    const children = parentNode.children;
    const index = children.findIndex((node) => node.id === targetId);
    if (index > -1) {
      children.splice(index, 1);
    }
    return {
      ...parentNode,
      children
    }
  }

  removeNodeFromBase(targetId: NodeModel['id']) {
    const baseNodes = this.baseNodes$.getValue();
    const ids = baseNodes.map(node => node.id);
    const index = ids.findIndex((id) => id === targetId);
    if (index > -1) {
      baseNodes.splice(index, 1);
      this.baseNodes$.next(baseNodes);
    }
  }

  getNodeObs(id: NodeModel['id']): Observable<NodeStateModel> {
    const nodeState = <Observable<NodeStateModel>>this.nodesStateObs.get(id);
    return nodeState;
  }
}
