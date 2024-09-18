import { getCookie } from "hono/cookie";
import { AccessDecodedToken } from "@/types";
import { authFactory } from "@/api/factories";
import { users } from "@/api/base/auth/auth.repo";
import { authResponses } from "@/config/responses";
import { handleTokenErrors, verifyToken } from "@/utils/jwt";

export const authMiddleware = authFactory.createMiddleware(async (c, next) => {
  try {
    const token = getCookie(c, "access_token");

    if (!token) return c.json(authResponses.notAuthorized, 401);
    const { userId } = await verifyToken<AccessDecodedToken>(token);

    const fetchedUser = await users.findById(userId);
    if (!fetchedUser) return c.json(authResponses.notAuthorized, 401);

    c.set("userData", fetchedUser);
    return await next();
  } catch (err) {
    return c.json(handleTokenErrors(err), 400);
  }
});
