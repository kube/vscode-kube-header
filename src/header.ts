
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

export type SupportedLanguage = keyof Headers

export type Headers = {
  'c': string
  'coffeescript': string
  'cpp': string
  'css': string
  'dockerfile': string
  'erlang': string
  'fsharp': string
  'go': string
  'groovy': string
  'haskell': string
  'ini': string
  'jade': string
  'java': string
  'javascript': string
  'javascriptreact': string
  'latex': string
  'less': string
  'lua': string
  'makefile': string
  'matlab': string
  'objective-c': string
  'ocaml': string
  'perl': string
  'perl6': string
  'php': string
  'plaintext': string
  'powershell': string
  'python': string
  'r': string
  'ruby': string
  'rust': string
  'scss': string
  'shellscript': string
  'sql': string
  'swift': string
  'typescript': string
  'typescriptreact': string
  'xsl': string
  'yaml': string
}

const headers: Headers = {
  'c': slashHeader,
  'coffeescript': hashHeader,
  'cpp': slashHeader,
  'css': slashHeader,
  'dockerfile': hashHeader,
  'erlang': percentHeader,
  'fsharp': parensHeader,
  'go': slashHeader,
  'groovy': slashHeader,
  'haskell': dashHeader,
  'ini': semicolonHeader,
  'jade': slashHeader,
  'java': slashHeader,
  'javascript': slashHeader,
  'javascriptreact': slashHeader,
  'latex': percentHeader,
  'less': slashHeader,
  'lua': semicolonHeader,
  'makefile': hashHeader,
  'matlab': percentHeader,
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
 * Check if language is supported
 */
export const isSupportedLanguage = (lang: string): lang is SupportedLanguage =>
  lang in headers

/**
 * Get header corresponding to languageId
 */
export const getHeader = (language: SupportedLanguage) =>
  headers[language]

/**
 * Regex to verify that current text begins by a header
 * Matches all kinds of header even if broken by code-formatter
 */
const headerRegex = /^(\s*\n)?\s*(\/\*|\(\*|#|%|-|;)([#%;"'.,:;/`\- ]*\n){7}[#%;"'.,:;/`\- ]*(\*\/|\*\))?\s*\n/

/**
 * Get current header in text if already present
 * Matches all kinds of header even if broken by code-formatter
 */
export const extractHeader = (text: string) => {
  const regexMatches = text.match(headerRegex)
  return regexMatches ? regexMatches[0] : undefined
}
