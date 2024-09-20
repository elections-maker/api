import { prisma } from "@/database";
import { Prisma } from "@prisma/client";

type CreateOrganizationInput = Prisma.OrganizationUncheckedCreateInput;

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
  create: (data: CreateOrganizationInput) => {
    return prisma.organization.create({ data });
  },
  delete: (userId: string, organizationId: string) => {
    return prisma.organization.delete({ where: { userId, id: organizationId } });
  },
};
