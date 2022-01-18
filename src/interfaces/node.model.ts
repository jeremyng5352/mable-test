export class NodeModel {
    type: 'folder' | 'file' | 'unset' | null;
    name: string;
    children: NodeModel[];
    id: string;
}

export interface NodeStateModel extends Omit<NodeModel, 'children'> {
    children: string[];
}