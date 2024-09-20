import { users } from "../users.repo";
import { hash } from "@/utils/bcrypt";
import { encrypt } from "@/utils/crypto";
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

  await users.create({
    ...body,
    organizationId,
    email: encrypt(body.email),
    password: hash(body.password),
  });

  return c.json(usersResponses.created, 201);
});
