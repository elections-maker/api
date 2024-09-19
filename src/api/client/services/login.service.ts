import { compare } from "@/utils/bcrypt";
import { generateToken } from "@/utils/jwt";
import { LoginBody } from "../client.schemas";
import { clientFactory } from "@/api/factories";
import { authResponses } from "@/config/responses";
import { users } from "@/api/cms/users/users.repo";

export const loginService = clientFactory.createHandlers(async (c) => {
  const { email, password } = await c.req.json<LoginBody>();
  const { organizationId } = c.req.query();

  const fetchedUser = await users.findByEmail(organizationId, email);
  if (!fetchedUser) return c.json(authResponses.credentialsInvalid, 404);

  const passwordMatch = compare(fetchedUser.password, password);
  if (!passwordMatch) return c.json(authResponses.credentialsInvalid, 401);

  const payload = { userId: fetchedUser.id, organizationId };
  const accessToken = await generateToken(3600 * 60, payload);

  return c.json({ ...authResponses.logged, data: { accessToken } }, 200);
});
