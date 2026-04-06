import { createMLKEM768 } from "https://code4fukui.github.io/liboqs-js/src/index.js";
import { Base16 } from "https://code4fukui.github.io/Base16/Base16.js";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const importAesKey = async (sharedSecret) => {
  return await crypto.subtle.importKey(
    "raw",
    sharedSecret,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
};

const alice = await createMLKEM768();
const bob = await createMLKEM768();

try {
  // Bob が鍵ペアを生成し、公開鍵を Alice に渡す
  const { publicKey, secretKey } = bob.generateKeyPair();

  // Alice が Bob の公開鍵に対して共有秘密を生成
  const { ciphertext, sharedSecret } = alice.encapsulate(publicKey);

  // Bob が暗号文から同じ共有秘密を復元
  const bobSharedSecret = bob.decapsulate(ciphertext, secretKey);

  const sharedSecretHex = Base16.encode(sharedSecret);
  const bobSharedSecretHex = Base16.encode(bobSharedSecret);

  // Alice が共有秘密で電文を暗号化して Bob に送る
  const message = "Hello! Bob - Kyber-768(ML-KEM-768)";
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const aliceKey = await importAesKey(sharedSecret);
  const encryptedMessage = new Uint8Array(
    await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      aliceKey,
      encoder.encode(message),
    ),
  );

  // Bob が同じ共有秘密で復号する
  const bobKey = await importAesKey(bobSharedSecret);
  const decryptedMessage = decoder.decode(
    await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      bobKey,
      encryptedMessage,
    ),
  );

  console.log("shared secret match:", sharedSecretHex === bobSharedSecretHex);
  console.log("message:", message);
  console.log("decrypted message:", decryptedMessage);
  console.log("publicKey bytes:", publicKey.length);
  console.log("secretKey bytes:", secretKey.length);
  console.log("ciphertext bytes:", ciphertext.length);
  console.log("sharedSecret bytes:", sharedSecret.length);
  console.log("iv hex:", Base16.encode(iv));
  console.log("encryptedMessage hex:", Base16.encode(encryptedMessage));
  console.log("publicKey hex:", Base16.encode(publicKey));
  console.log("ciphertext hex:", Base16.encode(ciphertext));
  console.log("sharedSecret hex:", sharedSecretHex);
} finally {
  alice.destroy();
  bob.destroy();
}
