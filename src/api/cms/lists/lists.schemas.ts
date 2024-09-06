import { z } from "zod";

export const createListBody = z.object({
  name: z.string(),
});

export const editListBody = z.object({
  name: z.string(),
});

export const addListUsersBody = z.object({
  users: z.array(z.string().uuid()),
});

export const removeListUsersBody = z.object({
  users: z.array(z.string().uuid()),
});

export type CreateListBody = z.infer<typeof createListBody>;
export type UpdateListBody = z.infer<typeof editListBody>;
export type AddListUsersBody = z.infer<typeof addListUsersBody>;
export type RemoveListUsersBody = z.infer<typeof removeListUsersBody>;
