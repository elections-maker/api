import { orgFactory } from "@/api/factories";
import { usersResponses } from "@/config/responses";

export const deleteUserService = orgFactory.createHandlers(async (c) => {
  const { userId } = c.req.param();
  const { database } = c.get("orgData");

  const fetchedUser = await database.user.findUnique({ where: { id: userId } });
  if (!fetchedUser) return c.json(usersResponses.notExists, 404);

  await database.user.delete({ where: { id: fetchedUser.id } });
  return c.json(usersResponses.deleted, 200);
});
