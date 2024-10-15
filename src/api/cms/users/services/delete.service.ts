import { users } from "../users.repo";
import { orgFactory } from "@/api/factories";
import { usersResponses } from "@/config/responses";

export const deleteUserService = orgFactory.createHandlers(async (c) => {
  const { id: organizationId } = c.get("orgData");
  const { userId } = c.req.param();

  const fetchedUser = await users.findById(organizationId, userId);
  if (!fetchedUser) return c.json(usersResponses.notExists, 404);

  await users.delete(organizationId, userId);
  return c.json(usersResponses.deleted, 200);
});
