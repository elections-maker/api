import { users } from "../users.repo";
import { decrypt } from "@/utils/crypto";
import { orgFactory } from "@/api/factories";
import { usersResponses } from "@/config/responses";

export const getUserService = orgFactory.createHandlers(async (c) => {
  const { id: organizationId } = c.get("orgData");
  const { userId } = c.req.param();

  const fetchedUser = await users.findById(organizationId, userId);
  if (!fetchedUser) return c.json(usersResponses.notExists, 404);

  const returningData = {
    ...fetchedUser,
    email: decrypt(fetchedUser.email),
    votations: fetchedUser.votations.map(({ votation }) => votation),
    candidatures: fetchedUser.candidatures.map(({ list }) => list),
  };

  return c.json({
    success: true,
    message: "User fetched successfully!",
    data: { user: returningData },
  });
});
