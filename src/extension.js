const vscode = require('vscode');
const utils = require('./utils');

function activate(context) {
	const provider = new AquariumProvider(context.extensionUri);

	context.subscriptions.push(vscode.window.registerWebviewViewProvider(AquariumProvider.viewType, provider));
}

class AquariumProvider {
	static viewType = 'vscodeAquarium.view';

	constructor(extensionUri) {
		this._extensionUri = extensionUri;
		this._view = undefined;
	}

	resolveWebviewView(webviewView, context, token) {
		this._view = webviewView;

		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [this._extensionUri]
		}

		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

		webviewView.webview.onDidReceiveMessage(data => {
			console.log(data);
		})
	}

	_getHtmlForWebview(webview) {
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'src', 'main.js'));
		const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'src', 'style.css'));
		const perchUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'src', 'sprites', 'perch.png'));
		const perchFlippedUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'src', 'sprites', 'perchFlipped.png'));

		const nonce = utils.getNonce();

		return `<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="stylesheet" href="${styleUri}" />
			</head>
			<body>
				<canvas id="fishCanvas"></canvas>
				<canvas id="backgroundCanvas"></canvas>
				<script nonce="${nonce}" src="${scriptUri}" perchUri="${perchUri}" perchFlippedUri="${perchFlippedUri}"></script>
			</body>
		</html>`
	}
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
