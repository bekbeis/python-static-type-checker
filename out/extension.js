"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const child_process_1 = require("child_process");
// JSON object containing type checking results
let results;
// TypeChecker status bar item initialization
let typeCheckerStatusBarItem;
let typeCheckerStatusBarItemState = false;
// Decoration configuration
const decorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(255, 0, 0, 0.5)",
});
// This function detects variables and sets the decoration of the active editor
function decorate(editor) {
    let decorationsArray = [];
    let sourceCode = editor.document.getText();
    const sourceCodeArr = sourceCode.split("\n");
    const fName = getFileName();
    for (let line = 0; line < sourceCodeArr.length; line++) {
        results[fName].forEach((contentToken) => {
            let match = sourceCodeArr[line].match(contentToken.variableName);
            let range;
            if (match !== null &&
                match.index !== undefined &&
                contentToken.err !== null) {
                range = new vscode.Range(new vscode.Position(contentToken.lin, contentToken.col), new vscode.Position(contentToken.lin, contentToken.col + contentToken.variableName.length));
                let decoration = { range };
                decorationsArray.push(decoration);
            }
        });
    }
    if (typeCheckerStatusBarItemState) {
        editor.setDecorations(decorationType, decorationsArray);
    }
    else {
        editor.setDecorations(decorationType, []);
    }
}
// This function is a sample of how Java program can be called from the extension environment
// IMPORTANT NOTE: There is no better option to implement this functionality for now
function executeJava() {
    var currentOpenFilePath;
    if (vscode.window.activeTextEditor !== undefined) {
        currentOpenFilePath = vscode.window.activeTextEditor.document.uri.fsPath;
    }
    (0, child_process_1.execSync)("javac " + __dirname + "/java/Main.java", { encoding: "utf-8" });
    // The line of code below runs the Java side of the project passing a file path as an argument
    const output = (0, child_process_1.execSync)("java -cp " + __dirname + "/java/ Main " + currentOpenFilePath, { encoding: "utf-8" });
    vscode.window.showInformationMessage(output);
}
// This function is one option for how the contents of the file currently open in the workspace can be accessed
// The access is implemented via the file path
function getFilePath() {
    if (vscode.window.activeTextEditor !== undefined) {
        const currentOpenFilePath = vscode.window.activeTextEditor.document.uri.fsPath;
        // The code below is to demonstrate whether the file content is accessed successfully
        const catOutput = (0, child_process_1.execSync)("cat " + currentOpenFilePath, {
            encoding: "utf-8",
        });
        vscode.window.showInformationMessage(catOutput);
    }
}
// This function is another option for how the contents of the file currently open in the workspace can be accessed
// The access is implemented via the active text editor
var prevContent = undefined;
function scanDocument() {
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
}
// This function shows the extension button on the status bar
function showStatusBarItem() {
    typeCheckerStatusBarItem.text = "▶ Type Check";
    typeCheckerStatusBarItem.show();
}
function highlightErrors() {
    typeCheckerStatusBarItem.text = "✱ Loading...";
    typeCheckerStatusBarItem.show();
    setTimeout(() => {
        typeCheckerStatusBarItem.text = "▶ Type Check";
        typeCheckerStatusBarItemState = true;
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            decorate(editor);
        }
    }, 2000);
}
function getFileName() {
    if (vscode.window.activeTextEditor !== undefined) {
        const currentOpenFilePath = vscode.window.activeTextEditor.document.uri.fsPath;
        const fileName = currentOpenFilePath.split("/").pop();
        return fileName?.split(".")[0];
    }
}
function activate(context) {
    const javaCallDisposable = vscode.commands.registerCommand("pstc.javaCall", executeJava);
    const getFilePathDisposable = vscode.commands.registerCommand("pstc.getFilePath", getFilePath);
    const scanDocumentDisposable = vscode.commands.registerCommand("pstc.scanDocument", scanDocument);
    const highlightErrorsDisposable = vscode.commands.registerCommand("pstc.highlightErrors", highlightErrors);
    // The code below modifies the hover window to display information about the variable type and possible errors
    const hoverDisposable = vscode.languages.registerHoverProvider("python", {
        provideHover(document, position, token) {
            if (typeCheckerStatusBarItemState) {
                var returnedHover;
                const range = document.getWordRangeAtPosition(position);
                const word = document.getText(range);
                const fName = getFileName();
                results[fName].forEach((contentToken) => {
                    if (word === contentToken.variableName) {
                        if (position.line === contentToken.lin &&
                            position.character === contentToken.col) {
                            if (contentToken.err === null) {
                                returnedHover = new vscode.Hover({
                                    language: "Python",
                                    value: `Type: ` + contentToken.variableType + ` (no issues found)`,
                                });
                            }
                            else {
                                returnedHover = new vscode.Hover({
                                    language: "Python",
                                    value: contentToken.err,
                                });
                            }
                        }
                    }
                });
                return returnedHover;
            }
        },
    });
    // The code below decorates the active editor when changes are made
    vscode.workspace.onDidChangeTextDocument((event) => {
        typeCheckerStatusBarItemState = false;
        const openEditor = vscode.window.visibleTextEditors.filter((editor) => editor.document.uri === event.document.uri)[0];
        decorate(openEditor);
    });
    // The code below creates the status bar item and adds function to it
    typeCheckerStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 10000);
    typeCheckerStatusBarItem.command = "pstc.highlightErrors";
    showStatusBarItem();
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(showStatusBarItem));
    context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(showStatusBarItem));
    context.subscriptions.push(javaCallDisposable);
    context.subscriptions.push(getFilePathDisposable);
    context.subscriptions.push(scanDocumentDisposable);
    context.subscriptions.push(hoverDisposable);
    context.subscriptions.push(typeCheckerStatusBarItem);
    context.subscriptions.push(highlightErrorsDisposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map