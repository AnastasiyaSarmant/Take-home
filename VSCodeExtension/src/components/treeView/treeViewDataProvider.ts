import { Event, EventEmitter, TreeDataProvider, TreeItem } from 'vscode';
import { LaureateNode } from './laureateNode';

export class LaureateTreeDataProvider implements TreeDataProvider<LaureateNode> {
    private _onDidChangeTreeData: EventEmitter<any> = new EventEmitter<any>();
    readonly onDidChangeTreeData: Event<any> = this._onDidChangeTreeData.event;
    private storage: LaureateNode[];

    constructor() {
        this.storage = [];
    }

    public dispose(): void {
        this._onDidChangeTreeData.dispose();
    }

    public getTreeItem(element: LaureateNode): TreeItem {
        return element;
    }

    public getChildren(element?: LaureateNode): LaureateNode[] | undefined {
        return element ? element.children : this.storage;
    }

    public addNode(node: LaureateNode): boolean {
        if (this.storage.some((item): boolean => item.label === node.label)) {
            return false;
        }

        this.storage.push(node);
        this._onDidChangeTreeData.fire(undefined);
        return true;
    }

    public getParent(): LaureateNode | undefined {
        return undefined;
    }

    /* 
    public provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): vscode.ProviderResult<string> {
        return this.model.getContent(uri).then(content => content);
    } */
}
