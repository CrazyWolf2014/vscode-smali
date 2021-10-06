const pSymbols = require("./symbolsProvider");
const vscode = require("vscode");

function activate(context) {
  // register provider
  let syProvider = pSymbols.registerSymbolsProvider();
  context.subscriptions.push(syProvider);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
