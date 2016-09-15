
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
import { startsWithHeader, getHeader } from './header'

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
      let currentHeader = startsWithHeader(document.getText())

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

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands
    .registerTextEditorCommand('extension.insertHeader', insertHeaderHandler)

  context.subscriptions.push(disposable)
}

export function deactivate() {
}
