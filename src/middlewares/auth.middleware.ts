import { db } from "@/database";
import { getCookie } from "hono/cookie";
import { AccessDecodedToken } from "@/types";
import { authFactory } from "@/api/factories";
import { authResponses } from "@/config/responses";
import { handleTokenErrors, verifyToken } from "@/utils/jwt";

export const authMiddleware = authFactory.createMiddleware(async (c, next) => {
  try {
    const token = getCookie(c, "access_token");

    if (!token) return c.json(authResponses.notAuthorized, 401);

    const decoded = await verifyToken<AccessDecodedToken>(token);
    const fetchedUser = await db.user.findUnique({ where: { id: decoded.userId } });
    if (!fetchedUser) return c.json(authResponses.notAuthorized, 401);

    c.set("userData", { userId: fetchedUser.id });

    return await next();
  } catch (err) {
    return c.json(handleTokenErrors(err), 400);
  }
});
