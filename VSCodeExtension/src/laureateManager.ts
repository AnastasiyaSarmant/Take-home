import { commands, Event, ExtensionContext, InputBox, QuickPick, TreeView, window } from 'vscode';
import { config } from './config';
import { Connection } from './connection';
import { ILaureateManager, QueryValidatorResultCode } from './interface';
import { IQueryValidator, QueryValidator } from './queryValidator';
import { LaureateNode, LaureateTreeDataProvider } from './treeViewDataProvider';

export class LaureateManager implements ILaureateManager {
    private inputBox!: InputBox;
    private treeView: TreeView<LaureateNode>;
    private validator: IQueryValidator;
    // private connection: Connection;
    private treeViewDataProvider: LaureateTreeDataProvider;

    constructor(private context: ExtensionContext) {
        this.validator = new QueryValidator();
        this.treeViewDataProvider = new LaureateTreeDataProvider();
        window.registerTreeDataProvider('laureates', this.treeViewDataProvider);
        this.treeView = window.createTreeView('laureates', {
            treeDataProvider: this.treeViewDataProvider,
            showCollapseAll: true,
        });

        this.initInputBox();

        context.subscriptions.push(this.treeView);
    }

    public start(): void {
        return this.inputBox.show();
    }

    private initInputBox(): void {
        this.inputBox = window.createInputBox();
        this.inputBox.ignoreFocusOut = true;
        this.inputBox.title = config.queryInputBoxTitle;
        this.inputBox.prompt = config.queryInputBoxPrompt;
        this.inputBox.placeholder = config.queryInputBoxPlaceholder;

        this.inputBox.onDidAccept(this.inputBoxOnDidAccept);
        this.context.subscriptions.push(this.inputBox);
    }

    private inputBoxOnDidAccept = (): void => {
        const result = this.validator.validate(this.inputBox.value);
        if (result === QueryValidatorResultCode.OK) {
            // connect
            this.treeViewDataProvider.setData(
                new LaureateNode(this.inputBox.value, '', [
                    new LaureateNode('Anastasiya', '5'),
                    new LaureateNode('Anna', '7'),
                ]),
            );
        }

        this.treeView.reveal(this.treeViewDataProvider.getData()[0]);
    };

    /*private initQuickPick() {} */
}
