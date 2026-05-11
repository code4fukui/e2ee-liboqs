# e2ee-liboqs

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

Examples demonstrating end-to-end encryption using post-quantum cryptographic algorithms from [liboqs-js](https://github.com/open-quantum-safe/liboqs-js).

This project provides working examples for:
- **Digital Signatures:** Using ML-DSA-44 (Dilithium2).
- **Key Encapsulation:** Using ML-KEM-768 (Kyber768) to establish a shared secret, which is then used with the Web Crypto API (AES-GCM) for symmetric encryption.

## Demos

### Browser

Open `index.html` in a modern web browser and check the developer console to see the output from both the signature and key exchange examples.

### Deno (Command Line)

#### ML-DSA-44 (Dilithium2) Signature Example

This example demonstrates creating a key pair, signing a message, and verifying the signature.

**Run:**
```sh
deno run --allow-read https://code4fukui.github.io/e2ee-liboqs/example_sign.js
```

**Output:**
```
message: Hello from Deno + ML-DSA-44
verify: true
publicKey bytes: 1312
secretKey bytes: 2800
signature bytes: 2420
publicKey hex: ...
signature hex: ...
```

#### ML-KEM-768 (Kyber768) Key Encapsulation Example

This example shows two parties (Alice and Bob) using Kyber768 to establish a shared secret and then using that secret to encrypt and decrypt a message with AES-GCM.

**Run:**
```sh
deno run --allow-read https://code4fukui.github.io/e2ee-liboqs/example_exchange.js
```

**Output:**
```
shared secret match: true
message: Hello! Bob - Kyber-768(ML-KEM-768)
decrypted message: Hello! Bob - Kyber-768(ML-KEM-768)
publicKey bytes: 1184
secretKey bytes: 2400
ciphertext bytes: 1088
sharedSecret bytes: 32
...
```

## Dependencies

- The examples use a fork of `liboqs-js`: [code4fukui/liboqs-js](https://github.com/code4fukui/liboqs-js)
- Original library: [open-quantum-safe/liboqs-js](https://github.com/open-quantum-safe/liboqs-js)

## Building the `liboqs-js` Dependency (macOS)

These are the steps to build the `liboqs-js` WASM modules from source on macOS.

1.  **Install Emscripten SDK:**
    ```sh
    git clone https://github.com/emscripten-core/emsdk.git
    cd emsdk
    ./emsdk install latest
    ./emsdk activate latest
    source ./emsdk_env.sh
    ```

2.  **Clone and prepare `liboqs-js`:**
    ```sh
    # Clone the forked repository
    git clone https://github.com/code4fukui/liboqs-js.git
    cd liboqs-js

    # Install bash (required for mapfile in build script)
    brew install bash
    ```

3.  **Modify the build script:**
    - Open `build.sh` in an editor.
    - Change the first line from `#!/usr/bin/env bash` to `#!/opt/homebrew/bin/bash`.

4.  **Build the project:**
    ```sh
    npm i
    npm run build
    ```

5.  **Update `.gitignore` (optional):**
    - To commit the build artifacts to your repository, comment out the `dist/` line in the `.gitignore` file.

## License

[MIT](LICENSE)