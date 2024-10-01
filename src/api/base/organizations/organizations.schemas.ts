import { z } from "zod";

const planSchema = z.union([
  z.literal("free"),
  z.literal("basic"),
  z.literal("professional"),
  z.literal("enterprise"),
]);

export const createOrgBody = z.object({
  name: z.string().min(4),
  plan: planSchema,
});

export const updateOrgBody = z.object({
  name: z.string().min(4),
  plan: planSchema,
});

export type CreateOrgBody = z.infer<typeof createOrgBody>;
export type UpdateOrgBody = z.infer<typeof updateOrgBody>;
