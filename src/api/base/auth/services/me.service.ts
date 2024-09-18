import { authFactory } from "@/api/factories";
import { authResponses } from "@/config/responses";

export const meService = authFactory.createHandlers(async (c) => {
  const fetchedUser = c.get("userData");

  return c.json({
    ...authResponses.authorized,
    data: { user: fetchedUser },
  });
});
