import { prisma } from "@/database";
import { Prisma } from "@prisma/client";

type CreateOrganizationInput = Prisma.OrganizationUncheckedCreateInput;
type UpdateOrganizationInput = Prisma.OrganizationUncheckedUpdateInput;

export const organizations = {
  findMany: (userId: string) => {
    return prisma.organization.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: { _count: { select: { users: true, lists: true, votations: true } } },
    });
  },
  findById: (userId: string, organizationId: string) => {
    return prisma.organization.findUnique({
      where: { userId, id: organizationId },
      include: { _count: { select: { users: true, lists: true, votations: true } } },
    });
  },
  findByName: (userId: string, name: string) => {
    return prisma.organization.findFirst({ where: { userId, name } });
  },
  create: (data: CreateOrganizationInput) => {
    return prisma.organization.create({ data });
  },
  update: (userId: string, organizationId: string, data: UpdateOrganizationInput) => {
    return prisma.organization.update({ where: { userId, id: organizationId }, data });
  },
  delete: (userId: string, organizationId: string) => {
    return prisma.organization.delete({ where: { userId, id: organizationId } });
  },
};
