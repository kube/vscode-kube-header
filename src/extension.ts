
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

'use strict'
import * as vscode from 'vscode'
import {
  ExtensionContext, TextEdit, TextEditorEdit, TextDocument, Position, Range
} from 'vscode'
import { getHeaderAtStart, getHeader } from './header'

/**
 * Update header in document in case broken by code formatter
 */
function replaceHeader(editor: TextEditorEdit,
  currentHeader: string, header: string) {
  // Header height can vary if code formatter removed first line
  let headerHeight = currentHeader.split('\n').length - 1

  editor.replace(new Range(0, 0, headerHeight, 0), header)
}

/**
 * Insert a new header at top of document
 */
function insertHeader(editor: TextEditorEdit, header: string) {
  editor.insert(new Position(0, 0), header)
}

/**
 * `insertHeader` Command Handler
 */
function insertHeaderHandler() {
  let activeTextEditor = vscode.window.activeTextEditor
  let document = activeTextEditor.document
  let languageId = document.languageId
  let languageHeader = getHeader(languageId)

  // If found header for current language
  if (languageHeader) {
    activeTextEditor.edit(editor => {
      let currentHeader = getHeaderAtStart(document.getText())

      if (currentHeader)
        replaceHeader(editor, currentHeader, languageHeader)
      else
        insertHeader(editor, languageHeader)
    })
  }
  else
    vscode.window.showInformationMessage(
      `No header found for language ${languageId}`)
}

/**
 * Start watcher for document save to update current header
 * if broken by code-formatter
 */
function startHeaderUpdateOnSaveWatcher(subscriptions) {
  const ignoreNextSave = new WeakSet()

  // Here we use the trick from Luke Hoban Go Extension,
  // But this will cause an infinite loop if another extension that
  // uses the same technique is active.
  // And it's really ugly.
  vscode.workspace.onDidSaveTextDocument(document => {
    let textEditor = vscode.window.activeTextEditor

    if (textEditor.document === document
      && !ignoreNextSave.has(document)) {
      let languageHeader = getHeader(document.languageId)
      let currentHeader = getHeaderAtStart(document.getText())

      // If found header for current language
      // and a header is present at top of document
      if (languageHeader && currentHeader) {
        textEditor.edit(editor =>
          replaceHeader(editor, currentHeader, languageHeader))
          .then(applied => {
            ignoreNextSave.add(document)
            return document.save()
          })
          .then(() => {
            ignoreNextSave.delete(document)
          }, err => { })
      }
    }
  }, null, subscriptions)
}


export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands
    .registerTextEditorCommand('kube.insertHeader', insertHeaderHandler)

  context.subscriptions.push(disposable)
  startHeaderUpdateOnSaveWatcher(context.subscriptions)
}

export function deactivate() {
}
