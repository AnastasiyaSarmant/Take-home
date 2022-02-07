import * as axios from 'axios';

export class Connection {
    public static async getData(url: string, retries: number): Promise<any> {
        let result;
        try {
            result = await axios.default.get(url);
        } catch (error) {
            if (retries) {
                return Connection.getData(url, retries - 1);
            }
            throw error;
        }

        return result?.data[0];
    }

    public static async postData(url: string, data: any, retries: number) {
        throw 'Not Implemented';
    }
}
