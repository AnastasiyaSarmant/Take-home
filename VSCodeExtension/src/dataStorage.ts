export class DataStorage<T> {
    private data: T[];

    constructor() {
        this.data = [];
    }

    public get(): T[] {
        return this.data;
    }

    public push(e: T): void {
        this.data.push(e);
    }
}
