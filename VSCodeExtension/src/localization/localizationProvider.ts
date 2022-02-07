import { ILocales, ILocalizationProvider } from '../interfaces/public';
import { defaultLocalization } from './default';
export class LocalizationProvider implements ILocalizationProvider {
    private localesInternal!: ILocales;

    public get locales(): ILocales {
        return this.localesInternal;
    }
    constructor() {
        this.localesInternal = defaultLocalization;
    }

    public setLocales(locales: ILocales): void {
        this.localesInternal = locales;
    }
}
