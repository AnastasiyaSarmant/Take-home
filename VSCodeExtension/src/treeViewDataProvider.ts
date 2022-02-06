import { Event, EventEmitter, TreeDataProvider, TreeItem } from 'vscode';
import { Connection } from './connection';
import { DataStorage } from './dataStorage';
import { LaureateNode } from './laureateNode';

export class LaureateTreeDataProvider implements TreeDataProvider<LaureateNode> {
    private _onDidChangeTreeData: EventEmitter<any> = new EventEmitter<any>();
    readonly onDidChangeTreeData: Event<any> = this._onDidChangeTreeData.event;

    constructor(private storage: DataStorage<LaureateNode>, private readonly connection?: Connection) {}

    public dispose(): void {
        this._onDidChangeTreeData.dispose();
    }

    public getTreeItem(element: LaureateNode): TreeItem {
        return element;
    }

    public getChildren(element?: LaureateNode): LaureateNode[] | undefined {
        return element ? element.children : this.storage.get();
    }

    public refresh(): void {
        this._onDidChangeTreeData.fire(undefined);
    }

    public getParent(): LaureateNode | undefined {
        return undefined;
    }

    /* 
    public provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): vscode.ProviderResult<string> {
        return this.model.getContent(uri).then(content => content);
    } */
}
