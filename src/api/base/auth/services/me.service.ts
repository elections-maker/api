import { db } from "@/database";
import { authFactory } from "@/api/factories";
import { authResponses } from "@/config/responses";

export const meService = authFactory.createHandlers(async (c) => {
  const { userId } = c.get("userData");

  const fetchedUser = db.user.findUnique({ where: { id: userId } });
  const response = { ...authResponses.authorized, data: { user: fetchedUser } };

  return c.json(response, 200);
});
