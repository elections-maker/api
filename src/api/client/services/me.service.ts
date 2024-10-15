import { encrypt } from "@/utils/crypto";
import { clientFactory } from "@/api/factories";
import { authResponses } from "@/config/responses";

export const meService = clientFactory.createHandlers(async (c) => {
  const fetchedUser = c.get("clientUserData");

  const returningData = {
    ...fetchedUser,
    email: encrypt(fetchedUser.email),
  };

  return c.json({
    ...authResponses.authorized,
    data: { user: fetchedUser },
  });
});
