import * as vscode from "vscode";
import { execSync } from "child_process";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "Python Type Checker" is now active!'
  );

  // The code below is a sample of how Java program can be called from the extension environment
  // IMPORTANT NOTE: There is no better option to implement this functionality for now
  const javaCallDisposable = vscode.commands.registerCommand(
    "pstc.javaCall",
    () => {
      var currentOpenFilePath;
      if (vscode.window.activeTextEditor !== undefined) {
        currentOpenFilePath =
          vscode.window.activeTextEditor.document.uri.fsPath;
      }
      execSync("javac " + __dirname + "/java/Main.java", { encoding: "utf-8" });
      // The line of code below runs the Java side of the project passing a file path as an argument
      const output = execSync(
        "java -cp " + __dirname + "/java/ Main " + currentOpenFilePath,
        { encoding: "utf-8" }
      );
      vscode.window.showInformationMessage(output);
    }
  );

  // This method is one option for how the contents of the file currently open in the workspace can be accessed
  // The access is implemented via the file path
  const getFilePathDisposable = vscode.commands.registerCommand(
    "pstc.getFilePath",
    () => {
      if (vscode.window.activeTextEditor !== undefined) {
        const currentOpenFilePath =
          vscode.window.activeTextEditor.document.uri.fsPath;

        // The code below is to demonstrate whether the file content is accessed successfully
        const catOutput = execSync("cat " + currentOpenFilePath, {
          encoding: "utf-8",
        });
        vscode.window.showInformationMessage(catOutput);
      }
    }
  );

  // This method is another option for how the contents of the file currently open in the workspace can be accessed
  // The access is implemented via the active text editor
  var prevContent: string | undefined = undefined;
  const scanDocumentDisposable = vscode.commands.registerCommand(
    "pstc.scanDocument",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        let document = editor.document;
        const documentText = document.getText();
        if (prevContent === undefined) {
          prevContent = documentText;
        } else {
          vscode.window.showInformationMessage(`Previous content is saved`);
        }

        // The code below is to demonstrate whether the file content is accessed successfully
        vscode.window.showInformationMessage(documentText);

        // IMPORTANT NOTE: Is it possible to compare the instances of documentText?
        //				   If the answer is yes, we can only send the updated parts
        //				   of the document to the back end of the system
      }
    }
  );

  const hoverDisposable = vscode.languages.registerHoverProvider("python", {
    provideHover(document, position, token) {
      const range = document.getWordRangeAtPosition(position);
      const word = document.getText(range);

      // JSON object must be catched and iterated instead of the contents array
      const contents = [
        { variableName: "x", variableType: `int`, lin: 0, col: 0, err: null },
        { variableName: "y", variableType: `float`, lin: 0, col: 3, err: null },
        { variableName: "z", variableType: `float`, lin: 1, col: 0, err: null },
        { variableName: "x", variableType: `int`, lin: 1, col: 4, err: null },
        { variableName: "y", variableType: `float`, lin: 1, col: 8, err: null },
        {
          variableName: "x",
          variableType: `int`,
          lin: 2,
          col: 0,
          err: `ERROR: expression has type "str", variable has type "int"`,
        },
      ];

      var returnedHover;

      contents.forEach((contentToken) => {
        if (word === contentToken.variableName) {
          if (position.line === contentToken.lin && position.character === contentToken.col) {
            if (contentToken.err === null) {
              returnedHover = new vscode.Hover({
                language: "Python",
                value: `Variable type: ` + contentToken.variableType + ` (no issues found)`,
              });
            } else {
              returnedHover = new vscode.Hover({
                language: "Python",
                value: contentToken.err,
              });
            }
          }
        }
      });

      return returnedHover;
    },
  });

  context.subscriptions.push(javaCallDisposable);
  context.subscriptions.push(getFilePathDisposable);
  context.subscriptions.push(scanDocumentDisposable);
  context.subscriptions.push(hoverDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
