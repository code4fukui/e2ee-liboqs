# e2ee-liboqs

## usage

### ML-DSA-44 (Dilithium2) signature example

```sh
deno --allow-import example_sign.js 
```

### ML-KEM-768 (Kyber768) key encapsulation example

```sh
deno --allow-import example_exchange.js
```


## library

- [code4fukui/liboqs-js](https://github.com/code4fukui/liboqs-js) forked [liboqs-js](https://github.com/open-quantum-safe/liboqs-js)

## how to build liboqs-js on mac

- clone [liboqs](https://github.com/open-quantum-safe/liboqs)

```sh
# install Emscripten SDK for WASM build
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh

cd liboqs-js
# for mapfile
brew install bash
```
build.sh の先頭 #!/usr/bin/env bash を #!/opt/homebrew/bin/bash に書き換え
```sh
npm i
npm run build
```
comment out 'dist/' on .gitignore
