import * as axios from 'axios';
import { IConfigProvider } from '../interfaces/public';

export class Connection {
    private retries: number;
    constructor(private configProvide: IConfigProvider) {
        this.retries = this.configProvide.config.fetchRetries;
    }

    public async getData(url: string): Promise<any> {
        let result;
        try {
            result = await axios.default.get(url, {});
        } catch (error) {
            if (this.retries) {
                this.retries--;
                return this.getData(url);
            }
            throw error;
        }

        return result?.data[0];
    }

    public async postData(url: string, data: any) {
        throw 'Not Implemented';
    }
}
