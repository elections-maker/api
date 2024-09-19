import { users } from "../auth.repo";
import { hash } from "@/utils/bcrypt";
import { encrypt } from "@/utils/crypto";
import { sendVerifyEmail } from "@/emails";
import { generateToken } from "@/utils/jwt";
import { baseFactory } from "@/api/factories";
import { RegisterBody } from "../auth.schemas";
import { authResponses } from "@/config/responses";

export const registerService = baseFactory.createHandlers(async (c) => {
  const { email, username, password } = await c.req.json<RegisterBody>();

  const encryptedEmail = encrypt(email);

  const fetchedUser = await users.findByEmailUsername(encryptedEmail, username);
  if (fetchedUser) return c.json(authResponses.credentialsInvalid, 404);

  const payload = { email: encryptedEmail };
  const verifyToken = await generateToken(3600 * 60, payload);
  await sendVerifyEmail(email, username, verifyToken);

  await users.create({
    username,
    email: encryptedEmail,
    password: hash(password),
    currentVerifyToken: verifyToken,
  });

  return c.json(authResponses.registered, 201);
});
