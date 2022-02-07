import { ILocales, ILocalizationProvider } from '../interfaces/public';

export class LocalizationProvider implements ILocalizationProvider {
    private localesInternal!: ILocales;

    public get locales(): ILocales {
        return this.localesInternal;
    }
    constructor() {
        this.setDefaultLocales();
    }

    public setLocales(locales: ILocales): void {
        this.localesInternal = locales;
    }

    private setDefaultLocales(): void {
        this.localesInternal = {
            queryInputBoxTitle: 'Find Nobel Laureates',
            queryInputBoxPrompt: 'Fields:',
            queryInputBoxPlaceholder: 'Ex: medicine & 1988',
            errors: {
                invalidFieldErrorMessage: 'Invalid Field',
                invalidYearErrorMessage: 'Invalid Year',
                invalidFormatErrorMessage: 'Invalid Query Format',
            },
        };
    }
}
