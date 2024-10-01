import { prisma } from "@/database";
import { SortOptions } from "@/types";
import { Prisma } from "@prisma/client";

type CreateVotationInput = Prisma.OrganizationVotationUncheckedCreateInput;
type UpdateVotationInput = Prisma.OrganizationVotationUncheckedUpdateInput;
type AddUserInput = Prisma.OrganziationVotationUserUncheckedCreateInput;
type RemoveUserInput = Prisma.OrganziationVotationUserWhereInput;
type AddListInput = Prisma.OrganizationVotationListUncheckedCreateInput;
type RemoveListInput = Prisma.OrganizationVotationListWhereInput;

export const votations = {
  findMany: (organizationId: string, options: SortOptions) => {
    return prisma.organizationVotation.findMany({
      where: { organizationId },
      skip: options.offset,
      take: options.limit,
      orderBy: { updatedAt: "desc" },
      include: { _count: { select: { lists: true, users: true } } },
    });
  },
  count: (organizationId: string) => {
    return prisma.organizationVotation.count({ where: { organizationId } });
  },
  findById: (organizationId: string, votationId: string) => {
    return prisma.organizationVotation.findUnique({
      where: { organizationId, id: votationId },
      include: { _count: { select: { lists: true, users: true } } },
    });
  },
  findByName: (organizationId: string, name: string) => {
    return prisma.organizationVotation.findFirst({ where: { organizationId, name } });
  },
  create: (data: CreateVotationInput) => {
    return prisma.organizationVotation.create({ data });
  },
  update: (organizationId: string, votationId: string, data: UpdateVotationInput) => {
    return prisma.organizationVotation.update({ where: { organizationId, id: votationId }, data });
  },
  delete: (organizationId: string, votationId: string) => {
    return prisma.organizationVotation.delete({ where: { organizationId, id: votationId } });
  },
  users: {
    findById: (organizationId: string, votationId: string, userId: string) => {
      return prisma.organziationVotationUser.findUnique({
        where: { organizationId_votationId_userId: { organizationId, votationId, userId } },
      });
    },
    count: (organizationId: string, votationId: string, added: boolean) => {
      const whereClause = added
        ? { organizationId, votations: { some: { organizationId, votationId } } }
        : { organizationId, votations: { none: { organizationId, votationId } } };

      return prisma.organizationUser.count({ where: whereClause });
    },
    findMany: (organizationId: string, votationId: string, options: SortOptions) => {
      const whereClause =
        options.type === "added"
          ? { organizationId, votations: { some: { organizationId, votationId } } }
          : { organizationId, votations: { none: { organizationId, votationId } } };

      return prisma.organizationUser.findMany({
        where: whereClause,
        skip: options.offset,
        take: options.limit,
        orderBy: { updatedAt: "desc" },
        include: { votations: { where: { votationId }, select: { hasVoted: true } } },
      });
    },
    createMany: (data: AddUserInput[]) => {
      return prisma.organziationVotationUser.createMany({ data });
    },
    deleteMany: (data: RemoveUserInput[]) => {
      return prisma.organziationVotationUser.deleteMany({ where: { OR: data } });
    },
  },
  lists: {
    findById: (organizationId: string, votationId: string, listId: string) => {
      return prisma.organizationVotationList.findUnique({
        where: { organizationId_votationId_listId: { organizationId, votationId, listId } },
      });
    },
    count: (organizationId: string, votationId: string, added: boolean) => {
      const whereClause = added
        ? { organizationId, votations: { some: { organizationId, votationId } } }
        : { organizationId, votations: { none: { organizationId, votationId } } };

      return prisma.organizationList.count({ where: whereClause });
    },
    findMany: (organizationId: string, votationId: string, options: SortOptions) => {
      const whereClause =
        options.type === "added"
          ? { organizationId, votations: { some: { organizationId, votationId } } }
          : { organizationId, votations: { none: { organizationId, votationId } } };

      return prisma.organizationList.findMany({
        where: whereClause,
        skip: options.offset,
        take: options.limit,
        orderBy: { updatedAt: "desc" },
        include: { _count: { select: { candidates: true } } },
      });
    },
    createMany: (data: AddListInput[]) => {
      return prisma.organizationVotationList.createMany({ data });
    },
    deleteMany: (data: RemoveListInput[]) => {
      return prisma.organizationVotationList.deleteMany({ where: { OR: data } });
    },
  },
};
