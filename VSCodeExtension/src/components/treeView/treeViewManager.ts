import { commands, Disposable, TreeView, TreeViewSelectionChangeEvent, window } from 'vscode';
import { Connection } from '../../utils/connection';
import { IConfigProvider, ILogger } from '../../interfaces/public';
import { LaureateNode } from './laureateNode';
import { LaureateTreeDataProvider } from './treeViewDataProvider';

export class TreeViewManager {
    private treeView!: TreeView<LaureateNode>;
    private treeViewDataProvider: LaureateTreeDataProvider;
    private subs: Disposable[] = [];

    constructor(private configProvider: IConfigProvider, private connection: Connection, private logger: ILogger) {
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
        this.logger.log(`TreeViewManager selected node ${selectedNode.label}`);
        if (!selectedNode?.id) {
            this.logger.warn('treeViewManager.onDidChangeSelection no node was selected');
            return Promise.resolve(false);
        }

        return this.fetchAnddisplayData(selectedNode);
    };

    private async fetchAnddisplayData(selectedNode: LaureateNode): Promise<boolean> {
        const url = `${this.configProvider.config.host}${this.configProvider.config.hostPathLaureateById}${selectedNode.id}`;

        try {
            const data = await this.connection.getData(url);
            if (!data) {
                this.logger.warn('treeViewManager.fetchAnddisplayData empty data');

                return false;
            }
            commands.executeCommand('textDocument:open', JSON.stringify(data));
            return true;
        } catch (error) {
            this.logger.error(`${JSON.stringify(error)}`, true);
            return false;
        }
    }

    private onRefreshData = async (node: LaureateNode): Promise<void> => {
        this.treeViewDataProvider.addNode(node);
        const nodes = this.treeViewDataProvider.getChildren() || [];
        try {
            nodes.length > 0 && this.treeView.reveal(nodes[nodes.length - 1]);
        } catch (error) {
            this.logger.error(`treeViewManager.onRefreshData ${JSON.stringify(error)}`);
            return;
        }

        return Promise.resolve();
    };
}
