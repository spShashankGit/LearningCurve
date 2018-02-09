## AngularJS with Typescript -- Setup Guide

### Setting up VSCode

##### Add the following extensions

* Debugger For Chrome
* Live Server
* Path Intellisense
* Prettier
* ESLint
* TSLint

### Setting up GitHub using SSH

##### Putty Setup

* Add "GIT_SSH" mapped to plink.exe as an Environment variable
* Load PuttyGen
  * Generate Key
  * Save Public and Private Key
  * Copy the SSH RSA key and save to Github --> Profile --> Setting --> SSH Keys
* Load Putty
  * Logging --> Hostname
  * Save Profile
  * Proxy --> Proxy Type, Proxy Host, Proxy Port
  * Proxy --> Set username and password if required by proxy
  * Open Host via Putty UI (_this will add the server host to plink sshhostkeys_)
* Load Pageant
  * Add private key
* Clone Repo using SSH Url

### Setting up Project

* Add a gitignore file to exclude "_node\_\_modules, .vscode, dist and any other folder which is your env specific_"
* Add a tsconfig.json
* Install Angular Typings - "_npm install --save-dev @types/angular_"
