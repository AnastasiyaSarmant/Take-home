import { commands, Disposable, InputBox, window } from 'vscode';
import { Connection } from './connection';
import { ICategoryDataResult, IConfigProvider, QueryData, QueryValidatorResultCode } from './interface';
import { LaureateNode } from './laureateNode';
import { QueryValidator } from './queryValidator';

export class InputBoxManager {
    private inputBox!: InputBox;
    private validator: QueryValidator;
    private onDidAcceptEvent!: Disposable;

    constructor(private configProvider: IConfigProvider, private connection: Connection) {
        this.validator = new QueryValidator(this.configProvider);
        this.initInputBox();
    }

    public show(): void {
        try {
            this.inputBox.show();
        } catch (error) {
            // log
        }
    }

    public dispose(): void {
        this.inputBox.dispose();
        this.onDidAcceptEvent?.dispose();
    }

    private initInputBox(): void {
        this.inputBox = window.createInputBox();
        this.inputBox.title = this.configProvider.config.queryInputBoxTitle;
        this.inputBox.prompt = `${this.configProvider.config.queryInputBoxPrompt} ${this.configProvider.config.fields
            .toString()
            .replace(new RegExp(',', 'g'), ', ')}\n`;
        this.inputBox.placeholder = this.configProvider.config.queryInputBoxPlaceholder;

        this.onDidAcceptEvent = this.inputBox.onDidAccept(this.onDidAccept);
    }

    private onDidAccept = async (): Promise<boolean> => {
        const result = this.validator.validate(this.inputBox.value);
        const validationData = this.validator.getQueryData();

        if (this.handleQueryValidationResult(result)) {
            return await this.fetchAndAddData(validationData);
        }

        return false;
    };

    private async fetchAndAddData(validationData: QueryData): Promise<boolean> {
        const url = `${this.configProvider.config.host}${
            this.configProvider.config.hostPathNobelPrizes
        }${validationData.field.slice(0, 3)}/${validationData.year}`;

        try {
            const data = await this.connection.getData(url);
            if (!data) {
                // log
                return false;
            }
            const node = LaureateNode.nodeFromCategoryData(
                `${validationData.field} & ${validationData.year}`,
                data as ICategoryDataResult,
            );
            this.inputBox.value = '';
            commands.executeCommand('laureates:refreshData', node);
            return true;
        } catch (error) {
            window.showErrorMessage(JSON.stringify(error));
            return false;
        }
    }

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
