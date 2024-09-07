import { z } from "zod";

export const createVotationBody = z.object({
  name: z.string(),
  minPreferences: z.number().min(1).max(15),
  maxPreferences: z.number().min(1).max(15),
  intralist: z.union([z.literal("yes"), z.literal("no")]),
});

export const editVotationBody = z.object({
  name: z.string(),
  minPreferences: z.number().min(1).max(15),
  maxPreferences: z.number().min(1).max(15),
  intralist: z.union([z.literal("yes"), z.literal("no")]),
});

export const addVotationUsersBody = z.object({
  users: z.array(z.string().uuid()),
});

export const removeVotationUsersBody = z.object({
  users: z.array(z.string().uuid()),
});

export const addVotationListsBody = z.object({
  lists: z.array(z.string().uuid()),
});

export const removeVotationListsBody = z.object({
  lists: z.array(z.string().uuid()),
});

export type CreateVotationBody = z.infer<typeof createVotationBody>;
export type EditVotationBody = z.infer<typeof editVotationBody>;
export type AddVotationUsersBody = z.infer<typeof addVotationUsersBody>;
export type RemoveVotationUsersBody = z.infer<typeof removeVotationUsersBody>;
export type AddVotationListsBody = z.infer<typeof addVotationListsBody>;
export type RemoveVotationListsBody = z.infer<typeof removeVotationListsBody>;
