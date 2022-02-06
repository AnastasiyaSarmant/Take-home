'use strict';

import { commands, ExtensionContext } from 'vscode';
import { LaureateManager } from './laureateManager';

export function activate(context: ExtensionContext): void {
    const manager = new LaureateManager();
    context.subscriptions.push(
        commands.registerCommand('extension.findLaureate', async () => {
            manager.start();
        }),
    );
    context.subscriptions.push(manager);
}
