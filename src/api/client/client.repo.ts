import { prisma } from "@/database";

export const client = {
  votations: {
    findMany: (organizationId: string, userId: string) => {
      return prisma.organziationVotationUser.findMany({
        where: { organizationId, userId },
        select: { votation: true, hasVoted: true },
        orderBy: { votation: { updatedAt: "desc" } },
      });
    },
  },
};
