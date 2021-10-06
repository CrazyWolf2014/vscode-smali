var vscode = require("vscode");

function registerSymbolsProvider() {
  var SmaliDocumentSymbolProvider = (function () {
    function SmaliDocumentSymbolProvider() {}
    SmaliDocumentSymbolProvider.prototype.provideDocumentSymbols = function (
      document,
      token
    ) {
      return new Promise(function (resolve, reject) {
        var symbols = [];
        for (var j = 0; j < document.lineCount; j++) {
          var line = document.lineAt(j);
          // lazy parse
          const rgMethod = /\.method (.*) ?(constructor)? (.*)\((.*)\)(.*)/i;
          const methodMatch = line.text.match(rgMethod);
          const rgField = /\.field (.*) (.*):(.*);/i;
          const fieldMatch = line.text.match(rgField);

          if (methodMatch !== null) {
            symbols.push({
              name: methodMatch[3],
              kind: vscode.SymbolKind.Method,
              location: new vscode.Location(document.uri, line.range),
            });
          }

          if (fieldMatch !== null) {
            symbols.push({
              name: fieldMatch[2],
              kind: vscode.SymbolKind.Field,
              location: new vscode.Location(document.uri, line.range),
            });
          }
        }
        resolve(symbols);
      });
    };
    return SmaliDocumentSymbolProvider;
  })();

  return vscode.languages.registerDocumentSymbolProvider(
    { language: "smali" },
    new SmaliDocumentSymbolProvider()
  );
}

module.exports = { registerSymbolsProvider };
