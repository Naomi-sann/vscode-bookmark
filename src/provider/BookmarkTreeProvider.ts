import * as vscode from "vscode";

import { FileSystemObject } from "./FileSystemObject";
import path = require("path");

export type Uri = vscode.Uri;

export class BookmarkTreeProvider
  implements vscode.TreeDataProvider<FileSystemObject> {
  private _bookmarkList: Uri[] = [];

  private _onDidChangeTreeData: vscode.EventEmitter<FileSystemObject | undefined | null | void> = new vscode.EventEmitter<FileSystemObject | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<FileSystemObject | undefined | null | void> = this._onDidChangeTreeData.event;

  constructor(private context: vscode.ExtensionContext) {
    this.getSavedWorkspaceItems();

    if (this._bookmarkList.length > 0) {
      this.refresh();
    }
  }

  getTreeItem(element: FileSystemObject): FileSystemObject | Thenable<FileSystemObject> {
    try {
      return element;
    } catch {
      throw new Error("Method not implemented.");
    }
  }
  getChildren(): vscode.ProviderResult<FileSystemObject[]> {
    const fileObjects = this._bookmarkList.map((uri) =>
      new FileSystemObject(path.basename(uri.path), uri)
    );

    try {
      return fileObjects;
    } catch {
      throw new Error("Method not implemented.");
    }
  }

  get bookmarkList(): Uri[] {
    return this._bookmarkList;
  }
  set bookmarkList(uri: Uri) {
    if (uri && !this._bookmarkList.some(u => u.path === uri.path)) {
      this._bookmarkList.push(uri);
    }
    this.refresh();
    this.saveWorkspace();
  }

  removeItem(uri: vscode.Uri): void {
    const index = this._bookmarkList.indexOf(uri);
    index > -1 && this._bookmarkList.splice(index, 1);
    this.refresh();
    this.saveWorkspace();
  }

  removeAllItems(): void {
    this._bookmarkList.splice(0, this._bookmarkList.length);
    this.refresh();
    this.saveWorkspace();
  }

  getSavedWorkspaceItems(): void {
    this._bookmarkList = this.context.workspaceState.get('savedWorkspaceItems') || [];
  }

  saveWorkspace(): void {
    this.context.workspaceState.update('savedWorkspaceItems', this._bookmarkList);
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}