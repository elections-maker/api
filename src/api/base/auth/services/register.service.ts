import { db } from "@/database";
import { hash } from "@/utils/bcrypt";
import { appConfig } from "@/config/app";
import { sendVerifyEmail } from "@/emails";
import { generateToken } from "@/utils/jwt";
import { baseFactory } from "@/api/factories";
import { RegisterBody } from "../auth.schemas";
import { authResponses } from "@/config/responses";

export const registerService = baseFactory.createHandlers(async (c) => {
  const { email, username, password } = await c.req.json<RegisterBody>();

  const whereQuery = { OR: [{ email }, { username }] };
  const fetchedUser = await db.user.findFirst({ where: whereQuery });
  if (fetchedUser) return c.json(authResponses.credentialsInvalid, 404);

  const currentVerifyToken = await generateToken(appConfig.verifyToken, { email });
  const userFields = { password: hash(password), currentVerifyToken };

  await sendVerifyEmail(email, username, currentVerifyToken);
  await db.user.create({ data: { email, username, ...userFields } });

  return c.json(authResponses.registered, 201);
});
