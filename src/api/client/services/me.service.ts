import { clientFactory } from "@/api/factories";
import { authResponses } from "@/config/responses";

export const meService = clientFactory.createHandlers(async (c) => {
  const fetchedUser = c.get("clientUserData");

  return c.json({
    ...authResponses.authorized,
    data: { user: fetchedUser },
  });
});
