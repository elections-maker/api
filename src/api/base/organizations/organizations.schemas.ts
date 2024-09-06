import { z } from "zod";

export const createOrgBody = z.object({
  name: z.string().min(4),
  plan: z.union([
    z.literal("free"),
    z.literal("basic"),
    z.literal("professional"),
    z.literal("enterprise"),
  ]),
});

export type CreateOrgBody = z.infer<typeof createOrgBody>;
