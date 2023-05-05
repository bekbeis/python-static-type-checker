"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const child_process_1 = require("child_process");
const fs = require("fs");
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
    for (let line = 0; line < sourceCodeArr.length; line++) {
        results.forEach((varToken) => {
            let match = sourceCodeArr[line].match(varToken.variableName);
            let range;
            if (match !== null &&
                match.index !== undefined &&
                varToken.error !== null) {
                range = new vscode.Range(new vscode.Position(varToken.line - 1, varToken.col - 1), new vscode.Position(varToken.line - 1, varToken.col - 1 + varToken.variableName.length));
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
// This function is how Java program can be called from the extension environment
function executeTypeChecking() {
    try {
        const file = getFile();
        (0, child_process_1.execSync)("cd " +
            __dirname +
            "/java/classes; java -cp .:../lib/java-cup-11b-runtime.jar:../lib/json-simple-1.1.1.jar Main " +
            file, { encoding: "utf-8" });
        (0, child_process_1.execSync)("mv " + __dirname + "/java/classes/AST_RESULT.json " + __dirname, {
            encoding: "utf-8",
        });
    }
    catch (error) {
        console.log(error);
        vscode.window.showErrorMessage(`Something went wrong. Check the console for information.`);
    }
}
function readJSON() {
    const path = "./AST_RESULT.json";
    fs.readFile(require.resolve(path), (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            results = JSON.parse(data);
        }
    });
}
// This function is one option for how the contents of the file currently open in the workspace can be accessed
// The access is implemented via the file path
function getFile() {
    if (vscode.window.activeTextEditor !== undefined) {
        const currentOpenFilePath = vscode.window.activeTextEditor.document.uri.fsPath;
        // const fileName = currentOpenFilePath.split("/").pop();
        // return fileName?.split(".")[0];
        return currentOpenFilePath;
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
    executeTypeChecking();
    setTimeout(() => {
        typeCheckerStatusBarItem.text = "▶ Type Check";
        typeCheckerStatusBarItemState = true;
        readJSON();
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            decorate(editor);
        }
    }, 3000);
}
function activate(context) {
    const scanDocumentDisposable = vscode.commands.registerCommand("pstc.scanDocument", scanDocument);
    const highlightErrorsDisposable = vscode.commands.registerCommand("pstc.highlightErrors", highlightErrors);
    // The code below modifies the hover window to display information about the variable type and possible errors
    const hoverDisposable = vscode.languages.registerHoverProvider("python", {
        provideHover(document, position, token) {
            if (typeCheckerStatusBarItemState) {
                var returnedHover;
                const range = document.getWordRangeAtPosition(position);
                const word = document.getText(range);
                results.forEach((varToken) => {
                    if (word === varToken.variableName) {
                        if (position.line === varToken.line - 1 &&
                            position.character === varToken.col - 1) {
                            if (varToken.error === null) {
                                returnedHover = new vscode.Hover({
                                    language: "Python",
                                    value: `Type: ` + varToken.variableType + ` (no issues found)`,
                                });
                            }
                            else {
                                returnedHover = new vscode.Hover({
                                    language: "Python",
                                    value: varToken.error,
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
    setInterval(() => {
        readJSON();
    }, 1000);
    context.subscriptions.push(scanDocumentDisposable);
    context.subscriptions.push(hoverDisposable);
    context.subscriptions.push(typeCheckerStatusBarItem);
    context.subscriptions.push(highlightErrorsDisposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map