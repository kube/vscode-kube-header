
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
import { ExtensionContext, TextEdit, Position, Range } from 'vscode'
import { startsWithHeader, getHeader } from './header'

export function activate(context: vscode.ExtensionContext) {

  let disposable = vscode.commands
    .registerTextEditorCommand('extension.insertHeader', () => {
      let activeTextEditor = vscode.window.activeTextEditor

      activeTextEditor.edit(editor => {
        let document = activeTextEditor.document
        let languageId = document.languageId
        let languageHeader = getHeader(languageId)

        // If found header for current language
        if (languageHeader) {
          let headerAtTop = startsWithHeader(document.getText())

          if (headerAtTop) {
            // Update header in case broken by code formatter
            // Header height can vary if code formatter removed first line
            let headerHeight = headerAtTop[0].split('\n').length - 1
            editor.replace(new Range(0, 0, headerHeight, 0), languageHeader)
          }
          else
            editor.insert(new Position(0, 0), languageHeader)
        }
        else
          vscode.window.showInformationMessage(
            `No header found for language ${languageId}`)
      })
    })

  context.subscriptions.push(disposable)
}

export function deactivate() {
}
