import { prisma } from "@/database";

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
  create: (data: any) => {
    return prisma.user.create({ data });
  },
  update: (userId: string, data: any) => {
    return prisma.user.update({ where: { id: userId }, data });
  },
  delete: (userId: string) => {
    return prisma.user.delete({ where: { id: userId } });
  },
};
