import { ConfigProvider } from './config/configProvider';
import { Connection } from './utils/connection';
import { InputBoxManager } from './components/inputBox/inputBoxManager';
import { ILaureateManager } from './interfaces/internal';
import { IConfigProvider, ILocalizationProvider, ILogger } from './interfaces/public';
import { TextDocumentManager } from './components/textDocument/textDocumentManager';
import { TreeViewManager } from './components/treeView/treeViewManager';
import { LocalizationProvider } from './localization/localizationProvider';
import { Logger } from './utils/logger';

export class LaureateManager implements ILaureateManager {
    private inputBoxManager: InputBoxManager;
    private treeViewManager: TreeViewManager;
    private textDocumentManager: TextDocumentManager;
    private configProvider: IConfigProvider;
    private localization: ILocalizationProvider;
    private connection: Connection;
    private logger: ILogger;

    constructor() {
        this.configProvider = new ConfigProvider();
        this.localization = new LocalizationProvider();
        this.connection = new Connection(this.configProvider);

        this.logger = new Logger(this.configProvider.config.loggerMaxBuggerSize);

        this.inputBoxManager = new InputBoxManager(
            this.configProvider,
            this.localization,
            this.connection,
            this.logger,
        );
        this.treeViewManager = new TreeViewManager(this.configProvider, this.connection, this.logger);
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
