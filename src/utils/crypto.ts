import { appConfig } from "@/config/app";
import { createCipheriv, createDecipheriv } from "node:crypto";

export const encrypt = (value: string) => {
  const { encryptonKey, ivKey } = appConfig;

  const cipher = createCipheriv("aes-256-cbc", encryptonKey, ivKey);
  let encrypted = cipher.update(value, "utf8", "base64");
  encrypted += cipher.final("base64");

  return encrypted;
};

export const decrypt = (encrypted: string) => {
  const { encryptonKey, ivKey } = appConfig;

  const decipher = createDecipheriv("aes-256-cbc", encryptonKey, ivKey);
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
