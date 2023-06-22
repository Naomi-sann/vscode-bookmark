"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const BookmarkTreeProvider_1 = require("./provider/BookmarkTreeProvider");
function activate(context) {
    const bookmarkTree = new BookmarkTreeProvider_1.BookmarkTreeProvider(context);
    context.subscriptions.push(...[
        vscode.window.registerTreeDataProvider("qmark", bookmarkTree),
        vscode.commands.registerCommand("qmark.refreshEntry", () => {
            bookmarkTree.refresh();
        }),
        vscode.commands.registerCommand("qmark.addItem", (args) => {
            bookmarkTree.bookmarkList = vscode.Uri.parse(args.path);
        }),
        vscode.commands.registerCommand("qmark.removeItem", (args) => {
            bookmarkTree.removeItem(args.resourceUri);
        }),
        vscode.commands.registerCommand("qmark.removeAllItems", () => {
            bookmarkTree.removeAllItems();
        }),
        vscode.commands.registerCommand("qmark.openFile", (file) => {
            vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(file.resourceUri.path));
        }),
    ]);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map