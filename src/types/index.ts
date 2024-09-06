import { ZodType } from "zod";
import { MiddlewareHandler } from "hono";
import { H, ValidationTargets } from "hono/types";

export type RouteData = {
  path: string;
  handler: [H];
  validators?: { type: keyof ValidationTargets; schema: ZodType }[];
  method: "GET" | "POST" | "PUT" | "DELETE";
  middlewares?: MiddlewareHandler[];
};

export type EmailOptions = {
  to: string;
  subject: string;
  email: React.ReactElement;
};

export type AccessDecodedToken = {
  userId: string;
};

export type Env<T> = { Variables: T };
