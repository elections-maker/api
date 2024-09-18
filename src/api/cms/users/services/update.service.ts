import { users } from "../users.repo";
import { orgFactory } from "@/api/factories";
import { UpdateUserBody } from "../users.schemas";
import { usersResponses } from "@/config/responses";

export const updateUserService = orgFactory.createHandlers(async (c) => {
  const body = await c.req.json<UpdateUserBody>();
  const { id: organizationId, plan } = c.get("orgData");
  const { userId } = c.req.param();

  const fetchedUser = await users.findById(organizationId, userId);
  if (!fetchedUser) return c.json(usersResponses.notExists, 404);

  if (body.email !== fetchedUser.email) {
    const fetchedUser = await users.findByEmail(organizationId, body.email);
    if (fetchedUser) return c.json(usersResponses.exists, 400);
  }

  await users.update(organizationId, userId, { ...body });
  return c.json(usersResponses.updated, 200);
});
