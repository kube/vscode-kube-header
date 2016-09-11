
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
import { ExtensionContext, TextEdit, Position } from 'vscode'
import { getHeader } from './header'

export function activate(context: vscode.ExtensionContext) {

  let disposable = vscode.commands
    .registerCommand('extension.insertHeader', () => {
      let activeTextEditor = vscode.window.activeTextEditor

      activeTextEditor.edit(editor => {
        let languageId = activeTextEditor.document.languageId
        let languageHeader = getHeader(languageId)

        if (languageHeader)
          editor.insert(new Position(0, 0), languageHeader)
        else
          vscode.window.showInformationMessage(
            `No header found for language ${languageId}`)
      })
    })

  context.subscriptions.push(disposable)
}

export function deactivate() {
}
