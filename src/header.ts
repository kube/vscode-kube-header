
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

const dashHeader =
  `
      --------,
     -------- --
   --------- -- -,
  -- -- -- .-- ---.
   -- -- -- - -- --.
    -- -- -- -- --'
     -- -- -- .--
      -- -- ---'

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
  'go': slashHeader,
  'groovy': slashHeader,
  'haskell': dashHeader,
  'ini': semicolonHeader,
  'jade': slashHeader,
  'java': slashHeader,
  'javascript': slashHeader,
  'javascriptreact': slashHeader,
  'less': slashHeader,
  'lua': semicolonHeader,
  'makefile': hashHeader,
  'objective-c': slashHeader,
  'ocaml': parensHeader,
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

/**
 * Get header corresponding to languageId
 */
export const getHeader = (language: string) => headers[language]

/**
 * Regex to verify that current text begins by a header
 * Matches all kinds of header even if broken by code-formatter
 */
const headerRegex = /^(\s*\n)?\s*(\/\*|\(\*|#|%|-|;)([#%;"'.,:;/`\- ]*\n){7}[#%;"'.,:;/`\- ]*(\*\/|\*\))?\s*\n/

/**
 * Get current header in text if already present
 * Matches all kinds of header even if broken by code-formatter
 */
export const startsWithHeader = (text: string) => {
  let regexMatches = text.match(headerRegex)
  return regexMatches ? regexMatches[0] : null
}
