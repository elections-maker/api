import { sign, verify } from "hono/jwt";
import { appConfig } from "@/config/app";
import { JwtTokenExpired, JwtTokenInvalid } from "hono/utils/jwt/types";

export const generateToken = async (exp: number, fields?: object) => {
  const iat = Math.floor(Date.now() / 1000);

  const payload = {
    ...fields,
    iat,
    exp: iat + exp,
  };

  return await sign(payload, appConfig.jwtSecretKey);
};

export const verifyToken = async <T>(token: string) => {
  const decoded = await verify(token, appConfig.jwtSecretKey);
  return decoded as T;
};

export const handleTokenErrors = (err: unknown) => {
  if (err instanceof JwtTokenExpired) {
    return { success: false, message: "The token is expired!" };
  }

  if (err instanceof JwtTokenInvalid) {
    return { success: false, message: "The token is invalid!" };
  }
};
