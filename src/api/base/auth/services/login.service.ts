import { compare } from "bcrypt";
import { users } from "../auth.repo";
import { sendVerifyEmail } from "@/emails";
import { LoginBody } from "../auth.schemas";
import { generateToken } from "@/utils/jwt";
import { baseFactory } from "@/api/factories";
import { authResponses } from "@/config/responses";

export const loginService = baseFactory.createHandlers(async (c) => {
  const { username, password } = await c.req.json<LoginBody>();

  const fetchedUser = await users.findByUsername(username);
  if (!fetchedUser) return c.json(authResponses.credentialsInvalid, 404);

  const passwordMatch = compare(fetchedUser.password, password);
  if (!passwordMatch) return c.json(authResponses.credentialsInvalid, 404);

  if (!fetchedUser.verified) {
    if (!fetchedUser.currentVerifyToken) {
      const payload = { email: fetchedUser.email };
      const verifyToken = await generateToken(3600 * 60, payload);

      await sendVerifyEmail(fetchedUser.email, username, verifyToken);
      await users.update(fetchedUser.id, { currentVerifyToken: verifyToken });

      return c.json(authResponses.verifySent, 200);
    }
    return c.json(authResponses.notVerified, 400);
  }

  const payload = { userId: fetchedUser.id };
  const accessToken = await generateToken(3600 * 60, payload);

  return c.json({ ...authResponses.logged, data: { accessToken } }, 200);
});
