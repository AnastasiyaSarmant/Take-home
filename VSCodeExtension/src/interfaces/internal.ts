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

export interface ICategoryDataResult {
    awardYear: string;
    laureates: ILaureateData[];
}

export interface ILaureateData {
    id: string;
    fullName: { en: string };
}
