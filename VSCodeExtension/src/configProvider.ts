import { IConfig, IConfigProvider } from './interface';

export class ConfigProvider implements IConfigProvider {
    private configInternal!: IConfig;

    public get config(): IConfig {
        return this.configInternal;
    }
    constructor() {
        this.setDefaultConfig();
    }

    public setConfig(config: IConfig): void {
        this.configInternal = config;
    }

    private setDefaultConfig(): void {
        this.configInternal = {
            host: 'https://api.nobelrpize.org/2.1/',
            hostPathCategoryYear: '{0}/{1}',
            hostPathLaureateById: 'laureate/{0}',
            firstNobelYear: 1901,
            nobelDay: 10,
            nobelMonth: 12,
            queryInputBoxTitle: 'Find Nobel Laureates',
            queryInputBoxPrompt: 'Fields: chemistry, economy, medicine, litreture, physics/n',
            queryInputBoxPlaceholder: 'Ex: medicine & 1988',
            fields: ['chemistry', 'economy', 'litreture', 'peace', 'physics', 'medicine'],
            errors: {
                invalidFieldErrorMessage: 'Invalid Field',
                invalidYearErrorMessage: 'Invalid Year',
                invalidFormatErrorMessage: 'Invalid Query Format',
            },
        };
    }
}
