import { DecoderType } from "@/types";
import { decoders } from "@/utils/decoders";
import { orgFactory } from "@/api/factories";
import { usersResponses } from "@/config/responses";
import { User } from "@/database/generated/organization";

export const uploadUsersService = orgFactory.createHandlers(async (c) => {
  const type = c.req.query("type") as DecoderType;
  const uploadedFile = await c.req.arrayBuffer();
  const { database } = c.get("orgData");

  const decoderExists = type in decoders;
  if (!decoderExists) return c.json(usersResponses.decoderNotExists, 400);

  const users = decoders[type]<User>(uploadedFile);
  await database.user.createMany({ data: users });

  return c.json(usersResponses.uploaded, 200);
});
