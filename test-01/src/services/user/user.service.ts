import { prisma } from "../database/client.js";

export async function getUser(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export async function createUser(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
