import { hash } from "@/utils/bcrypt";
import { encrypt } from "@/utils/crypto";
import { JoinBody } from "../client.schemas";
import { clientFactory } from "@/api/factories";
import { users } from "@/api/cms/users/users.repo";
import { handleTokenErrors, verifyToken } from "@/utils/jwt";
import { authResponses, clientRespones } from "@/config/responses";

export const joinService = clientFactory.createHandlers(async (c) => {
  const { password } = await c.req.parseBody<JoinBody>();
  const { organizationId } = c.req.param();
  const { email, token } = c.req.query();

  try {
    const decoded = await verifyToken<{ email: string }>(token);
    if (decoded.email !== encrypt(email)) return c.json(authResponses.tokenInvalid, 400);

    const fetchedUser = await users.findByEmail(organizationId, decoded.email);
    if (!fetchedUser) return c.json(authResponses.tokenInvalid, 404);

    const isTokenValid = fetchedUser.verifyToken === token;
    if (isTokenValid) return c.json(authResponses.tokenInvalid, 400);

    const payalod = { verified: true, verifyToken: null, expiresAt: null, password: hash(password) };
    await users.update(organizationId, fetchedUser.id, payalod);

    return c.json(clientRespones.joined, 200);
  } catch (err) {
    return c.json(handleTokenErrors(err), 400);
  }
});
