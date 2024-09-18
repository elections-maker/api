import { authFactory } from "@/api/factories";
import { organizations } from "../organizations.repo";

export const getOrganizationsService = authFactory.createHandlers(async (c) => {
  const { id: userId } = c.get("userData");

  const fetchedOrgs = await organizations.findMany(userId);

  return c.json({
    success: true,
    message: "Organizations fetched successfully",
    data: { organizations: fetchedOrgs },
  });
});
