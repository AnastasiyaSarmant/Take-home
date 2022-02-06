import { ConfigProvider } from './configProvider';
import { DataStorage } from './dataStorage';
import { InputBoxManager } from './inputBoxManager';
import { IConfigProvider, ILaureateManager } from './interface';
import { LaureateNode } from './laureateNode';
import { TreeViewManager } from './treeViewManager';

export class LaureateManager implements ILaureateManager {
    private inputBoxManager: InputBoxManager;
    private treeViewManager: TreeViewManager;
    private configProvider: IConfigProvider;
    private storage: DataStorage<LaureateNode>;
    // private connection: Connection;

    constructor() {
        this.configProvider = new ConfigProvider();
        this.storage = new DataStorage<LaureateNode>();
        this.inputBoxManager = new InputBoxManager(this.configProvider, this.storage);
        this.treeViewManager = new TreeViewManager(this.configProvider, this.storage);
    }

    public start(): void {
        this.inputBoxManager.show();
    }

    public dispose(): void {
        this.inputBoxManager?.dispose();
        this.treeViewManager?.dispose();
    }

    /*private initQuickPick() {} */
}
