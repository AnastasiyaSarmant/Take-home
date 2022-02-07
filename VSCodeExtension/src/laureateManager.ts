import { ConfigProvider } from './configProvider';
import { Connection } from './connection';
import { InputBoxManager } from './inputBoxManager';
import { IConfigProvider, ILaureateManager } from './interface';
import { TextDocumentManager } from './textDocumentManager';
import { TreeViewManager } from './treeViewManager';

export class LaureateManager implements ILaureateManager {
    private inputBoxManager: InputBoxManager;
    private treeViewManager: TreeViewManager;
    private textDocumentManager: TextDocumentManager;
    private configProvider: IConfigProvider;
    private connection: Connection;

    constructor() {
        this.configProvider = new ConfigProvider();
        this.connection = new Connection(this.configProvider);

        this.inputBoxManager = new InputBoxManager(this.configProvider, this.connection);
        this.treeViewManager = new TreeViewManager(this.configProvider, this.connection);
        this.textDocumentManager = new TextDocumentManager();
    }

    public start(): void {
        this.inputBoxManager.show();
    }

    public dispose(): void {
        this.inputBoxManager.dispose();
        this.treeViewManager.dispose();
        this.textDocumentManager.dispose();
    }
}
