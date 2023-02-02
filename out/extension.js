"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const child_process_1 = require("child_process");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "Python Type Checker" is now active!');
    // The code below is a sample of how Java program can be called from the extension environment
    // IMPORTANT NOTE: There is no better option to implement this functionality for now
    const javaCallDisposable = vscode.commands.registerCommand('pstc.javaCall', () => {
        (0, child_process_1.execSync)('javac ' + __dirname + '/java/Main.java', { encoding: 'utf-8' });
        const output = (0, child_process_1.execSync)('java -cp ' + __dirname + '/java/ Main', { encoding: 'utf-8' });
        vscode.window.showInformationMessage(output);
    });
    // This method is one option for how the contents of the file currently open in the workspace can be accessed
    // The access is implemented via the file path
    const getFilePathDisposable = vscode.commands.registerCommand('pstc.getFilePath', () => {
        if (vscode.window.activeTextEditor !== undefined) {
            const currentOpenFilePath = vscode.window.activeTextEditor.document.uri.fsPath;
            // The code below is to demonstrate whether the file content is accessed successfully
            const catOutput = (0, child_process_1.execSync)('cat ' + currentOpenFilePath, { encoding: 'utf-8' });
            vscode.window.showInformationMessage(catOutput);
        }
    });
    // This method is another option for how the contents of the file currently open in the workspace can be accessed
    // The access is implemented via the active text editor
    const scanDocumentDisposable = vscode.commands.registerCommand('pstc.scanDocument', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            let document = editor.document;
            const documentText = document.getText();
            // The code below is to demonstrate whether the file content is accessed successfully
            vscode.window.showInformationMessage(documentText);
            // IMPORTANT NOTE: Is it possible to compare the instances of documentText?
            //				   If the answer is yes, we can only send the updated parts
            //				   of the document to the back end of the system
        }
    });
    context.subscriptions.push(javaCallDisposable);
    context.subscriptions.push(getFilePathDisposable);
    context.subscriptions.push(scanDocumentDisposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map