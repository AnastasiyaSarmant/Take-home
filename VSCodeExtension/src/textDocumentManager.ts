import { commands, Disposable, workspace, window, Position, Uri } from 'vscode';

export class TextDocumentManager {
    private openSub: Disposable;

    constructor() {
        this.openSub = commands.registerCommand('textDocument:open', this.open);
    }

    public dispose(): void {
        this.openSub.dispose();
    }

    private open = async (data: any): Promise<void> => {
        let textDocument;
        try {
            textDocument = await workspace.openTextDocument();
        } catch (err) {
            // log
            return;
        }
        window.showTextDocument(textDocument).then(editor => {
            editor.edit(builder => {
                builder.insert(new Position(0, 0), data);
            });
        });
    };
}
