import { prisma } from "@/database";
import { Prisma } from "@prisma/client";

export const organizations = {
  findMany: (userId: string) => {
    return prisma.organization.findMany({ where: { userId } });
  },
  findById: (userId: string, organizationId: string) => {
    return prisma.organization.findUnique({ where: { userId, id: organizationId } });
  },
  findByName: (userId: string, name: string) => {
    return prisma.organization.findFirst({ where: { userId, name } });
  },
  create: (data: Prisma.OrganizationUncheckedCreateInput) => {
    return prisma.organization.create({ data });
  },
  delete: (userId: string, organizationId: string) => {
    return prisma.organization.delete({ where: { userId, id: organizationId } });
  },
};
