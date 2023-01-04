"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const child_process_1 = require("child_process");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "helloworld" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable1 = vscode.commands.registerCommand('helloworld.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello VS Code!');
    });
    let disposable2 = vscode.commands.registerCommand('helloworld.time', () => {
        let date = new Date();
        vscode.window.showInformationMessage(date.toString());
    });
    let disposable3 = vscode.commands.registerCommand('helloworld.warn', () => {
        let msg = 'CUSTOM WARNING!';
        vscode.window.showWarningMessage(msg);
    });
    let disposable4 = vscode.commands.registerCommand('helloworld.err', () => {
        let errMsg = 'OH NO! YOU EVOKED AN ERROR!';
        vscode.window.showErrorMessage(errMsg);
    });
    let disposable5 = vscode.commands.registerCommand('helloworld.java', () => {
        (0, child_process_1.execSync)('javac ' + __dirname + '/java/Main.java', { encoding: 'utf-8' });
        const output = (0, child_process_1.execSync)('java -cp ' + __dirname + '/java/ Main', { encoding: 'utf-8' });
        vscode.window.showInformationMessage(output);
    });
    context.subscriptions.push(disposable1);
    context.subscriptions.push(disposable2);
    context.subscriptions.push(disposable3);
    context.subscriptions.push(disposable4);
    context.subscriptions.push(disposable5);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map