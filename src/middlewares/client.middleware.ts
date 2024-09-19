import { getCookie } from "hono/cookie";
import { clientFactory } from "@/api/factories";
import { users } from "@/api/cms/users/users.repo";
import { ClientAccessDecodedToken } from "@/types";
import { authResponses } from "@/config/responses";
import { handleTokenErrors, verifyToken } from "@/utils/jwt";

export const clientMiddleware = clientFactory.createMiddleware(async (c, next) => {
  try {
    const token = getCookie(c, "client_access_token");

    if (!token) return c.json(authResponses.notAuthorized, 401);
    const { userId, organizationId } = await verifyToken<ClientAccessDecodedToken>(token);

    const fetchedUser = await users.findById(organizationId, userId);
    if (!fetchedUser) return c.json(authResponses.notAuthorized, 401);

    c.set("clientUserData", fetchedUser);
    return await next();
  } catch (err) {
    return c.json(handleTokenErrors(err), 400);
  }
});
