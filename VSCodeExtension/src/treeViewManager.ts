import { commands, Disposable, TreeView, window } from 'vscode';
import { DataStorage } from './dataStorage';
import { IConfigProvider } from './interface';
import { LaureateNode } from './laureateNode';
import { LaureateTreeDataProvider } from './treeViewDataProvider';

export class TreeViewManager {
    private treeView: TreeView<LaureateNode>;
    private treeViewDataProvider: LaureateTreeDataProvider;
    private command: Disposable;
    constructor(private configProvider: IConfigProvider, private dataStorage: DataStorage<LaureateNode>) {
        this.treeViewDataProvider = new LaureateTreeDataProvider(this.dataStorage);

        window.registerTreeDataProvider('laureates', this.treeViewDataProvider);
        this.treeView = window.createTreeView('laureates', {
            treeDataProvider: this.treeViewDataProvider,
            showCollapseAll: true,
        });
        this.command = commands.registerCommand('laureates:refreshData', () => {
            this.onRefreshData();
        });
    }

    public dispose(): void {
        (this.treeViewDataProvider as LaureateTreeDataProvider).dispose();
        this.treeView.dispose();
        this.command?.dispose();
    }

    private onRefreshData(): void {
        this.treeViewDataProvider.refresh();
        const data = this.dataStorage.get();
        this.treeView.reveal(data[data.length - 1]);
    }
}
