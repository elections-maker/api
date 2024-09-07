import { orgFactory } from "@/api/factories";
import { votationsResponses } from "@/config/responses";
import { AddVotationUsersBody } from "../../votations.schemas";

export const addVotationUsersService = orgFactory.createHandlers(async (c) => {
  const { users } = await c.req.json<AddVotationUsersBody>();
  const { database } = c.get("orgData");
  const { votationId } = c.req.param();

  const fetchedVotation = await database.votation.findUnique({ where: { id: votationId } });
  if (!fetchedVotation) return c.json(votationsResponses.notExists, 404);

  for (const userId of users) {
    const fetchedUser = await database.user.findUnique({ where: { id: userId } });

    if (fetchedUser) {
      const existingUser = await database.votationUser.findUnique({
        where: { userId_votationId: { votationId, userId: fetchedUser.id } },
      });

      if (!existingUser) {
        await database.votationUser.create({
          data: { votationId, userId: fetchedUser.id },
        });
      }
    }
  }

  return c.json(votationsResponses.users.added, 201);
});
