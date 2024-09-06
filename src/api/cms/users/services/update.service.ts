import { orgFactory } from "@/api/factories";
import { UpdateUserBody } from "../users.schemas";
import { usersResponses } from "@/config/responses";

export const updateUserService = orgFactory.createHandlers(async (c) => {
  const body = await c.req.json<UpdateUserBody>();
  const { database } = c.get("orgData");
  const { userId } = c.req.param();

  const fetchedUser = await database.user.findUnique({ where: { id: userId } });
  if (!fetchedUser) return c.json(usersResponses.notExists, 404);

  if (body.email != fetchedUser.email) {
    const isEmailExist = await database.user.findUnique({ where: { email: body.email } });
    if (isEmailExist) return c.json(usersResponses.exists, 409);
  }

  await database.user.update({ where: { id: fetchedUser.id }, data: body });
  return c.json(usersResponses.updated, 200);
});
