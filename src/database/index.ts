import { appConfig } from "@/config/app";
import { PrismaClient as MainClient } from "./generated/main";
import { PrismaClient as OrgClient } from "./generated/organization";

export const db = new MainClient();

export const createOrgClient = (dbName: string) => {
  return new OrgClient({
    datasources: {
      db: {
        url: `${appConfig.baseOrgDatabaseUrl}/${dbName}`,
      },
    },
  });
};
