"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkTreeProvider = void 0;
const vscode = require("vscode");
const FileSystemObject_1 = require("./FileSystemObject");
const path = require("path");
class BookmarkTreeProvider {
    constructor(context) {
        this.context = context;
        this._bookmarkList = [];
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.getSavedWorkspaceItems();
        if (this._bookmarkList.length > 0) {
            this.refresh();
        }
    }
    getTreeItem(element) {
        try {
            return element;
        }
        catch {
            throw new Error("Method not implemented.");
        }
    }
    getChildren() {
        const fileObjects = this._bookmarkList.map((uri) => new FileSystemObject_1.FileSystemObject(path.basename(uri.path), uri));
        try {
            return fileObjects;
        }
        catch {
            throw new Error("Method not implemented.");
        }
    }
    get bookmarkList() {
        return this._bookmarkList;
    }
    set bookmarkList(uri) {
        if (uri && !this._bookmarkList.some(u => u.path === uri.path)) {
            this._bookmarkList.push(uri);
        }
        this.refresh();
        this.saveWorkspace();
    }
    removeItem(uri) {
        const index = this._bookmarkList.indexOf(uri);
        index > -1 && this._bookmarkList.splice(index, 1);
        this.refresh();
        this.saveWorkspace();
    }
    removeAllItems() {
        this._bookmarkList.splice(0, this._bookmarkList.length);
        this.refresh();
        this.saveWorkspace();
    }
    getSavedWorkspaceItems() {
        this._bookmarkList = this.context.workspaceState.get('savedWorkspaceItems') || [];
    }
    saveWorkspace() {
        this.context.workspaceState.update('savedWorkspaceItems', this._bookmarkList);
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
}
exports.BookmarkTreeProvider = BookmarkTreeProvider;
//# sourceMappingURL=BookmarkTreeProvider.js.map