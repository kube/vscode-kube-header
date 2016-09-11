
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

const hashHeader =
  `
      #########.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##."

`

const slashHeader =
  `
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

`

const semicolonHeader =
  `
      ;;;;;;;;;.
     ;;;;;;;;',;:
   ;;;;;;;;;',;;".
  ;;';;';; .;;',;;.
   ;; ;; ;; ; ;;",;.
    ;; ;; ;; ;; ;;'
     ;; ;; ;; :;;
      ;; ;; ;;.'

`

const parensHeader =
  `
      (*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*)

`

const percentHeader =
  `
      %%%%%%%%%.
     %%%%%%%%",%:
   %%%%%%%%%',%%".
  %%'%%'%% .%%',%%.
   %% %% %% % %%",%.
    %% %% %% %% %%'
     %% %% %% :%%
      %% %% %%."

`

const headers = {
  'c': slashHeader,
  'coffeescript': hashHeader,
  'cpp': slashHeader,
  'css': slashHeader,
  'dockerfile': hashHeader,
  'fsharp': parensHeader,
  'go': hashHeader,
  'groovy': slashHeader,
  'jade': slashHeader,
  'javascript': slashHeader,
  'javascriptreact': slashHeader,
  'less': slashHeader,
  'makefile': hashHeader,
  'objective-c': slashHeader,
  'perl': hashHeader,
  'perl6': hashHeader,
  'php': slashHeader,
  'plaintext': hashHeader,
  'powershell': hashHeader,
  'python': hashHeader,
  'r': hashHeader,
  'ruby': hashHeader,
  'rust': slashHeader,
  'scss': slashHeader,
  'shellscript': hashHeader,
  'sql': hashHeader,
  'swift': slashHeader,
  'typescript': slashHeader,
  'typescriptreact': slashHeader,
  'xsl': slashHeader,
  'yaml': hashHeader
}

export const getHeader = (language: string) => headers[language]