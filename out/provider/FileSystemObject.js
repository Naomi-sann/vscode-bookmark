"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemObject = void 0;
const vscode = require("vscode");
class FileSystemObject extends vscode.TreeItem {
    constructor(label, uri) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.label = label;
        this.tooltip = uri.fsPath;
        this.resourceUri = uri;
        this.command = {
            arguments: [this],
            command: "qmark.openFile",
            title: this.label,
        };
    }
}
exports.FileSystemObject = FileSystemObject;
//# sourceMappingURL=FileSystemObject.js.map