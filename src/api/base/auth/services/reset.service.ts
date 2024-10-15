import { users } from "../auth.repo";
import { hash } from "@/utils/bcrypt";
import { encrypt } from "@/utils/crypto";
import { ResetBody } from "../auth.schemas";
import { baseFactory } from "@/api/factories";
import { VerifyResetDecodedToken } from "@/types";
import { authResponses } from "@/config/responses";
import { handleTokenErrors, verifyToken } from "@/utils/jwt";

export const resetService = baseFactory.createHandlers(async (c) => {
  const { password } = await c.req.json<ResetBody>();
  const { email, token } = c.req.query();

  try {
    const decoded = await verifyToken<VerifyResetDecodedToken>(token);
    if (decoded.email !== encrypt(email)) return c.json(authResponses.tokenInvalid, 400);

    const fetchedUser = await users.findByEmail(decoded.email);
    if (!fetchedUser) return c.json(authResponses.tokenInvalid, 404);

    const { currentResetToken } = fetchedUser;
    if (token !== currentResetToken) return c.json(authResponses.tokenInvalid, 400);

    const userFileds = { password: hash(password), currentResetToken: "" };
    await users.update(fetchedUser.id, userFileds);

    return c.json(authResponses.resetted, 200);
  } catch (err) {
    return c.json(handleTokenErrors(err), 400);
  }
});
