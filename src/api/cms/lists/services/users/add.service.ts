import { orgFactory } from "@/api/factories";
import { listsResponses } from "@/config/responses";
import { AddListUsersBody } from "../../lists.schemas";

export const addListUsersService = orgFactory.createHandlers(async (c) => {
  const { users } = await c.req.json<AddListUsersBody>();
  const { database } = c.get("orgData");
  const { listId } = c.req.param();

  const fetchedList = await database.list.findUnique({ where: { id: listId } });
  if (!fetchedList) return c.json(listsResponses.notExists, 404);

  for (const userId of users) {
    const fetchedUser = await database.user.findUnique({ where: { id: userId } });

    if (fetchedUser) {
      const existingCandidate = await database.listCandidate.findUnique({
        where: { listId_userId: { listId, userId: fetchedUser.id } },
      });

      if (!existingCandidate) {
        await database.listCandidate.create({
          data: { listId, userId: fetchedUser.id },
        });
      }
    }
  }

  return c.json(listsResponses.candidates.added, 201);
});
