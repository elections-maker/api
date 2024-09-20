import { users } from "../auth.repo";
import { sendVerifyEmail } from "@/emails";
import { generateToken } from "@/utils/jwt";
import { ForgotBody } from "../auth.schemas";
import { baseFactory } from "@/api/factories";
import { authResponses } from "@/config/responses";

export const forgotService = baseFactory.createHandlers(async (c) => {
  const { email } = await c.req.json<ForgotBody>();

  const fetchedUser = await users.findByEmail(email);
  if (!fetchedUser) return c.json(authResponses.credentialsInvalid, 404);

  if (!fetchedUser.verified) {
    if (!fetchedUser.currentVerifyToken) {
      const payload = { email: fetchedUser.email };
      const verifyToken = await generateToken(3600 * 60, payload);

      await sendVerifyEmail(fetchedUser.email, fetchedUser.username, verifyToken);
      await users.update(fetchedUser.id, { currentVerifyToken: verifyToken });

      return c.json(authResponses.verifySent, 200);
    }
    return c.json(authResponses.notVerified, 400);
  }

  const payload = { email: fetchedUser.email };
  const resetToken = await generateToken(3600 * 60, payload);
  await users.update(fetchedUser.id, { currentResetToken: resetToken });

  return c.json(authResponses.forgotted, 200);
});
