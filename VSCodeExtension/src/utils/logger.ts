import { Connection } from './connection';
import { window } from 'vscode';
import { ILogger } from '../interfaces/public';

// This class intended as log and telemetry gatherer
// It's basic and doesn't contain component names
// Telemetry and logs should exist separately but this part was simplified for this excercise
export class Logger implements ILogger {
    private buffer: string[];
    constructor(private maxBufferSize: number) {
        this.buffer = [];
    }

    public log(data: string, show?: boolean): void {
        show && window.showInformationMessage(data);
        this.push(data);
    }

    public warn(data: string, show?: boolean): void {
        show && window.showWarningMessage(data);
        this.push(data);
    }

    public error(data: string, show?: boolean): void {
        show && window.showErrorMessage(data);
        this.push(data);
    }

    private push(data: string, show?: boolean) {
        if (this.buffer.length === this.maxBufferSize) {
            this.flush();
        }
        this.buffer.push(data);
    }

    // dummy method to send logs/telemetry
    private flush(): void {
        // send data somewhere
        this.buffer = [];
    }
}
