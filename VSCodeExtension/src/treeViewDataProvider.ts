import { Event, EventEmitter, TreeDataProvider, TreeItem, TreeItemCollapsibleState } from 'vscode';
import { Connection } from './connection';

export class LaureateTreeDataProvider implements TreeDataProvider<LaureateNode> {
    private _onDidChangeTreeData: EventEmitter<any> = new EventEmitter<any>();
    readonly onDidChangeTreeData: Event<any> = this._onDidChangeTreeData.event;
    private data: LaureateNode[];

    constructor(private readonly connection?: Connection) {
        this.data = [
            new LaureateNode('medicine & 1988', '', [new LaureateNode('Luigi', '222'), new LaureateNode('MArio', '2')]),
        ];
    }

    public getTreeItem(element: LaureateNode): TreeItem {
        return element;
    }

    public getChildren(element?: LaureateNode): LaureateNode[] | undefined {
        return element ? element.children : this.data;
    }

    public setData(node: LaureateNode): void {
        this.data.push(node);
        this._onDidChangeTreeData.fire(undefined);
    }

    public getData(): LaureateNode[] {
        return this.data;
    }

    public getParent(): LaureateNode | undefined {
        return undefined;
    }

    /* 
    public provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): vscode.ProviderResult<string> {
        return this.model.getContent(uri).then(content => content);
    } */
}

export class LaureateNode extends TreeItem {
    constructor(public label: string, public id: string, public children?: LaureateNode[]) {
        super(label, children === undefined ? TreeItemCollapsibleState.None : TreeItemCollapsibleState.Expanded);
        this.children = children;
    }
}
