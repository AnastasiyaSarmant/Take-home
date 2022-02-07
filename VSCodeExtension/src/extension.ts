'use strict';

import { commands, ExtensionContext } from 'vscode';
import { ConfigProvider } from './config/configProvider';
import { LaureateManager } from './laureateManager';
import { LocalizationProvider } from './localization/localizationProvider';
import { Logger } from './utils/logger';

export function activate(context: ExtensionContext): void {
    const localization = new LocalizationProvider();
    const config = new ConfigProvider();
    const logger = new Logger(config.config.loggerMaxBufferSize);
    // main component
    const manager = new LaureateManager(localization, config, logger);
    context.subscriptions.push(
        commands.registerCommand('extension.findLaureate', async () => {
            manager.start();
        }),
    );
    context.subscriptions.push(manager);
}
