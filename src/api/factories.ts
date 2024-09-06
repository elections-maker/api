import { createFactory } from "hono/factory";
import { AccessDecodedToken, Env } from "@/types";

type AuthEnv = Env<{ userData: AccessDecodedToken }>;

export const baseFactory = createFactory();

export const authFactory = createFactory<AuthEnv>();
