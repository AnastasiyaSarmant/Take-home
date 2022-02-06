import { QueryData, QueryValidatorResultCode } from './interface';
import { config } from './config';

export interface IQueryValidator {
    validate(str: string): QueryValidatorResultCode;
    getQueryData(): QueryData;
    dispose(): void;
}

export class QueryValidator implements IQueryValidator {
    private queryData: QueryData = { year: 0, field: '' };

    public validate(str: string): QueryValidatorResultCode {
        const split = str
            .split('&')
            .map(str => str.trim())
            .filter((str: string): boolean => !!str.length);
        if (!split?.length || split?.length !== 2) {
            // Logger
            return QueryValidatorResultCode.InvalidQueryFormat;
        }

        for (let i = 0; i < split.length; i++) {
            const str = split[i];
            let res: QueryValidatorResultCode;
            if (Number.parseInt(str[0]) >= 0) {
                res = this.validateYear(str);
            } else {
                res = this.validateField(str);
            }
            if (res) return res;
        }

        return QueryValidatorResultCode.OK;
    }

    public getQueryData(): QueryData {
        return this.queryData;
    }

    public reset(): void {
        this.queryData = { year: 0, field: '' };
    }

    private validateYear(year: string): QueryValidatorResultCode {
        const now = new Date();
        const lastYear =
            now.getDay() < config.nobelDay && now.getMonth() < config.nobelMonth
                ? now.getFullYear() - 1
                : now.getFullYear();
        const inputYear = Number.parseInt(year);

        if (inputYear < config.firstNobelYear || inputYear > lastYear) {
            return QueryValidatorResultCode.InvalidYear;
        }

        this.queryData.year = inputYear;
        return QueryValidatorResultCode.OK;
    }

    private validateField(field: string): QueryValidatorResultCode {
        if (!config.fields.some((f: string): boolean => field === f)) {
            return QueryValidatorResultCode.InvalidField;
        }

        this.queryData.field = field;
        return QueryValidatorResultCode.OK;
    }
}
