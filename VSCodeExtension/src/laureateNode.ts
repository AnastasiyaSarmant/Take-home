import { TreeItem, TreeItemCollapsibleState } from 'vscode';

export class LaureateNode extends TreeItem {
    constructor(public label: string, public id: string, public children?: LaureateNode[]) {
        super(label, children === undefined ? TreeItemCollapsibleState.None : TreeItemCollapsibleState.Expanded);
        this.children = children;
    }
}
