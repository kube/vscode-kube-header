
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import * as vscode from 'vscode'
import { WorkspaceEdit, TextEdit, Position, Range } from 'vscode'
import { isSupportedLanguage, SupportedLanguage, extractHeader, getHeader } from './header'

/**
 * Returns the number of lines of a header.
 * Header height can vary if code formatter removed first line
 */
const getHeaderHeight = (header: string) =>
  header.split('\n').length - 1

/**
 * Insert a new header at top of document
 */
const insertHeader = (language: SupportedLanguage) =>
  TextEdit.insert(
    new Position(0, 0),
    getHeader(language)
  )

/**
 * Update header in document in case broken by code formatter
 */
const replaceHeader = (currentHeader: string, language: SupportedLanguage) =>
  TextEdit.replace(
    new Range(0, 0, getHeaderHeight(currentHeader), 0),
    getHeader(language)
  )

/**
 * Helper to apply TextEdits to Document
 */
const applyTextEdits = (document: vscode.TextDocument, textEdits: TextEdit[]) => {
  const workspaceEdit = new WorkspaceEdit()
  workspaceEdit.set(document.uri, textEdits)
  vscode.workspace.applyEdit(workspaceEdit)
}

/**
 * Header Insertion Command Handler
 */
const insertHeaderHandler = ({ document }: vscode.TextEditor) => {
  if (isSupportedLanguage(document.languageId)) {
    const currentHeader = extractHeader(document.getText())

    applyTextEdits(document, [
      currentHeader
        ? replaceHeader(currentHeader, document.languageId)
        : insertHeader(document.languageId)
    ])
  }
  else
    vscode.window.showInformationMessage(
      `No header found for language ${document.languageId}`
    )
}

/**
 * Returns TextEdits to perform to fix a potential header
 */
const updateDocumentHeader = (document: vscode.TextDocument) => {
  const currentHeader = extractHeader(document.getText())

  return currentHeader && isSupportedLanguage(document.languageId)
    ? [replaceHeader(currentHeader, document.languageId)]
    : []
}

/**
 * Called by VSCode on extension activation.
 * Registers header insertion command and formatting provider.
 */
export const activate = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands
      .registerTextEditorCommand('kube.insertHeader', insertHeaderHandler),

    vscode.workspace
      .onWillSaveTextDocument(event =>
        applyTextEdits(event.document,
          updateDocumentHeader(event.document)
        )
      )
  )
}
