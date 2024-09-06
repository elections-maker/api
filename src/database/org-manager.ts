import { db } from ".";

export const createOrganizationDatabase = async (dbName: string) => {
  try {
    await db.$queryRawUnsafe(`CREATE DATABASE "${dbName}"`);
    // TODO: run migrations
  } catch (err) {
    throw new Error("Error creating database");
  }
};

export const deleteOrganizationDatabase = async (dbName: string) => {
  try {
    await db.$queryRawUnsafe(`DROP DATABASE "${dbName}"`);
  } catch (err) {
    throw new Error("Error dropping database");
  }
};
