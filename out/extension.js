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
    console.log('Congratulations, your extension "Python Type Checker" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let greetDisposable = vscode.commands.registerCommand('pstc.greeting', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello VS Code!');
    });
    let javaCallDisposable = vscode.commands.registerCommand('pstc.javaCall', () => {
        (0, child_process_1.execSync)('javac ' + __dirname + '/java/Main.java', { encoding: 'utf-8' });
        const output = (0, child_process_1.execSync)('java -cp ' + __dirname + '/java/ Main', { encoding: 'utf-8' });
        vscode.window.showInformationMessage(output);
    });
    let getFilePathDisposable = vscode.commands.registerCommand('pstc.getFilePath', () => {
        if (vscode.window.activeTextEditor !== undefined) {
            const currentOpenFilePath = vscode.window.activeTextEditor.document.uri.fsPath;
            const catOutput = (0, child_process_1.execSync)('cat ' + currentOpenFilePath, { encoding: 'utf-8' });
            vscode.window.showInformationMessage(catOutput);
        }
    });
    context.subscriptions.push(greetDisposable);
    context.subscriptions.push(javaCallDisposable);
    context.subscriptions.push(getFilePathDisposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map