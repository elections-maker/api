import { z } from "zod";

export const loginBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const voteBody = z.object({
  vote: z.array(
    z.object({
      listId: z.string().uuid(),
      candidates: z.array(z.string().uuid()),
    }),
  ),
});

export type LoginBody = z.infer<typeof loginBody>;
export type VoteBody = z.infer<typeof voteBody>;
