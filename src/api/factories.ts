import { createFactory } from "hono/factory";
import { AccessDecodedToken, Env } from "@/types";
import { PrismaClient as MainClient } from "@/database/generated/main";
import { PrismaClient as OrgClient } from "@/database/generated/organization";

type AuthEnv = Env<{ userData: AccessDecodedToken }>;

type OrgEnv = Env<{
  orgData: {
    database: OrgClient;
    data: MainClient["organization"];
  };
}>;

export const baseFactory = createFactory();

export const authFactory = createFactory<AuthEnv>();
export const orgFactory = createFactory<OrgEnv>();
