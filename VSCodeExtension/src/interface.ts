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
