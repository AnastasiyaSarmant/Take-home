import { commands, Disposable, workspace, window, Position } from 'vscode';
import { ILogger } from '../../interfaces/public';

export class TextDocumentManager {
    private openSub: Disposable;

    constructor(private logger: ILogger) {
        this.openSub = commands.registerCommand('textDocument:open', this.open);
    }

    public dispose(): void {
        this.openSub.dispose();
    }

    private open = async (data: any): Promise<void> => {
        try {
            const textDocument = await workspace.openTextDocument();
            window.showTextDocument(textDocument).then(editor => {
                editor.edit(builder => {
                    builder.insert(new Position(0, 0), data);
                });
            });
        } catch (error) {
            this.logger.error(JSON.stringify(error), true);
            return;
        }
    };
}
