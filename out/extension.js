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
        var currentOpenFilePath;
        if (vscode.window.activeTextEditor !== undefined) {
            currentOpenFilePath = vscode.window.activeTextEditor.document.uri.fsPath;
        }
        (0, child_process_1.execSync)('javac ' + __dirname + '/java/Main.java', { encoding: 'utf-8' });
        // The line of code below runs the Java side of the project passing a file path as an argument
        const output = (0, child_process_1.execSync)('java -cp ' + __dirname + '/java/ Main ' + currentOpenFilePath, { encoding: 'utf-8' });
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
    var prevContent = undefined;
    const scanDocumentDisposable = vscode.commands.registerCommand('pstc.scanDocument', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            let document = editor.document;
            const documentText = document.getText();
            if (prevContent === undefined) {
                prevContent = documentText;
            }
            else {
                vscode.window.showInformationMessage(`Previous content is saved`);
            }
            // The code below is to demonstrate whether the file content is accessed successfully
            vscode.window.showInformationMessage(documentText);
            // IMPORTANT NOTE: Is it possible to compare the instances of documentText?
            //				   If the answer is yes, we can only send the updated parts
            //				   of the document to the back end of the system
        }
    });
    const hoverDisposable = vscode.languages.registerHoverProvider('python', {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);
            const contents = [
                { variableName: 'x', variableType: 'TEST OUTPUT FOR VARIABLE X' },
                { variableName: 'y', variableType: 'TEST OUTPUT FOR VARIABLE Y' },
                { variableName: 'z', variableType: 'TEST OUTPUT FOR VARIABLE Z' },
            ];
            var returnedHover;
            contents.forEach(contentToken => {
                if (word === contentToken.variableName) {
                    console.log("SUCCESSFULLY ENTERED THE FOREACH AREA");
                    returnedHover = new vscode.Hover({
                        language: "Python",
                        value: contentToken.variableType
                    });
                }
            });
            return returnedHover;
        }
    });
    context.subscriptions.push(javaCallDisposable);
    context.subscriptions.push(getFilePathDisposable);
    context.subscriptions.push(scanDocumentDisposable);
    context.subscriptions.push(hoverDisposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map