export interface ILogger {
    log(data: string, show?: boolean): void;
    warn(data: string, show?: boolean): void;
    error(data: string, show?: boolean): void;
}

export interface IConfig {
    fetchRetries: number;
    host: string;
    hostPathNobelPrizes: string;
    hostPathLaureateById: string;
    firstNobelYear: number;
    nobelDay: number;
    nobelMonth: number;
    fields: string[];
    loggerMaxBuggerSize: number;
}

export interface IConfigProvider {
    config: IConfig;
    setConfig(config: IConfig): void;
}

export interface ILocales {
    queryInputBoxTitle: string;
    queryInputBoxPrompt: string;
    queryInputBoxPlaceholder: string;
    errors: {
        invalidFieldErrorMessage: string;
        invalidYearErrorMessage: string;
        invalidFormatErrorMessage: string;
    };
}

export interface ILocalizationProvider {
    locales: ILocales;
    setLocales(locales: ILocales): void;
}
