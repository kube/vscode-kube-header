
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
        let languageHeader = getHeader(activeTextEditor.document.languageId)

        if (languageHeader)
          editor.insert(new Position(0, 0), languageHeader)
        else
          vscode.window.showInformationMessage(
            'No header found for current file language')
      })
    })

  context.subscriptions.push(disposable)
}

export function deactivate() {
}
