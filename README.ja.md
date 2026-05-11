# e2ee-liboqs

[liboqs-js](https://github.com/open-quantum-safe/liboqs-js) の耐量子計算機暗号（ポスト量子暗号）アルゴリズムを使用したエンドツーエンド暗号化（E2EE）の実装例です。

このプロジェクトでは、以下の動作する実装例を提供しています:
- **デジタル署名:** ML-DSA-44 (Dilithium2) を使用。
- **鍵カプセル化:** ML-KEM-768 (Kyber768) を使用して共有シークレットを確立し、それを Web Crypto API (AES-GCM) と組み合わせて共通鍵暗号化を行います。

## デモ

### ブラウザ

モダンなWebブラウザで `index.html` を開き、開発者コンソールで署名と鍵交換の両方の実装例の出力を確認してください。

### Deno (コマンドライン)

#### ML-DSA-44 (Dilithium2) 署名の実装例

この例では、鍵ペアの生成、メッセージへの署名、および署名の検証手順を示します。

**実行:**
```sh
deno run --allow-read https://code4fukui.github.io/e2ee-liboqs/example_sign.js
```

**出力:**
```
message: Hello from Deno + ML-DSA-44
verify: true
publicKey bytes: 1312
secretKey bytes: 2800
signature bytes: 2420
publicKey hex: ...
signature hex: ...
```

#### ML-KEM-768 (Kyber768) 鍵カプセル化の実装例

この例では、2者（Alice と Bob）が Kyber768 を使用して共有シークレットを確立し、そのシークレットを使用して AES-GCM でメッセージを暗号化および復号する手順を示します。

**実行:**
```sh
deno run --allow-read https://code4fukui.github.io/e2ee-liboqs/example_exchange.js
```

**出力:**
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

## 依存関係

- 実装例では `liboqs-js` のフォーク版を使用しています: [code4fukui/liboqs-js](https://github.com/code4fukui/liboqs-js)
- 元のライブラリ: [open-quantum-safe/liboqs-js](https://github.com/open-quantum-safe/liboqs-js)

## 依存ライブラリ `liboqs-js` のビルド (macOS)

macOS 上で `liboqs-js` の WASM モジュールをソースからビルドする手順は以下の通りです。

1.  **Emscripten SDK のインストール:**
    ```sh
    git clone https://github.com/emscripten-core/emsdk.git
    cd emsdk
    ./emsdk install latest
    ./emsdk activate latest
    source ./emsdk_env.sh
    ```

2.  **`liboqs-js` のクローンと準備:**
    ```sh
    # Clone the forked repository
    git clone https://github.com/code4fukui/liboqs-js.git
    cd liboqs-js

    # Install bash (required for mapfile in build script)
    brew install bash
    ```

3.  **ビルドスクリプトの修正:**
    - `build.sh` をエディタで開きます。
    - 最初の行を `#!/usr/bin/env bash` から `#!/opt/homebrew/bin/bash` に変更します。

4.  **プロジェクトのビルド:**
    ```sh
    npm i
    npm run build
    ```

5.  **`.gitignore` の更新 (任意):**
    - ビルド成果物をリポジトリにコミットするには、`.gitignore` ファイル内の `dist/` の行をコメントアウトします。

## ライセンス

[MIT](LICENSE)
