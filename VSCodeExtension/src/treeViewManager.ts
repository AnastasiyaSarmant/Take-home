import { commands, Disposable, TreeView, TreeViewSelectionChangeEvent, window } from 'vscode';
import { Connection } from './connection';
import { IConfigProvider } from './interface';
import { LaureateNode } from './laureateNode';
import { LaureateTreeDataProvider } from './treeViewDataProvider';

export class TreeViewManager {
    private treeView!: TreeView<LaureateNode>;
    private treeViewDataProvider: LaureateTreeDataProvider;
    private subs: Disposable[] = [];

    constructor(private configProvider: IConfigProvider, private connection: Connection) {
        this.treeViewDataProvider = new LaureateTreeDataProvider();

        window.registerTreeDataProvider('laureates', this.treeViewDataProvider);
        this.initTreeView();
    }

    public dispose(): void {
        this.treeViewDataProvider.dispose();
        this.treeView.dispose();
        this.subs.forEach(sub => sub?.dispose());
    }

    private initTreeView(): void {
        this.treeView = window.createTreeView('laureates', {
            treeDataProvider: this.treeViewDataProvider,
            showCollapseAll: true,
        });
        this.subs.push(this.treeView.onDidChangeSelection(this.onDidChangeSelection));
        this.subs.push(commands.registerCommand('laureates:refreshData', this.onRefreshData));
    }

    private onDidChangeSelection = async (e: TreeViewSelectionChangeEvent<LaureateNode>): Promise<boolean> => {
        const selectedNode = e.selection[0];
        if (!selectedNode?.id) {
            //l og
            return Promise.resolve(false);
        }

        return this.fetchAnddisplayData(selectedNode);
    };

    private async fetchAnddisplayData(selectedNode: LaureateNode): Promise<boolean> {
        const url = `${this.configProvider.config.host}${this.configProvider.config.hostPathLaureateById}${selectedNode.id}`;

        try {
            const data = await this.connection.getData(url);
            if (!data) {
                return false;
            }
            commands.executeCommand('textDocument:open', JSON.stringify(data));
            return true;
        } catch (error) {
            window.showErrorMessage(JSON.stringify(error));
            return false;
        }
    }

    private onRefreshData = async (node: LaureateNode): Promise<void> => {
        this.treeViewDataProvider.addNode(node);
        const nodes = this.treeViewDataProvider.getChildren() || [];
        try {
            nodes.length > 0 && this.treeView.reveal(nodes[nodes.length - 1]);
        } catch (error) {
            // log
            return;
        }

        return Promise.resolve();
    };
}
