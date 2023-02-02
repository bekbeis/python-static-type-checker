// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { execSync } from 'child_process';
import { measureMemory } from 'vm';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

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
		execSync('javac ' + __dirname + '/java/Main.java', { encoding: 'utf-8' });
		const output = execSync('java -cp ' + __dirname + '/java/ Main', { encoding: 'utf-8' });
		vscode.window.showInformationMessage(output);
	});

	let getFilePathDisposable = vscode.commands.registerCommand('pstc.getFilePath', () => {
		if (vscode.window.activeTextEditor !== undefined) {
			const currentOpenFilePath = vscode.window.activeTextEditor.document.uri.fsPath;
			const catOutput = execSync('cat ' + currentOpenFilePath, { encoding: 'utf-8'});
			vscode.window.showInformationMessage(catOutput);
		}
	});

	context.subscriptions.push(greetDisposable);
	context.subscriptions.push(javaCallDisposable);
	context.subscriptions.push(getFilePathDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}