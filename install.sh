
      #########.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##."

# A little install script to
# remember howto install extension
npm install
vsce package
code --uninstall-extension kube.kube-header
code --install-extension kube-header*.vsix
rm kube-header*.vsix
