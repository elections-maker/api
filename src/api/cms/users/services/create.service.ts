import { users } from "../users.repo";
import { hash } from "@/utils/bcrypt";
import { orgFactory } from "@/api/factories";
import { CreateUserBody } from "../users.schemas";
import { usersResponses } from "@/config/responses";
import { checkPlanLimit } from "@/config/plan-limits";

export const createUserService = orgFactory.createHandlers(async (c) => {
  const { id: organizationId, plan } = c.get("orgData");
  const body = await c.req.json<CreateUserBody>();

  const fetchedUser = await users.findByEmail(organizationId, body.email);
  if (fetchedUser) return c.json(usersResponses.exists, 409);

  const totalUsers = await users.count(organizationId);
  const limitExceeded = checkPlanLimit("maxUsers", plan, totalUsers);
  if (limitExceeded) return c.json(usersResponses.limitExceeded, 403);

  const userFields = { ...body, password: hash(body.password) };
  await users.create({ organizationId, ...userFields });

  return c.json(usersResponses.created, 201);
});
