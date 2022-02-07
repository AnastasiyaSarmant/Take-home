import { IConfig, IConfigProvider } from '../interfaces/public';
import { defaultConfig } from './default';

export class ConfigProvider implements IConfigProvider {
    private configInternal!: IConfig;

    public get config(): IConfig {
        return this.configInternal;
    }
    constructor() {
        this.configInternal = defaultConfig;
    }

    public setConfig(config: IConfig): void {
        this.configInternal = config;
    }
}
