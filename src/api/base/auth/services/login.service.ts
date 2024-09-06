import { db } from "@/database";
import { appConfig } from "@/config/app";
import { sendVerifyEmail } from "@/emails";
import { LoginBody } from "../auth.schemas";
import { generateToken } from "@/utils/jwt";
import { baseFactory } from "@/api/factories";
import { compare, hash } from "@/utils/bcrypt";
import { authResponses } from "@/config/responses";

export const loginService = baseFactory.createHandlers(async (c) => {
  const { username, password } = await c.req.json<LoginBody>();

  const fetchedUser = await db.user.findUnique({ where: { username } });
  if (!fetchedUser) return c.json(authResponses.credentialsInvalid, 404);

  const passwordMatch = compare(fetchedUser.password, password);
  if (!passwordMatch) return c.json(authResponses.credentialsInvalid, 404);

  if (!fetchedUser.verified) {
    if (!fetchedUser.currentVerifyToken) {
      const { email } = fetchedUser;
      const currentVerifyToken = await generateToken(appConfig.verifyToken, { email });

      const userFields = { password: hash(password), currentVerifyToken };
      await sendVerifyEmail(email, username, currentVerifyToken);
      await db.user.create({ data: { email, username, ...userFields } });

      return c.json(authResponses.verifySent, 200);
    }

    return c.json(authResponses.notVerified, 400);
  }

  const payload = { userId: fetchedUser.id };
  const accessToken = await generateToken(appConfig.accessToken, payload);

  return c.json({ ...authResponses.logged, data: { accessToken } }, 200);
});
