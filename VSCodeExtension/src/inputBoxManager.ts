import { commands, InputBox, window } from 'vscode';
import { Connection } from './connection';
import { DataStorage } from './dataStorage';
import { IConfigProvider, QueryValidatorResultCode } from './interface';
import { LaureateNode } from './laureateNode';
import { QueryValidator } from './queryValidator';

export class InputBoxManager {
    private inputBox!: InputBox;
    private validator: QueryValidator;

    constructor(private configProvider: IConfigProvider, private dataStorage: DataStorage<LaureateNode>) {
        this.validator = new QueryValidator(this.configProvider);
        this.initInputBox();
    }

    public show(): void {
        this.inputBox.show();
    }

    public dispose(): void {
        this.inputBox.dispose();
    }

    private initInputBox(): void {
        this.inputBox = window.createInputBox();
        this.inputBox.ignoreFocusOut = true;
        this.inputBox.title = this.configProvider.config.queryInputBoxTitle;
        this.inputBox.prompt = this.configProvider.config.queryInputBoxPrompt;
        this.inputBox.placeholder = this.configProvider.config.queryInputBoxPlaceholder;

        this.inputBox.onDidAccept(this.onDidAccept);
    }

    private onDidAccept = (): void => {
        const result = this.validator.validate(this.inputBox.value);
        const validationData = this.validator.getQueryData();

        if (this.handleQueryValidationResult(result)) {
            // connect
            this.dataStorage.push(
                new LaureateNode(this.inputBox.value, '', [
                    new LaureateNode('Anastasiya', '5'),
                    new LaureateNode('Anna', '7'),
                ]),
            );
            commands.executeCommand('laureates:refreshData');
        }
    };

    private handleQueryValidationResult(result: QueryValidatorResultCode): boolean {
        switch (result) {
            case QueryValidatorResultCode.InvalidField:
                window.showErrorMessage(this.configProvider.config.errors.invalidFieldErrorMessage);
                return false;
            case QueryValidatorResultCode.InvalidYear:
                window.showErrorMessage(this.configProvider.config.errors.invalidYearErrorMessage);
                return false;
            case QueryValidatorResultCode.InvalidQueryFormat:
                window.showErrorMessage(this.configProvider.config.errors.invalidFormatErrorMessage);
                return false;
            default:
                return true;
        }
    }
}
