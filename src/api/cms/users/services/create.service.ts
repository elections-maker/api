import { orgFactory } from "@/api/factories";
import { CreateUserBody } from "../users.schemas";
import { usersResponses } from "@/config/responses";

export const createUserService = orgFactory.createHandlers(async (c) => {
  const body = await c.req.json<CreateUserBody>();
  const { database } = c.get("orgData");

  const fetchedUser = await database.user.findUnique({ where: { email: body.email } });
  if (fetchedUser) return c.json(usersResponses.exists, 409);

  await database.user.create({ data: body });
  return c.json(usersResponses.created, 201);
});
