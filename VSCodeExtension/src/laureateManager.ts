import { InputBoxManager } from './components/inputBox/inputBoxManager';
import { ILaureateManager } from './interfaces/internal';
import { IConfigProvider, ILocalizationProvider, ILogger } from './interfaces/public';
import { TextDocumentManager } from './components/textDocument/textDocumentManager';
import { TreeViewManager } from './components/treeView/treeViewManager';
import { Logger } from './utils/logger';

export class LaureateManager implements ILaureateManager {
    private inputBoxManager: InputBoxManager;
    private treeViewManager: TreeViewManager;
    private textDocumentManager: TextDocumentManager;

    constructor(
        private localization: ILocalizationProvider,
        private configProvider: IConfigProvider,
        private logger: ILogger,
    ) {
        this.inputBoxManager = new InputBoxManager(this.configProvider, this.localization, this.logger);
        this.treeViewManager = new TreeViewManager(this.configProvider, this.logger);
        this.textDocumentManager = new TextDocumentManager(this.logger);
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
