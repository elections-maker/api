import { prisma } from "@/database";
import { SortOptions } from "@/types";
import { Prisma } from "@prisma/client";

type CreateOrganizationInput = Prisma.OrganizationUserUncheckedCreateInput;
type UpdateOrganizationInput = Prisma.OrganizationUserUncheckedUpdateInput;

export const users = {
  findMany: (organizationId: string, options: SortOptions) => {
    return prisma.organizationUser.findMany({
      where: { organizationId },
      skip: options.offset,
      take: options.limit,
      orderBy: { updatedAt: "desc" },
    });
  },
  count: (organizationId: string) => {
    return prisma.organizationUser.count({ where: { organizationId } });
  },
  findById: (organizationId: string, userId: string) => {
    return prisma.organizationUser.findUnique({
      where: { organizationId, id: userId },
      include: {
        votations: { select: { votation: { select: { id: true, name: true } } } },
        candidatures: { select: { list: { select: { id: true, name: true } } } },
      },
    });
  },
  findByEmail: (organizationId: string, email: string) => {
    return prisma.organizationUser.findFirst({ where: { organizationId, email } });
  },
  create: (data: CreateOrganizationInput) => {
    return prisma.organizationUser.create({ data });
  },
  createMany: (data: CreateOrganizationInput[]) => {
    return prisma.organizationUser.createMany({ data });
  },
  update: (organizationId: string, userId: string, data: UpdateOrganizationInput) => {
    return prisma.organizationUser.update({ where: { organizationId, id: userId }, data });
  },
  delete: (organizationId: string, userId: string) => {
    return prisma.organizationUser.delete({ where: { organizationId, id: userId } });
  },
};
