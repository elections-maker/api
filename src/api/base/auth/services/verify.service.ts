import { users } from "../auth.repo";
import { baseFactory } from "@/api/factories";
import { VerifyResetDecodedToken } from "@/types";
import { authResponses } from "@/config/responses";
import { handleTokenErrors, verifyToken } from "@/utils/jwt";

export const verifyAccountService = baseFactory.createHandlers(async (c) => {
  const { email, token } = c.req.query();

  try {
    const decoded = await verifyToken<VerifyResetDecodedToken>(token);
    if (decoded.email !== email) return c.json(authResponses.tokenInvalid, 400);

    const fetchedUser = await users.findByEmail(decoded.email);
    if (!fetchedUser) return c.json(authResponses.tokenInvalid, 404);

    const { currentVerifyToken } = fetchedUser;
    if (token !== currentVerifyToken) return c.json(authResponses.tokenInvalid, 400);

    const userFileds = { verified: true, currentVerifyToken: "" };
    await users.update(fetchedUser.id, userFileds);

    return c.json(authResponses.verified, 200);
  } catch (err) {
    return c.json(handleTokenErrors(err), 400);
  }
});
