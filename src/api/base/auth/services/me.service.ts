import { decrypt } from "@/utils/crypto";
import { authFactory } from "@/api/factories";
import { authResponses } from "@/config/responses";

export const meService = authFactory.createHandlers(async (c) => {
  const fetchedUser = c.get("userData");

  const returningData = {
    ...fetchedUser,
    email: decrypt(fetchedUser.email),
  };

  return c.json({
    ...authResponses.authorized,
    data: { user: returningData },
  });
});
