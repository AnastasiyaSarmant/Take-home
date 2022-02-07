import { commands, Disposable, InputBox, window } from 'vscode';
import { Connection } from '../../utils/connection';
import { ICategoryDataResult, QueryData, QueryValidatorResultCode } from '../../interfaces/internal';
import { IConfigProvider, ILocalizationProvider, ILogger } from '../../interfaces/public';
import { LaureateNode } from '../treeView/laureateNode';
import { QueryValidator } from './queryValidator';

export class InputBoxManager {
    private inputBox!: InputBox;
    private validator: QueryValidator;
    private onDidAcceptEvent!: Disposable;

    constructor(
        private configProvider: IConfigProvider,
        private localization: ILocalizationProvider,
        private logger: ILogger,
    ) {
        this.validator = new QueryValidator(this.configProvider);
        this.initInputBox();
    }

    public show(): void {
        try {
            this.inputBox.show();
        } catch (error) {
            this.logger.error(`InputBoxManager.show ${JSON.stringify(error)}`);
        }
    }

    public dispose(): void {
        this.inputBox.dispose();
        this.onDidAcceptEvent?.dispose();
    }

    private initInputBox(): void {
        this.inputBox = window.createInputBox();
        this.inputBox.title = this.localization.locales.queryInputBoxTitle;
        this.inputBox.prompt = `${this.localization.locales.queryInputBoxPrompt} ${this.configProvider.config.fields
            .toString()
            .replace(new RegExp(',', 'g'), ', ')}\n`;
        this.inputBox.placeholder = this.localization.locales.queryInputBoxPlaceholder;

        this.onDidAcceptEvent = this.inputBox.onDidAccept(this.onDidAccept);
    }

    private onDidAccept = async (): Promise<boolean> => {
        const result = this.validator.validate(this.inputBox.value);
        const validationData = this.validator.getQueryData();
        this.validator.reset();
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
            const data = await Connection.getData(url, this.configProvider.config.fetchRetries);
            if (!data) {
                this.logger.log('InputBoxManager.fetchAndAddData empty data');
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
            this.logger.log(JSON.stringify(error), true);
            return false;
        }
    }

    private handleQueryValidationResult(result: QueryValidatorResultCode): boolean {
        switch (result) {
            case QueryValidatorResultCode.InvalidField:
                this.logger.warn(`${this.localization.locales.errors.invalidFieldErrorMessage}`, true);
                return false;
            case QueryValidatorResultCode.InvalidYear:
                this.logger.warn(`${this.localization.locales.errors.invalidYearErrorMessage}`, true);
                return false;
            case QueryValidatorResultCode.InvalidQueryFormat:
                this.logger.warn(`${this.localization.locales.errors.invalidFormatErrorMessage}`, true);

                return false;
            default:
                this.logger.log(`${this.localization.locales.errors.invalidFormatErrorMessage}`);
                return true;
        }
    }
}
