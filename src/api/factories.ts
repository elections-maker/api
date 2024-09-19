import { Env } from "@/types";
import { createFactory } from "hono/factory";
import { Organization, OrganizationUser, User } from "@prisma/client";

type AuthEnv = Env<{ userData: User }>;
type OrgEnv = AuthEnv & Env<{ orgData: Organization }>;

type ClientAuthEnv = Env<{ clientUserData: OrganizationUser }>;

export const baseFactory = createFactory();

export const authFactory = createFactory<AuthEnv>();
export const orgFactory = createFactory<OrgEnv>();

export const clientFactory = createFactory<ClientAuthEnv>();
