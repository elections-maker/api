import { appConfig } from "@/config/app";
import { compareSync, genSaltSync, hashSync } from "bcrypt";

export const compare = (hashedPassword: string, password: string) => {
  return compareSync(password, hashedPassword);
};

export const hash = (password: string) => {
  const salt = genSaltSync(appConfig.saltRounds);
  return hashSync(password, salt);
};
