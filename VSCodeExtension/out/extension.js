'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode_1 = require("vscode");
const laureateManager_1 = require("./laureateManager");
function activate(context) {
    const manager = new laureateManager_1.LaureateManager();
    context.subscriptions.push(vscode_1.commands.registerCommand('extension.findLaureate', async () => {
        manager.start();
    }));
    context.subscriptions.push(manager);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map