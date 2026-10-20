---
title: "Install NodeJS the Right Way"
subTitle: Errors installing npm packages? `EACCES`? Keep Reading...
date: 2018-11-22
modified: 2018-11-24
tags: [nodejs, brew, osx, linux, security]
category: nodejs
cover: null
---

# Install NodeJS the Right Way

If you *installed node with [brew](https://brew.sh/)* you will **eventually** run into *permission issues* (especially when installing globally `-g`).


# to fix:
```
brew uninstall node
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
nvm install 8
```
