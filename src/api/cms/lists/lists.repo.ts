import { prisma } from "@/database";
import { SortOptions } from "@/types";
import { Prisma } from "@prisma/client";

type CreateListInput = Prisma.OrganizationListUncheckedCreateInput;
type UpdateListInput = Prisma.OrganizationListUncheckedUpdateInput;
type AddUserInput = Prisma.OrganizationListCandidateUncheckedCreateInput;

export const lists = {
  findMany: (organizationId: string, options: SortOptions) => {
    return prisma.organizationList.findMany({
      where: { organizationId },
      skip: options.offset,
      take: options.limit,
      orderBy: { updatedAt: "desc" },
    });
  },
  count: (organizationId: string) => {
    return prisma.organizationList.count({ where: { organizationId } });
  },
  findById: (organizationId: string, listId: string) => {
    return prisma.organizationList.findUnique({ where: { organizationId, id: listId } });
  },
  findByName: (organizationId: string, name: string) => {
    return prisma.organizationList.findFirst({ where: { organizationId, name } });
  },
  create: (data: CreateListInput) => {
    return prisma.organizationList.create({ data });
  },
  update: (organizationId: string, listId: string, data: UpdateListInput) => {
    return prisma.organizationList.update({ where: { organizationId, id: listId }, data });
  },
  delete: (organizationId: string, listId: string) => {
    return prisma.organizationList.delete({ where: { organizationId, id: listId } });
  },
  users: {
    findById: (organizationId: string, listId: string, userId: string) => {
      return prisma.organizationListCandidate.findUnique({
        where: { organizationId_listId_userId: { organizationId, listId, userId } },
      });
    },
    count: (organizationId: string, listId: string, added: boolean) => {
      const whereClause = added
        ? { organizationId, candidatures: { some: { organizationId, listId } } }
        : { organizationId, candidatures: { none: { organizationId, listId } } };

      return prisma.organizationUser.count({ where: whereClause });
    },
    findMany: (organizationId: string, listId: string, options: SortOptions) => {
      const whereClause =
        options.type === "added"
          ? { organizationId, candidatures: { some: { organizationId, listId } } }
          : { organizationId, candidatures: { none: { organizationId, listId } } };

      return prisma.organizationUser.findMany({
        where: whereClause,
        skip: options.offset,
        take: options.limit,
        orderBy: { updatedAt: "desc" },
      });
    },
    createMany: (data: AddUserInput[]) => {
      return prisma.organizationListCandidate.createMany({ data });
    },
    deleteMany: (data: AddUserInput[]) => {
      return prisma.organizationListCandidate.deleteMany({ where: { OR: data } });
    },
  },
};
