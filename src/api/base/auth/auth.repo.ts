import { prisma } from "@/database";
import { Prisma } from "@prisma/client";

type CreateUserInput = Prisma.UserUncheckedCreateInput;
type EditUserInput = Prisma.UserUncheckedUpdateInput;

export const users = {
  findByEmailUsername: (email: string, username: string) => {
    return prisma.user.findFirst({ where: { OR: [{ email }, { username }] } });
  },
  findByUsername: (username: string) => {
    return prisma.user.findUnique({ where: { username } });
  },
  findByEmail: (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  },
  findById: (userId: string) => {
    return prisma.user.findUnique({ where: { id: userId } });
  },
  create: (data: CreateUserInput) => {
    return prisma.user.create({ data });
  },
  update: (userId: string, data: EditUserInput) => {
    return prisma.user.update({ where: { id: userId }, data });
  },
  delete: (userId: string) => {
    return prisma.user.delete({ where: { id: userId } });
  },
};
