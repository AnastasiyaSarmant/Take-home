import { IConfigProvider, QueryData, QueryValidatorResultCode } from './interface';

export class QueryValidator {
    private queryData: QueryData = { year: 0, field: '' };

    constructor(private configProvider: IConfigProvider) {}

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
            now.getDay() < this.configProvider.config.nobelDay && now.getMonth() < this.configProvider.config.nobelMonth
                ? now.getFullYear() - 1
                : now.getFullYear();
        const inputYear = Number.parseInt(year);

        if (inputYear < this.configProvider.config.firstNobelYear || inputYear > lastYear) {
            return QueryValidatorResultCode.InvalidYear;
        }

        this.queryData.year = inputYear;
        return QueryValidatorResultCode.OK;
    }

    private validateField(field: string): QueryValidatorResultCode {
        if (!this.configProvider.config.fields.some((f: string): boolean => field === f)) {
            return QueryValidatorResultCode.InvalidField;
        }

        this.queryData.field = field;
        return QueryValidatorResultCode.OK;
    }
}
