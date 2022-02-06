'use strict';

import { commands, ExtensionContext, window } from 'vscode';
import { LaureateManager } from './laureateManager';

export function activate(context: ExtensionContext): void {
    const manager = new LaureateManager(context);
    context.subscriptions.push(
        commands.registerCommand('extension.findLaureate', async () => {
            manager.start();
        }),
    );
}
