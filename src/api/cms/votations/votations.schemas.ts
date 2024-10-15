import { z } from "zod";

export const createVotationBody = z.object({
  name: z.string(),
  minPreferences: z.number().min(1).max(15),
  maxPreferences: z.number().min(1).max(15),
  intralist: z.union([z.literal("yes"), z.literal("no")]),
  opened: z.union([z.literal("yes"), z.literal("no")]),
});

export const updateVotationBody = z.object({
  name: z.string(),
  minPreferences: z.number().min(1).max(15),
  maxPreferences: z.number().min(1).max(15),
  intralist: z.union([z.literal("yes"), z.literal("no")]),
  opened: z.union([z.literal("yes"), z.literal("no")]),
});

export const addVotationUsersBody = z.object({
  data: z.array(z.string().uuid()).min(1),
});

export const removeVotationUsersBody = z.object({
  data: z.array(z.string().uuid()).min(1),
});

export const addVotationListsBody = z.object({
  data: z.array(z.string().uuid()),
});

export const removeVotationListsBody = z.object({
  data: z.array(z.string().uuid()),
});

export type CreateVotationBody = z.infer<typeof createVotationBody>;
export type UpdateVotationBody = z.infer<typeof updateVotationBody>;
export type AddVotationUsersBody = z.infer<typeof addVotationUsersBody>;
export type RemoveVotationUsersBody = z.infer<typeof removeVotationUsersBody>;
export type AddVotationListsBody = z.infer<typeof addVotationListsBody>;
export type RemoveVotationListsBody = z.infer<typeof removeVotationListsBody>;
