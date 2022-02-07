export interface ILaureateManager {
    start(): void;
}

export type QueryData = {
    year: string;
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
    fetchRetries: number;
    host: string;
    hostPathNobelPrizes: string;
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

export type IReturnData = { data: any };

export interface ICategoryDataResult extends IReturnData {
    awardYear: string;
    laureates: ILaureateData[];
}

export interface ILaureateData extends IReturnData {
    id: string;
    fullName: { en: string };
}
