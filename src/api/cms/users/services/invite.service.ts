import { users } from "../users.repo";
import { decrypt } from "@/utils/crypto";
import { sendInviteEmail } from "@/emails";
import { generateToken } from "@/utils/jwt";
import { orgFactory } from "@/api/factories";
import { usersResponses } from "@/config/responses";

export const inviteUserService = orgFactory.createHandlers(async (c) => {
  const { id: organizationId, name } = c.get("orgData");
  const { userId } = c.req.param();

  const fetchedUser = await users.findById(organizationId, userId);
  if (!fetchedUser) return c.json(usersResponses.notExists, 404);

  if (fetchedUser.verifyToken) {
    if (fetchedUser.expiresAt || new Date() > new Date()) {
      return c.json(usersResponses.alreadyInvited, 200);
    }
  }

  const payload = { email: fetchedUser.email };
  const verifyToken = await generateToken(3600 * 60, payload);

  const emailUsername = `${fetchedUser.firstName} ${fetchedUser.lastName}`;
  await sendInviteEmail(decrypt(fetchedUser.email), emailUsername, name, verifyToken);

  const expiresDate = new Date(Date.now() + 3600 * 1000);
  await users.update(organizationId, userId, { verifyToken, expiresAt: expiresDate });

  return c.json(usersResponses.invited, 200);
});
