import { orgFactory } from "@/api/factories";
import { CreateUserBody } from "../users.schemas";
import { usersResponses } from "@/config/responses";
import { checkPlanLimit } from "@/config/plan-limits";

export const createUserService = orgFactory.createHandlers(async (c) => {
  const body = await c.req.json<CreateUserBody>();
  const { database, data } = c.get("orgData");

  const fetchedUser = await database.user.findUnique({ where: { email: body.email } });
  if (fetchedUser) return c.json(usersResponses.exists, 409);

  const totalUsers = await database.user.count();
  const limitExceeded = checkPlanLimit("maxUsers", data.plan, totalUsers);
  if (limitExceeded) return c.json(usersResponses.limitExceeded, 403);

  await database.user.create({ data: body });
  return c.json(usersResponses.created, 201);
});
