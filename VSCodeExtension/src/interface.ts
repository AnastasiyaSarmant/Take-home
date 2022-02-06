export interface ILaureateManager {
    start(): void;
}

export type QueryData = {
    year: number;
    field: string;
};

export enum QueryValidatorResultCode {
    'OK' = 0,
    'InvalidQueryFormat' = 1,
    'InvalidYear' = 2,
    'InvalidField' = 3,
    'Exists' = 4,
}

export interface IConfig {
    host: string;
    hostPathCategoryYear: string;
    hostPathLaureateById: string;
    firstNobelYear: number;
    nobelDay: number;
    nobelMonth: number;
    queryInputBoxTitle: string;
    queryInputBoxPrompt: string;
    queryInputBoxPlaceholder: string;
    fields: string[];
    errors: {
        invalidFieldErrorMessage: string;
        invalidYearErrorMessage: string;
        invalidFormatErrorMessage: string;
    };
}

export interface IConfigProvider {
    config: IConfig;
    setConfig(config: IConfig): void;
}
