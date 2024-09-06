import { PrismaClient as MainClient } from "./generated/main";

export const db = new MainClient();
