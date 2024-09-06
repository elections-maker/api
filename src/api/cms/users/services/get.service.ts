import { orgFactory } from "@/api/factories";
import { usersResponses } from "@/config/responses";

export const getUserService = orgFactory.createHandlers(async (c) => {
  const { userId } = c.req.param();
  const { database } = c.get("orgData");

  const fetchedUser = await database.user.findUnique({
    where: { id: userId },
    include: {
      votations: { select: { votation: { select: { id: true, name: true } } } },
      candidatures: { select: { list: { select: { id: true, name: true } } } },
    },
  });

  if (!fetchedUser) return c.json(usersResponses.notExists, 404);

  const result = {
    ...fetchedUser,
    votations: fetchedUser.votations.map(({ votation }) => votation),
    candidatures: fetchedUser.candidatures.map(({ list }) => list),
  };

  return c.json({
    success: true,
    message: "User fetched successfully!",
    data: { user: result },
  });
});
