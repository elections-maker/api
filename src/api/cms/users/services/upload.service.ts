import { users } from "../users.repo";
import { hash } from "@/utils/bcrypt";
import { DecoderType } from "@/types";
import { decoders } from "@/utils/decoders";
import { orgFactory } from "@/api/factories";
import { OrganizationUser } from "@prisma/client";
import { usersResponses } from "@/config/responses";
import { checkPlanLimit } from "@/config/plan-limits";

export const uploadUsersService = orgFactory.createHandlers(async (c) => {
  const { id: organizationId, plan } = c.get("orgData");
  const type = c.req.query("type") as DecoderType;
  const uploadedFile = await c.req.arrayBuffer();

  const decoderExists = type in decoders;
  if (!decoderExists) return c.json(usersResponses.decoderNotExists, 400);

  const usersData = decoders[type]<OrganizationUser>(uploadedFile);

  const totalUsers = await users.count(organizationId);
  const limitExceeded = checkPlanLimit("maxUsers", plan, totalUsers + usersData.length);
  if (limitExceeded) return c.json(usersResponses.limitExceeded, 403);

  const usersFields = usersData.map((user) => ({ ...user, password: hash(user.password) }));
  await users.createMany(usersFields);

  return c.json(usersResponses.uploaded, 200);
});
