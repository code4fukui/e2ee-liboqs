//import { createMLDSA44 } from "npm:@oqs/liboqs-js/sig";
//import { createMLDSA44 } from "../../util/liboqs-js/src/index.js";
import { createMLDSA44 } from "https://code4fukui.github.io/liboqs-js/src/index.js";
import { Base16 } from "https://code4fukui.github.io/Base16/Base16.js";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const signer = await createMLDSA44();

try {
  // 鍵生成
  const { publicKey, secretKey } = signer.generateKeyPair();

  // 署名対象
  const message = encoder.encode("Hello from Deno + ML-DSA-44");

  // 署名
  const signature = signer.sign(message, secretKey);

  // 検証
  const ok = signer.verify(message, signature, publicKey);

  console.log("message:", decoder.decode(message));
  console.log("verify:", ok);

  // サイズ確認
  console.log("publicKey bytes:", publicKey.length);
  console.log("secretKey bytes:", secretKey.length);
  console.log("signature bytes:", signature.length);

  // 16進表示したい場合
  console.log("publicKey hex:", Base16.encode(publicKey));
  console.log("signature hex:", Base16.encode(signature));
} finally {
  // READMEでも destroy() 推奨
  signer.destroy();
}
